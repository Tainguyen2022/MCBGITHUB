// api/admin/users.js
// User Management API Routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { adminAuth, requireRole } = require('../../middleware/adminAuth');
const { checkPermission } = require('../../middleware/permissions');
const { getPool, testConnection, getErrorMessage } = require('../../utils/dbHelper');

// Import audit log service (optional - TypeScript file)
let logAudit;
try {
    logAudit = require('../../services/admin/auditLogService').logAudit;
} catch (err) {
    logAudit = async () => { }; // No-op if not available
}

/**
 * GET /api/admin/users
 * Lấy danh sách users với pagination, filter, search
 */
router.get('/', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    // ✅ CRITICAL: Wrap in try-catch to ensure all errors return JSON
    // ✅ CRITICAL: Add timeout to prevent hanging requests
    const timeout = setTimeout(() => {
        if (!res.headersSent) {
            console.error('[GET /api/admin/users] Request timeout after 20 seconds');
            res.status(500).json({
                success: false,
                error: 'Request Timeout',
                message: 'The request took too long to process'
            });
        }
    }, 20000); // 20 second timeout

    try {
        const {
            page = 1,
            pageSize = 20,
            search = '',
            role = '',
            isActive = '',
            sortBy = 'registered_at',
            sortOrder = 'DESC'
        } = req.query;

        console.log('[GET /api/admin/users] Request received:', { page, pageSize, search, role, isActive });

        // ✅ CRITICAL: Get pool with fallback
        let pool;
        try {
            pool = req.app.locals.pool || require('../../db');
        } catch (dbError) {
            console.error('[GET /api/admin/users] Failed to load database pool:', dbError);
            return res.status(500).json({
                success: false,
                error: 'Database connection error',
                message: 'Failed to load database pool: ' + dbError.message
            });
        }

        if (!pool) {
            console.error('[GET /api/admin/users] Database pool is null!');
            return res.status(500).json({
                success: false,
                error: 'Database connection not available',
                message: 'Database pool is not initialized'
            });
        }

        // Test database connection
        try {
            const testResult = await pool.query('SELECT NOW() as current_time');
            console.log('[GET /api/admin/users] Database connection OK, current time:', testResult.rows[0]?.current_time);
        } catch (testError) {
            console.error('[GET /api/admin/users] Database connection test failed:', testError.message);
            return res.status(500).json({
                success: false,
                error: 'Database connection failed',
                message: `Cannot connect to database: ${testError.message}`
            });
        }

        // Helper function to remove Vietnamese accents
        const removeVietnameseAccents = (str) => {
            if (!str) return '';
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
                .toLowerCase();
        };

        // Build WHERE clause
        const conditions = [];
        const params = [];
        let paramIndex = 1;

        if (search) {
            const searchLower = search.toLowerCase().trim();
            const searchNoAccent = removeVietnameseAccents(search);

            // Create a function to remove accents in SQL (simplified version)
            // Search in both original text and email (case-insensitive)
            // Also search in accent-removed version for Vietnamese names
            conditions.push(`(
                LOWER(name) ILIKE $${paramIndex} OR 
                LOWER(email) ILIKE $${paramIndex} OR
                LOWER(TRANSLATE(name, 
                    'áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđĐ',
                    'aaaaaaaaaaaaaaaaaeeeeeeeeeeiiiiioooooooooooooouuuuuuuuuuuyyyyyydD'
                )) ILIKE $${paramIndex + 1}
            )`);
            params.push(`%${searchLower}%`);
            params.push(`%${searchNoAccent}%`);
            paramIndex += 2;
        }

        if (role) {
            conditions.push(`role = $${paramIndex}`);
            params.push(role);
            paramIndex++;
        }

        if (isActive !== '') {
            conditions.push(`activated = $${paramIndex}`);
            params.push(isActive === 'true');
            paramIndex++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        // Get total count
        let countResult;
        try {
            countResult = await pool.query(
                `SELECT COUNT(*) as total FROM users ${whereClause}`,
                params
            );
        } catch (countError) {
            console.error('[GET /api/admin/users] Count query failed:', countError);
            clearTimeout(timeout);
            if (!res.headersSent) {
                return res.status(500).json({
                    success: false,
                    error: 'Database Query Error',
                    message: `Failed to count users: ${countError.message}`
                });
            }
            return;
        }

        const total = parseInt(countResult.rows[0]?.total || 0);
        console.log(`[GET /api/admin/users] Total users in database: ${total}`);

        // Get users with pagination
        const offset = (page - 1) * pageSize;
        const validSortBy = ['registered_at', 'name', 'email', 'role', 'created_at'].includes(sortBy)
            ? sortBy : 'registered_at';
        const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Create a new params array for the users query (don't modify the original)
        const usersParams = [...params];
        const limitParamIndex = usersParams.length + 1;
        const offsetParamIndex = usersParams.length + 2;
        usersParams.push(pageSize, offset);

        let usersResult;
        let hasPremiumPlusColumn = true;
        try {
            // ✅ Try with premiumPlusAccess column first
            usersResult = await pool.query(
                `SELECT id, name, email, role, packages, "premiumPlusAccess", activated, "mobileLogin", 
                        "joinDate", "expiryDate", registered_at, "bananaBalance"
                 FROM users 
                 ${whereClause}
                 ORDER BY ${validSortBy} ${validSortOrder}
                 LIMIT $${limitParamIndex} OFFSET $${offsetParamIndex}`,
                usersParams
            );
        } catch (usersError) {
            // ✅ FALLBACK: If premiumPlusAccess column doesn't exist, try without it
            if (usersError.message && usersError.message.includes('premiumPlusAccess')) {
                console.warn('[GET /api/admin/users] premiumPlusAccess column not found, using fallback query');
                hasPremiumPlusColumn = false;
                try {
                    usersResult = await pool.query(
                        `SELECT id, name, email, role, packages, activated, "mobileLogin", 
                                "joinDate", "expiryDate", registered_at, "bananaBalance"
                         FROM users 
                         ${whereClause}
                         ORDER BY ${validSortBy} ${validSortOrder}
                         LIMIT $${limitParamIndex} OFFSET $${offsetParamIndex}`,
                        usersParams
                    );
                } catch (fallbackError) {
                    console.error('[GET /api/admin/users] Fallback query also failed:', fallbackError);
                    clearTimeout(timeout);
                    if (!res.headersSent) {
                        return res.status(500).json({
                            success: false,
                            error: 'Database Query Error',
                            message: `Failed to fetch users: ${fallbackError.message}`
                        });
                    }
                    return;
                }
            } else {
                console.error('[GET /api/admin/users] Users query failed:', usersError);
                clearTimeout(timeout);
                if (!res.headersSent) {
                    return res.status(500).json({
                        success: false,
                        error: 'Database Query Error',
                        message: `Failed to fetch users: ${usersError.message}`
                    });
                }
                return;
            }
        }


        console.log(`[GET /api/admin/users] Found ${usersResult.rows.length} users (total: ${total})`);

        // Parse packages and premiumPlusAccess from JSONB/JSON string to array
        const usersWithParsedPackages = usersResult.rows.map(user => {
            let packages = user.packages;
            if (typeof packages === 'string') {
                try {
                    packages = JSON.parse(packages);
                } catch (e) {
                    packages = [];
                }
            }
            if (!Array.isArray(packages)) {
                packages = [];
            }

            let premiumPlusAccess = user.premiumPlusAccess;
            if (typeof premiumPlusAccess === 'string') {
                try {
                    premiumPlusAccess = JSON.parse(premiumPlusAccess);
                } catch (e) {
                    premiumPlusAccess = [];
                }
            }
            if (!Array.isArray(premiumPlusAccess)) {
                premiumPlusAccess = [];
            }

            return { ...user, packages, premiumPlusAccess };
        });

        // Log sample user data for debugging
        if (usersWithParsedPackages.length > 0) {
            console.log('[GET /api/admin/users] Sample user:', {
                id: usersWithParsedPackages[0].id,
                name: usersWithParsedPackages[0].name,
                email: usersWithParsedPackages[0].email,
                role: usersWithParsedPackages[0].role,
                packages: usersWithParsedPackages[0].packages
            });
        } else {
            console.warn('[GET /api/admin/users] ⚠️ No users found in database!');
        }

        clearTimeout(timeout);

        // ✅ CRITICAL: Check if response was already sent
        if (res.headersSent) {
            console.error('[GET /api/admin/users] Headers already sent, cannot send success response');
            return;
        }

        res.json({
            success: true,
            users: usersWithParsedPackages,
            pagination: {
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        });
    } catch (error) {
        clearTimeout(timeout);
        console.error('[GET /api/admin/users] Error:', error);
        console.error('[GET /api/admin/users] Error stack:', error.stack);
        console.error('[GET /api/admin/users] Error name:', error.name);
        console.error('[GET /api/admin/users] Error code:', error.code);

        // Detect if we're in development/local environment
        const isDevelopment = process.env.NODE_ENV !== 'production' ||
            process.env.NODE_ENV === 'development' ||
            !process.env.NODE_ENV;

        // Provide more detailed error in development
        const errorResponse = {
            success: false,
            error: 'Internal Server Error',
            message: error.message || 'Failed to get users'
        };

        // Add detailed error info in development
        if (isDevelopment) {
            errorResponse.details = {
                name: error.name,
                code: error.code,
                stack: error.stack?.split('\n').slice(0, 5).join('\n'), // First 5 lines of stack
                type: error.constructor.name
            };

            // Add specific error messages for common issues
            if (error.code === 'ECONNREFUSED' || error.message?.includes('connect')) {
                errorResponse.message = 'Database connection refused. Please check if PostgreSQL is running.';
                errorResponse.details.suggestion = 'Start PostgreSQL service or check database connection settings.';
            } else if (error.code === 'ENOTFOUND' || error.message?.includes('getaddrinfo')) {
                errorResponse.message = 'Database host not found. Please check database connection settings.';
                errorResponse.details.suggestion = 'Verify DATABASE_URL or database host configuration.';
            } else if (error.message?.includes('password') || error.message?.includes('authentication')) {
                errorResponse.message = 'Database authentication failed. Please check database credentials.';
                errorResponse.details.suggestion = 'Verify database username and password in connection settings.';
            } else if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
                errorResponse.message = 'Database table not found. Please run database migrations.';
                errorResponse.details.suggestion = 'Check if the "users" table exists. Run migrations if needed.';
            }
        }

        // ✅ CRITICAL: Ensure error is sent as JSON
        if (!res.headersSent) {
            res.status(500).json(errorResponse);
        } else {
            console.error('[GET /api/admin/users] Headers already sent, cannot send error response');
        }
    }
});

/**
 * POST /api/admin/users/user-devices
 * Lấy danh sách devices của nhiều users
 */
router.post('/user-devices', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    const { userIds } = req.body || {};

    // Debug logging for mobile issues
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        console.warn('⚠️ [user-devices] Bad Request:', {
            body: req.body,
            bodyType: typeof req.body,
            userIds,
            userIdsType: typeof userIds,
            contentType: req.headers['content-type'],
            userAgent: req.headers['user-agent']?.substring(0, 100)
        });
        return res.status(400).json({
            error: 'Bad Request',
            message: 'userIds array is required',
            debug: {
                receivedBody: typeof req.body,
                receivedUserIds: typeof userIds
            }
        });
    }

    try {
        // ✅ FIX: Use helper function for consistent error handling
        let pool;
        try {
            pool = getPool(req);
        } catch (dbError) {
            console.error('❌ [GET /api/admin/users/devices] Failed to get database pool:', dbError);
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: 'Database connection failed',
                details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
            });
        }

        // Test connection
        const isConnected = await testConnection(pool);
        if (!isConnected) {
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: 'Database connection unavailable'
            });
        }

        const result = await pool.query(
            `SELECT 
                us.user_id,
                COUNT(DISTINCT us.id) as count,
                ARRAY_AGG(DISTINCT us.device_type) FILTER (WHERE us.device_type IS NOT NULL) as device_types,
                ARRAY_AGG(DISTINCT us.ip_address) FILTER (WHERE us.ip_address IS NOT NULL) as ip_addresses,
                ARRAY_AGG(DISTINCT us.browser_fingerprint) FILTER (WHERE us.browser_fingerprint IS NOT NULL) as browser_fingerprints
             FROM user_sessions us
             WHERE us.user_id = ANY($1::text[]) AND us.is_active = true
             GROUP BY us.user_id`,
            [userIds]
        );

        const deviceMap = {};
        result.rows.forEach((row) => {
            deviceMap[row.user_id] = {
                count: parseInt(row.count),
                deviceTypes: row.device_types || [],
                ipAddresses: row.ip_addresses || [],
                browserFingerprints: row.browser_fingerprints || []
            };
        });

        res.json({
            success: true,
            devices: deviceMap
        });
    } catch (error) {
        console.error('❌ [GET /api/admin/users/devices] Error:', error);
        console.error('❌ [GET /api/admin/users/devices] Stack:', error.stack);
        const errorMessage = getErrorMessage(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * GET /api/admin/users/devices-report
 * Lấy danh sách users có >= 3 thiết bị và IP addresses của họ
 */
router.get('/devices-report', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    const { minDevices = 3 } = req.query;

    try {
        const pool = req.app.locals.pool || require('../../db');

        const query = `
            SELECT 
                u.id,
                u.name,
                u.email,
                u.role,
                COUNT(DISTINCT us.id) as device_count,
                COUNT(DISTINCT us.device_type) as device_types_count,
                COUNT(DISTINCT us.ip_address) as ip_count,
                ARRAY_AGG(DISTINCT us.device_type) FILTER (WHERE us.device_type IS NOT NULL) as device_types,
                ARRAY_AGG(DISTINCT us.ip_address) FILTER (WHERE us.ip_address IS NOT NULL) as ip_addresses,
                ARRAY_AGG(DISTINCT us.browser_fingerprint) FILTER (WHERE us.browser_fingerprint IS NOT NULL) as browser_fingerprints,
                MAX(us.login_time) as last_login
            FROM users u
            LEFT JOIN user_sessions us ON u.id = us.user_id
            WHERE us.is_active = true OR us.is_active IS NULL
            GROUP BY u.id, u.name, u.email, u.role
            HAVING COUNT(DISTINCT us.id) >= $1
            ORDER BY device_count DESC, ip_count DESC
            LIMIT 100;
        `;

        const result = await pool.query(query, [parseInt(minDevices)]);

        res.json({
            success: true,
            users: result.rows.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                deviceCount: parseInt(user.device_count),
                deviceTypesCount: parseInt(user.device_types_count),
                ipCount: parseInt(user.ip_count),
                deviceTypes: user.device_types || [],
                ipAddresses: user.ip_addresses || [],
                browserFingerprints: user.browser_fingerprints || [],
                lastLogin: user.last_login
            })),
            total: result.rows.length
        });
    } catch (error) {
        console.error('❌ [DEVICES-REPORT] Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message || 'Failed to get devices report'
        });
    }
});

/**
 * GET /api/admin/users/security-audit
 * Kiểm tra users đáng ngờ:
 * - Users có nhiều devices (có thể chia sẻ tài khoản)
 * - Users có role Premium nhưng không có packages hợp lệ (có thể hack)
 * - Users có nhiều IP addresses khác nhau
 */
router.get('/security-audit', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    console.log('🔍 [SECURITY-AUDIT] Request received from admin:', {
        adminId: req.admin?.id,
        username: req.admin?.username,
        role: req.admin?.role
    });

    try {
        const pool = req.app.locals.pool || require('../../db');

        if (!pool) {
            console.error('❌ [SECURITY-AUDIT] Database pool not available');
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: 'Database connection not available'
            });
        }

        const results = {
            manyDevices: [],
            premiumHack: [],
            manyIPs: [],
            concurrentSessions: []
        };

        // 1. Users có nhiều devices (>= 5 devices)
        const manyDevicesQuery = `
            SELECT 
                u.id,
                u.name,
                u.email,
                u.role,
                COUNT(DISTINCT us.id) as session_count,
                COUNT(DISTINCT us.device_type) as device_types,
                COUNT(DISTINCT us.ip_address) as ip_count,
                COUNT(DISTINCT us.browser_fingerprint) as browser_count,
                ARRAY_AGG(DISTINCT us.device_type) FILTER (WHERE us.device_type IS NOT NULL) as device_list,
                ARRAY_AGG(DISTINCT us.ip_address) FILTER (WHERE us.ip_address IS NOT NULL) as ip_list,
                MAX(us.login_time) as last_login
            FROM users u
            LEFT JOIN user_sessions us ON u.id = us.user_id
            WHERE us.is_active = true OR us.is_active IS NULL
            GROUP BY u.id, u.name, u.email, u.role
            HAVING COUNT(DISTINCT us.id) >= 5
            ORDER BY session_count DESC
            LIMIT 50;
        `;

        const manyDevicesResult = await pool.query(manyDevicesQuery);
        results.manyDevices = manyDevicesResult.rows;

        // 2. Users có role Premium nhưng không có packages hợp lệ
        const premiumHackQuery = `
            SELECT 
                u.id,
                u.name,
                u.email,
                u.role,
                u.packages,
                u.activated,
                u."expiryDate",
                CASE 
                    WHEN u.packages IS NULL THEN 'NULL'
                    WHEN u.packages::text = '[]' THEN 'EMPTY'
                    WHEN u.packages::text = 'null' THEN 'NULL_STRING'
                    ELSE u.packages::text
                END as packages_status
            FROM users u
            WHERE u.role = 'Premium'
            AND (
                u.packages IS NULL 
                OR u.packages::text = '[]' 
                OR u.packages::text = 'null'
                OR (u.packages::text NOT LIKE '%Premium%' AND u.packages::text NOT LIKE '%premium%')
            )
            ORDER BY u.registered_at DESC
            LIMIT 50;
        `;

        const premiumHackResult = await pool.query(premiumHackQuery);
        results.premiumHack = premiumHackResult.rows;

        // 3. Users có nhiều IP addresses khác nhau (>= 3 IPs)
        const manyIPsQuery = `
            SELECT 
                u.id,
                u.name,
                u.email,
                u.role,
                COUNT(DISTINCT us.ip_address) as ip_count,
                ARRAY_AGG(DISTINCT us.ip_address) FILTER (WHERE us.ip_address IS NOT NULL) as ip_list,
                COUNT(DISTINCT us.id) as session_count,
                MAX(us.login_time) as last_login
            FROM users u
            LEFT JOIN user_sessions us ON u.id = us.user_id
            WHERE us.ip_address IS NOT NULL
            GROUP BY u.id, u.name, u.email, u.role
            HAVING COUNT(DISTINCT us.ip_address) >= 3
            ORDER BY ip_count DESC
            LIMIT 50;
        `;

        const manyIPsResult = await pool.query(manyIPsQuery);
        results.manyIPs = manyIPsResult.rows;

        // 4. Users có nhiều active sessions đồng thời (>= 3)
        const concurrentSessionsQuery = `
            SELECT 
                u.id,
                u.name,
                u.email,
                u.role,
                COUNT(*) as active_sessions,
                ARRAY_AGG(DISTINCT us.device_type) FILTER (WHERE us.device_type IS NOT NULL) as device_list,
                ARRAY_AGG(DISTINCT us.ip_address) FILTER (WHERE us.ip_address IS NOT NULL) as ip_list,
                MAX(us.login_time) as last_login
            FROM users u
            INNER JOIN user_sessions us ON u.id = us.user_id
            WHERE us.is_active = true
            GROUP BY u.id, u.name, u.email, u.role
            HAVING COUNT(*) >= 3
            ORDER BY active_sessions DESC
            LIMIT 50;
        `;

        const concurrentSessionsResult = await pool.query(concurrentSessionsQuery);
        results.concurrentSessions = concurrentSessionsResult.rows;

        res.json({
            success: true,
            results: {
                manyDevices: {
                    count: results.manyDevices.length,
                    users: results.manyDevices
                },
                premiumHack: {
                    count: results.premiumHack.length,
                    users: results.premiumHack
                },
                manyIPs: {
                    count: results.manyIPs.length,
                    users: results.manyIPs
                },
                concurrentSessions: {
                    count: results.concurrentSessions.length,
                    users: results.concurrentSessions
                }
            }
        });

    } catch (error) {
        console.error('❌ [SECURITY-AUDIT] Error:', error);
        console.error('❌ [SECURITY-AUDIT] Stack:', error.stack);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message || 'Failed to perform security audit',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

/**
 * GET /api/admin/users/:id/devices
 * Lấy chi tiết từng thiết bị của một user cụ thể
 */
router.get('/:id/devices', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    const { id } = req.params;

    console.log('🔍 [GET /:id/devices] Request received:', { id, adminId: req.admin?.id });

    try {
        // ✅ FIX: Use helper function for consistent error handling
        let pool;
        try {
            pool = getPool(req);
        } catch (dbError) {
            console.error('❌ [GET /api/admin/users/:id/devices] Failed to get database pool:', dbError);
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: 'Database connection failed',
                details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
            });
        }

        // Test connection
        const isConnected = await testConnection(pool);
        if (!isConnected) {
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: 'Database connection unavailable'
            });
        }

        const result = await pool.query(
            `SELECT 
                us.id as session_id,
                us.device_type,
                us.browser_fingerprint,
                us.ip_address,
                us.operating_system,
                us.user_agent,
                us.login_time,
                us.last_activity,
                us.is_active
             FROM user_sessions us
             WHERE us.user_id = $1 AND us.is_active = true
             ORDER BY us.login_time DESC`,
            [id]
        );

        console.log('✅ [GET /:id/devices] Found devices:', result.rows.length);

        res.json({
            success: true,
            devices: result.rows.map(row => ({
                sessionId: row.session_id,
                deviceType: row.device_type || 'Unknown',
                browserFingerprint: row.browser_fingerprint || 'N/A',
                ipAddress: row.ip_address || 'N/A',
                operatingSystem: row.operating_system || 'Unknown',
                userAgent: row.user_agent || 'N/A',
                loginTime: row.login_time,
                lastActivity: row.last_activity,
                isActive: row.is_active
            })),
            total: result.rows.length
        });
    } catch (error) {
        console.error('❌ [GET /api/admin/users/:id/devices] Error:', error);
        console.error('❌ [GET /api/admin/users/:id/devices] Stack:', error.stack);
        const errorMessage = getErrorMessage(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * GET /api/admin/users/:id/activity
 * Lấy lịch sử hoạt động của user
 */
router.get('/:id/activity', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    const { id } = req.params;
    const { page = 1, pageSize = 50 } = req.query;

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Get user sessions (login activity)
        const sessionsResult = await pool.query(
            `SELECT 
                login_time as timestamp,
                'login' as activity_type,
                device_type,
                ip_address,
                browser
             FROM user_sessions
             WHERE user_id = $1
             ORDER BY login_time DESC
             LIMIT $2`,
            [id, parseInt(pageSize)]
        );

        // Get test results
        const testsResult = await pool.query(
            `SELECT 
                completed_at as timestamp,
                'test_completed' as activity_type,
                test_name,
                score,
                percentage
             FROM test_results
             WHERE user_id = $1
             ORDER BY completed_at DESC
             LIMIT $2`,
            [id, parseInt(pageSize)]
        );

        // Get banana transactions
        const transactionsResult = await pool.query(
            `SELECT 
                created_at as timestamp,
                'banana_transaction' as activity_type,
                transaction_type,
                amount,
                reason
             FROM banana_transactions
             WHERE user_id = $1
             ORDER BY created_at DESC
             LIMIT $2`,
            [id, parseInt(pageSize)]
        );

        // Combine and sort all activities
        const activities = [
            ...sessionsResult.rows.map(row => ({ ...row, activity_type: 'login' })),
            ...testsResult.rows.map(row => ({ ...row, activity_type: 'test_completed' })),
            ...transactionsResult.rows.map(row => ({ ...row, activity_type: 'banana_transaction' }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        res.json({
            success: true,
            activities: activities.slice(0, pageSize),
            pagination: {
                page: parseInt(page),
                pageSize: parseInt(pageSize)
            }
        });
    } catch (error) {
        console.error('Get user activity error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to get user activity'
        });
    }
});

/**
 * GET /api/admin/users/:id
 * Lấy chi tiết user
 */
router.get('/:id', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    const { id } = req.params;

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Get user info
        const userResult = await pool.query(
            `SELECT id, name, email, role, packages, activated, "mobileLogin",
                    "joinDate", "expiryDate", registered_at, "bananaBalance"
             FROM users WHERE id = $1`,
            [id]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        let user = userResult.rows[0];

        // Parse packages from JSONB/JSON string to array
        let packages = user.packages;
        if (typeof packages === 'string') {
            try {
                packages = JSON.parse(packages);
            } catch (e) {
                packages = [];
            }
        }
        if (!Array.isArray(packages)) {
            packages = [];
        }
        user = { ...user, packages };

        // Get user progress
        const progressResult = await pool.query(
            `SELECT * FROM user_progress WHERE user_id = $1 ORDER BY updated_at DESC`,
            [id]
        );

        // Get recent test results
        const testsResult = await pool.query(
            `SELECT * FROM test_results 
             WHERE user_id = $1 
             ORDER BY completed_at DESC 
             LIMIT 10`,
            [id]
        );

        // Get banana transactions
        const transactionsResult = await pool.query(
            `SELECT * FROM banana_transactions 
             WHERE user_id = $1 
             ORDER BY created_at DESC 
             LIMIT 20`,
            [id]
        );

        // Get sessions
        const sessionsResult = await pool.query(
            `SELECT * FROM user_sessions 
             WHERE user_id = $1 
             ORDER BY login_time DESC 
             LIMIT 10`,
            [id]
        );

        res.json({
            success: true,
            user,
            progress: progressResult.rows,
            recentTests: testsResult.rows,
            transactions: transactionsResult.rows,
            sessions: sessionsResult.rows
        });
    } catch (error) {
        console.error('Get user detail error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to get user detail'
        });
    }
});

/**
 * POST /api/admin/users
 * Tạo user mới
 */
router.post('/', adminAuth, checkPermission('users', 'write'), async (req, res) => {
    const { name, email, password, role, bananaBalance } = req.body;

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Name, email, and password are required'
            });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Invalid email format'
            });
        }

        // Validate role
        const validRole = role && ['Free', 'Premium', 'Super Admin'].includes(role) ? role : 'Free';

        // Check if email already exists
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                error: 'Conflict',
                message: 'Email already exists'
            });
        }

        // 🔒 SECURITY: Hash password before storing (NEVER store plain text)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate user ID
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Insert new user
        const result = await pool.query(
            `INSERT INTO users (id, name, email, password, role, "bananaBalance", activated, registered_at)
             VALUES ($1, $2, $3, $4, $5, $6, true, NOW())
             RETURNING id, name, email, role, "bananaBalance", activated, registered_at`,
            [userId, name.trim(), email.trim().toLowerCase(), hashedPassword, validRole, bananaBalance || 0]
        );

        const newUser = result.rows[0];

        // Log audit
        await logAudit(pool, {
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'create_user',
            entityType: 'user',
            entityId: newUser.id,
            entityName: newUser.name,
            newValue: { name: newUser.name, email: newUser.email, role: newUser.role },
            ipAddress: req.ip,
            statusCode: 201
        });

        res.status(201).json({
            success: true,
            user: newUser,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to create user'
        });
    }
});

/**
 * PUT /api/admin/users/:id
 * Cập nhật thông tin user
 */
router.put('/:id', adminAuth, checkPermission('users', 'write'), async (req, res) => {
    const { id } = req.params;
    const { name, email, role, packages, premiumPlusAccess, activated, expiryDate, bananaBalance } = req.body;

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Get old value for audit
        const oldResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (oldResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }
        const oldValue = oldResult.rows[0];

        // Update user
        const updateFields = [];
        const params = [];
        let paramIndex = 1;

        if (name !== undefined) {
            updateFields.push(`name = $${paramIndex++}`);
            params.push(name);
        }
        if (email !== undefined) {
            updateFields.push(`email = $${paramIndex++}`);
            params.push(email);
        }
        if (role !== undefined) {
            updateFields.push(`role = $${paramIndex++}`);
            params.push(role);
        }
        if (packages !== undefined) {
            updateFields.push(`packages = $${paramIndex++}`);
            // ✅ FIX: PostgreSQL text[] array needs array format, not JSON string
            if (Array.isArray(packages)) {
                // Pass array directly - pg driver will handle conversion
                params.push(packages);
            } else if (typeof packages === 'string') {
                // If it's a JSON string, parse it first
                try {
                    const parsed = JSON.parse(packages);
                    params.push(Array.isArray(parsed) ? parsed : []);
                } catch {
                    params.push([]);
                }
            } else {
                params.push([]);
            }
        }
        // ✅ NEW: Handle premiumPlusAccess for PREMIUM+ package
        if (premiumPlusAccess !== undefined) {
            updateFields.push(`"premiumPlusAccess" = $${paramIndex++}`);
            if (Array.isArray(premiumPlusAccess)) {
                params.push(premiumPlusAccess);
            } else if (typeof premiumPlusAccess === 'string') {
                try {
                    const parsed = JSON.parse(premiumPlusAccess);
                    params.push(Array.isArray(parsed) ? parsed : []);
                } catch {
                    params.push([]);
                }
            } else {
                params.push([]);
            }
        }
        if (activated !== undefined) {
            updateFields.push(`activated = $${paramIndex++}`);
            params.push(activated);
        }
        if (expiryDate !== undefined) {
            updateFields.push(`"expiryDate" = $${paramIndex++}`);
            params.push(expiryDate);
        }
        if (bananaBalance !== undefined) {
            updateFields.push(`"bananaBalance" = $${paramIndex++}`);
            params.push(bananaBalance);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'No fields to update'
            });
        }

        params.push(id);

        const result = await pool.query(
            `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
            params
        );

        const newValue = result.rows[0];

        // Log audit (wrapped in try-catch to prevent errors if audit_logs table doesn't exist)
        try {
            await logAudit(pool, {
                adminId: req.admin.id,
                adminUsername: req.admin.username,
                action: 'update_user',
                entityType: 'user',
                entityId: id,
                entityName: newValue.name,
                oldValue,
                newValue,
                ipAddress: req.ip,
                statusCode: 200
            });
        } catch (auditError) {
            console.warn('Audit log failed (non-critical):', auditError.message);
        }

        res.json({
            success: true,
            user: newValue
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to update user'
        });
    }
});

/**
 * POST /api/admin/users/:id/reset-password
 * Reset password cho user
 */
router.post('/:id/reset-password', adminAuth, checkPermission('users', 'write'), async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 5) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Password must be at least 5 characters long'
        });
    }

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Check if user exists
        const userResult = await pool.query('SELECT id, name FROM users WHERE id = $1', [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }
        const user = userResult.rows[0];

        // 🔒 SECURITY FIX: Hash password before storing (NEVER store plain text)
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2',
            [hashedPassword, id] // Store as hashed
        );

        // Log audit
        await logAudit(pool, {
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'reset_user_password',
            entityType: 'user',
            entityId: id,
            entityName: user.name,
            ipAddress: req.ip,
            statusCode: 200
        });

        res.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to reset password'
        });
    }
});

/**
 * DELETE /api/admin/users/:id
 * Xóa user
 */
router.delete('/:id', adminAuth, checkPermission('users', 'delete'), async (req, res) => {
    const { id } = req.params;

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Get user info for audit
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }
        const user = userResult.rows[0];

        // Delete user (cascade will delete related records)
        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        // Log audit
        await logAudit(pool, {
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'delete_user',
            entityType: 'user',
            entityId: id,
            entityName: user.name,
            oldValue: user,
            ipAddress: req.ip,
            statusCode: 200
        });

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to delete user'
        });
    }
});

/**
 * POST /api/admin/users/:id/adjust-bananas
 * Điều chỉnh banana balance
 */
router.post('/:id/adjust-bananas', adminAuth, checkPermission('users', 'write'), async (req, res) => {
    const { id } = req.params;
    const { amount, reason } = req.body;

    if (!amount || isNaN(amount)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Valid amount is required'
        });
    }

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Get current balance
        const userResult = await pool.query(
            'SELECT "bananaBalance", name FROM users WHERE id = $1',
            [id]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        const currentBalance = userResult.rows[0].bananaBalance || 0;
        const newBalance = currentBalance + parseInt(amount);

        // Update balance
        await pool.query(
            'UPDATE users SET "bananaBalance" = $1 WHERE id = $2',
            [newBalance, id]
        );

        // Log transaction
        await pool.query(
            `INSERT INTO banana_transactions 
             (user_id, transaction_type, amount, balance_before, balance_after, reason, source, created_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                id,
                'admin_adjust',
                parseInt(amount),
                currentBalance,
                newBalance,
                reason || 'Admin adjustment',
                'admin',
                req.admin.username
            ]
        );

        // Log audit
        await logAudit(pool, {
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'adjust_bananas',
            entityType: 'user',
            entityId: id,
            entityName: userResult.rows[0].name,
            oldValue: { bananaBalance: currentBalance },
            newValue: { bananaBalance: newBalance, amount, reason },
            ipAddress: req.ip,
            statusCode: 200
        });

        res.json({
            success: true,
            oldBalance: currentBalance,
            newBalance,
            amount: parseInt(amount)
        });
    } catch (error) {
        console.error('Adjust bananas error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to adjust bananas'
        });
    }
});

/**
 * GET /api/admin/users/stats/overview
 * Thống kê tổng quan users
 */
router.get('/stats/overview', adminAuth, checkPermission('users', 'read'), async (req, res) => {
    try {
        const pool = req.app.locals.pool || require('../../db');

        // Total users
        const totalResult = await pool.query('SELECT COUNT(*) as total FROM users');
        const total = parseInt(totalResult.rows[0].total);

        // Active users (logged in last 7 days)
        const activeResult = await pool.query(
            `SELECT COUNT(DISTINCT user_id) as active 
             FROM user_sessions 
             WHERE last_activity > CURRENT_TIMESTAMP - INTERVAL '7 days'`
        );
        const active = parseInt(activeResult.rows[0].active);

        // Users by role
        const roleResult = await pool.query(
            'SELECT role, COUNT(*) as count FROM users GROUP BY role'
        );

        // New users (last 30 days)
        const newUsersResult = await pool.query(
            `SELECT COUNT(*) as new_users 
             FROM users 
             WHERE registered_at > CURRENT_TIMESTAMP - INTERVAL '30 days'`
        );

        // Total banana balance
        const bananaResult = await pool.query(
            'SELECT SUM("bananaBalance") as total_bananas FROM users'
        );

        res.json({
            success: true,
            stats: {
                total,
                active,
                inactive: total - active,
                byRole: roleResult.rows,
                newUsers30Days: parseInt(newUsersResult.rows[0].new_users),
                totalBananas: parseInt(bananaResult.rows[0].total_bananas || 0)
            }
        });
    } catch (error) {
        console.error('Get users stats error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to get users stats'
        });
    }
});

/**
 * POST /api/admin/users/bulk-action
 * Thực hiện hành động hàng loạt trên users
 */
router.post('/bulk-action', adminAuth, checkPermission('users', 'write'), async (req, res) => {
    const { action, userIds } = req.body;

    if (!action || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Action and userIds array are required'
        });
    }

    try {
        const pool = req.app.locals.pool || require('../../db');
        let query = '';
        let params = [];
        let auditAction = '';

        switch (action) {
            case 'delete':
                // Check delete permission (Super Admin only)
                if (req.admin.role !== 'Super Admin') {
                    return res.status(403).json({ error: 'Forbidden', message: 'Insufficient permissions' });
                }
                query = 'DELETE FROM users WHERE id = ANY($1)';
                auditAction = 'bulk_delete_users';
                break;
            case 'activate':
                query = 'UPDATE users SET activated = true WHERE id = ANY($1)';
                auditAction = 'bulk_activate_users';
                break;
            case 'deactivate':
                query = 'UPDATE users SET activated = false WHERE id = ANY($1)';
                auditAction = 'bulk_deactivate_users';
                break;
            default:
                return res.status(400).json({ error: 'Bad Request', message: 'Invalid action' });
        }

        params.push(userIds);
        await pool.query(query, params);

        // Log audit
        await logAudit(pool, {
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: auditAction,
            entityType: 'user',
            entityId: 'bulk',
            newValue: { count: userIds.length, ids: userIds },
            ipAddress: req.ip,
            statusCode: 200
        });

        res.json({
            success: true,
            message: `Successfully performed ${action} on ${userIds.length} users`
        });
    } catch (error) {
        console.error('Bulk action error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to perform bulk action'
        });
    }
});

/**
 * PUT /api/admin/users/:id/mobile-access
 * Toggle mobile access cho user cụ thể (Super Admin only)
 */
router.put('/:id/mobile-access', adminAuth, requireRole(['Super Admin']), async (req, res) => {
    const { id } = req.params;
    // ✅ FIX: Accept both mobileAccess and mobileLogin from frontend
    const mobileAccess = req.body.mobileAccess ?? req.body.mobileLogin;

    if (typeof mobileAccess !== 'boolean') {
        console.warn('⚠️ [mobile-access] Invalid request body:', req.body);
        return res.status(400).json({
            error: 'Bad Request',
            message: 'mobileAccess or mobileLogin must be a boolean'
        });
    }

    try {
        const pool = req.app.locals.pool || require('../../db');

        // Check if user exists
        const userResult = await pool.query('SELECT id, name, "mobileLogin" FROM users WHERE id = $1', [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'User not found'
            });
        }

        const oldValue = userResult.rows[0].mobileLogin;

        // Update mobileLogin field
        await pool.query(
            'UPDATE users SET "mobileLogin" = $1 WHERE id = $2',
            [mobileAccess, id]
        );

        // Log audit
        await logAudit(pool, {
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'toggle_mobile_access',
            entityType: 'user',
            entityId: id,
            entityName: userResult.rows[0].name,
            oldValue: { mobileLogin: oldValue },
            newValue: { mobileLogin: mobileAccess },
            ipAddress: req.ip,
            statusCode: 200
        });

        res.json({
            success: true,
            message: `Mobile access ${mobileAccess ? 'enabled' : 'disabled'} for user`,
            mobileAccess
        });
    } catch (error) {
        console.error('Toggle mobile access error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to toggle mobile access'
        });
    }
});

module.exports = router;
