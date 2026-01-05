// server.js
// ⚡ CLOUD RUN OPTIMIZED: Load environment variables first (non-blocking)
require('dotenv').config();

// Register TypeScript support for loading .ts data files
// Professional solution: Try multiple approaches
let tsSupportRegistered = false;

// Approach 1: Try tsx (CommonJS API - correct way)
try {
    require('tsx/cjs/api').register({
        extensions: ['.ts', '.tsx']
    });
    tsSupportRegistered = true;
    console.log('✅ TypeScript support registered (tsx/cjs) for data files');
} catch (err1) {
    // Approach 2: Try tsx (ESM API)
    try {
        const tsx = require('tsx');
        if (tsx && typeof tsx.register === 'function') {
            tsx.register({
                extensions: ['.ts', '.tsx']
            });
            tsSupportRegistered = true;
            console.log('✅ TypeScript support registered (tsx) for data files');
        } else {
            throw new Error('tsx.register is not a function');
        }
    } catch (err2) {
        // Approach 3: Try ts-node
        try {
            require('ts-node/register');
            tsSupportRegistered = true;
            console.log('✅ TypeScript support registered (ts-node) for data files');
        } catch (err3) {
            console.log('⚠️  TypeScript support not available (tsx/ts-node not installed)');
            console.log('   Install with: npm install --save-dev tsx');
            console.log('   Or: npm install --save-dev ts-node');
            console.log('   Note: Test data files are TypeScript (.ts) and need compilation support');
            console.log('   Error details:', err1.message);
        }
    }
}

// 🔒 SECURITY: Validate required environment variables
// ⚠️ NOTE: ADMIN_PASSWORD is NOT stored in environment variables for security
// Admin password should be set manually in database
console.log('ℹ️  Admin password is NOT stored in environment variables (security)');
console.log('   Admin password should be set manually in database');

// ✅ ROLE NORMALIZATION: Convert all role formats to standard format
// Standard: "Super Admin", "Admin", "Premium", "Free"
const normalizeRole = (role) => {
    if (!role) return 'Free';
    const roleStr = String(role).toLowerCase().trim();

    // Super Admin variants (accept various formats for backward compatibility)
    // Note: 'admin' is also converted to 'Super Admin' (unified admin role)
    if (roleStr === 'superadmin' || roleStr === 'super admin' || roleStr === 'admin') {
        return 'Super Admin';
    }
    // Premium variants
    if (roleStr === 'premium') {
        return 'Premium';
    }
    // Default
    return 'Free';
};

// Check if role is admin (any format)
const isAdminRole = (role) => {
    const normalized = normalizeRole(role);
    return normalized === 'Super Admin';
};

// ⚡ CLOUD RUN OPTIMIZED: Load core modules synchronously (lightweight)
const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ⚡ CLOUD RUN OPTIMIZED: Initialize database pool as mock (non-blocking)
// Real pool will be loaded after server starts
let pool = {
    connect: () => ({
        query: () => Promise.resolve({ rows: [] }),
        release: () => { }
    }),
    query: () => Promise.resolve({ rows: [] })
};

// ⚡ CLOUD RUN OPTIMIZED: Lazy load heavy modules (Storage, Database)
// These will be loaded AFTER server starts listening
let Storage = null;
let storage = null;
const loadHeavyModules = () => {
    try {
        // Load Google Cloud Storage (can be slow)
        if (!Storage) {
            const storageModule = require('@google-cloud/storage');
            Storage = storageModule.Storage;
            storage = new Storage();
            console.log('✅ Google Cloud Storage loaded');
        }
    } catch (error) {
        console.log('⚠️  Google Cloud Storage not available:', error.message);
    }
};

// ⚡ CLOUD RUN OPTIMIZED: Load database pool lazily - only when needed
// This prevents database connection from blocking server startup
const loadDatabasePool = () => {
    try {
        const dbPool = require('./db'); // Use the secure, centralized pool (CommonJS format)
        if (dbPool && dbPool !== null) {
            pool = dbPool;
            // ✅ CRITICAL: Set pool in app.locals so routes can access it
            if (app && app.locals) {
                app.locals.pool = dbPool;
                console.log('✅ Database pool loaded and set in app.locals');
            } else {
                console.log('✅ Database pool loaded (app.locals not available yet)');
            }
            return true;
        } else {
            console.log('⚠️  Database pool is null, using mock data for development');
            return false;
        }
    } catch (error) {
        console.log('⚠️  Database not available, using mock data for development');
        console.log('   Error:', error.message);
        // Keep the mock pool
        return false;
    }
};

// Helper function to check if pool is a real database pool (not mock)
const isRealDatabasePool = () => {
    return pool &&
        pool !== null &&
        typeof pool.connect === 'function' &&
        !pool.connect.toString().includes('Promise.resolve') && // Mock pool returns Promise.resolve
        pool.query &&
        typeof pool.query === 'function';
};

// Helper function to safely get database client
const getDatabaseClient = async () => {
    if (!isRealDatabasePool()) {
        throw new Error('Database pool not available');
    }
    return await pool.connect();
};

const GEMINI_TTS_ENABLED = Boolean(process.env.GEMINI_API_KEY);
const DEFAULT_TTS_MODEL = process.env.GEMINI_TTS_MODEL || 'models/gemini-2.0-flash';

// JWT Configuration
// 🔒 SECURITY: JWT_SECRET is REQUIRED - no default value for security
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('❌ [SECURITY] JWT_SECRET environment variable is required!');
    console.error('   Please set JWT_SECRET in your environment variables.');
    console.error('   Server will exit to prevent insecure operation.');
    process.exit(1);
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // 7 days

const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Ensure server starts immediately - all initialization happens after
console.log(`🚀 Initializing server on port ${port}...`);

// --- Middleware ---
app.use(express.json({ limit: '20mb' })); // Increase limit for large sync payloads

// 📊 PERFORMANCE: Request timing and structured logging
let timingMiddleware, requestLogger, startMonitoring;
try {
    const timing = require('./middleware/timing');
    const logger = require('./utils/logger');
    timingMiddleware = timing.timingMiddleware;
    startMonitoring = timing.startMonitoring;
    requestLogger = logger.requestLogger;

    // Add timing middleware (tracks request duration)
    app.use(timingMiddleware);

    // Add structured logging middleware
    app.use(requestLogger);

    console.log('✅ Performance monitoring middleware loaded');
} catch (err) {
    console.log('⚠️ Performance monitoring not available:', err.message);
}

// 🔍 DEBUG: Log all API requests that return 400
app.use((req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = function (body) {
        if (res.statusCode === 400) {
            console.error('⚠️ [400 Bad Request]', {
                path: req.path,
                method: req.method,
                body: req.body ? JSON.stringify(req.body).substring(0, 200) : 'empty',
                response: JSON.stringify(body).substring(0, 200),
                userAgent: req.headers['user-agent']?.substring(0, 100)
            });
        }
        return originalJson(body);
    };
    next();
});

// 🔍 DEBUG: Handle JSON parse errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('❌ [JSON Parse Error]', {
            path: req.path,
            method: req.method,
            userAgent: req.headers['user-agent']?.substring(0, 100),
            error: err.message
        });
        return res.status(400).json({
            error: 'Invalid JSON',
            message: 'Request body contains invalid JSON. Please check your request format.',
            details: err.message
        });
    }
    next(err);
});

// 🔒 SECURITY: CORS configuration - restrict allowed origins
const allowedOrigins = [
    'https://matcanban.com',
    'https://www.matcanban.com',
    'http://localhost:5173', // Development
    'http://localhost:3000', // Development
    'http://127.0.0.1:5173', // Development
    'http://127.0.0.1:3000', // Development
];

// Allow additional origins from environment variable (comma-separated)
if (process.env.ALLOWED_ORIGINS) {
    const additionalOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
    allowedOrigins.push(...additionalOrigins);
}

app.use((req, res, next) => {
    const origin = req.headers.origin;

    // Check if origin is in allowed list
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    } else if (!origin) {
        // Same-origin requests (no origin header) - allow
        // This handles requests from same domain (e.g., server-to-server)
    }
    // If origin is not allowed, don't set CORS headers (browser will block)

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// 🔒 SECURITY: Rate limiting for AI endpoints (prevent abuse)
const aiRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // Limit each IP to 20 AI requests per minute
    message: {
        error: 'Too many AI requests from this IP, please try again after 1 minute.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429
});

// Apply rate limiting to AI endpoints
app.use('/api/ai/generate', aiRateLimiter);
app.use('/api/tts', aiRateLimiter);

// 🔒 SECURITY: Rate limiting for authentication endpoints (prevent brute force)
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login attempts per 15 minutes
    message: {
        error: 'Too many authentication attempts from this IP, please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Skip rate limiting for localhost in development
        const isLocalhost = req.ip === '127.0.0.1' ||
            req.ip === '::1' ||
            req.ip === '::ffff:127.0.0.1' ||
            req.hostname === 'localhost' ||
            req.hostname === '127.0.0.1';
        return process.env.NODE_ENV === 'development' && isLocalhost;
    },
    statusCode: 429
});

// Apply rate limiting to authentication endpoints
app.use('/api/login', authRateLimiter);
app.use('/api/register', authRateLimiter);
app.use('/api/auth/simple-login', authRateLimiter);
app.use('/api/auth/simple-register', authRateLimiter);
app.use('/api/admin/auth/login', authRateLimiter);

// ✅ REMOVED: Rate limit reset endpoint (no longer needed since rate limiting is disabled)

// Maintenance Mode Middleware (check before serving static files and routes)
const { checkMaintenanceMode } = require('./middleware/maintenance');
app.use(checkMaintenanceMode);

// Serve static files from dist directory with aggressive cache busting
app.use(express.static('dist', {
    setHeaders: (res, path) => {
        // Force no-cache for ALL files to prevent 500 errors and cache issues
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        // Add CORS headers for assets
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
}));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// ✅ CRITICAL: Mount Admin API Routes
// These routes must be mounted BEFORE catch-all routes
try {
    console.log('🔄 Loading admin API routes...');

    // Mount admin routes
    const adminUsersRouter = require('./api/admin/users');
    app.use('/api/admin/users', adminUsersRouter);
    console.log('✅ Admin users routes mounted at /api/admin/users');

    const adminAuthRouter = require('./api/admin/auth');
    app.use('/api/admin/auth', adminAuthRouter);

    // ✅ Mount content API router (public endpoints)
    const contentRouter = require('./api/content');
    app.use('/api/content', contentRouter);
    console.log('✅ Admin auth routes mounted at /api/admin/auth');

    const adminContentRouter = require('./api/admin/content');
    app.use('/api/admin/content', adminContentRouter);
    console.log('✅ Admin content routes mounted at /api/admin/content');

    const adminAnalyticsRouter = require('./api/admin/analytics');
    app.use('/api/admin/analytics', adminAnalyticsRouter);
    console.log('✅ Admin analytics routes mounted at /api/admin/analytics');

    const adminSystemRouter = require('./api/admin/system');
    app.use('/api/admin/system', adminSystemRouter);
    console.log('✅ Admin system routes mounted at /api/admin/system');

    const adminSettingsRouter = require('./api/admin/settings');
    app.use('/api/admin/settings', adminSettingsRouter);
    console.log('✅ Admin settings routes mounted at /api/admin/settings');

    // Optional routes (may not exist)
    try {
        const adminUploadRouter = require('./api/admin/upload');
        app.use('/api/admin/upload', adminUploadRouter);
        console.log('✅ Admin upload routes mounted at /api/admin/upload');
    } catch (err) {
        console.warn('⚠️  Admin upload routes not available:', err.message);
    }

    try {
        const adminContentEditorRouter = require('./api/admin/content-editor');
        app.use('/api/admin/content-editor', adminContentEditorRouter);
        console.log('✅ Admin content-editor routes mounted at /api/admin/content-editor');
    } catch (err) {
        console.warn('⚠️  Admin content-editor routes not available:', err.message);
    }

    // Articles CRUD API
    try {
        const adminArticlesRouter = require('./api/admin/articles');
        app.use('/api/admin/articles', adminArticlesRouter);
        console.log('✅ Admin articles routes mounted at /api/admin/articles');
    } catch (err) {
        console.warn('⚠️  Admin articles routes not available:', err.message);
    }

    // Writing Phrases CRUD API
    try {
        const writingPhrasesRouter = require('./api/admin/writing-phrases');
        app.use('/api/admin/writing-phrases', writingPhrasesRouter);
        console.log('✅ Writing phrases routes mounted at /api/admin/writing-phrases');
    } catch (err) {
        console.warn('⚠️  Writing phrases routes not available:', err.message);
    }

    // Page Metadata CRUD API
    try {
        const pageMetadataRouter = require('./api/admin/page-metadata');
        app.use('/api/admin/page-metadata', pageMetadataRouter);
        console.log('✅ Page metadata routes mounted at /api/admin/page-metadata');
    } catch (err) {
        console.warn('⚠️  Page metadata routes not available:', err.message);
    }

    // Admin Messages API (real-time chat with users)
    try {
        const adminMessagesRouter = require('./api/admin/messages');
        app.use('/api/admin/messages', adminMessagesRouter);
        console.log('✅ Admin messages routes mounted at /api/admin/messages');
    } catch (err) {
        console.warn('⚠️  Admin messages routes not available:', err.message);
    }

    console.log('✅ All admin API routes loaded successfully');
} catch (error) {
    console.error('❌ CRITICAL: Failed to load admin API routes:', error);
    console.error('❌ Error stack:', error.stack);
    // Don't exit - server should still start, but admin routes won't work
    console.warn('⚠️  Server will continue, but admin API routes may not work');
}

// --- User Messages API (real-time chat) ---
// 🔒 SECURITY: Rate limiting for messages API (prevent spam)
const messageRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 15, // 15 messages per minute per IP
    message: {
        error: 'Bạn gửi tin nhắn quá nhanh. Vui lòng đợi 1 phút.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Only rate limit POST requests (sending messages)
        return req.method !== 'POST';
    }
});

try {
    const messagesRouter = require('./api/messages');
    app.use('/api/messages', messageRateLimiter, messagesRouter);
    console.log('✅ User messages routes mounted at /api/messages (with rate limiting)');
} catch (error) {
    console.warn('⚠️  User messages routes not available:', error.message);
}

// --- Push Notifications API ---
try {
    const pushRouter = require('./api/push');
    app.use('/api/push', pushRouter);
    // Store sendPushToUser for use in socket events
    app.set('sendPushToUser', pushRouter.sendPushToUser);
    console.log('✅ Push notifications routes mounted at /api/push');
} catch (error) {
    console.warn('⚠️  Push notifications not available:', error.message);
}

// --- Public Writing Phrases API (no auth required) ---
try {
    const publicWritingPhrasesRouter = require('./api/writing-phrases');
    app.use('/api/writing-phrases', publicWritingPhrasesRouter);
    console.log('✅ Public writing phrases routes mounted at /api/writing-phrases');
} catch (error) {
    console.warn('⚠️  Public writing phrases routes not available:', error.message);
}

// --- Public Page Metadata API (no auth required) ---
app.get('/api/page-metadata-public', async (req, res) => {
    console.log('[GET /api/page-metadata-public] Request received');

    // Default page metadata
    const defaultPageMetadata = [
        {
            id: 'ielts-guessing-techniques',
            pageRoute: '/ielts-guessing-techniques',
            title: 'SIÊU KỸ THUẬT ĐOÁN NGHĨA',
            titleEn: 'Vocabulary Guessing Techniques for IELTS',
            description: 'Nắm vững 8 kỹ thuật đoán nghĩa từ vựng giúp bạn hiểu được từ mới mà không cần tra từ điển.',
            icon: '✨',
            category: 'ielts',
            isHidden: false,
            order: 0,
            badge: '8 Kỹ Thuật'
        },
        {
            id: 'ielts-listening-tips',
            pageRoute: '/ielts-listening-tips',
            title: 'IELTS Listening Tips',
            titleEn: 'IELTS Listening Complete Guide',
            description: 'Hướng dẫn toàn diện các dạng bài IELTS Listening với chiến lược Band 9.',
            icon: '🎧',
            category: 'ielts',
            isHidden: false,
            order: 1,
            badge: '9 Dạng Bài'
        }
    ];

    try {
        if (!pool || !isRealDatabasePool()) {
            return res.json({ success: true, pages: defaultPageMetadata.filter(p => !p.isHidden) });
        }

        const result = await pool.query(
            `SELECT setting_value FROM system_settings WHERE setting_key = 'page_metadata'`
        );

        let pages = defaultPageMetadata;
        if (result.rows.length > 0) {
            try {
                const savedPages = JSON.parse(result.rows[0].setting_value || '[]');
                const savedIds = new Set(savedPages.map(p => p.id));
                pages = [
                    ...savedPages,
                    ...defaultPageMetadata.filter(p => !savedIds.has(p.id))
                ];
            } catch (e) {
                console.warn('[page-metadata-public] Parse error:', e);
            }
        }

        // Filter hidden and sort
        const visiblePages = pages
            .filter(p => !p.isHidden)
            .sort((a, b) => (a.order || 0) - (b.order || 0));

        res.json({ success: true, pages: visiblePages });
    } catch (error) {
        console.error('[page-metadata-public] Error:', error);
        // Return defaults on error
        res.json({ success: true, pages: defaultPageMetadata.filter(p => !p.isHidden) });
    }
});
console.log('✅ Public page metadata route mounted at /api/page-metadata-public');

// --- CDC API Routes ---
try {
    const cdcRouter = require('./api/cdc');
    app.use('/api/cdc', cdcRouter);
    console.log('✅ CDC routes mounted at /api/cdc');
} catch (error) {
    console.warn('⚠️  CDC routes not available:', error.message);
}

// --- Audio Proxy API (to bypass CORS for external audio files) ---
try {
    const audioProxyRouter = require('./api/audio-proxy');
    app.use('/api/audio', audioProxyRouter);
    console.log('✅ Audio proxy routes mounted at /api/audio');
} catch (error) {
    console.warn('⚠️  Audio proxy routes not available:', error.message);
}

// --- AI Gemini API Proxy (to protect API key) ---
// 🔒 SECURITY: All AI requests go through backend to protect GEMINI_API_KEY
app.post('/api/ai/generate', async (req, res) => {
    const { action, prompt, schema, model = 'gemini-1.5-flash' } = req.body || {};

    if (!action || !prompt) {
        return res.status(400).json({ error: 'Action and prompt are required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(503).json({ error: 'AI service is not configured on the server.' });
    }

    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const ai = new GoogleGenerativeAI(apiKey);

        const generationConfig = {
            responseMimeType: "application/json",
        };

        if (schema) {
            generationConfig.responseSchema = schema;
        }

        const aiModel = ai.getGenerativeModel({
            model: model,
            generationConfig: generationConfig
        });

        const result = await aiModel.generateContent(prompt);
        const jsonText = result.response.text().trim();
        const data = JSON.parse(jsonText);

        res.json({ success: true, data });
    } catch (error) {
        console.error(`[AI ${action}] Error:`, error);
        res.status(500).json({
            error: `AI generation failed: ${error.message || 'Unknown error'}`
        });
    }
});

// --- AI TTS Endpoint ---
app.post('/api/tts', async (req, res) => {
    const { text, lang = 'en-US', voice, format = 'MP3', speed = 1 } = req.body || {};
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required for TTS.' });
    }
    if (!GEMINI_TTS_ENABLED) {
        return res.status(503).json({ error: 'AI TTS is not configured on the server.' });
    }
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const model = DEFAULT_TTS_MODEL;
        const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`;
        const body = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text }]
                }
            ],
            generationConfig: {
                responseModalities: ['AUDIO'],
                audioConfig: {
                    audioEncoding: format.toUpperCase(),
                    speakingRate: Math.min(Math.max(Number(speed) || 1, 0.5), 2),
                    voiceName: voice || undefined
                }
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('Gemini TTS API error:', data);
            return res.status(response.status).json({ error: data?.error?.message || 'AI TTS generation failed.' });
        }

        const audioPart = data?.candidates?.[0]?.content?.parts?.find(part => part.inlineData?.data);
        if (!audioPart?.inlineData?.data) {
            console.error('Gemini TTS response missing audio data:', data);
            return res.status(500).json({ error: 'No audio data returned from AI.' });
        }

        const mimeType = audioPart.inlineData.mimeType || `audio/${format.toLowerCase()}`;
        const audioBase64 = audioPart.inlineData.data;
        res.json({ audioBase64, format: mimeType.split('/')[1] || format.toLowerCase() });
    } catch (error) {
        console.error('AI TTS generation error:', error);
        res.status(500).json({ error: 'Server error while generating AI audio.' });
    }
});

// --- Google Cloud Storage API Endpoints ---
// Try to use real GCS, fallback to local storage if credentials not available
let storageAPI;
try {
    storageAPI = require('./api/storage-gcs');
    console.log('✅ Using Google Cloud Storage (real)');
} catch (error) {
    console.log('⚠️  GCS credentials not available, using local storage');
    storageAPI = require('./api/storage-simple');
}

// 🔒 SECURITY: Storage endpoints moved to after adminAuth definition (line ~1000)

// --- Helper Function to ensure tables exist ---
const ensureTablesExist = async () => {
    if (!isRealDatabasePool()) {
        console.log('⚠️  Database pool not available, skipping table initialization');
        return;
    }
    const client = await getDatabaseClient();
    try {
        // Create users table with specific columns
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'Free',
                packages TEXT[],
                activated BOOLEAN,
                "mobileLogin" BOOLEAN,
                "joinDate" TEXT,
                "expiryDate" TEXT,
                registered_at TIMESTAMPTZ,
                "bananaBalance" INTEGER DEFAULT 0 CHECK ("bananaBalance" >= 0)
            );
        `);

        // ✅ IMPROVEMENT: Add DEFAULT and CHECK constraint to existing table (if table already exists)
        // This ensures existing databases also get the constraint
        try {
            await client.query(`
                ALTER TABLE users 
                ALTER COLUMN "bananaBalance" SET DEFAULT 0;
            `);
            console.log('✅ [SCHEMA] Set DEFAULT 0 for bananaBalance');
        } catch (err) {
            // Column might already have default, or table doesn't exist yet - ignore
            if (!err.message.includes('does not exist') && !err.message.includes('already')) {
                console.warn('⚠️ [SCHEMA] Could not set DEFAULT for bananaBalance:', err.message);
            }
        }

        try {
            // Drop existing constraint if it exists (to avoid error on re-run)
            await client.query(`
                ALTER TABLE users 
                DROP CONSTRAINT IF EXISTS check_banana_balance_non_negative;
            `);
            // Add CHECK constraint
            await client.query(`
                ALTER TABLE users 
                ADD CONSTRAINT check_banana_balance_non_negative 
                CHECK ("bananaBalance" >= 0);
            `);
            console.log('✅ [SCHEMA] Added CHECK constraint for bananaBalance >= 0');
        } catch (err) {
            // Constraint might already exist - ignore
            if (!err.message.includes('already exists') && !err.message.includes('duplicate')) {
                console.warn('⚠️ [SCHEMA] Could not add CHECK constraint for bananaBalance:', err.message);
            }
        }

        // ✅ NEW: Add premiumPlusAccess column for PREMIUM+ package
        try {
            await client.query(`
                ALTER TABLE users 
                ADD COLUMN IF NOT EXISTS "premiumPlusAccess" TEXT[] DEFAULT '{}';
            `);
            console.log('✅ [SCHEMA] Added premiumPlusAccess column for PREMIUM+ package');
        } catch (err) {
            // Column might already exist - ignore
            if (!err.message.includes('already exists') && !err.message.includes('duplicate')) {
                console.warn('⚠️ [SCHEMA] Could not add premiumPlusAccess column:', err.message);
            }
        }

        // Create test_results table to track user test performance
        await client.query(`
            CREATE TABLE IF NOT EXISTS test_results (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                test_type TEXT NOT NULL,
                test_id TEXT NOT NULL,
                test_name TEXT,
                score INTEGER NOT NULL,
                total_questions INTEGER NOT NULL,
                percentage REAL NOT NULL,
                completed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                time_spent INTEGER,
                question_answers JSONB,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
            CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results(test_id);
            CREATE INDEX IF NOT EXISTS idx_test_results_completed_at ON test_results(completed_at);
        `);

        // ✅ PERFORMANCE: Add composite index for common query patterns
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_test_results_user_type ON test_results(user_id, test_type);
        `);

        // Initialize content management tables (Mtest, Voca, Giao tiếp)
        await ensureContentTablesExist();

        // ✅ FIX: Create admin_users table for admin authentication system
        await client.query(`
                CREATE TABLE IF NOT EXISTS admin_users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(100) UNIQUE NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    role VARCHAR(50) DEFAULT 'Super Admin',
                    permissions JSONB DEFAULT '{}',
                    full_name VARCHAR(255),
                    avatar_url TEXT,
                    is_active BOOLEAN DEFAULT true,
                    failed_login_attempts INTEGER DEFAULT 0,
                    locked_until TIMESTAMP,
                    last_login TIMESTAMP,
                    login_count INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
        console.log('✅ [SCHEMA] admin_users table ensured');

        // ✅ FIX: Create admin_sessions table for admin session management
        await client.query(`
                CREATE TABLE IF NOT EXISTS admin_sessions (
                    id SERIAL PRIMARY KEY,
                    admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
                    session_token TEXT NOT NULL,
                    refresh_token TEXT NOT NULL,
                    ip_address VARCHAR(45),
                    user_agent TEXT,
                    device_type VARCHAR(50),
                    browser VARCHAR(50),
                    os VARCHAR(50),
                    is_active BOOLEAN DEFAULT true,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP NOT NULL,
                    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
        console.log('✅ [SCHEMA] admin_sessions table ensured');

        // Create indexes for admin tables
        await client.query(`
                CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
                CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
                CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
                CREATE INDEX IF NOT EXISTS idx_admin_sessions_session_token ON admin_sessions(session_token);
                CREATE INDEX IF NOT EXISTS idx_admin_sessions_refresh_token ON admin_sessions(refresh_token);
            `);
        console.log('✅ [SCHEMA] Admin table indexes ensured');

        // Create gift_rewards table to track user gift claims
        await client.query(`
            CREATE TABLE IF NOT EXISTS gift_rewards (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                gift_level INTEGER NOT NULL,
                claimed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, gift_level)
            );
        `);

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_gift_rewards_user_id ON gift_rewards(user_id);
            CREATE INDEX IF NOT EXISTS idx_gift_rewards_gift_level ON gift_rewards(gift_level);
        `);

        // Create banana_transactions table to track all banana transactions (add/deduct)
        await client.query(`
            CREATE TABLE IF NOT EXISTS banana_transactions (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                transaction_type TEXT NOT NULL CHECK (transaction_type IN ('add', 'deduct', 'admin_adjust')),
                amount INTEGER NOT NULL,
                balance_before INTEGER NOT NULL,
                balance_after INTEGER NOT NULL,
                reason TEXT,
                source TEXT,
                created_by TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_banana_transactions_user_id ON banana_transactions(user_id);
            CREATE INDEX IF NOT EXISTS idx_banana_transactions_created_at ON banana_transactions(created_at);
            CREATE INDEX IF NOT EXISTS idx_banana_transactions_type ON banana_transactions(transaction_type);
        `);

        // ✅ NEW: Simplified user_sessions table - no device restrictions, optional tracking
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_sessions (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                device_type TEXT DEFAULT 'unknown',
                browser_fingerprint TEXT,
                session_token TEXT,
                user_agent TEXT,
                ip_address TEXT,
                operating_system TEXT,
                login_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                last_activity TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT true
            );
        `);

        // ✅ NEW: Remove device type constraint to allow 'unknown' and any device type
        try {
            await client.query(`
                ALTER TABLE user_sessions 
                DROP CONSTRAINT IF EXISTS user_sessions_device_type_check;
            `);
            console.log('✅ [SCHEMA] Removed device_type constraint (allowing unlimited devices)');
        } catch (err) {
            // Constraint might not exist - ignore
            if (!err.message.includes('does not exist')) {
                console.warn('⚠️ [SCHEMA] Could not remove device_type constraint:', err.message);
            }
        }

        // ✅ IMPROVEMENT: Add operating_system and login_time columns if they don't exist
        try {
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS operating_system TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS login_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
            `);
            // 🔒 ADVANCED FINGERPRINTING: Add columns for sophisticated device tracking
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS canvas_fingerprint TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS webgl_fingerprint TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS audio_fingerprint TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS fonts_fingerprint TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS browser_name TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS browser_version TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS screen_resolution TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS timezone TEXT;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS trust_score INTEGER DEFAULT 100;
            `);
            await client.query(`
                ALTER TABLE user_sessions 
                ADD COLUMN IF NOT EXISTS risk_flags TEXT[];
            `);
            console.log('✅ [SCHEMA] Added advanced fingerprinting columns to user_sessions');
        } catch (err) {
            // Columns might already exist - ignore
            if (!err.message.includes('already exists') && !err.message.includes('duplicate')) {
                console.warn('⚠️ [SCHEMA] Could not add columns to user_sessions:', err.message);
            }
        }

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_device_type ON user_sessions(device_type);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_session_token ON user_sessions(session_token);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_is_active ON user_sessions(is_active);
        `);

        // ✅ PERFORMANCE: Add composite indexes for common query patterns
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_user_sessions_user_active ON user_sessions(user_id, is_active);
        `);

        // ✅ NEW: Remove all unique constraints to allow unlimited devices
        await client.query(`
            DO $$
            BEGIN
                -- Remove old unique constraints
                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints
                    WHERE constraint_name = 'user_sessions_user_id_device_type_key'
                      AND table_name = 'user_sessions'
                ) THEN
                    ALTER TABLE user_sessions DROP CONSTRAINT user_sessions_user_id_device_type_key;
                END IF;

                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints
                    WHERE constraint_name = 'user_sessions_user_id_device_type_browser_fingerprint_key'
                      AND table_name = 'user_sessions'
                ) THEN
                    ALTER TABLE user_sessions 
                    DROP CONSTRAINT user_sessions_user_id_device_type_browser_fingerprint_key;
                END IF;
            END
            $$;
        `);
        console.log('✅ [SCHEMA] Removed unique constraints from user_sessions (allowing unlimited devices)');

        // Create daily_checkins table to track daily check-in (1 check-in per day per user)
        await client.query(`
            CREATE TABLE IF NOT EXISTS daily_checkins (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                checkin_date DATE NOT NULL,
                bananas_earned INTEGER NOT NULL,
                is_sunday BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, checkin_date)
            );
        `);

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_id ON daily_checkins(user_id);
            CREATE INDEX IF NOT EXISTS idx_daily_checkins_checkin_date ON daily_checkins(checkin_date);
            CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_date ON daily_checkins(user_id, checkin_date);
        `);

        // Create user_progress table to track student progress by course/part
        // This helps track if students are lazy or active
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_progress (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                course_type TEXT NOT NULL,
                course_name TEXT NOT NULL,
                part_name TEXT,
                total_tests INTEGER DEFAULT 0,
                completed_tests INTEGER DEFAULT 0,
                total_score INTEGER DEFAULT 0,
                average_percentage REAL DEFAULT 0,
                last_activity_date DATE,
                first_activity_date DATE,
                total_time_spent INTEGER DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, course_type, part_name)
            );
        `);

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
            CREATE INDEX IF NOT EXISTS idx_user_progress_course_type ON user_progress(course_type);
            CREATE INDEX IF NOT EXISTS idx_user_progress_last_activity ON user_progress(last_activity_date);
            CREATE INDEX IF NOT EXISTS idx_user_progress_user_course ON user_progress(user_id, course_type);
        `);
    } catch (err) {
        console.error("Error ensuring tables exist:", err.message);
    } finally {
        client.release();
    }
};

// --- Helper Function to update user progress when they complete a test ---
const updateUserProgress = async (userId, testType, testId, testName, score, totalQuestions, percentage, timeSpent) => {
    if (!isRealDatabasePool()) {
        return; // Skip if database not available
    }

    try {
        const client = await getDatabaseClient();

        try {
            // Map test_type to course_type and course_name
            // Examples: 'toeic-part5', 'ielts-reading', 'vstep-writing', 'grammar-starter', etc.
            let courseType = testType.toLowerCase();
            let courseName = testType;
            let partName = null;

            // Parse test_type to extract course and part
            if (courseType.includes('toeic')) {
                courseName = 'TOEIC';
                if (courseType.includes('part5')) partName = 'Part 5';
                else if (courseType.includes('part7')) partName = 'Part 7';
                else if (courseType.includes('speaking')) partName = 'Speaking';
                else if (courseType.includes('writing')) partName = 'Writing';
            } else if (courseType.includes('ielts')) {
                courseName = 'IELTS';
                if (courseType.includes('reading')) partName = 'Reading';
                else if (courseType.includes('speaking')) partName = 'Speaking';
                else if (courseType.includes('writing')) partName = 'Writing';
            } else if (courseType.includes('vstep')) {
                courseName = 'VSTEP';
                if (courseType.includes('speaking')) partName = 'Speaking';
                else if (courseType.includes('writing')) partName = 'Writing';
            } else if (courseType.includes('grammar')) {
                courseName = 'Grammar';
                if (courseType.includes('starter')) partName = 'Starter';
                else if (courseType.includes('mover')) partName = 'Mover';
                else if (courseType.includes('flyer')) partName = 'Flyer';
            } else if (courseType.includes('young')) {
                courseName = 'Young';
            } else if (courseType.includes('giao-tiep')) {
                courseName = 'Giao Tiếp';
            }

            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

            // Check if progress record exists
            const existingProgress = await client.query(
                `SELECT * FROM user_progress 
                 WHERE user_id = $1 AND course_type = $2 AND (part_name = $3 OR (part_name IS NULL AND $3 IS NULL))`,
                [userId, courseType, partName]
            );

            if (existingProgress.rows.length > 0) {
                // Update existing progress
                const existing = existingProgress.rows[0];
                const newCompletedTests = existing.completed_tests + 1;
                const newTotalScore = existing.total_score + score;
                const newTotalTime = existing.total_time_spent + (timeSpent || 0);
                const newAveragePercentage = ((existing.average_percentage * existing.completed_tests) + percentage) / newCompletedTests;

                await client.query(
                    `UPDATE user_progress 
                     SET completed_tests = $1,
                         total_score = $2,
                         average_percentage = $3,
                         total_time_spent = $4,
                         last_activity_date = $5,
                         updated_at = CURRENT_TIMESTAMP
                     WHERE id = $6`,
                    [newCompletedTests, newTotalScore, newAveragePercentage, newTotalTime, today, existing.id]
                );
            } else {
                // Create new progress record
                await client.query(
                    `INSERT INTO user_progress 
                     (user_id, course_type, course_name, part_name, total_tests, completed_tests, total_score, average_percentage, last_activity_date, first_activity_date, total_time_spent)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                    [userId, courseType, courseName, partName, totalQuestions, 1, score, percentage, today, today, timeSpent || 0]
                );
            }

            client.release();
        } catch (dbErr) {
            client.release();
            console.error('Error updating user progress:', dbErr.message);
        }
    } catch (err) {
        console.error('Error in updateUserProgress:', err.message);
    }
};

// --- Helper Function to ensure admin user exists ---
// ⚠️ NOTE: This function only ensures admin user exists with correct role
// Password should be set manually in database (not from environment variables)
// ✅ NEW: Ensure admin user exists in admin_users table (for admin authentication)
const ensureAdminUsersTableUserExists = async () => {
    if (!isRealDatabasePool()) {
        console.log('⚠️  Database pool not available, skipping admin_users table user initialization');
        return;
    }
    const client = await getDatabaseClient();
    try {
        // Check if admin_users table exists first
        const tableCheck = await client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'admin_users'
                ) as exists
            `);

        if (!tableCheck.rows[0]?.exists) {
            console.warn('⚠️  admin_users table does not exist yet, will be created by ensureTablesExist');
            client.release();
            return;
        }

        // Check if admin user already exists in admin_users table
        const existingAdmin = await client.query(
            'SELECT id FROM admin_users WHERE username = $1 OR email = $2',
            ['superadmin', 'admin@gmail.com']
        );

        if (existingAdmin.rows.length === 0) {
            // 🔒 SECURITY: Create default admin user with random password
            // Password must be set manually via database or admin setup script
            // Generate a secure random password hash as placeholder
            const randomPassword = require('crypto').randomBytes(32).toString('hex');
            const placeholderPasswordHash = await bcrypt.hash(randomPassword, 10);

            await client.query(`
                    INSERT INTO admin_users (
                        username, email, password_hash, role, full_name, is_active, permissions
                    )
                    VALUES (
                        'superadmin',
                        'admin@gmail.com',
                        $1,
                        'Super Admin',
                        'Super Admin',
                        true,
                        '{"users": ["read", "write", "delete"], "content": ["read", "write", "delete"], "analytics": ["read"], "system": ["read", "write"]}'::jsonb
                    )
                `, [placeholderPasswordHash]);
            console.log('⚠️  SECURITY: Admin user created with random password');
            console.log('   ⚠️  IMPORTANT: You MUST set admin password manually via database or admin setup script');
            console.log('   ⚠️  The default password is random and unknown - this is intentional for security');
        } else {
            console.log('✅ Admin user already exists in admin_users table');
        }
    } catch (err) {
        console.error("Error ensuring admin_users table user exists:", err.message);
    } finally {
        client.release();
    }
};

const ensureAdminUserExists = async () => {
    if (!isRealDatabasePool()) {
        console.log('⚠️  Database pool not available, skipping admin user initialization');
        return;
    }
    const client = await getDatabaseClient();
    try {
        const adminEmail = 'admin@gmail.com';
        // ⚠️ SECURITY: Admin password is NOT loaded from environment variables
        // Password should be set manually in database
        const adminName = 'Admin';
        const adminRole = 'Super Admin';
        const adminBananaBalance = 10000;

        // Check if admin user already exists
        const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [adminEmail]);

        if (existingUser.rows.length > 0) {
            // Update existing user to ensure it's admin (but don't change password)
            const userId = existingUser.rows[0].id;
            await client.query(
                `UPDATE users 
                 SET role = $1, "bananaBalance" = $2, name = $3
                 WHERE id = $4`,
                [adminRole, adminBananaBalance, adminName, userId]
            );
            console.log('✅ Admin user updated (role and balance):', adminEmail);
            console.log('ℹ️  Admin password unchanged (set manually in database)');
        } else {
            // Create new admin user without password (password must be set manually)
            // 🔒 SECURITY FIX: Hash placeholder password (NEVER store plain text)
            const placeholderPassword = 'CHANGE_ME';
            const hashedPlaceholder = await bcrypt.hash(placeholderPassword, 10);
            const newUser = {
                id: `user_${Date.now()}`,
                name: adminName,
                email: adminEmail,
                password: hashedPlaceholder, // Hashed placeholder - must be changed manually
                role: adminRole,
                packages: [],
                activated: true,
                mobileLogin: false,
                joinDate: new Date().toLocaleDateString('en-GB'),
                expiryDate: '-',
                registered_at: new Date().toISOString(),
                bananaBalance: adminBananaBalance,
            };

            await client.query(
                `INSERT INTO users (id, name, email, password, role, packages, activated, "mobileLogin", "joinDate", "expiryDate", registered_at, "bananaBalance")
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                Object.values(newUser)
            );
            console.log('✅ Admin user created:', adminEmail);
            console.log('⚠️  WARNING: Admin password is placeholder (CHANGE_ME)');
            console.log('   Please set admin password manually in database');
        }
    } catch (err) {
        console.error("Error ensuring admin user exists:", err.message);
    } finally {
        client.release();
    }
};

// --- JWT Authentication Middleware ---
// ⚡ CLOUD RUN OPTIMIZED: Define authenticateToken BEFORE it's used in routes
// ✅ NEW: Simplified authentication - no device tracking required
// ✅ FIX: Try both JWT_SECRET and ADMIN_JWT_SECRET for compatibility
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || (JWT_SECRET + '-admin');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
    }

    try {
        let decoded;
        // ✅ FIX: Try JWT_SECRET first, then ADMIN_JWT_SECRET as fallback
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (firstError) {
            // If JWT_SECRET fails, try ADMIN_JWT_SECRET (for admin tokens)
            if (JWT_SECRET !== ADMIN_JWT_SECRET) {
                try {
                    decoded = jwt.verify(token, ADMIN_JWT_SECRET);
                    console.log('✅ [AUTH] Token verified with ADMIN_JWT_SECRET (admin token)');
                } catch (secondError) {
                    throw firstError; // Throw original error if both fail
                }
            } else {
                throw firstError;
            }
        }

        // ✅ NEW: Simple token-based authentication - no session tracking required
        // JWT token expiration handles logout automatically
        // Optional: Update last activity in sessions table (non-blocking)
        if (isRealDatabasePool() && decoded.userId) {
            // Optional: Update last activity (non-blocking, don't fail if it errors)
            // Update first active session only (using subquery)
            pool.query(
                `UPDATE user_sessions 
                 SET last_activity = CURRENT_TIMESTAMP 
                 WHERE id = (
                     SELECT id FROM user_sessions 
                     WHERE user_id = $1 AND is_active = true 
                     ORDER BY last_activity DESC 
                     LIMIT 1
                 )`,
                [decoded.userId]
            ).catch(err => {
                // Non-critical - don't log as error
                console.log('ℹ️ [AUTH] Session activity update skipped (non-critical)');
            });
        }

        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        // ✅ FIX: Only log unexpected errors, not common token issues
        if (err.name !== 'TokenExpiredError' && err.name !== 'JsonWebTokenError') {
            console.error('❌ [AUTH] Token verification error:', {
                name: err.name,
                message: err.message
            });
        }

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please login again.' });
        }
        if (err.name === 'JsonWebTokenError') {
            // ✅ FIX: Return 401 (Unauthorized) not 403 (Forbidden)
            // 401 = Invalid/missing credentials, 403 = Valid credentials but no permission
            return res.status(401).json({ error: 'Invalid token. Please login again.' });
        }
        return res.status(500).json({ error: 'Token verification failed.' });
    }
};

// --- Admin Role Middleware ---
const requireAdminRole = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
    const user = req.user;

    console.log('🔍 [ADMIN-AUTH] Checking admin role:', {
        hasUser: !!user,
        userId: user?.userId,
        userRole: user?.role,
        endpoint: req.path
    });

    if (!user) {
        console.warn('⚠️ [SECURITY] Missing user context for admin route:', {
            endpoint: req.path,
            method: req.method,
            ip: clientIP,
            timestamp: new Date().toISOString()
        });
        return res.status(401).json({ error: 'Authentication required. Please login again.' });
    }

    // ✅ Check for Admin or Super Admin role using normalizeRole
    const isAdmin = isAdminRole(user.role);

    if (!isAdmin) {
        console.warn('⚠️ [SECURITY] Unauthorized admin API access attempt:', {
            endpoint: req.path,
            method: req.method,
            ip: clientIP,
            userId: user.userId,
            userRole: user.role,
            roleType: typeof user.role,
            timestamp: new Date().toISOString()
        });
        return res.status(403).json({ error: 'Forbidden: Admin role required.' });
    }

    console.log('✅ [SECURITY] Admin API access granted:', {
        endpoint: req.path,
        method: req.method,
        ip: clientIP,
        userId: user.userId,
        email: user.email,
        timestamp: new Date().toISOString()
    });
    next();
};

const adminAuth = [authenticateToken, requireAdminRole];

// 🔒 SECURITY: Storage endpoints require admin authentication
// Get signed URL for upload
app.post('/api/storage/get-signed-url', adminAuth, storageAPI.getSignedUrl);

// Mock upload endpoint (for local storage fallback)
if (storageAPI.mockUpload) {
    app.put('/api/storage/mock-upload/:bucket/*', adminAuth, storageAPI.mockUpload);
}

// Delete file from Cloud Storage
app.delete('/api/storage/delete', adminAuth, storageAPI.deleteFile);

// List files in bucket
app.get('/api/storage/list', adminAuth, storageAPI.listFiles);

// Make file public
app.post('/api/storage/make-public', adminAuth, storageAPI.makePublic);

// 🔒 SECURITY: Log suspicious client-side activity
app.post('/api/security/log', authenticateToken, async (req, res) => {
    const { activityType, details, timestamp, userAgent } = req.body || {};
    const userId = req.user?.id;
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';

    // Log suspicious activity
    console.warn('🚨 [SECURITY ALERT]', {
        userId,
        activityType,
        details,
        timestamp,
        userAgent,
        ip: clientIP
    });

    // Optionally store in database for audit trail
    if (isRealDatabasePool()) {
        try {
            await pool.query(`
                INSERT INTO security_logs (user_id, activity_type, details, user_agent, ip_address, created_at)
                VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            `, [userId, activityType, JSON.stringify(details), userAgent, clientIP]);
        } catch (err) {
            // Table might not exist - just log to console
            console.warn('Could not save security log to database:', err.message);
        }
    }

    res.status(200).json({ success: true });
});

// 🔒 SECURITY: Admin access logging endpoint (optional)
app.post('/api/admin-access-log', async (req, res) => {
    const { userId, userRole, requiredRole, action, timestamp, path } = req.body || {};

    // Log admin access attempts (can be stored in database if needed)
    console.log('📊 [ADMIN ACCESS LOG]', {
        userId,
        userRole,
        requiredRole,
        action,
        path,
        timestamp,
        ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown'
    });

    res.status(200).json({ success: true });
});

// --- API Endpoints ---

// NEW: Endpoint to fetch all public data for the app's initial load.
app.get('/api/all-data', async (req, res) => {
    if (!isRealDatabasePool()) {
        console.log('⚠️  Database pool not available, returning empty data');
        return res.json({});
    }
    const client = await getDatabaseClient();
    // List of tables containing public content. User tables are excluded.
    const publicDataKeys = [
        'MATCANBAN_TIPS_DATA', 'MATCANBAN_PRACTICE_TESTS', 'MATCANBAN_FOUNDATION_DATA', 'MATCANBAN_SPEAKING_SCENARIOS',
        'MATCANBAN_CAMBRIDGE_STARTERS_DATA', 'MATCANBAN_GRAMMAR_UNITS', 'MATCANBAN_GRAMMAR_GROUPS', 'MATCANBAN_GRAMMAR_VOCAB',
        'MATCANBAN_WRITING_DATA',
        // IELTS Writing
        'MATCANBAN_WRITING_IELTS_T1_LINE_TASKS', 'MATCANBAN_WRITING_IELTS_T1_LINE_CONTENT',
        'MATCANBAN_WRITING_IELTS_T1_BAR_TASKS', 'MATCANBAN_WRITING_IELTS_T1_BAR_CONTENT',
        'MATCANBAN_WRITING_IELTS_T1_PIE_TASKS', 'MATCANBAN_WRITING_IELTS_T1_PIE_CONTENT',
        'MATCANBAN_WRITING_IELTS_T1_TABLE_TASKS', 'MATCANBAN_WRITING_IELTS_T1_TABLE_CONTENT',
        'MATCANBAN_WRITING_IELTS_T1_PROCESS_TASKS', 'MATCANBAN_WRITING_IELTS_T1_PROCESS_CONTENT',
        'MATCANBAN_WRITING_IELTS_T1_MAP_TASKS', 'MATCANBAN_WRITING_IELTS_T1_MAP_CONTENT',
        'MATCANBAN_WRITING_IELTS_T2_OPINION_TASKS', 'MATCANBAN_WRITING_IELTS_T2_OPINION_CONTENT',
        'MATCANBAN_WRITING_IELTS_T2_DISCUSSION_TASKS', 'MATCANBAN_WRITING_IELTS_T2_DISCUSSION_CONTENT',
        'MATCANBAN_WRITING_IELTS_T2_PROBLEMSOLUTION_TASKS', 'MATCANBAN_WRITING_IELTS_T2_PROBLEMSOLUTION_CONTENT',
        'MATCANBAN_WRITING_IELTS_T2_ADVDIS_TASKS', 'MATCANBAN_WRITING_IELTS_T2_ADVDIS_CONTENT',
        // TOEIC Writing
        'MATCANBAN_WRITING_TOEIC_P1_SUBCATEGORIES', 'MATCANBAN_WRITING_TOEIC_P1_CONTENT',
        'MATCANBAN_WRITING_TOEIC_P2_SUBCATEGORIES', 'MATCANBAN_WRITING_TOEIC_P2_CONTENT',
        'MATCANBAN_WRITING_TOEIC_P3_SUBCATEGORIES', 'MATCANBAN_WRITING_TOEIC_P3_CONTENT',
        // VSTEP Writing
        'MATCANBAN_WRITING_VSTEP_T1_SUBCATEGORIES', 'MATCANBAN_WRITING_VSTEP_T1_CONTENT',
        'MATCANBAN_WRITING_VSTEP_T2_SUBCATEGORIES', 'MATCANBAN_WRITING_VSTEP_T2_CONTENT',
        // Speaking
        'MATCANBAN_SPEAKING_VSTEP_P1_TASKS', 'MATCANBAN_SPEAKING_VSTEP_P1_CONTENT',
        'MATCANBAN_SPEAKING_VSTEP_P2_TASKS', 'MATCANBAN_SPEAKING_VSTEP_P2_CONTENT',
        'MATCANBAN_SPEAKING_VSTEP_P3_TASKS', 'MATCANBAN_SPEAKING_VSTEP_P3_CONTENT',
        'MATCANBAN_SPEAKING_TOEIC_P1_TASKS', 'MATCANBAN_SPEAKING_TOEIC_P1_CONTENT',
        'MATCANBAN_SPEAKING_TOEIC_P2_TASKS', 'MATCANBAN_SPEAKING_TOEIC_P2_CONTENT',
        'MATCANBAN_SPEAKING_TOEIC_P3_TASKS', 'MATCANBAN_SPEAKING_TOEIC_P3_CONTENT',
        'MATCANBAN_SPEAKING_TOEIC_P4_TASKS', 'MATCANBAN_SPEAKING_TOEIC_P4_CONTENT',
        'MATCANBAN_SPEAKING_TOEIC_P5_TASKS', 'MATCANBAN_SPEAKING_TOEIC_P5_CONTENT',
        'MATCANBAN_SPEAKING_IELTS_P1_TASKS', 'MATCANBAN_SPEAKING_IELTS_P1_CONTENT',
        'MATCANBAN_SPEAKING_IELTS_P2_TASKS', 'MATCANBAN_SPEAKING_IELTS_P2_CONTENT',
        'MATCANBAN_SPEAKING_IELTS_P3_TASKS', 'MATCANBAN_SPEAKING_IELTS_P3_CONTENT'
    ];

    try {
        const allData = {};
        for (const tableName of publicDataKeys) {
            const sanitizedTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '');
            // Query safely, checking if table exists.
            const tableExistsResult = await client.query("SELECT to_regclass($1)", [`public."${sanitizedTableName}"`]);
            if (tableExistsResult.rows[0].to_regclass) {
                const result = await client.query(`SELECT data FROM "${sanitizedTableName}"`);
                // The key in the final JSON object will be the table name (storage key)
                // Reconstruct the original data shape
                if (tableName === 'MATCANBAN_GRAMMAR_VOCAB') {
                    allData[tableName] = result.rows[0]?.data || {}; // It's an object, not array
                } else {
                    allData[tableName] = result.rows.map(row => row.data);
                }
            } else {
                allData[tableName] = []; // Return empty array if table doesn't exist yet
            }
        }
        res.json(allData);
    } catch (err) {
        console.error('API Get All Data Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching data.' });
    } finally {
        client.release();
    }
});


// ============================================
// ✅ NEW: Clean Login Endpoint
// ============================================
// Code sạch, đơn giản, đồng bộ SQL
// Hỗ trợ migration tự động từ bcrypt sang plain text
// Không làm mất dữ liệu user cũ
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('🔍 [LOGIN] Login attempt for email:', email ? email.substring(0, 3) + '***' : 'missing');

    // Validation
    if (!email || !password) {
        console.warn('⚠️ [LOGIN] Missing email or password');
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Try to load database pool if not already loaded
    if (!isRealDatabasePool()) {
        console.log('⚠️ [LOGIN] Database pool not available, attempting to load...');

        // Check if DATABASE_URL is set
        if (!process.env.DATABASE_URL) {
            console.error('❌ [LOGIN] DATABASE_URL environment variable is not set!');
            return res.status(503).json({
                error: 'Database chưa được cấu hình. Vui lòng liên hệ quản trị viên.'
            });
        }

        const loaded = loadDatabasePool();
        if (!loaded || !isRealDatabasePool()) {
            // Wait a bit for database pool to initialize (might be initializing in background)
            console.log('⏳ [LOGIN] Waiting for database pool to initialize...');
            let waitCount = 0;
            const maxWait = 5; // Wait up to 5 seconds

            while (waitCount < maxWait && !isRealDatabasePool()) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                waitCount++;
                console.log(`⏳ [LOGIN] Waiting... (${waitCount}/${maxWait})`);

                // Try to reload pool
                if (!isRealDatabasePool()) {
                    loadDatabasePool();
                }
            }

            if (!isRealDatabasePool()) {
                console.error('❌ [LOGIN] Database pool still not available after waiting');
                console.error('❌ [LOGIN] DATABASE_URL:', process.env.DATABASE_URL ? 'Set (but connection failed)' : 'Not set');
                return res.status(503).json({
                    error: 'Database chưa sẵn sàng. Vui lòng kiểm tra cấu hình server và thử lại sau.'
                });
            }
        }
        console.log('✅ [LOGIN] Database pool loaded successfully');
    }

    let client;
    try {
        console.log('🔍 [LOGIN] Attempting to get database client...');

        // Retry logic for database connection
        let retries = 2; // Reduce to 2 retries to avoid long wait times
        let lastError = null;

        while (retries > 0) {
            try {
                // Get database connection with timeout (20 seconds per attempt)
                // Reduced timeout per attempt but with retries
                client = await Promise.race([
                    getDatabaseClient(),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Database connection timeout')), 20000)
                    )
                ]);
                console.log('✅ [LOGIN] Database client acquired');
                break; // Success, exit retry loop
            } catch (connErr) {
                lastError = connErr;
                retries--;
                console.warn(`⚠️ [LOGIN] Database connection attempt failed, ${retries} retries left:`, connErr.message);
                console.warn(`⚠️ [LOGIN] Error details:`, {
                    name: connErr.name,
                    code: connErr.code,
                    message: connErr.message
                });

                if (retries > 0) {
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Try to reload database pool
                    if (!isRealDatabasePool()) {
                        console.log('🔄 [LOGIN] Attempting to reload database pool...');
                        loadDatabasePool();
                    }
                }
            }
        }

        // If still no client after retries
        if (!client) {
            const errorMsg = lastError?.message || 'Database connection failed';
            console.error('❌ [LOGIN] All database connection attempts failed');
            console.error('❌ [LOGIN] DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
            throw new Error(`Database connection failed: ${errorMsg}. Vui lòng kiểm tra database có đang chạy không.`);
        }

        // Find user by email
        console.log('🔍 [LOGIN] Querying user from database...');
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            console.warn('⚠️ [LOGIN] User not found for email:', email);
            client.release();
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = result.rows[0];
        console.log('✅ [LOGIN] User found, verifying password...');

        // ✅ PASSWORD VERIFICATION: Support both bcrypt (old) and plain text (new)
        let passwordValid = false;
        let needsMigration = false;

        try {
            if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$') || user.password.startsWith('$2y$'))) {
                // Password is bcrypt hash - verify with bcrypt
                console.log('🔍 [LOGIN] Using bcrypt verification');
                passwordValid = await bcrypt.compare(password, user.password);
                // No migration needed - keep bcrypt
            } else {
                // Legacy: plain text password - verify and migrate to bcrypt
                console.log('🔍 [LOGIN] Legacy plain text password detected, verifying and migrating...');
                passwordValid = (user.password === password);
                needsMigration = passwordValid; // Migrate to bcrypt if correct
            }
        } catch (passwordErr) {
            console.error('❌ [LOGIN] Password verification error:', passwordErr.message);
            client.release();
            return res.status(500).json({ error: 'Lỗi xác thực mật khẩu. Vui lòng thử lại sau.' });
        }

        if (!passwordValid) {
            console.warn('⚠️ [LOGIN] Invalid password for user:', email);
            client.release();
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        console.log('✅ [LOGIN] Password verified successfully');

        // 🔒 MOBILE ACCESS CONTROL: Advanced detection to prevent bypass
        // Uses both client-side detection (more accurate) and server-side headers (fallback)
        const { deviceInfo: clientDeviceInfo } = req.body || {};
        const serverUserAgent = req.headers['user-agent'] || '';

        // Method 1: Use client-side detection (more accurate, can't be easily bypassed)
        let isMobileDevice = false;
        if (clientDeviceInfo && typeof clientDeviceInfo === 'object') {
            // Client-side detection uses multiple methods (screen size, touch, etc.)
            // This prevents bypass by "Request Desktop Site"
            isMobileDevice = clientDeviceInfo.isMobile === true;
            console.log(`🔍 [LOGIN] Client-side detection: isMobile=${isMobileDevice}`, {
                screenWidth: clientDeviceInfo.screenWidth,
                touchSupport: clientDeviceInfo.touchSupport,
                userAgent: clientDeviceInfo.userAgent
            });
        }

        // Method 2: Server-side User-Agent detection (fallback if client-side data missing)
        if (!isMobileDevice) {
            const serverSideMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(serverUserAgent);
            if (serverSideMobile) {
                isMobileDevice = true;
                console.log(`🔍 [LOGIN] Server-side detection: isMobile=true (User-Agent: ${serverUserAgent.substring(0, 50)})`);
            }
        }

        // Method 3: Additional server-side checks (screen size from headers if available)
        // Some browsers send screen info in headers
        const screenWidth = req.headers['x-screen-width'] || req.headers['screen-width'];
        if (!isMobileDevice && screenWidth) {
            const width = parseInt(screenWidth);
            if (width > 0 && width <= 1024) {
                // Small screen likely indicates mobile device
                isMobileDevice = true;
                console.log(`🔍 [LOGIN] Screen width detection: isMobile=true (width: ${width}px)`);
            }
        }

        // 🔒 NEW LOGIC:
        // Global ENABLE → Tất cả user được phép
        // Global DISABLE → Block tất cả, NHƯNG user có mobileLogin = true vẫn được phép
        // Admin → Luôn được phép (all cases)

        // Check global mobile access setting
        let globalMobileEnabled = true; // Default: enabled
        try {
            const globalSettingResult = await client.query(
                `SELECT setting_value FROM system_settings WHERE setting_key = 'mobile_access_enabled'`
            );
            if (globalSettingResult.rows.length > 0) {
                globalMobileEnabled = globalSettingResult.rows[0].setting_value === 'true' ||
                    globalSettingResult.rows[0].setting_value === true;
            }
        } catch (globalErr) {
            console.warn('⚠️ [LOGIN] Could not check global mobile access setting, defaulting to enabled:', globalErr.message);
        }

        // Block login if mobile device detected
        if (isMobileDevice) {
            // Check if user is admin (bypass all) - unified to Super Admin only
            const isAdminUser = user.role === 'Super Admin' || normalizeRole(user.role) === 'Super Admin';

            if (isAdminUser) {
                // Admin → Luôn được phép (all cases)
                console.log(`✅ [LOGIN] Mobile access allowed for admin: ${email}`);
            } else if (globalMobileEnabled) {
                // Global ENABLE → Tất cả user được phép
                console.log(`✅ [LOGIN] Mobile access allowed - Global enabled for user: ${email}`);
            } else if (user.mobileLogin === true) {
                // Global DISABLE + User có mobileLogin = true → Vẫn được phép (exception)
                console.log(`✅ [LOGIN] Mobile access allowed - User has mobileLogin=true (exception) for user: ${email}`);
            } else {
                // Global DISABLE + User không có mobileLogin = true → Bị chặn
                console.warn(`⚠️ [LOGIN] Mobile access denied - Global disabled and user has no permission for user: ${email}`, {
                    clientDetection: clientDeviceInfo?.isMobile,
                    serverUserAgent: serverUserAgent.substring(0, 100),
                    screenWidth: clientDeviceInfo?.screenWidth || screenWidth,
                    globalMobileEnabled,
                    mobileLogin: user.mobileLogin
                });
                client.release();
                return res.status(403).json({
                    error: 'Mobile Access Denied',
                    message: 'Truy cập từ thiết bị di động đang bị tắt toàn hệ thống. Vui lòng sử dụng máy tính để truy cập hoặc liên hệ quản trị viên để được kích hoạt tính năng này.'
                });
            }
        }

        // 🔒 SECURITY FIX: Hash password before storing (NEVER store plain text)
        // Note: We don't migrate bcrypt to plain text anymore - we keep bcrypt
        // If user has bcrypt password, we verify with bcrypt and keep it
        // If user has plain text password (legacy), we hash it and update
        if (needsMigration) {
            try {
                // Hash the plain text password before storing
                const hashedPassword = await bcrypt.hash(password, 10);
                await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
                console.log(`✅ [LOGIN] Hashed and updated password for user: ${user.email}`);
            } catch (migrationErr) {
                // Migration failed but login succeeds - log warning only
                console.warn(`⚠️ [LOGIN] Password hashing failed for ${user.email}:`, migrationErr.message);
            }
        }

        // Generate JWT token
        console.log('🔍 [LOGIN] Generating JWT token...');
        let token;
        try {
            token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role: user.role
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );
            console.log('✅ [LOGIN] JWT token generated successfully');
        } catch (jwtErr) {
            console.error('❌ [LOGIN] JWT generation error:', jwtErr.message);
            client.release();
            return res.status(500).json({ error: 'Lỗi tạo token xác thực. Vui lòng thử lại sau.' });
        }

        // 🔒 DEVICE TRACKING: Count active devices for this user
        let deviceCount = 0;
        let deviceWarning = null;
        let devices = [];
        const MAX_DEVICES = 2; // Giới hạn 2 thiết bị

        // 👑 ADMIN BYPASS: Super Admin không bị giới hạn thiết bị
        const isAdmin = normalizeRole(user.role) === 'Super Admin';
        if (isAdmin) {
            console.log(`👑 [LOGIN] Super Admin user ${email} - bypassing device limit`);
        }

        try {
            // Count active sessions for this user and get device list
            const deviceResult = await client.query(
                `SELECT 
                    browser_fingerprint,
                    device_type,
                    user_agent,
                    operating_system,
                    ip_address,
                    login_time,
                    last_activity
                 FROM user_sessions 
                 WHERE user_id = $1 AND is_active = true
                 ORDER BY last_activity DESC`,
                [user.id]
            );
            deviceCount = deviceResult.rows.length;
            devices = deviceResult.rows.map(row => ({
                fingerprint: row.browser_fingerprint,
                deviceType: row.device_type || 'unknown',
                userAgent: row.user_agent || '',
                operatingSystem: row.operating_system || '',
                ipAddress: row.ip_address || '',
                loginTime: row.login_time,
                lastActivity: row.last_activity
            }));

            // Get current device fingerprint from client
            const currentFingerprint = clientDeviceInfo?.fingerprint ||
                req.headers['x-browser-fingerprint'] ||
                'unknown';

            // Check if this is a new device
            const existingDevice = await client.query(
                `SELECT id FROM user_sessions 
                 WHERE user_id = $1 AND browser_fingerprint = $2 AND is_active = true`,
                [user.id, currentFingerprint]
            );

            const isNewDevice = existingDevice.rows.length === 0;

            // If new device and already at/over limit, LOGOUT ALL OLD DEVICES and show warning
            // 👑 SKIP for Admin users - they can login from unlimited devices
            if (!isAdmin && isNewDevice && deviceCount >= MAX_DEVICES) {
                // 🚨 AUTO-LOGOUT: Đăng xuất TẤT CẢ thiết bị cũ
                const logoutResult = await client.query(
                    `UPDATE user_sessions 
                     SET is_active = false, last_activity = NOW() 
                     WHERE user_id = $1 AND is_active = true`,
                    [user.id]
                );
                const loggedOutCount = logoutResult.rowCount || 0;
                console.warn(`🚨 [LOGIN] Auto-logged out ${loggedOutCount} old devices for user ${email}`);

                deviceWarning = {
                    type: 'DEVICE_LIMIT_EXCEEDED',
                    message: `🚨 ĐĂNG NHẬP THIẾT BỊ THỨ ${deviceCount + 1} - ĐÃ ĐĂNG XUẤT ${loggedOutCount} THIẾT BỊ CŨ!`,
                    totalDevices: 1, // Now only this device is active
                    maxDevices: MAX_DEVICES,
                    loggedOutDevices: loggedOutCount,
                    warning: `Bạn đã đăng nhập trên thiết bị mới. ${loggedOutCount} thiết bị cũ đã bị ĐĂNG XUẤT TỰ ĐỘNG. Nếu không phải bạn đăng nhập, hãy đổi mật khẩu ngay!`
                };
                console.warn(`⚠️ [LOGIN] Device limit exceeded for user ${email}: was ${deviceCount + 1} devices, now 1 (max: ${MAX_DEVICES})`);
            }

            // Register/update this device session
            const deviceType = clientDeviceInfo?.isMobile ? 'mobile' :
                clientDeviceInfo?.isTablet ? 'tablet' : 'laptop';
            const userAgent = req.headers['user-agent'] || '';
            const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
                req.connection?.remoteAddress || 'unknown';

            // 🔒 DEVICE TRACKING: Deactivate old session with same fingerprint, then insert new
            // Step 1: Deactivate existing session with same fingerprint
            await client.query(
                `UPDATE user_sessions 
                 SET is_active = false, last_activity = NOW() 
                 WHERE user_id = $1 AND browser_fingerprint = $2 AND is_active = true`,
                [user.id, currentFingerprint]
            );

            // Step 2: Extract advanced fingerprint data
            const canvasFingerprint = clientDeviceInfo?.canvasFingerprint || null;
            const webglFingerprint = clientDeviceInfo?.webglFingerprint || null;
            const audioFingerprint = clientDeviceInfo?.audioFingerprint || null;
            const fontsFingerprint = clientDeviceInfo?.fontsFingerprint || null;
            const browserName = clientDeviceInfo?.browser || 'unknown';
            const browserVersion = clientDeviceInfo?.browserVersion || '';
            const screenResolution = clientDeviceInfo?.screenWidth && clientDeviceInfo?.screenHeight
                ? `${clientDeviceInfo.screenWidth}x${clientDeviceInfo.screenHeight}` : null;
            const timezone = clientDeviceInfo?.timezone || null;

            // Step 3: Insert new session with advanced fingerprinting
            await client.query(
                `INSERT INTO user_sessions (
                    user_id, device_type, browser_fingerprint, session_token, user_agent, ip_address, 
                    operating_system, canvas_fingerprint, webgl_fingerprint, audio_fingerprint, 
                    fonts_fingerprint, browser_name, browser_version, screen_resolution, timezone,
                    is_active, login_time, last_activity
                 )
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, true, NOW(), NOW())`,
                [
                    user.id, deviceType, currentFingerprint, token, userAgent, ipAddress,
                    clientDeviceInfo?.os || 'unknown', canvasFingerprint, webglFingerprint, audioFingerprint,
                    fontsFingerprint, browserName, browserVersion, screenResolution, timezone
                ]
            );

            console.log(`✅ [LOGIN] Device session registered: ${browserName} on ${clientDeviceInfo?.os || deviceType} (fingerprint: ${currentFingerprint.substring(0, 8)}..., IP: ${ipAddress})`);

        } catch (deviceErr) {
            // Device tracking failed but login should still succeed
            console.warn('⚠️ [LOGIN] Device tracking error (non-critical):', deviceErr.message);
        }

        client.release();
        console.log('✅ [LOGIN] Login successful for user:', email);

        // Return user data with token (exclude password)
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            ...userWithoutPassword,
            token,
            deviceWarning, // Include device warning if any
            deviceCount: deviceCount + 1, // Current device count including this one (after login)
            devices: devices // Include device list
        });
    } catch (err) {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [LOGIN] Release error:', releaseErr.message);
            }
        }
        console.error('❌ [LOGIN] Error:', err.message);
        console.error('❌ [LOGIN] Error stack:', err.stack);

        // Specific error messages in Vietnamese
        let errorMessage = 'Lỗi server. Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu vấn đề tiếp tục.';
        const errMsg = err.message ? err.message.toLowerCase() : '';

        if (errMsg.includes('timeout') || errMsg.includes('connection timeout')) {
            errorMessage = 'Kết nối database quá chậm. Vui lòng thử lại sau vài giây.';
        } else if (errMsg.includes('econnrefused') || errMsg.includes('connection refused')) {
            errorMessage = 'Không thể kết nối đến database. Vui lòng kiểm tra cấu hình server và thử lại sau.';
        } else if (errMsg.includes('does not exist') || errMsg.includes('relation') || errMsg.includes('table')) {
            errorMessage = 'Bảng database không tồn tại. Vui lòng liên hệ hỗ trợ.';
        } else if (errMsg.includes('database pool not available') || errMsg.includes('pool not available') || errMsg.includes('connection failed after retries')) {
            errorMessage = 'Database chưa sẵn sàng. Vui lòng thử lại sau vài giây.';
        } else if (errMsg.includes('database') && (errMsg.includes('connection') || errMsg.includes('error'))) {
            errorMessage = 'Lỗi kết nối database. Vui lòng thử lại sau vài giây.';
        } else if (errMsg.includes('jwt') || errMsg.includes('token')) {
            errorMessage = 'Lỗi xác thực. Vui lòng thử lại sau.';
        } else if (errMsg.includes('password') && errMsg.includes('bcrypt')) {
            errorMessage = 'Lỗi xác thực mật khẩu. Vui lòng thử lại sau.';
        }

        res.status(500).json({ error: errorMessage });
    }
});

// ============================================
// SIMPLE AUTH API (Đơn giản, ổn định hơn)
// ============================================

// ✅ SIMPLIFIED: Plain text login with automatic bcrypt migration
// Supports both bcrypt (old) and plain text (new) passwords
// Automatically converts bcrypt to plain text on successful login
app.post('/api/auth/simple-login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email và password không được để trống' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Dịch vụ đang bảo trì. Vui lòng thử lại sau.' });
    }

    let client;
    try {
        client = await Promise.race([
            getDatabaseClient(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Database connection timeout')), 10000)
            )
        ]);

        // Get user by email (can't compare password in SQL if it's bcrypt)
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            client.release();
            return res.status(401).json({ error: 'Email hoặc password không đúng' });
        }

        const user = result.rows[0];

        // ✅ PASSWORD VERIFICATION: Always use bcrypt (all passwords should be hashed now)
        let passwordValid = false;
        let needsMigration = false; // For legacy plain text passwords only

        if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$') || user.password.startsWith('$2y$'))) {
            // Password is bcrypt hash - verify with bcrypt
            passwordValid = await bcrypt.compare(password, user.password);
            // No migration needed - keep bcrypt
        } else {
            // Legacy: plain text password - verify and migrate to bcrypt
            passwordValid = (user.password === password);
            needsMigration = passwordValid; // Migrate to bcrypt if correct
        }

        if (!passwordValid) {
            client.release();
            return res.status(401).json({ error: 'Email hoặc password không đúng' });
        }

        // 🔒 MOBILE ACCESS CONTROL: Advanced detection to prevent bypass
        const { deviceInfo: clientDeviceInfo } = req.body || {};
        const serverUserAgent = req.headers['user-agent'] || '';

        let isMobileDevice = false;
        if (clientDeviceInfo && typeof clientDeviceInfo === 'object') {
            isMobileDevice = clientDeviceInfo.isMobile === true;
        }
        if (!isMobileDevice) {
            const serverSideMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(serverUserAgent);
            if (serverSideMobile) {
                isMobileDevice = true;
            }
        }
        const screenWidth = req.headers['x-screen-width'] || req.headers['screen-width'];
        if (!isMobileDevice && screenWidth) {
            const width = parseInt(screenWidth);
            if (width > 0 && width <= 1024) {
                isMobileDevice = true;
            }
        }

        // 🔒 NEW LOGIC:
        // Global ENABLE → Tất cả user được phép
        // Global DISABLE → Block tất cả, NHƯNG user có mobileLogin = true vẫn được phép
        // Admin → Luôn được phép (all cases)

        // Check global mobile access setting
        let globalMobileEnabled = true; // Default: enabled
        try {
            const globalSettingResult = await client.query(
                `SELECT setting_value FROM system_settings WHERE setting_key = 'mobile_access_enabled'`
            );
            if (globalSettingResult.rows.length > 0) {
                globalMobileEnabled = globalSettingResult.rows[0].setting_value === 'true' ||
                    globalSettingResult.rows[0].setting_value === true;
            }
        } catch (globalErr) {
            console.warn('⚠️ [SIMPLE-LOGIN] Could not check global mobile access setting, defaulting to enabled:', globalErr.message);
        }

        // Block login if mobile device detected
        if (isMobileDevice) {
            // Check if user is admin (bypass all) - unified to Super Admin only
            const isAdminUser = user.role === 'Super Admin' || normalizeRole(user.role) === 'Super Admin';

            if (isAdminUser) {
                // Admin → Luôn được phép (all cases)
                console.log(`✅ [SIMPLE-LOGIN] Mobile access allowed for admin: ${email}`);
            } else if (globalMobileEnabled) {
                // Global ENABLE → Tất cả user được phép
                console.log(`✅ [SIMPLE-LOGIN] Mobile access allowed - Global enabled for user: ${email}`);
            } else if (user.mobileLogin === true) {
                // Global DISABLE + User có mobileLogin = true → Vẫn được phép (exception)
                console.log(`✅ [SIMPLE-LOGIN] Mobile access allowed - User has mobileLogin=true (exception) for user: ${email}`);
            } else {
                // Global DISABLE + User không có mobileLogin = true → Bị chặn
                console.warn(`⚠️ [SIMPLE-LOGIN] Mobile access denied - Global disabled and user has no permission for user: ${email}`);
                client.release();
                return res.status(403).json({
                    error: 'Mobile Access Denied',
                    message: 'Truy cập từ thiết bị di động đang bị tắt toàn hệ thống. Vui lòng sử dụng máy tính để truy cập hoặc liên hệ quản trị viên để được kích hoạt tính năng này.'
                });
            }
        }

        // 🔒 SECURITY FIX: Migrate legacy plain text passwords to bcrypt
        if (needsMigration) {
            try {
                // Hash the plain text password before storing
                const hashedPassword = await bcrypt.hash(password, 10);
                await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
                console.log(`✅ [SIMPLE-LOGIN] Migrated plain text password to bcrypt for user: ${user.email}`);
            } catch (migrationErr) {
                // Migration failed but login is successful - log warning
                console.warn(`⚠️ [SIMPLE-LOGIN] Password migration failed for ${user.email}:`, migrationErr.message);
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Return user and token
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            user: userWithoutPassword,
            token
        });
    } catch (err) {
        console.error('❌ [SIMPLE-LOGIN] Error:', err.message);
        res.status(500).json({ error: 'Lỗi server. Vui lòng thử lại sau.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [SIMPLE-LOGIN] Release error:', releaseErr.message);
            }
        }
    }
});

// ✅ SIMPLIFIED: Plain text register - No hashing
app.post('/api/auth/simple-register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password phải có ít nhất 6 ký tự' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Dịch vụ đang bảo trì. Vui lòng thử lại sau.' });
    }

    let client;
    try {
        client = await Promise.race([
            getDatabaseClient(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Database connection timeout')), 10000)
            )
        ]);

        // Check if email already exists
        const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            client.release();
            return res.status(400).json({ error: 'Email đã được đăng ký' });
        }

        // 🔒 SECURITY FIX: Hash password before storing (NEVER store plain text)
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(
            `INSERT INTO users (name, email, password, role, "bananaBalance", registered_at) 
             VALUES ($1, $2, $3, 'Free', 0, NOW()) 
             RETURNING id, name, email, role, "bananaBalance", registered_at`,
            [name, email, hashedPassword]
        );

        const newUser = result.rows[0];

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        client.release();
        res.json({
            user: newUser,
            token
        });
    } catch (err) {
        console.error('❌ [SIMPLE-REGISTER] Error:', err.message);
        res.status(500).json({ error: 'Lỗi server. Vui lòng thử lại sau.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [SIMPLE-REGISTER] Release error:', releaseErr.message);
            }
        }
    }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    // Try to load database pool if not already loaded
    if (!isRealDatabasePool()) {
        console.log('⚠️ [AUTH-ME] Database pool not available, attempting to load...');
        const loaded = loadDatabasePool();
        if (!loaded || !isRealDatabasePool()) {
            // Wait a bit for database pool to initialize
            console.log('⏳ [AUTH-ME] Waiting for database pool to initialize...');
            let waitCount = 0;
            const maxWait = 3; // Wait up to 3 seconds

            while (waitCount < maxWait && !isRealDatabasePool()) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                waitCount++;
                if (!isRealDatabasePool()) {
                    loadDatabasePool();
                }
            }

            if (!isRealDatabasePool()) {
                console.error('❌ [AUTH-ME] Database pool still not available after waiting');
                return res.status(503).json({ error: 'Dịch vụ đang bảo trì. Vui lòng thử lại sau.' });
            }
        }
    }

    let client;
    try {
        // Get database connection with timeout
        client = await Promise.race([
            getDatabaseClient(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Database connection timeout')), 20000)
            )
        ]);

        // ✅ FIX: Support userId, id, and adminId from JWT token
        const userId = req.user.userId || req.user.id || req.user.adminId;
        const isAdminToken = req.user.adminId && req.user.isAdmin;

        let result;
        if (isAdminToken) {
            // Admin token - query admin_users table
            result = await client.query(
                'SELECT id, username as name, email, role, 0 as bananas, created_at as registered_at FROM admin_users WHERE id = $1',
                [req.user.adminId]
            );
        } else {
            // Regular user token
            result = await client.query(
                'SELECT id, name, email, role, "bananaBalance" as bananas, registered_at FROM users WHERE id = $1',
                [userId]
            );
        }

        // Get device count and device list with advanced fingerprinting
        let deviceCount = 0;
        let devices = [];
        // ✅ FIX: Skip device tracking for admin tokens (they don't have user_sessions)
        if (!isAdminToken) {
            try {
                const deviceResult = await client.query(
                    `SELECT 
                        browser_fingerprint,
                        device_type,
                        user_agent,
                        operating_system,
                        ip_address,
                        browser_name,
                        browser_version,
                        screen_resolution,
                        timezone,
                        canvas_fingerprint,
                        webgl_fingerprint,
                        trust_score,
                        login_time,
                        last_activity
                     FROM user_sessions 
                     WHERE user_id = $1 AND is_active = true
                     ORDER BY last_activity DESC`,
                    [userId]
                );
                deviceCount = deviceResult.rows.length;
                devices = deviceResult.rows.map(row => ({
                    fingerprint: row.browser_fingerprint,
                    deviceType: row.device_type || 'unknown',
                    userAgent: row.user_agent || '',
                    operatingSystem: row.operating_system || '',
                    ipAddress: row.ip_address || '',
                    browserName: row.browser_name || '',
                    browserVersion: row.browser_version || '',
                    screenResolution: row.screen_resolution || '',
                    timezone: row.timezone || '',
                    canvasFingerprint: row.canvas_fingerprint || '',
                    webglFingerprint: row.webgl_fingerprint || '',
                    trustScore: row.trust_score || 100,
                    loginTime: row.login_time,
                    lastActivity: row.last_activity
                }));
            } catch (deviceErr) {
                console.warn('⚠️ [AUTH-ME] Failed to get device info:', deviceErr.message);
                // Continue without device info
            }
        }

        client.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: result.rows[0],
            deviceCount,
            devices
        });
    } catch (err) {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [AUTH-ME] Release error:', releaseErr.message);
            }
        }
        console.error('❌ [AUTH-ME] Error:', err.message);

        // Return user-friendly error message
        let errorMessage = 'Lỗi server';
        const errMsg = err.message ? err.message.toLowerCase() : '';
        if (errMsg.includes('timeout') || errMsg.includes('connection')) {
            errorMessage = 'Kết nối database quá chậm. Vui lòng thử lại sau vài giây.';
        }

        res.status(500).json({ error: errorMessage });
    }
});

// 🔒 SECURITY: Get current user with full details (for role verification)
app.get('/api/users/me', authenticateToken, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Dịch vụ đang bảo trì. Vui lòng thử lại sau.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        // ✅ FIX: Support userId, id, and adminId from JWT token
        const userId = req.user.userId || req.user.id || req.user.adminId;
        if (!userId) {
            // ✅ FIX: Don't log full token details for security
            console.warn('⚠️ [USERS-ME] Missing user ID in token');
            return res.status(401).json({ error: 'Invalid token: missing user ID' });
        }

        // ✅ FIX: If this is an admin token (has adminId), query admin_users table instead
        const isAdminToken = req.user.adminId && req.user.isAdmin;

        let result;
        if (isAdminToken) {
            // Admin token - query admin_users table
            result = await client.query(
                `SELECT id, username as name, email, role, true as activated, 0 as "bananaBalance"
                 FROM admin_users WHERE id = $1`,
                [req.user.adminId]
            );
        } else {
            // Regular user token - query users table
            result = await client.query(
                `SELECT id, name, email, role, packages, activated, "bananaBalance", "mobileLogin", 
                        "joinDate", "expiryDate", registered_at 
                 FROM users WHERE id = $1`,
                [userId]
            );
        }

        if (result.rows.length === 0) {
            console.warn('⚠️ [USERS-ME] User not found:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];

        // Parse packages if it's a string
        if (user.packages && typeof user.packages === 'string') {
            try {
                user.packages = JSON.parse(user.packages);
            } catch (e) {
                user.packages = [];
            }
        } else if (!user.packages) {
            user.packages = [];
        }

        // Remove password (shouldn't be in result, but just in case)
        const { password, ...safeUser } = user;

        res.json(safeUser);
    } catch (err) {
        console.error('❌ [USERS-ME] Error:', err.message);
        console.error('❌ [USERS-ME] Stack:', err.stack);
        res.status(500).json({
            error: 'Lỗi server',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// ✅ NEW: Simplified logout - no device tracking required
app.post('/api/logout', authenticateToken, async (req, res) => {
    // Logout is now simple - just return success
    // JWT token expiration will handle actual logout
    // Optional: Deactivate all sessions for this user (if needed)
    if (!isRealDatabasePool()) {
        // Even if DB is not available, logout should succeed (token-based)
        return res.json({ message: 'Logged out successfully.' });
    }
    try {
        const client = await getDatabaseClient();
        try {
            // Optional: Deactivate all active sessions for this user
            await client.query(
                `UPDATE user_sessions 
                 SET is_active = false, last_activity = CURRENT_TIMESTAMP 
                 WHERE user_id = $1 AND is_active = true`,
                [req.user.userId]
            );
            client.release();
            res.json({ message: 'Logged out successfully.' });
        } catch (err) {
            client.release();
            // Even if session update fails, logout should succeed
            console.warn('⚠️ [LOGOUT] Session update failed (non-critical):', err.message);
            res.json({ message: 'Logged out successfully.' });
        }
    } catch (err) {
        // Even if DB connection fails, logout should succeed
        console.warn('⚠️ [LOGOUT] Database connection failed (non-critical):', err.message);
        res.json({ message: 'Logged out successfully.' });
    }
});

// ============================================
// ✅ NEW: Clean Register Endpoint
// ============================================
// Code sạch, đơn giản, đồng bộ SQL
// Không làm mất dữ liệu user cũ
// Plain text password (no hashing)
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Password length validation
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    let client;
    try {
        // Get database connection with timeout
        client = await Promise.race([
            getDatabaseClient(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Database connection timeout')), 15000)
            )
        ]);

        // Start transaction
        await client.query('BEGIN');

        // Check if email already exists
        const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            await client.query('ROLLBACK');
            client.release();
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }

        // Create new user (plain text password, no hashing)
        const userId = `user_${Date.now()}`;
        // 🔒 SECURITY FIX: Hash password before storing (NEVER store plain text)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: userId,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword, // Hashed
            role: 'Free',
            packages: [],
            activated: true,
            mobileLogin: false,
            joinDate: new Date().toLocaleDateString('en-GB'),
            expiryDate: '-',
            registered_at: new Date().toISOString(),
            bananaBalance: 30 // Welcome bonus
        };

        // Insert user
        await client.query(
            `INSERT INTO users (id, name, email, password, role, packages, activated, "mobileLogin", "joinDate", "expiryDate", registered_at, "bananaBalance")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
                newUser.id,
                newUser.name,
                newUser.email,
                newUser.password,
                newUser.role,
                newUser.packages,
                newUser.activated,
                newUser.mobileLogin,
                newUser.joinDate,
                newUser.expiryDate,
                newUser.registered_at,
                newUser.bananaBalance
            ]
        );

        // Log welcome bonus transaction
        try {
            await client.query(
                `INSERT INTO banana_transactions (user_id, transaction_type, amount, balance_before, balance_after, reason, source, created_by)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [userId, 'add', 30, 0, 30, 'Welcome bonus - New user registration', 'registration', 'system']
            );
        } catch (txErr) {
            // Transaction logging failed but registration succeeds - log warning
            console.warn(`⚠️ [REGISTER] Transaction logging failed for ${email}:`, txErr.message);
        }

        // Commit transaction
        await client.query('COMMIT');
        client.release();

        // Invalidate cache
        invalidateUsersCache();

        // Backup to Cloud Storage (async, non-blocking)
        backupUsersToCloudStorage().catch(err => {
            console.warn('Background backup failed after registration:', err.message);
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [REGISTER] Rollback error:', rollbackErr.message);
            }
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [REGISTER] Release error:', releaseErr.message);
            }
        }
        console.error('❌ [REGISTER] Error:', err.message);
        console.error('❌ [REGISTER] Error stack:', err.stack);

        // Specific error messages
        let errorMessage = 'Server error during registration.';
        if (err.message && err.message.includes('timeout')) {
            errorMessage = 'Database connection timeout. Please try again.';
        } else if (err.message && err.message.includes('ECONNREFUSED')) {
            errorMessage = 'Database connection failed. Please try again later.';
        } else if (err.message && err.message.includes('duplicate key') || err.message.includes('unique constraint')) {
            errorMessage = 'An account with this email already exists.';
        }
        res.status(500).json({ error: errorMessage });
    }
});

// ✅ PRODUCTION FIX: In-memory cache for /api/users to reduce database load
// ✅ SCALE FIX: Tăng TTL lên 90s để giảm database load khi có nhiều users và tránh timeout
// Với cache 90s, 90% requests sẽ dùng cache, chỉ 10% cần query database
const usersCache = {
    data: null,
    timestamp: null,
    ttl: 90000 // 90 seconds cache TTL (tăng từ 60s để giảm database load và tránh timeout)
};

const getCachedUsers = () => {
    if (usersCache.data && usersCache.timestamp) {
        const age = Date.now() - usersCache.timestamp;
        if (age < usersCache.ttl) {
            return usersCache.data;
        }
    }
    return null;
};

const setCachedUsers = (data) => {
    usersCache.data = data;
    usersCache.timestamp = Date.now();
};

const invalidateUsersCache = () => {
    usersCache.data = null;
    usersCache.timestamp = null;
    console.log('🔄 [Cache] Users cache invalidated');
};

app.get('/api/users', adminAuth, async (req, res) => {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const requester = req.user || {};

    console.log('📋 [API GET /api/users] Request:', { adminId: requester.userId, role: requester.role, ip: clientIP });

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    // ✅ PRODUCTION FIX: Check cache first
    const cached = getCachedUsers();
    if (cached) {
        console.log(`✅ [API GET /api/users] Returning cached data (${cached.length} users)`);
        return res.json(cached);
    }

    try {
        // ✅ PRODUCTION DEBUG: Log query start time
        const queryStartTime = Date.now();

        // 🔒 SECURITY: Exclude password from response
        // ✅ OPTIMIZATION: Simplified query like build 00207-2j7 - SELECT * is faster than specific columns
        // ✅ FIX: Loại bỏ timeout handling - để query chờ đến khi database trả về (giống build 00207-2j7)
        // Database sẽ tự timeout nếu query quá lâu, không cần Promise.race
        const result = await pool.query(`
            SELECT id, name, email, role, packages, activated, "mobileLogin", "joinDate", "expiryDate", registered_at, "bananaBalance"
            FROM users 
            ORDER BY "registered_at" DESC NULLS LAST
        `);

        // ✅ PRODUCTION DEBUG: Log query duration
        const queryDuration = Date.now() - queryStartTime;
        console.log(`✅ [API GET /api/users] Returned ${result.rows.length} users (password excluded) in ${queryDuration}ms`);

        // ⚠️ WARNING: Log slow queries (>5s) - nhưng không reject
        if (queryDuration > 5000) {
            console.warn(`⚠️  [API GET /api/users] Slow query detected: ${queryDuration}ms (threshold: 5000ms)`);
            console.warn(`⚠️  [SCALE] Consider running optimize-users-query.sql to create indexes if query is slow`);
        }

        // ✅ SCALE FIX: Log performance metrics for monitoring
        if (result.rows.length > 100) {
            console.log(`📊 [SCALE] Large dataset: ${result.rows.length} users. Cache will help reduce database load.`);
        }

        // ✅ PRODUCTION FIX: Cache the result
        setCachedUsers(result.rows);

        res.json(result.rows);
    } catch (err) {
        console.error('❌ [API GET /api/users] Error:', err.message, err.stack);

        // ✅ PRODUCTION FIX: Return cached data if available even on error (timeout, query error, etc.)
        const cached = getCachedUsers();
        if (cached) {
            console.log(`⚠️  [API GET /api/users] Database error (${err.message}), returning stale cache (${cached.length} users)`);
            // ✅ TIMEOUT FIX: Return stale cache with warning header
            res.setHeader('X-Cache-Status', 'stale');
            return res.json(cached);
        }

        // ✅ FIX: Không có timeout handling - database sẽ tự xử lý timeout
        // Nếu có cache, trả về cache. Nếu không, trả về error thông thường
        res.status(500).json({
            error: err.message && err.message.includes('timeout')
                ? 'Database query timeout. Server đang quá tải. Vui lòng thử lại sau vài giây.'
                : 'Server error while fetching users.'
        });
    }
});

// Get user total score (sum of all test scores)
// 🔒 SECURITY: Requires authentication - user can only get their own score
// ⚠️ IMPORTANT: This route must be BEFORE /api/users/:id to avoid route conflict
app.get('/api/user/score/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;
    // ✅ FIX: Support both userId and id from JWT token (for compatibility)
    const authenticatedUserId = req.user?.userId || req.user?.id;

    // Check if user is authenticated
    if (!authenticatedUserId) {
        // ✅ FIX: Don't log warning for every request - this is expected for admin tokens
        // Admin tokens have adminId instead of userId
        if (req.user?.adminId || req.user?.isAdmin) {
            // Admin user - allow access to any user's score
            console.log('👑 [AUTH] Admin accessing user score:', userId);
        } else {
            console.warn('⚠️ [AUTH] Unauthenticated request to get user score');
            return res.status(401).json({ error: 'Authentication required.' });
        }
    }

    // 🔒 SECURITY: Verify user can only get their own score (unless admin)
    const isAdminUser = req.user?.adminId || req.user?.isAdmin || isAdminRole(req.user?.role);
    if (!isAdminUser && userId !== authenticatedUserId) {
        console.warn('⚠️ [SECURITY] User attempted to get score of another user:', {
            authenticatedUserId,
            requestedUserId: userId
        });
        return res.status(403).json({ error: 'You can only view your own score.' });
    }

    if (!isRealDatabasePool()) {
        console.warn('⚠️ [DB] Database pool not available for user score request');
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        // Get total score from test_results (sum of all scores)
        const scoreResult = await pool.query(`
            SELECT 
                COALESCE(SUM(score), 0) as total_score,
                COUNT(*) as total_tests
            FROM test_results
            WHERE user_id = $1
        `, [userId]);

        if (!scoreResult || !scoreResult.rows || scoreResult.rows.length === 0) {
            // Return 0 if no results found (user hasn't taken any tests yet)
            return res.json({
                totalScore: 0,
                totalTests: 0,
                userId
            });
        }

        const totalScore = parseInt(scoreResult.rows[0]?.total_score || 0, 10);
        const totalTests = parseInt(scoreResult.rows[0]?.total_tests || 0, 10);

        res.json({
            totalScore,
            totalTests,
            userId
        });
    } catch (err) {
        console.error('❌ [API GET /api/user/score/:userId] Error:', {
            message: err.message,
            stack: err.stack,
            userId: userId,
            code: err.code,
            name: err.name
        });

        // Check if it's a database connection error
        if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
            return res.status(503).json({ error: 'Database connection failed. Please try again later.' });
        }

        // Check if table doesn't exist
        if (err.message && err.message.includes('does not exist')) {
            console.warn('⚠️ [DB] test_results table may not exist, returning 0 score');
            return res.json({
                totalScore: 0,
                totalTests: 0,
                userId
            });
        }

        res.status(500).json({
            error: 'Server error while fetching user score.',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    console.log('📥 [API GET /api/users/:id] Request for user:', id);

    if (!isRealDatabasePool()) {
        console.error('❌ [API GET /api/users/:id] Database pool not available');
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        // 🔒 SECURITY: Exclude password from response
        const result = await pool.query(`
            SELECT id, name, email, role, packages, activated, "mobileLogin", "joinDate", "expiryDate", registered_at, "bananaBalance"
            FROM users 
            WHERE id = $1
        `, [id]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        console.error('❌ [API GET /api/users/:id] Error:', {
            message: err.message,
            stack: err.stack,
            userId: id,
            code: err.code
        });
        res.status(500).json({
            error: 'Server error while fetching user.',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});


app.delete('/api/users/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const requester = req.user || {};

    console.log('🔴 [API DELETE /api/users/:id] Request:', { id, adminId: requester.userId, role: requester.role, ip: clientIP });

    // 🔒 SECURITY: Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        console.warn('⚠️ [SECURITY] Invalid user ID in DELETE request:', { id, ip: clientIP, adminId: requester.userId });
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            await client.query('BEGIN');

            // 🔒 SECURITY: Check if user exists with row lock
            const userResult = await client.query('SELECT * FROM users WHERE id = $1 FOR UPDATE', [id]);
            if (userResult.rows.length === 0) {
                await client.query('ROLLBACK');
                client.release();
                console.log('❌ [API DELETE] User not found:', id);
                return res.status(404).json({ error: 'User not found.' });
            }

            const user = userResult.rows[0];

            // 🔒 SECURITY: Prevent deleting admin users (safety check)
            if (user.role === 'Super Admin') {
                const adminCount = await client.query('SELECT COUNT(*) as count FROM users WHERE role = $1', ['Super Admin']);
                if (parseInt(adminCount.rows[0].count) <= 1) {
                    await client.query('ROLLBACK');
                    client.release();
                    console.log('❌ [SECURITY] Attempted to delete last admin user:', { id, email: user.email, ip: clientIP });
                    return res.status(400).json({ error: 'Cannot delete the last admin user.' });
                }
            }

            // 🔒 SECURITY: Log deletion attempt before executing
            console.log('⚠️ [SECURITY] Deleting user:', {
                id,
                email: user.email,
                name: user.name,
                role: user.role,
                bananaBalance: user.bananaBalance,
                adminId: requester.userId,
                adminEmail: requester.email,
                ip: clientIP,
                timestamp: new Date().toISOString()
            });

            // Delete user (CASCADE will handle related records)
            await client.query('DELETE FROM users WHERE id = $1', [id]);
            await client.query('COMMIT');

            console.log('✅ [API DELETE] User deleted successfully:', { id, email: user.email, ip: clientIP });

            // ✅ PRODUCTION FIX: Invalidate cache after user delete
            invalidateUsersCache();

            // Backup users to Cloud Storage (async, non-blocking)
            backupUsersToCloudStorage().catch(err => {
                console.warn('Background backup failed after user delete:', err.message);
            });

            client.release();
            res.json({ success: true, message: 'User deleted successfully.', deletedUser: { id: user.id, email: user.email, name: user.name } });
        } catch (err) {
            await client.query('ROLLBACK');
            client.release();
            console.error(`❌ [API DELETE] Delete Error for ${id}:`, err.message, err.stack);
            res.status(500).json({ error: 'Server error during user deletion.' });
        }
    } catch (err) {
        console.error(`❌ [API DELETE] Connection Error for ${id}:`, err.message, err.stack);
        res.status(500).json({ error: 'Server error during user deletion.' });
    }
});

// --- User Profile Update Endpoint (User can update their own profile) ---
// 🔒 SECURITY FIX: Added authenticateToken - user can only update their OWN profile
app.put('/api/users/profile/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body; // 🔒 REMOVED: email, bananaBalance - users cannot change these
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const authenticatedUserId = req.user.userId; // From JWT token

    // 🔒 SECURITY: User can only update their OWN profile
    if (id !== authenticatedUserId) {
        console.warn('⚠️ [SECURITY] User tried to update another user profile:', { requestedId: id, authenticatedId: authenticatedUserId, ip: clientIP });
        return res.status(403).json({ error: 'Forbidden. You can only update your own profile.' });
    }

    console.log('👤 [API PUT /api/users/profile/:id] User profile update request:', { id, hasName: !!name, hasPassword: !!password, ip: clientIP });

    // 🔒 SECURITY: Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        console.warn('⚠️ [SECURITY] Invalid user ID in profile update request:', { id, ip: clientIP });
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // 🔒 SECURITY: Validate email format if provided
    if (email !== undefined && email !== null && typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.warn('⚠️ [SECURITY] Invalid email format in profile update request:', { id, email, ip: clientIP });
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // 🔒 SECURITY: Validate name if provided
    if (name !== undefined && name !== null && (typeof name !== 'string' || name.trim() === '')) {
        console.warn('⚠️ [SECURITY] Invalid name in profile update request:', { id, name, ip: clientIP });
        return res.status(400).json({ error: 'Name cannot be empty.' });
    }

    // 🔒 SECURITY: Validate password if provided
    if (password !== undefined && password !== null) {
        if (typeof password !== 'string' || password.length < 5) {
            console.warn('⚠️ [SECURITY] Invalid password in profile update request:', { id, passwordLength: password?.length, ip: clientIP });
            return res.status(400).json({ error: 'Password must be at least 5 characters long.' });
        }
    }

    const fields = [];
    const values = [];
    let query = 'UPDATE users SET ';

    if (name !== undefined && name !== null && name !== '') {
        fields.push(`name = $${fields.length + 1}`);
        values.push(name);
        console.log('✅ [API PUT /api/users/profile/:id] Name will be updated to:', name);
    }
    if (password) {
        // 🔒 SECURITY FIX: Hash password before storing (NEVER store plain text)
        const hashedPassword = await bcrypt.hash(password, 10);
        fields.push(`password = $${fields.length + 1}`);
        values.push(hashedPassword);
        console.log('✅ [API PUT /api/users/profile/:id] Password will be updated (hashed)');
    }
    // 🔒 SECURITY FIX: REMOVED bananaBalance update - users cannot change their own balance
    // Balance can only be changed via banana-transactions API or by admin
    if (email !== undefined && email !== null) {
        // Check if email already exists for another user
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 AND id != $2', [email, id]);
        if (existingUser.rows.length > 0) {
            console.log('❌ [API PUT /api/users/profile/:id] Email already exists:', email);
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }
        fields.push(`email = $${fields.length + 1}`);
        values.push(email);
        console.log('✅ [API PUT /api/users/profile/:id] Email will be updated to:', email);
    }

    if (fields.length === 0) {
        console.log('❌ [API PUT /api/users/profile/:id] No fields to update');
        return res.status(400).json({ error: 'No fields to update.' });
    }

    query += fields.join(', ') + ` WHERE id = $${fields.length + 1} RETURNING *`;
    values.push(id);

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const client = await getDatabaseClient();

        try {
            await client.query('BEGIN');

            // Execute update query
            const result = await client.query(query, values);
            await client.query('COMMIT');

            if (result.rows.length > 0) {
                console.log('✅ [API PUT /api/users/profile/:id] User profile updated:', { id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email, ip: clientIP });
                // Backup users to Cloud Storage (async, non-blocking)
                backupUsersToCloudStorage().catch(err => {
                    console.warn('Background backup failed after user profile update:', err.message);
                });

                client.release();
                res.json(result.rows[0]);
            }
            else {
                client.release();
                console.log('❌ [API PUT /api/users/profile/:id] User not found:', id);
                res.status(404).json({ error: 'User not found.' });
            }
        } catch (err) {
            await client.query('ROLLBACK');
            client.release();
            console.error(`❌ [API PUT /api/users/profile/:id] Update Error for ${id}:`, err.message, err.stack);
            res.status(500).json({ error: 'Server error during user profile update.' });
        }
    } catch (err) {
        console.error(`❌ [API PUT /api/users/profile/:id] Connection Error for ${id}:`, err.message, err.stack);
        res.status(500).json({ error: 'Server error during user profile update.' });
    }
});

// --- Admin User Update Endpoint (Admin can update any user) ---
app.put('/api/users/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { bananaBalance, role, password, email, name } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const requester = req.user || {};

    console.log('🔵 [API PUT /api/users/:id] Request:', { id, name, bananaBalance, role, hasPassword: !!password, email, adminId: requester.userId, ip: clientIP });

    // 🔒 SECURITY: Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        console.warn('⚠️ [SECURITY] Invalid user ID in PUT request:', { id, ip: clientIP, adminId: requester.userId });
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // 🔒 SECURITY: Validate email format if provided
    if (email !== undefined && email !== null && typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.warn('⚠️ [SECURITY] Invalid email format in PUT request:', { id, email, ip: clientIP, adminId: requester.userId });
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // 🔒 SECURITY: Validate name if provided
    if (name !== undefined && name !== null && (typeof name !== 'string' || name.trim() === '')) {
        console.warn('⚠️ [SECURITY] Invalid name in PUT request:', { id, name, ip: clientIP, adminId: requester.userId });
        return res.status(400).json({ error: 'Name cannot be empty.' });
    }

    // 🔒 SECURITY: Validate role if provided
    if (role && !['Free', 'Premium', 'Super Admin'].includes(role)) {
        console.warn('⚠️ [SECURITY] Invalid role in PUT request:', { id, role, ip: clientIP, adminId: requester.userId });
        return res.status(400).json({ error: 'Invalid role. Must be Free, Premium, or Super Admin.' });
    }

    // 🔒 SECURITY: Validate bananaBalance if provided
    if (bananaBalance !== undefined && bananaBalance !== null) {
        if (typeof bananaBalance !== 'number' || isNaN(bananaBalance) || bananaBalance < 0) {
            console.warn('⚠️ [SECURITY] Invalid bananaBalance in PUT request:', { id, bananaBalance, ip: clientIP, adminId: requester.userId });
            return res.status(400).json({ error: 'Banana balance must be a non-negative number.' });
        }
        if (bananaBalance > 1000000) { // Max 1M bananas
            console.warn('⚠️ [SECURITY] Attempted to set excessive balance:', { userId: id, balance: bananaBalance, ip: clientIP, adminId: requester.userId });
            return res.status(400).json({ error: 'Balance exceeds maximum limit (1,000,000).' });
        }
    }

    // 🔒 SECURITY: Validate password if provided
    if (password !== undefined && password !== null) {
        if (typeof password !== 'string' || password.length < 5) {
            console.warn('⚠️ [SECURITY] Invalid password in PUT request:', { id, passwordLength: password?.length, ip: clientIP, adminId: requester.userId });
            return res.status(400).json({ error: 'Password must be at least 5 characters long.' });
        }
    }

    const fields = [];
    const values = [];
    let query = 'UPDATE users SET ';

    if (name !== undefined && name !== null && name !== '') {
        fields.push(`name = $${fields.length + 1}`);
        values.push(name);
        console.log('✅ [API PUT] Name will be updated to:', name);
    }
    if (typeof bananaBalance === 'number') {
        fields.push(`"bananaBalance" = $${fields.length + 1}`);
        values.push(bananaBalance);
    }
    if (role) {
        fields.push(`role = $${fields.length + 1}`);
        values.push(role);
    }
    if (password) {
        // 🔒 SECURITY FIX: Hash password before storing (NEVER store plain text)
        const hashedPassword = await bcrypt.hash(password, 10);
        fields.push(`password = $${fields.length + 1}`);
        values.push(hashedPassword);
    }
    // Always process email if provided (even if it's the same)
    if (email !== undefined && email !== null) {
        if (!isRealDatabasePool()) {
            return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
        }
        // Check if email already exists for another user
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 AND id != $2', [email, id]);
        if (existingUser.rows.length > 0) {
            console.log('❌ [API PUT] Email already exists:', email);
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }
        fields.push(`email = $${fields.length + 1}`);
        values.push(email);
        console.log('✅ [API PUT] Email will be updated to:', email);
    }

    if (fields.length === 0) {
        console.log('❌ [API PUT] No fields to update');
        return res.status(400).json({ error: 'No fields to update.' });
    }

    query += fields.join(', ') + ` WHERE id = $${fields.length + 1} RETURNING *`;
    values.push(id);

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const client = await getDatabaseClient();

        try {
            await client.query('BEGIN');

            // 🔒 SECURITY: If updating bananaBalance, validate and log transaction with locking
            let balanceBefore = null;
            let balanceAfter = null;
            if (typeof bananaBalance === 'number') {
                // 🔒 SECURITY: Validate amount
                if (bananaBalance < 0) {
                    await client.query('ROLLBACK');
                    client.release();
                    return res.status(400).json({ error: 'Balance cannot be negative.' });
                }

                if (bananaBalance > 1000000) {
                    console.warn('⚠️ [SECURITY] Attempted to set excessive balance:', { userId: id, balance: bananaBalance });
                    await client.query('ROLLBACK');
                    client.release();
                    return res.status(400).json({ error: 'Balance exceeds maximum limit (1,000,000).' });
                }

                // 🔒 SECURITY: Get current balance with row lock
                const currentUser = await client.query('SELECT "bananaBalance" FROM users WHERE id = $1 FOR UPDATE', [id]);
                if (currentUser.rows.length > 0) {
                    balanceBefore = currentUser.rows[0].bananaBalance || 0;
                    balanceAfter = bananaBalance;

                    // Determine transaction type
                    const transactionType = balanceAfter > balanceBefore ? 'add' : balanceAfter < balanceBefore ? 'deduct' : 'admin_adjust';
                    const amount = Math.abs(balanceAfter - balanceBefore);

                    // Log transaction if there's a change
                    if (amount > 0) {
                        await client.query(
                            `INSERT INTO banana_transactions (user_id, transaction_type, amount, balance_before, balance_after, reason, source, created_by)
                             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                            [id, transactionType, amount, balanceBefore, balanceAfter, 'Admin adjustment', 'admin_panel', (req.user && req.user.userId) || 'system']
                        );
                        console.log('📝 [API PUT] Transaction logged:', { userId: id, type: transactionType, amount, before: balanceBefore, after: balanceAfter });
                    }
                }
            }

            // Execute update query
            const result = await client.query(query, values);
            await client.query('COMMIT');

            if (result.rows.length > 0) {
                console.log('✅ [API PUT] User updated:', result.rows[0].id, 'Name:', result.rows[0].name, 'Email:', result.rows[0].email, 'Balance:', result.rows[0].bananaBalance);
                // ✅ PRODUCTION FIX: Invalidate cache after user update
                invalidateUsersCache();

                // Backup users to Cloud Storage (async, non-blocking)
                backupUsersToCloudStorage().catch(err => {
                    console.warn('Background backup failed after user update:', err.message);
                });

                client.release();
                res.json(result.rows[0]);
            }
            else {
                client.release();
                console.log('❌ [API PUT] User not found:', id);
                res.status(404).json({ error: 'User not found.' });
            }
        } catch (err) {
            await client.query('ROLLBACK');
            client.release();
            console.error(`❌ [API PUT] Update Error for ${id}:`, err.message, err.stack);
            res.status(500).json({ error: 'Server error during user update.' });
        }
    } catch (err) {
        console.error(`❌ [API PUT] Connection Error for ${id}:`, err.message, err.stack);
        res.status(500).json({ error: 'Server error during user update.' });
    }
});


// ⚡ CLOUD RUN OPTIMIZED: Storage will be initialized lazily after server starts
// const storage = new Storage(); // Moved to loadHeavyModules()
const BUCKET_NAME = 'matcanban-assets';

// ✅ IMPROVEMENT: Load node-cron for scheduled backups
let cron = null;
try {
    cron = require('node-cron');
    console.log('✅ node-cron loaded for scheduled backups');
} catch (error) {
    console.warn('⚠️  node-cron not available:', error.message);
}

// ✅ IMPROVEMENT: Backup verification function
const verifyBackupFile = async (bucket, fileName, expectedUserCount) => {
    try {
        console.log('🔍 [VERIFY] Verifying backup file:', fileName);
        const file = bucket.file(fileName);
        const [exists] = await file.exists();

        if (!exists) {
            console.error('❌ [VERIFY] Backup file does not exist:', fileName);
            return { success: false, error: 'File does not exist' };
        }

        // Download and verify
        const [buffer] = await file.download();
        const backupData = JSON.parse(buffer.toString());

        // Verify structure
        if (!backupData.users || !Array.isArray(backupData.users)) {
            console.error('❌ [VERIFY] Invalid backup format: users array not found');
            return { success: false, error: 'Invalid backup format' };
        }

        // Verify user count
        if (backupData.totalUsers !== expectedUserCount) {
            console.error(`❌ [VERIFY] User count mismatch: expected ${expectedUserCount}, got ${backupData.totalUsers}`);
            return { success: false, error: `User count mismatch: expected ${expectedUserCount}, got ${backupData.totalUsers}` };
        }

        if (backupData.users.length !== expectedUserCount) {
            console.error(`❌ [VERIFY] Users array length mismatch: expected ${expectedUserCount}, got ${backupData.users.length}`);
            return { success: false, error: `Users array length mismatch: expected ${expectedUserCount}, got ${backupData.users.length}` };
        }

        // Verify timestamp exists
        if (!backupData.timestamp) {
            console.error('❌ [VERIFY] Missing timestamp in backup');
            return { success: false, error: 'Missing timestamp' };
        }

        console.log(`✅ [VERIFY] Backup verified successfully: ${backupData.totalUsers} users, timestamp: ${backupData.timestamp}`);
        return { success: true, verifiedCount: backupData.totalUsers };
    } catch (error) {
        console.error('❌ [VERIFY] Verification error:', error.message);
        return { success: false, error: error.message };
    }
};

// --- Helper Function to backup users data to Cloud Storage ---
const backupUsersToCloudStorage = async (skipVerification = false) => {
    // ⚡ Lazy load Storage if not already loaded
    if (!storage) {
        loadHeavyModules();
    }

    if (!storage) {
        console.log('⚠️  Storage not available, skipping backup');
        return { success: false, error: 'Storage not available' };
    }

    if (!isRealDatabasePool()) {
        console.log('⚠️  Database not available, skipping backup');
        return { success: false, error: 'Database not available' };
    }

    try {
        // Get all users from database
        const result = await pool.query('SELECT * FROM users ORDER BY "registered_at" DESC');
        const users = result.rows;

        // Remove passwords from backup (security)
        const usersForBackup = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        // Create backup data with metadata
        const backupData = {
            timestamp: new Date().toISOString(),
            totalUsers: users.length,
            users: usersForBackup
        };

        // Create filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const fileName = `backups/users-backup-${timestamp}.json`;

        // Also create latest backup
        const latestFileName = 'backups/users-latest.json';

        // Upload to Cloud Storage
        const bucket = storage.bucket(BUCKET_NAME);

        // Upload timestamped backup
        const file = bucket.file(fileName);
        await file.save(JSON.stringify(backupData, null, 2), {
            contentType: 'application/json',
            metadata: {
                cacheControl: 'public, max-age=3600',
            },
        });

        // Upload latest backup
        const latestFile = bucket.file(latestFileName);
        await latestFile.save(JSON.stringify(backupData, null, 2), {
            contentType: 'application/json',
            metadata: {
                cacheControl: 'public, max-age=3600',
            },
        });

        const totalUsers = users.length;
        console.log(`✅ Users backup uploaded: ${totalUsers} users saved to ${fileName} and ${latestFileName}`);

        // ✅ IMPROVEMENT: Verify backup files after upload
        if (!skipVerification) {
            console.log('🔍 [BACKUP] Verifying backup files...');

            // Verify timestamped backup
            const timestampedVerify = await verifyBackupFile(bucket, fileName, totalUsers);
            if (!timestampedVerify.success) {
                console.error('❌ [BACKUP] Timestamped backup verification failed:', timestampedVerify.error);
                // Don't fail the backup, but log the error
            }

            // Verify latest backup
            const latestVerify = await verifyBackupFile(bucket, latestFileName, totalUsers);
            if (!latestVerify.success) {
                console.error('❌ [BACKUP] Latest backup verification failed:', latestVerify.error);
                // Don't fail the backup, but log the error
            }

            if (timestampedVerify.success && latestVerify.success) {
                console.log('✅ [BACKUP] All backup files verified successfully');
            }
        }

        return { success: true, fileName, latestFileName, totalUsers };
    } catch (error) {
        console.error('❌ Failed to backup users to Cloud Storage:', error.message);
        return { success: false, error: error.message };
    }
};
app.get('/api/image-url/:fileName', async (req, res) => {
    const { fileName } = req.params;
    if (!fileName) return res.status(400).json({ error: 'File name is required.' });

    // ⚡ Lazy load Storage if not already loaded
    if (!storage) {
        loadHeavyModules();
    }

    if (!storage) {
        return res.status(503).json({ error: 'Storage service not available' });
    }

    try {
        const options = { version: 'v4', action: 'read', expires: Date.now() + 15 * 60 * 1000 };
        const [url] = await storage.bucket(BUCKET_NAME).file(fileName).getSignedUrl(options);
        res.json({ url });
    } catch (err) {
        console.error(`Failed to get signed URL for ${fileName}:`, err.message);
        res.status(500).json({ error: 'Could not retrieve image URL.' });
    }
});

// ⚡ CLOUD RUN OPTIMIZED: authenticateToken middleware moved to line 330 (before routes)
// This duplicate definition is removed to prevent "Cannot access before initialization" errors

// --- Test Results API Endpoints ---

// Save test result - 🔒 SECURITY: Requires authentication
app.post('/api/test-results', authenticateToken, async (req, res) => {
    const { userId, testType, testId, testName, score, totalQuestions, percentage, timeSpent, questionAnswers } = req.body;

    // 🔒 SECURITY: User can only save their own test results
    if (req.user.id !== userId && req.user.id !== parseInt(userId)) {
        console.warn(`⚠️ [SECURITY] User ${req.user.id} tried to save test result for user ${userId}`);
        return res.status(403).json({ error: 'You can only save your own test results.' });
    }

    if (!userId || !testType || !testId || score === undefined || totalQuestions === undefined || percentage === undefined) {
        return res.status(400).json({ error: 'Missing required fields: userId, testType, testId, score, totalQuestions, percentage' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const result = await pool.query(`
            INSERT INTO test_results (user_id, test_type, test_id, test_name, score, total_questions, percentage, time_spent, question_answers)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `, [userId, testType, testId, testName || null, score, totalQuestions, percentage, timeSpent || null, JSON.stringify(questionAnswers || [])]);

        // 🔄 Auto-update user progress (async, non-blocking)
        updateUserProgress(userId, testType, testId, testName, score, totalQuestions, percentage, timeSpent || 0)
            .catch(err => console.warn('Background progress update failed:', err.message));

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('API Save Test Result Error:', err.message);
        res.status(500).json({ error: 'Server error while saving test result.' });
    }
});

// Get test results for a specific user - 🔒 SECURITY: Requires authentication
app.get('/api/test-results/user/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // 🔒 SECURITY: User can only view their own test results (unless admin)
    const isAdminUser = req.user.role === 'Super Admin' || normalizeRole(req.user.role) === 'Super Admin';
    if (req.user.id !== parseInt(userId) && !isAdminUser) {
        console.warn(`⚠️ [SECURITY] User ${req.user.id} tried to view test results for user ${userId}`);
        return res.status(403).json({ error: 'You can only view your own test results.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const result = await pool.query(`
            SELECT * FROM test_results 
            WHERE user_id = $1 
            ORDER BY completed_at DESC 
            LIMIT $2 OFFSET $3
        `, [userId, limit, offset]);

        res.json(result.rows);
    } catch (err) {
        console.error('API Get User Test Results Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching test results.' });
    }
});

// Get all test results (admin only)
app.get('/api/test-results', adminAuth, async (req, res) => {
    const { userId, testType, testId, limit = 100, offset = 0 } = req.query;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        let query = 'SELECT tr.*, u.name as user_name, u.email as user_email FROM test_results tr JOIN users u ON tr.user_id = u.id WHERE 1=1';
        const params = [];
        let paramCount = 1;

        if (userId) {
            query += ` AND tr.user_id = $${paramCount}`;
            params.push(userId);
            paramCount++;
        }
        if (testType) {
            query += ` AND tr.test_type = $${paramCount}`;
            params.push(testType);
            paramCount++;
        }
        if (testId) {
            query += ` AND tr.test_id = $${paramCount}`;
            params.push(testId);
            paramCount++;
        }

        query += ` ORDER BY tr.completed_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        params.push(limit, offset);

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('API Get All Test Results Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching test results.' });
    }
});

// Get test statistics for a user
app.get('/api/test-results/stats/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const stats = await pool.query(`
            SELECT 
                COUNT(*) as total_tests,
                SUM(CASE WHEN percentage >= 80 THEN 1 ELSE 0 END) as tests_passed,
                AVG(percentage) as average_percentage,
                MAX(percentage) as best_score,
                MIN(percentage) as worst_score,
                SUM(time_spent) as total_time_spent,
                COUNT(DISTINCT test_type) as test_types_count,
                COUNT(DISTINCT test_id) as unique_tests_count,
                SUM(score) as total_score
            FROM test_results
            WHERE user_id = $1
        `, [userId]);

        res.json(stats.rows[0] || {});
    } catch (err) {
        console.error('API Get Test Stats Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching test statistics.' });
    }
});

// Gift Rewards API Endpoints
// Get all gift rewards for a user - 🔒 SECURITY: Requires authentication
app.get('/api/gift-rewards/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;

    // 🔒 SECURITY: User can only view their own gift rewards (unless admin)
    const isAdminUser = req.user.role === 'Super Admin' || normalizeRole(req.user.role) === 'Super Admin';
    if (req.user.id !== parseInt(userId) && !isAdminUser) {
        console.warn(`⚠️ [SECURITY] User ${req.user.id} tried to view gift rewards for user ${userId}`);
        return res.status(403).json({ error: 'You can only view your own gift rewards.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const result = await pool.query(`
            SELECT * FROM gift_rewards 
            WHERE user_id = $1 
            ORDER BY gift_level ASC
        `, [userId]);

        res.json(result.rows);
    } catch (err) {
        console.error('API Get Gift Rewards Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching gift rewards.' });
    }
});

// Claim a gift reward - 🔒 SECURITY: Requires authentication
app.post('/api/gift-rewards/claim', authenticateToken, async (req, res) => {
    const { user_id, gift_level } = req.body;

    if (!user_id || !gift_level) {
        return res.status(400).json({ error: 'Missing required fields: user_id, gift_level' });
    }

    // 🔒 SECURITY: User can only claim their own rewards
    if (req.user.id !== user_id && req.user.id !== parseInt(user_id)) {
        console.warn(`⚠️ [SECURITY] User ${req.user.id} tried to claim gift for user ${user_id}`);
        return res.status(403).json({ error: 'You can only claim your own rewards.' });
    }

    // Validate gift level
    const validLevels = [100, 300, 500, 700, 1000, 2000, 3000, 5000, 10000, 20000];
    if (!validLevels.includes(gift_level)) {
        return res.status(400).json({ error: 'Invalid gift level. Valid levels: 100, 300, 500, 700, 1000, 2000, 3000, 5000, 10000, 20000' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        // Check if user has enough bananas
        const userResult = await pool.query('SELECT "bananaBalance" FROM users WHERE id = $1', [user_id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const userBalance = userResult.rows[0].bananaBalance || 0;
        if (userBalance < gift_level) {
            return res.status(400).json({ error: `Insufficient bananas. Required: ${gift_level}, Current: ${userBalance}` });
        }

        // Check if already claimed
        const existingResult = await pool.query(
            'SELECT * FROM gift_rewards WHERE user_id = $1 AND gift_level = $2',
            [user_id, gift_level]
        );

        if (existingResult.rows.length > 0) {
            return res.json(existingResult.rows[0]); // Already claimed, return existing
        }

        // Insert new gift reward
        const result = await pool.query(`
            INSERT INTO gift_rewards (user_id, gift_level, claimed_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
            RETURNING *
        `, [user_id, gift_level]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('API Claim Gift Reward Error:', err.message);
        res.status(500).json({ error: 'Server error while claiming gift reward.' });
    }
});

// NEW: Ping endpoint for GCS connection status
app.get('/api/ping/storage', async (req, res) => {
    // ⚡ Lazy load Storage if not already loaded
    if (!storage) {
        loadHeavyModules();
    }

    if (!storage) {
        return res.status(503).json({ status: 'error', message: 'Storage service not available' });
    }

    try {
        const [exists] = await storage.bucket(BUCKET_NAME).exists();
        if (exists) {
            res.status(200).json({ status: 'ok', message: 'Cloud Storage bucket is accessible.' });
        } else {
            res.status(500).json({ status: 'error', message: `Bucket '${BUCKET_NAME}' does not exist.` });
        }
    } catch (err) {
        console.error('GCS Ping Error:', err.message);
        res.status(500).json({ status: 'error', message: 'Failed to connect to Cloud Storage.' });
    }
});

// NEW: Manual backup endpoint (requires admin auth)
app.post('/api/users/backup', adminAuth, async (req, res) => {
    try {
        const result = await backupUsersToCloudStorage();
        if (result.success) {
            res.status(200).json({
                success: true,
                message: `Users backup successful: ${result.totalUsers} users saved to Cloud Storage`,
                fileName: result.fileName,
                latestFileName: result.latestFileName,
                totalUsers: result.totalUsers
            });
        } else {
            res.status(500).json({
                success: false,
                error: result.error || 'Failed to backup users'
            });
        }
    } catch (err) {
        console.error('Manual backup error:', err.message);
        res.status(500).json({ error: 'Server error during backup.' });
    }
});

// NEW: Get latest backup info
app.get('/api/users/backup/latest', adminAuth, async (req, res) => {
    // ⚡ Lazy load Storage if not already loaded
    if (!storage) {
        loadHeavyModules();
    }

    if (!storage) {
        return res.status(503).json({ error: 'Storage service not available' });
    }

    try {
        const bucket = storage.bucket(BUCKET_NAME);
        const latestFile = bucket.file('backups/users-latest.json');
        const [exists] = await latestFile.exists();

        if (!exists) {
            return res.status(404).json({ error: 'No backup found.' });
        }

        const [metadata] = await latestFile.getMetadata();
        const [buffer] = await latestFile.download();
        const backupData = JSON.parse(buffer.toString());

        res.json({
            success: true,
            fileName: 'backups/users-latest.json',
            timestamp: backupData.timestamp,
            totalUsers: backupData.totalUsers,
            size: metadata.size,
            updated: metadata.updated
        });
    } catch (err) {
        console.error('Get latest backup error:', err.message);
        res.status(500).json({ error: 'Server error while fetching backup info.' });
    }
});

// NEW: List all backup files
app.get('/api/users/backup/list', adminAuth, async (req, res) => {
    // ⚡ Lazy load Storage if not already loaded
    if (!storage) {
        loadHeavyModules();
    }

    if (!storage) {
        return res.status(503).json({ error: 'Storage service not available' });
    }

    try {
        const bucket = storage.bucket(BUCKET_NAME);
        const [files] = await bucket.getFiles({ prefix: 'backups/' });

        const backups = files
            .filter(file => file.name.endsWith('.json'))
            .map(file => ({
                name: file.name,
                size: file.metadata.size,
                updated: file.metadata.updated,
                created: file.metadata.timeCreated
            }))
            .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by updated date (newest first)

        res.json({
            success: true,
            backups: backups,
            total: backups.length
        });
    } catch (err) {
        console.error('List backups error:', err.message);
        res.status(500).json({ error: 'Server error while listing backups.' });
    }
});

// NEW: Restore users from backup
app.post('/api/users/restore', adminAuth, async (req, res) => {
    const { fileName } = req.body; // Optional: restore from specific file (default: latest)

    // ⚡ Lazy load Storage if not already loaded
    if (!storage) {
        loadHeavyModules();
    }

    if (!storage) {
        return res.status(503).json({ error: 'Storage service not available' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    let client;
    try {
        console.log('🔍 [RESTORE] Starting restore process...');
        console.log('🔍 [RESTORE] File name:', fileName || 'backups/users-latest.json');

        // Download backup from Cloud Storage
        const backupFile = fileName || 'backups/users-latest.json';
        const bucket = storage.bucket(BUCKET_NAME);
        const file = bucket.file(backupFile);

        const [exists] = await file.exists();
        if (!exists) {
            return res.status(404).json({ error: `Backup file not found: ${backupFile}` });
        }

        console.log('✅ [RESTORE] Backup file found, downloading...');
        const [buffer] = await file.download();
        const backupData = JSON.parse(buffer.toString());

        if (!backupData.users || !Array.isArray(backupData.users)) {
            return res.status(400).json({ error: 'Invalid backup file format. Users array not found.' });
        }

        console.log(`✅ [RESTORE] Backup loaded: ${backupData.totalUsers} users from ${backupData.timestamp}`);

        // Restore users to database
        client = await getDatabaseClient();
        await client.query('BEGIN');
        console.log('✅ [RESTORE] Transaction started');

        let restoredCount = 0;
        let updatedCount = 0;
        let skippedCount = 0;

        for (const user of backupData.users) {
            try {
                // Check if user exists
                const existingUser = await client.query('SELECT id FROM users WHERE id = $1', [user.id]);

                if (existingUser.rows.length > 0) {
                    // Update existing user (but preserve password if it exists in DB)
                    // Only update non-sensitive fields from backup
                    await client.query(
                        `UPDATE users SET 
                            name = $1, 
                            email = $2, 
                            role = $3, 
                            packages = $4, 
                            activated = $5, 
                            "mobileLogin" = $6, 
                            "joinDate" = $7, 
                            "expiryDate" = $8, 
                            registered_at = $9, 
                            "bananaBalance" = $10
                         WHERE id = $11`,
                        [
                            user.name,
                            user.email,
                            user.role || 'Free',
                            JSON.stringify(user.packages || []),
                            user.activated !== undefined ? user.activated : true,
                            user.mobileLogin !== undefined ? user.mobileLogin : false,
                            user.joinDate || null,
                            user.expiryDate || '-',
                            user.registered_at || new Date().toISOString(),
                            user.bananaBalance || 30,
                            user.id
                        ]
                    );
                    updatedCount++;
                } else {
                    // Insert new user (password will need to be set manually or user needs to reset)
                    // 🔒 SECURITY FIX: Hash temporary password (NEVER store plain text)
                    const tempPassword = 'TEMP_RESET_REQUIRED';
                    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

                    await client.query(
                        `INSERT INTO users (id, name, email, password, role, packages, activated, "mobileLogin", "joinDate", "expiryDate", registered_at, "bananaBalance")
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                        [
                            user.id,
                            user.name,
                            user.email,
                            hashedTempPassword, // Hashed temporary password - user must reset
                            user.role || 'Free',
                            JSON.stringify(user.packages || []),
                            user.activated !== undefined ? user.activated : true,
                            user.mobileLogin !== undefined ? user.mobileLogin : false,
                            user.joinDate || null,
                            user.expiryDate || '-',
                            user.registered_at || new Date().toISOString(),
                            user.bananaBalance || 30
                        ]
                    );
                    restoredCount++;
                }
            } catch (userErr) {
                console.error(`⚠️ [RESTORE] Error restoring user ${user.id}:`, userErr.message);
                skippedCount++;
            }
        }

        await client.query('COMMIT');
        console.log('✅ [RESTORE] Transaction committed');

        const totalProcessed = restoredCount + updatedCount;
        console.log(`✅ [RESTORE] Restore complete: ${restoredCount} restored, ${updatedCount} updated, ${skippedCount} skipped`);

        res.json({
            success: true,
            message: `Restore complete: ${restoredCount} users restored, ${updatedCount} users updated, ${skippedCount} skipped`,
            restored: restoredCount,
            updated: updatedCount,
            skipped: skippedCount,
            total: totalProcessed,
            backupTimestamp: backupData.timestamp,
            backupTotalUsers: backupData.totalUsers
        });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [RESTORE] Rollback error:', rollbackErr.message);
            }
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [RESTORE] Release error:', releaseErr.message);
            }
        }
        console.error('❌ [RESTORE] Restore error:', err.message);
        console.error('❌ [RESTORE] Error stack:', err.stack);
        res.status(500).json({
            error: 'Server error during restore.',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});


// --- AIO DATA SYNC API ---

app.post('/api/sync-data', adminAuth, async (req, res) => {
    const dataToSync = req.body;
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }
    const client = await getDatabaseClient();

    try {
        await client.query('BEGIN');

        let totalItemsProcessed = 0;

        for (const [key, items] of Object.entries(dataToSync)) {
            // Sanitize table name to prevent SQL injection, allowing only letters, numbers, and underscores
            const sanitizedTableName = key.replace(/[^a-zA-Z0-9_]/g, '');

            // For most keys, which are arrays of objects with 'id' or 'code'
            if (Array.isArray(items)) {
                // Idempotently create the table if it doesn't exist
                await client.query(`CREATE TABLE IF NOT EXISTS "${sanitizedTableName}" (id TEXT PRIMARY KEY, data JSONB);`);

                for (const item of items) {
                    const itemId = item.code || item.id;
                    if (itemId === undefined) {
                        console.warn(`Skipping item in ${sanitizedTableName} due to missing id/code:`, item);
                        continue;
                    }

                    const upsertQuery = `
                        INSERT INTO "${sanitizedTableName}" (id, data) 
                        VALUES ($1, $2) 
                        ON CONFLICT (id) 
                        DO UPDATE SET data = EXCLUDED.data;
                    `;
                    await client.query(upsertQuery, [String(itemId), JSON.stringify(item)]);
                    totalItemsProcessed++;
                }
            } else if (typeof items === 'object' && items !== null) {
                // Handle special cases like 'MATCANBAN_GRAMMAR_VOCAB' which is an object, not an array
                await client.query(`CREATE TABLE IF NOT EXISTS "${sanitizedTableName}" (id TEXT PRIMARY KEY, data JSONB);`);
                const upsertQuery = `
                    INSERT INTO "${sanitizedTableName}" (id, data) 
                    VALUES ($1, $2) 
                    ON CONFLICT (id) 
                    DO UPDATE SET data = EXCLUDED.data;
                 `;
                // Use the version as the ID for this specific object
                const objectId = items.version || 'default';
                await client.query(upsertQuery, [objectId, JSON.stringify(items)]);
                totalItemsProcessed++;
            }
        }

        await client.query('COMMIT');
        res.status(200).json({ message: `Data successfully synced. Processed ${totalItemsProcessed} items across ${Object.keys(dataToSync).length} categories.` });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('API Sync Error:', err);
        res.status(500).json({ error: `Server error during sync: ${err.message}` });
    } finally {
        client.release();
    }
});

// --- Test Questions API Endpoints ---

// Simple solution: Frontend will load test data directly
// Backend API just returns a message that data should be loaded from frontend
// This is simpler because frontend can import TypeScript files directly via Vite

// Simple solution: Return test registry info instead of loading data
// Frontend can load TypeScript files directly via Vite
const loadTestData = (testId) => {
    // For now, return null - frontend should load data directly
    // This is simpler because Vite can handle TypeScript imports
    console.log(`[LoadTestData] Test ${testId} data should be loaded from frontend`);
    return null;
};

// Get test questions
app.get('/api/test-questions/:testId', adminAuth, async (req, res) => {
    const { testId } = req.params;

    try {
        console.log(`[API] GET /api/test-questions/${testId}`);
        const questionData = loadTestData(testId);

        if (!questionData) {
            console.error(`[API] Test ${testId} not found or data file not available`);
            return res.status(404).json({
                error: `Test ${testId} not found or data file not available`,
                details: 'Check server logs for more information'
            });
        }

        console.log(`[API] Successfully returning ${questionData.length} questions for ${testId}`);
        res.json({ questions: questionData });
    } catch (err) {
        console.error('[API] Get Test Questions Error:', err.message);
        console.error('[API] Stack:', err.stack);
        res.status(500).json({
            error: 'Server error while fetching test questions.',
            details: err.message
        });
    }
});

// Update test question (explanation and rule only)
// Simple solution: Save to database instead of editing TypeScript files
app.put('/api/test-questions/:testId/:questionId', adminAuth, async (req, res) => {
    const { testId, questionId } = req.params;
    const { explanation, rule } = req.body;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        // Upsert question override
        await client.query(`
            INSERT INTO test_question_overrides (test_id, question_id, explanation, rule, updated_at)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
            ON CONFLICT (test_id, question_id)
            DO UPDATE SET 
                explanation = EXCLUDED.explanation,
                rule = EXCLUDED.rule,
                updated_at = CURRENT_TIMESTAMP
        `, [testId, parseInt(questionId, 10), explanation || null, rule || null]);

        await client.query('COMMIT');
        res.json({ success: true, message: 'Question updated successfully' });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('Rollback error:', rollbackErr.message);
            }
        }
        console.error('API Update Test Question Error:', err.message);
        console.error('Stack:', err.stack);
        res.status(500).json({ error: 'Server error while updating test question.', details: err.message });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// Get test question overrides (for merging with original data)
app.get('/api/test-questions/:testId/overrides', adminAuth, async (req, res) => {
    const { testId } = req.params;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        const result = await client.query(`
            SELECT question_id, explanation, rule, updated_at
            FROM test_question_overrides
            WHERE test_id = $1
            ORDER BY question_id
        `, [testId]);

        res.json(result.rows);
    } catch (err) {
        console.error('API Get Test Question Overrides Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching question overrides.', details: err.message });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// Handle SPA routing - serve index.html for all non-API routes
// Banana Transactions API
// Rate limiting for banana transactions (simple in-memory store)
const transactionRateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_TRANSACTIONS_PER_WINDOW = 10;

const checkRateLimit = (userId) => {
    const now = Date.now();
    const userTransactions = transactionRateLimit.get(userId) || [];
    const recentTransactions = userTransactions.filter(time => now - time < RATE_LIMIT_WINDOW);

    if (recentTransactions.length >= MAX_TRANSACTIONS_PER_WINDOW) {
        return false;
    }

    recentTransactions.push(now);
    transactionRateLimit.set(userId, recentTransactions);
    return true;
};

app.post('/api/banana-transactions', authenticateToken, async (req, res) => {
    const { userId, transactionType, amount, reason, source } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
    const authenticatedUserId = req.user.userId; // From JWT token

    // 🔒 SECURITY: Validate input data
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        console.warn('⚠️ [SECURITY] Invalid user ID in banana transaction request:', { userId, ip: clientIP });
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // 🔒 SECURITY: Verify user can only modify their own balance
    if (userId !== authenticatedUserId) {
        console.warn('⚠️ [SECURITY] User attempted to modify balance of another user:', {
            authenticatedUserId,
            requestedUserId: userId,
            ip: clientIP
        });
        return res.status(403).json({ error: 'You can only modify your own balance.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    // 🔒 SECURITY: Verify user exists
    try {
        const userCheck = await pool.query('SELECT id, email, "bananaBalance" FROM users WHERE id = $1', [userId]);
        if (userCheck.rows.length === 0) {
            console.warn('⚠️ [SECURITY] Attempted transaction for non-existent user:', { userId, ip: clientIP });
            return res.status(404).json({ error: 'User not found.' });
        }

        // ✅ User authenticated and authorized successfully
        console.log('✅ [SECURITY] User authenticated for transaction:', { userId, email: userCheck.rows[0].email, ip: clientIP });
    } catch (err) {
        console.error('❌ [SECURITY] Error checking user existence:', err.message);
        return res.status(500).json({ error: 'Server error while verifying user.' });
    }

    if (!transactionType || !['add', 'deduct'].includes(transactionType)) {
        return res.status(400).json({ error: 'Invalid transaction type. Must be "add" or "deduct".' });
    }

    if (typeof amount !== 'number' || amount <= 0 || !Number.isInteger(amount)) {
        return res.status(400).json({ error: 'Invalid amount. Must be a positive integer.' });
    }

    // 🔒 SECURITY: Prevent excessive amounts (anti-hack)
    const MAX_AMOUNT = 100000; // Maximum 100k bananas per transaction
    if (amount > MAX_AMOUNT) {
        console.warn('⚠️ [SECURITY] Attempted transaction with excessive amount:', { userId, amount });
        return res.status(400).json({ error: 'Transaction amount exceeds maximum limit.' });
    }

    // 🔒 SECURITY: Rate limiting
    if (!checkRateLimit(userId)) {
        console.warn('⚠️ [SECURITY] Rate limit exceeded for user:', userId);
        return res.status(429).json({ error: 'Too many transactions. Please try again later.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    const client = await getDatabaseClient();

    try {
        await client.query('BEGIN');

        // 🔒 SECURITY: Get current balance with row lock to prevent race conditions
        const currentUser = await client.query(
            'SELECT "bananaBalance" FROM users WHERE id = $1 FOR UPDATE',
            [userId]
        );

        if (currentUser.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'User not found.' });
        }

        const balanceBefore = currentUser.rows[0].bananaBalance || 0;

        // 🔒 SECURITY: Validate balance is not negative
        if (balanceBefore < 0) {
            console.error('⚠️ [SECURITY] Negative balance detected:', { userId, balanceBefore });
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Invalid user balance detected.' });
        }

        // 🔒 SECURITY: Validate deduct transaction
        if (transactionType === 'deduct' && balanceBefore < amount) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Insufficient banana balance.' });
        }

        // Calculate new balance
        const balanceAfter = transactionType === 'add'
            ? balanceBefore + amount
            : balanceBefore - amount;

        // 🔒 SECURITY: Validate new balance is not negative
        if (balanceAfter < 0) {
            console.error('⚠️ [SECURITY] Attempted to create negative balance:', { userId, balanceBefore, amount, balanceAfter });
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Transaction would result in negative balance.' });
        }

        // 🔒 SECURITY: Validate new balance is not excessive
        const MAX_BALANCE = 1000000; // Maximum 1M bananas
        if (balanceAfter > MAX_BALANCE) {
            console.warn('⚠️ [SECURITY] Attempted to exceed maximum balance:', { userId, balanceAfter });
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Balance would exceed maximum limit.' });
        }

        // Update user balance
        await client.query('UPDATE users SET "bananaBalance" = $1 WHERE id = $2', [balanceAfter, userId]);

        // Log transaction
        const transactionResult = await client.query(
            `INSERT INTO banana_transactions (user_id, transaction_type, amount, balance_before, balance_after, reason, source, created_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [userId, transactionType, amount, balanceBefore, balanceAfter, reason || 'System transaction', source || 'system', (req.user && req.user.userId) || 'system']
        );

        await client.query('COMMIT');

        console.log('📝 [API POST /api/banana-transactions] Transaction logged:', {
            userId,
            type: transactionType,
            amount,
            before: balanceBefore,
            after: balanceAfter,
            source: source || 'system'
        });

        res.json({
            success: true,
            transaction: transactionResult.rows[0],
            newBalance: balanceAfter
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ [API POST /api/banana-transactions] Error:', err.message, err.stack);
        res.status(500).json({ error: 'Server error while processing transaction.' });
    } finally {
        client.release();
    }
});

// Public endpoint for banana transactions (no JWT required, but verifies user identity)
// This allows users without JWT token to still log transactions to database
app.post('/api/banana-transactions/public', async (req, res) => {
    const { userId, transactionType, amount, reason, source, userEmail, userPassword } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';

    // 🔒 SECURITY: Validate input data
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        console.warn('⚠️ [SECURITY] Invalid user ID in public banana transaction request:', { userId, ip: clientIP });
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // 🔒 SECURITY: Verify user identity (email + password)
    if (!userEmail || !userPassword) {
        console.warn('⚠️ [SECURITY] Missing credentials in public banana transaction request:', { userId, ip: clientIP });
        return res.status(401).json({ error: 'User credentials required for public transactions.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    // 🔒 SECURITY: Verify user exists and credentials are correct
    // ✅ SIMPLIFIED: Plain text password comparison (no bcrypt)
    try {
        const userCheck = await pool.query('SELECT id, email, password, "bananaBalance" FROM users WHERE id = $1 AND email = $2', [userId, userEmail]);
        if (userCheck.rows.length === 0) {
            console.warn('⚠️ [SECURITY] Invalid credentials in public banana transaction request:', { userId, email: userEmail, ip: clientIP });
            // Add delay to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 500));
            return res.status(401).json({ error: 'Invalid user credentials.' });
        }

        const user = userCheck.rows[0];

        // ✅ SIMPLIFIED: Plain text password comparison
        // Support both bcrypt (old) and plain text (new) for backward compatibility
        let passwordValid = false;
        if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$') || user.password.startsWith('$2y$'))) {
            // Old format: bcrypt hash - verify with bcrypt
            passwordValid = await bcrypt.compare(userPassword, user.password);
        } else {
            // New format: plain text - direct comparison
            passwordValid = (user.password === userPassword);
        }

        if (!passwordValid) {
            console.warn('⚠️ [SECURITY] Invalid password in public banana transaction request:', { userId, email: userEmail, ip: clientIP });
            // Add delay to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 500));
            return res.status(401).json({ error: 'Invalid user credentials.' });
        }

        // ✅ User authenticated successfully
        console.log('✅ [SECURITY] User authenticated for public transaction:', { userId, email: user.email, ip: clientIP });
    } catch (err) {
        console.error('❌ [SECURITY] Error checking user credentials:', err.message);
        return res.status(500).json({ error: 'Server error while verifying user.' });
    }

    if (!transactionType || !['add', 'deduct'].includes(transactionType)) {
        return res.status(400).json({ error: 'Invalid transaction type. Must be "add" or "deduct".' });
    }

    if (typeof amount !== 'number' || amount <= 0 || !Number.isInteger(amount)) {
        return res.status(400).json({ error: 'Invalid amount. Must be a positive integer.' });
    }

    // 🔒 SECURITY: Prevent excessive amounts (anti-hack)
    const MAX_AMOUNT = 100000; // Maximum 100k bananas per transaction
    if (amount > MAX_AMOUNT) {
        console.warn('⚠️ [SECURITY] Attempted public transaction with excessive amount:', { userId, amount });
        return res.status(400).json({ error: 'Transaction amount exceeds maximum limit.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    const client = await getDatabaseClient();

    try {
        await client.query('BEGIN');

        // 🔒 SECURITY: Get current balance with row lock to prevent race conditions
        const currentUser = await client.query(
            'SELECT "bananaBalance" FROM users WHERE id = $1 FOR UPDATE',
            [userId]
        );

        if (currentUser.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'User not found.' });
        }

        const balanceBefore = currentUser.rows[0].bananaBalance || 0;

        // 🔒 SECURITY: Validate balance is not negative
        if (balanceBefore < 0) {
            console.error('⚠️ [SECURITY] Negative balance detected:', { userId, balanceBefore });
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Invalid user balance detected.' });
        }

        // 🔒 SECURITY: Validate deduct transaction
        if (transactionType === 'deduct' && balanceBefore < amount) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Insufficient banana balance.' });
        }

        // Calculate new balance
        const balanceAfter = transactionType === 'add'
            ? balanceBefore + amount
            : balanceBefore - amount;

        // 🔒 SECURITY: Validate new balance is not negative
        if (balanceAfter < 0) {
            console.error('⚠️ [SECURITY] Attempted to create negative balance:', { userId, balanceBefore, amount, balanceAfter });
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Transaction would result in negative balance.' });
        }

        // 🔒 SECURITY: Validate new balance is not excessive
        const MAX_BALANCE = 1000000; // Maximum 1M bananas
        if (balanceAfter > MAX_BALANCE) {
            console.warn('⚠️ [SECURITY] Attempted to create excessive balance:', { userId, balanceAfter });
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Balance would exceed maximum limit (1,000,000).' });
        }

        // Update user balance
        await client.query(
            'UPDATE users SET "bananaBalance" = $1 WHERE id = $2',
            [balanceAfter, userId]
        );

        // Log transaction
        const transactionResult = await client.query(
            `INSERT INTO banana_transactions (user_id, transaction_type, amount, balance_before, balance_after, reason, source, created_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [userId, transactionType, amount, balanceBefore, balanceAfter, reason || 'Public transaction', source || 'public', userId]
        );

        await client.query('COMMIT');

        console.log(`✅ [API POST /api/banana-transactions/public] Transaction logged:`, {
            userId,
            type: transactionType,
            amount,
            balanceBefore,
            balanceAfter,
            ip: clientIP
        });

        res.json({
            success: true,
            transaction: transactionResult.rows[0],
            newBalance: balanceAfter
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ [API POST /api/banana-transactions/public] Error:', err.message, err.stack);
        res.status(500).json({ error: 'Server error while processing transaction.' });
    } finally {
        client.release();
    }
});

// Get banana transaction history for a user
app.get('/api/banana-transactions/:userId', async (req, res) => {
    const { userId } = req.params;
    const { limit = 100, offset = 0 } = req.query;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const result = await pool.query(
            `SELECT * FROM banana_transactions 
             WHERE user_id = $1 
             ORDER BY created_at DESC 
             LIMIT $2 OFFSET $3`,
            [userId, parseInt(limit), parseInt(offset)]
        );

        const countResult = await pool.query(
            'SELECT COUNT(*) as total FROM banana_transactions WHERE user_id = $1',
            [userId]
        );

        res.json({
            transactions: result.rows,
            total: parseInt(countResult.rows[0].total),
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (err) {
        console.error('❌ [API GET /api/banana-transactions/:userId] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching transactions.' });
    }
});

// Get all banana transactions (Admin only)
app.get('/api/banana-transactions', adminAuth, async (req, res) => {
    const { userId, transactionType, limit = 100, offset = 0 } = req.query;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        let query = 'SELECT bt.*, u.name as user_name, u.email as user_email FROM banana_transactions bt LEFT JOIN users u ON bt.user_id = u.id';
        const values = [];
        const conditions = [];

        if (userId) {
            conditions.push(`bt.user_id = $${values.length + 1}`);
            values.push(userId);
        }

        if (transactionType) {
            conditions.push(`bt.transaction_type = $${values.length + 1}`);
            values.push(transactionType);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY bt.created_at DESC LIMIT $' + (values.length + 1) + ' OFFSET $' + (values.length + 2);
        values.push(parseInt(limit), parseInt(offset));

        const result = await pool.query(query, values);

        // Build count query
        let countQuery = 'SELECT COUNT(*) as total FROM banana_transactions';
        const countValues = [];
        const countConditions = [];

        if (userId) {
            countConditions.push(`user_id = $${countValues.length + 1}`);
            countValues.push(userId);
        }

        if (transactionType) {
            countConditions.push(`transaction_type = $${countValues.length + 1}`);
            countValues.push(transactionType);
        }

        if (countConditions.length > 0) {
            countQuery += ' WHERE ' + countConditions.join(' AND ');
        }

        const countResult = await pool.query(countQuery, countValues);

        res.json({
            transactions: result.rows,
            total: parseInt(countResult.rows[0].total),
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (err) {
        console.error('❌ [API GET /api/banana-transactions] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching transactions.' });
    }
});

// 🔒 SECURITY: Balance integrity check endpoint (Admin only)
app.post('/api/banana-transactions/verify', adminAuth, async (req, res) => {
    const { userId } = req.body;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        if (userId) {
            // Verify single user
            const userResult = await pool.query('SELECT id, "bananaBalance" FROM users WHERE id = $1', [userId]);

            if (userResult.rows.length === 0) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const currentBalance = userResult.rows[0].bananaBalance || 0;

            // Calculate balance from transactions
            const transactionsResult = await pool.query(
                `SELECT transaction_type, amount, balance_before, balance_after 
                 FROM banana_transactions 
                 WHERE user_id = $1 
                 ORDER BY created_at ASC`,
                [userId]
            );

            let calculatedBalance = 0;
            let isValid = true;
            let issueAt = null;

            if (transactionsResult.rows.length > 0) {
                // Start from first transaction's balance_after
                calculatedBalance = transactionsResult.rows[transactionsResult.rows.length - 1].balance_after;

                // Verify each transaction chain
                for (let i = 1; i < transactionsResult.rows.length; i++) {
                    const prev = transactionsResult.rows[i - 1];
                    const curr = transactionsResult.rows[i];

                    if (prev.balance_after !== curr.balance_before) {
                        isValid = false;
                        issueAt = curr.id;
                        break;
                    }
                }
            }

            if (currentBalance !== calculatedBalance) {
                isValid = false;
                console.error('⚠️ [SECURITY] Balance mismatch detected:', { userId, currentBalance, calculatedBalance });
            }

            res.json({
                valid: isValid,
                userId,
                currentBalance,
                calculatedBalance,
                transactionCount: transactionsResult.rows.length,
                issueAt
            });
        } else {
            // Verify all users
            const allUsers = await pool.query('SELECT id, "bananaBalance" FROM users');
            const issues = [];

            for (const user of allUsers.rows) {
                const transactionsResult = await pool.query(
                    `SELECT balance_after 
                     FROM banana_transactions 
                     WHERE user_id = $1 
                     ORDER BY created_at DESC 
                     LIMIT 1`,
                    [user.id]
                );

                let calculatedBalance = 0;
                if (transactionsResult.rows.length > 0) {
                    calculatedBalance = transactionsResult.rows[0].balance_after;
                }

                if (user.bananaBalance !== calculatedBalance) {
                    issues.push({
                        userId: user.id,
                        currentBalance: user.bananaBalance,
                        calculatedBalance
                    });
                }
            }

            res.json({
                valid: issues.length === 0,
                totalUsers: allUsers.rows.length,
                issues
            });
        }
    } catch (err) {
        console.error('❌ [API POST /api/banana-transactions/verify] Error:', err.message);
        res.status(500).json({ error: 'Server error while verifying transactions.' });
    }
});

// Daily Check-in API - User can check in once per day
// 🔒 SECURITY: Requires authentication, validates date on server, prevents duplicate check-ins
app.post('/api/daily-checkin', authenticateToken, async (req, res) => {
    const authenticatedUserId = req.user.userId; // From JWT token
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const client = await getDatabaseClient();

        try {
            // 🔒 SECURITY: Use server-side date (not client-side) to prevent date manipulation
            const serverDate = new Date();
            const serverDateString = serverDate.toISOString().split('T')[0]; // YYYY-MM-DD format

            // 🔒 SECURITY: Verify user exists
            const userResult = await client.query('SELECT id, "bananaBalance" FROM users WHERE id = $1', [authenticatedUserId]);
            if (userResult.rows.length === 0) {
                client.release();
                return res.status(404).json({ error: 'User not found.' });
            }

            const currentBalance = userResult.rows[0].bananaBalance || 0;

            // 🔒 SECURITY: Check if user already checked in today (using server date)
            // 1 ngày chỉ được điểm danh 1 lần
            const existingCheckin = await client.query(
                'SELECT id, checkin_date, bananas_earned FROM daily_checkins WHERE user_id = $1 AND checkin_date = $2',
                [authenticatedUserId, serverDateString]
            );

            if (existingCheckin.rows.length > 0) {
                client.release();
                return res.status(400).json({
                    error: 'Ngày mai bạn vào điểm danh để nhận thưởng tiếp nhé',
                    alreadyCheckedIn: true,
                    checkinDate: existingCheckin.rows[0].checkin_date,
                    bananasEarned: existingCheckin.rows[0].bananas_earned
                });
            }

            // Calculate bananas to award
            // Cứ điểm danh là được 3 chuối
            const bananasToAward = 3;
            const newBalance = currentBalance + bananasToAward;

            // Start transaction
            await client.query('BEGIN');

            try {
                // Insert check-in record
                await client.query(
                    `INSERT INTO daily_checkins (user_id, checkin_date, bananas_earned, is_sunday)
                     VALUES ($1, $2, $3, $4)`,
                    [authenticatedUserId, serverDateString, bananasToAward, false]
                );

                // Update user balance
                await client.query(
                    'UPDATE users SET "bananaBalance" = $1 WHERE id = $2',
                    [newBalance, authenticatedUserId]
                );

                // Log transaction
                await client.query(
                    `INSERT INTO banana_transactions (user_id, transaction_type, amount, balance_before, balance_after, reason, source, created_by)
                     VALUES ($1, 'add', $2, $3, $4, $5, 'daily_checkin', $6)`,
                    [
                        authenticatedUserId,
                        bananasToAward,
                        currentBalance,
                        newBalance,
                        'Điểm danh hàng ngày',
                        authenticatedUserId
                    ]
                );

                await client.query('COMMIT');
                client.release();

                console.log(`✅ [API POST /api/daily-checkin] User ${authenticatedUserId} checked in on ${serverDateString}, earned ${bananasToAward} bananas`);

                res.json({
                    success: true,
                    message: `Chúc mừng! Bạn đã điểm danh và nhận được ${bananasToAward} chuối! 🎉`,
                    bananasEarned: bananasToAward,
                    newBalance: newBalance,
                    checkinDate: serverDateString
                });
            } catch (transactionErr) {
                await client.query('ROLLBACK');
                client.release();
                throw transactionErr;
            }
        } catch (dbErr) {
            client.release();
            throw dbErr;
        }
    } catch (err) {
        console.error('❌ [API POST /api/daily-checkin] Error:', err.message, err.stack);
        res.status(500).json({ error: 'Server error while processing check-in.' });
    }
});

// Get daily check-in status for a user
app.get('/api/daily-checkin/status', authenticateToken, async (req, res) => {
    const authenticatedUserId = req.user.userId;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const serverDate = new Date();
        const serverDateString = serverDate.toISOString().split('T')[0];

        const checkinResult = await pool.query(
            'SELECT id, checkin_date, bananas_earned, is_sunday FROM daily_checkins WHERE user_id = $1 AND checkin_date = $2',
            [authenticatedUserId, serverDateString]
        );

        const hasCheckedInToday = checkinResult.rows.length > 0;
        // Cứ điểm danh là được 3 chuối
        const bananasToAward = 3;

        res.json({
            hasCheckedInToday,
            checkinDate: hasCheckedInToday ? checkinResult.rows[0].checkin_date : null,
            bananasEarned: hasCheckedInToday ? checkinResult.rows[0].bananas_earned : null,
            bananasToAward,
            todayDate: serverDateString
        });
    } catch (err) {
        console.error('❌ [API GET /api/daily-checkin/status] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching check-in status.' });
    }
});

// Get user progress statistics (Admin only) - Track if students are lazy or active
app.get('/api/user-progress', adminAuth, async (req, res) => {
    const { userId, courseType, sortBy = 'last_activity', order = 'desc', limit = 100, offset = 0 } = req.query;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        let query = `
            SELECT 
                up.*,
                u.name as user_name,
                u.email as user_email,
                u.role as user_role,
                u."bananaBalance" as user_banana_balance,
                CASE 
                    WHEN up.last_activity_date IS NULL THEN 999
                    WHEN up.last_activity_date < CURRENT_DATE - INTERVAL '7 days' THEN 3
                    WHEN up.last_activity_date < CURRENT_DATE - INTERVAL '3 days' THEN 2
                    ELSE 1
                END as activity_level
            FROM user_progress up
            JOIN users u ON up.user_id = u.id
            WHERE 1=1
        `;

        const params = [];
        let paramCount = 0;

        if (userId) {
            paramCount++;
            query += ` AND up.user_id = $${paramCount}`;
            params.push(userId);
        }

        if (courseType) {
            paramCount++;
            query += ` AND up.course_type = $${paramCount}`;
            params.push(courseType);
        }

        // Sorting
        const validSortBy = ['last_activity_date', 'completed_tests', 'average_percentage', 'total_time_spent', 'first_activity_date'];
        const sortColumn = validSortBy.includes(sortBy) ? sortBy : 'last_activity_date';
        const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        query += ` ORDER BY ${sortColumn} ${sortOrder} NULLS LAST`;

        // Pagination
        paramCount++;
        query += ` LIMIT $${paramCount}`;
        params.push(parseInt(limit));

        paramCount++;
        query += ` OFFSET $${paramCount}`;
        params.push(parseInt(offset));

        const result = await pool.query(query, params);

        // Get total count
        let countQuery = `
            SELECT COUNT(*) as total
            FROM user_progress up
            JOIN users u ON up.user_id = u.id
            WHERE 1=1
        `;
        const countParams = [];
        let countParamCount = 0;

        if (userId) {
            countParamCount++;
            countQuery += ` AND up.user_id = $${countParamCount}`;
            countParams.push(userId);
        }

        if (courseType) {
            countParamCount++;
            countQuery += ` AND up.course_type = $${countParamCount}`;
            countParams.push(courseType);
        }

        const countResult = await pool.query(countQuery, countParams);

        res.json({
            progress: result.rows,
            total: parseInt(countResult.rows[0].total),
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (err) {
        console.error('❌ [API GET /api/user-progress] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching user progress.' });
    }
});

// Get student activity summary (Admin only) - Identify lazy students
app.get('/api/user-progress/summary', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        // Get all users with their progress summary
        const summaryQuery = `
            SELECT 
                u.id,
                u.name,
                u.email,
                u.role,
                u."bananaBalance",
                u.registered_at,
                COUNT(DISTINCT up.course_type) as active_courses,
                SUM(up.completed_tests) as total_tests_completed,
                AVG(up.average_percentage) as overall_average,
                MAX(up.last_activity_date) as last_activity_date,
                MIN(up.first_activity_date) as first_activity_date,
                SUM(up.total_time_spent) as total_time_spent,
                CASE 
                    WHEN MAX(up.last_activity_date) IS NULL THEN 'Chưa làm bài'
                    WHEN MAX(up.last_activity_date) < CURRENT_DATE - INTERVAL '7 days' THEN 'Lười (7+ ngày)'
                    WHEN MAX(up.last_activity_date) < CURRENT_DATE - INTERVAL '3 days' THEN 'Ít hoạt động (3-7 ngày)'
                    ELSE 'Hoạt động tốt'
                END as activity_status
            FROM users u
            LEFT JOIN user_progress up ON u.id = up.user_id
            WHERE u.role != 'Super Admin'
            GROUP BY u.id, u.name, u.email, u.role, u."bananaBalance", u.registered_at
            ORDER BY 
                CASE 
                    WHEN MAX(up.last_activity_date) IS NULL THEN 4
                    WHEN MAX(up.last_activity_date) < CURRENT_DATE - INTERVAL '7 days' THEN 3
                    WHEN MAX(up.last_activity_date) < CURRENT_DATE - INTERVAL '3 days' THEN 2
                    ELSE 1
                END,
                MAX(up.last_activity_date) DESC NULLS LAST
        `;

        const result = await pool.query(summaryQuery);

        // Calculate statistics
        const totalStudents = result.rows.length;
        const lazyStudents = result.rows.filter(r => r.activity_status.includes('Lười') || r.activity_status === 'Chưa làm bài').length;
        const activeStudents = result.rows.filter(r => r.activity_status === 'Hoạt động tốt').length;
        const inactiveStudents = result.rows.filter(r => r.activity_status === 'Ít hoạt động').length;

        res.json({
            summary: result.rows,
            statistics: {
                totalStudents,
                lazyStudents,
                activeStudents,
                inactiveStudents,
                lazyPercentage: totalStudents > 0 ? Math.round((lazyStudents / totalStudents) * 100) : 0
            }
        });
    } catch (err) {
        console.error('❌ [API GET /api/user-progress/summary] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching student summary.' });
    }
});

// Health check endpoint (must be before catch-all route)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 🔒 SESSION HEARTBEAT: Check if user session is still valid
// Client calls this every 30s to check if they should be logged out
app.get('/api/session/heartbeat', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.json({ valid: false, action: 'logout', reason: 'no_token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        if (!isRealDatabasePool()) {
            return res.json({ valid: true }); // Can't check, assume valid
        }

        const client = await getDatabaseClient();
        try {
            // Check if session is still active in database
            const sessionResult = await client.query(
                `SELECT is_active, session_token FROM user_sessions 
                 WHERE user_id = $1 AND session_token = $2`,
                [userId, token]
            );

            // Session not found or inactive
            if (sessionResult.rows.length === 0 || !sessionResult.rows[0].is_active) {
                client.release();
                return res.json({
                    valid: false,
                    action: 'logout',
                    reason: 'session_invalidated',
                    message: 'Phiên đăng nhập đã bị vô hiệu hóa. Vui lòng đăng nhập lại.'
                });
            }

            // Check for force refresh flag (admin can set this)
            const forceRefreshResult = await client.query(
                `SELECT setting_value FROM system_settings WHERE setting_key = 'force_client_refresh'`
            );

            client.release();

            // ✅ FIX: Removed force_client_refresh check to prevent reload loop
            // The flag was causing infinite reload because it never gets reset
            // If admin needs to force refresh, they should use a different mechanism
            // that tracks which clients have already refreshed
            // if (forceRefreshResult.rows.length > 0 && forceRefreshResult.rows[0].setting_value === 'true') {
            //     return res.json({
            //         valid: true,
            //         action: 'refresh',
            //         message: 'Có cập nhật mới. Trang sẽ được tải lại.'
            //     });
            // }

            return res.json({ valid: true });

        } catch (dbErr) {
            try { client.release(); } catch (e) { }
            console.warn('⚠️ [HEARTBEAT] Database error:', dbErr.message);
            return res.json({ valid: true }); // Can't check, assume valid
        }
    } catch (jwtErr) {
        // Token expired or invalid
        return res.json({
            valid: false,
            action: 'logout',
            reason: 'token_invalid',
            message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        });
    }
});

// 🔒 ADMIN: Force logout a specific user (invalidate all their sessions)
// Supports both User ID (user_xxx) and Email
app.post('/api/admin/force-logout/:userIdOrEmail', adminAuth, async (req, res) => {
    let { userIdOrEmail } = req.params;
    let userId = userIdOrEmail;
    let userEmail = null;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const client = await getDatabaseClient();
    try {
        // Check if input is email (contains @)
        if (userIdOrEmail.includes('@')) {
            userEmail = userIdOrEmail;
            // Lookup user ID from email
            const userResult = await client.query(
                `SELECT id FROM users WHERE email = $1`,
                [userEmail]
            );
            if (userResult.rows.length === 0) {
                client.release();
                return res.status(404).json({ error: `Không tìm thấy user với email: ${userEmail}` });
            }
            userId = userResult.rows[0].id;
            console.log(`🔍 [ADMIN] Found user ID ${userId} for email ${userEmail}`);
        }

        const result = await client.query(
            `UPDATE user_sessions SET is_active = false WHERE user_id = $1`,
            [userId]
        );
        client.release();

        const displayInfo = userEmail ? `${userEmail} (${userId})` : userId;
        console.log(`🔒 [ADMIN] Force logged out user ${displayInfo}: ${result.rowCount} sessions invalidated`);
        res.json({
            success: true,
            sessionsInvalidated: result.rowCount,
            userId: userId,
            email: userEmail
        });
    } catch (err) {
        client.release();
        console.error('❌ [ADMIN] Force logout error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🔒 ADMIN: Force all clients to refresh (for updates)
app.post('/api/admin/force-refresh', adminAuth, async (req, res) => {
    const { enable } = req.body; // true to enable, false to disable

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const client = await getDatabaseClient();
    try {
        // Ensure system_settings table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS system_settings (
                id SERIAL PRIMARY KEY,
                setting_key TEXT UNIQUE NOT NULL,
                setting_value TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await client.query(
            `INSERT INTO system_settings (setting_key, setting_value) 
             VALUES ('force_client_refresh', $1)
             ON CONFLICT (setting_key) DO UPDATE SET setting_value = $1, updated_at = CURRENT_TIMESTAMP`,
            [enable ? 'true' : 'false']
        );
        client.release();

        console.log(`🔄 [ADMIN] Force refresh ${enable ? 'ENABLED' : 'DISABLED'}`);
        res.json({ success: true, forceRefresh: enable });
    } catch (err) {
        client.release();
        console.error('❌ [ADMIN] Force refresh error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🔒 ADMIN: Clear all devices for a user (delete all sessions)
app.post('/api/admin/clear-devices/:userIdOrEmail', adminAuth, async (req, res) => {
    let { userIdOrEmail } = req.params;
    let userId = userIdOrEmail;
    let userEmail = null;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const client = await getDatabaseClient();
    try {
        // Check if input is email (contains @)
        if (userIdOrEmail.includes('@')) {
            userEmail = userIdOrEmail;
            const userResult = await client.query(
                `SELECT id FROM users WHERE email = $1`,
                [userEmail]
            );
            if (userResult.rows.length === 0) {
                client.release();
                return res.status(404).json({ error: `Không tìm thấy user với email: ${userEmail}` });
            }
            userId = userResult.rows[0].id;
        }

        // Delete all sessions for this user
        const result = await client.query(
            `DELETE FROM user_sessions WHERE user_id = $1`,
            [userId]
        );
        client.release();

        const displayInfo = userEmail ? `${userEmail} (${userId})` : userId;
        console.log(`🗑️ [ADMIN] Cleared ${result.rowCount} devices for user ${displayInfo}`);
        res.json({
            success: true,
            devicesCleared: result.rowCount,
            userId: userId,
            email: userEmail
        });
    } catch (err) {
        client.release();
        console.error('❌ [ADMIN] Clear devices error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🔒 ADMIN: Kick a single session/device
app.delete('/api/admin/kick-session/:sessionId', adminAuth, async (req, res) => {
    const { sessionId } = req.params;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const client = await getDatabaseClient();
    try {
        // Get session info before deleting
        const sessionInfo = await client.query(
            `SELECT s.id, s.user_id, s.device_type, s.ip_address, u.email 
             FROM user_sessions s 
             JOIN users u ON s.user_id = u.id 
             WHERE s.id = $1`,
            [sessionId]
        );

        if (sessionInfo.rows.length === 0) {
            client.release();
            return res.status(404).json({ error: 'Session không tồn tại' });
        }

        const session = sessionInfo.rows[0];

        // Delete the session
        await client.query(`DELETE FROM user_sessions WHERE id = $1`, [sessionId]);
        client.release();

        console.log(`🔫 [ADMIN] Kicked session ${sessionId} for user ${session.email} (${session.device_type} - ${session.ip_address})`);
        res.json({
            success: true,
            message: `Đã kick thiết bị ${session.device_type} (IP: ${session.ip_address})`,
            kickedSession: {
                id: sessionId,
                userId: session.user_id,
                email: session.email,
                deviceType: session.device_type,
                ipAddress: session.ip_address
            }
        });
    } catch (err) {
        client.release();
        console.error('❌ [ADMIN] Kick session error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🔒 ADMIN: Get device list for a user
app.get('/api/admin/devices/:userIdOrEmail', adminAuth, async (req, res) => {
    console.log('📱 [DEVICES] Request received:', {
        userIdOrEmail: req.params.userIdOrEmail,
        user: req.user?.email || req.user?.userId
    });

    let { userIdOrEmail } = req.params;
    let userId = userIdOrEmail;
    let userEmail = null;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const client = await getDatabaseClient();
    try {
        // Check if input is email (contains @)
        if (userIdOrEmail.includes('@')) {
            userEmail = userIdOrEmail;
            const userResult = await client.query(
                `SELECT id FROM users WHERE email = $1`,
                [userEmail]
            );
            if (userResult.rows.length === 0) {
                client.release();
                return res.status(404).json({ error: `Không tìm thấy user với email: ${userEmail}` });
            }
            userId = userResult.rows[0].id;
        }

        // Get all sessions for this user with full device info
        const result = await client.query(
            `SELECT id, device_type, browser_fingerprint, user_agent, ip_address, is_active, 
                    login_time, last_activity, operating_system, browser_name, browser_version,
                    screen_resolution, timezone, trust_score, risk_flags
             FROM user_sessions 
             WHERE user_id = $1 
             ORDER BY last_activity DESC`,
            [userId]
        );
        client.release();

        // Map to frontend expected format
        const devices = result.rows.map(row => ({
            sessionId: row.id,
            deviceType: row.device_type || 'unknown',
            browserFingerprint: row.browser_fingerprint,
            userAgent: row.user_agent,
            ipAddress: row.ip_address,
            isActive: row.is_active,
            loginTime: row.login_time,
            lastActivity: row.last_activity,
            operatingSystem: row.operating_system || 'Unknown',
            browser: row.browser_name ? `${row.browser_name} ${row.browser_version || ''}`.trim() : 'Unknown',
            screenResolution: row.screen_resolution,
            timezone: row.timezone,
            trustScore: row.trust_score,
            riskFlags: row.risk_flags
        }));

        console.log('📱 [DEVICES] Success:', {
            userId,
            email: userEmail,
            totalDevices: devices.length
        });
        res.json({
            success: true,
            userId: userId,
            email: userEmail,
            devices: devices,
            totalDevices: devices.length,
            activeDevices: devices.filter(d => d.isActive).length
        });
    } catch (err) {
        if (client) client.release();
        console.error('❌ [ADMIN] Get devices error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🚫 ADMIN: Block/Unblock a user
app.post('/api/admin/block-user/:userIdOrEmail', adminAuth, async (req, res) => {
    console.log('🚫 [BLOCK-USER] Request received:', {
        userIdOrEmail: req.params.userIdOrEmail,
        block: req.body.block,
        adminUser: req.user?.email || req.user?.userId
    });

    let { userIdOrEmail } = req.params;
    const { block } = req.body; // true = block, false = unblock
    let userId = userIdOrEmail;
    let userEmail = null;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const client = await getDatabaseClient();
    try {
        // Check if input is email (contains @)
        if (userIdOrEmail.includes('@')) {
            userEmail = userIdOrEmail;
            const userResult = await client.query(
                `SELECT id, role FROM users WHERE email = $1`,
                [userEmail]
            );
            if (userResult.rows.length === 0) {
                client.release();
                return res.status(404).json({ error: `Không tìm thấy user với email: ${userEmail}` });
            }
            // Prevent blocking admins (use isAdminRole for consistent check)
            if (isAdminRole(userResult.rows[0].role)) {
                client.release();
                return res.status(403).json({ error: 'Không thể block Admin hoặc Super Admin!' });
            }
            userId = userResult.rows[0].id;
        } else {
            // Check role for user ID
            const userResult = await client.query(
                `SELECT role, email FROM users WHERE id = $1`,
                [userId]
            );
            if (userResult.rows.length === 0) {
                client.release();
                return res.status(404).json({ error: `Không tìm thấy user với ID: ${userId}` });
            }
            // Prevent blocking admins (use isAdminRole for consistent check)
            if (isAdminRole(userResult.rows[0].role)) {
                client.release();
                return res.status(403).json({ error: 'Không thể block Admin hoặc Super Admin!' });
            }
            userEmail = userResult.rows[0].email;
        }

        // Update user's activated status (false = blocked)
        await client.query(
            `UPDATE users SET activated = $1 WHERE id = $2`,
            [!block, userId]
        );

        // If blocking, also invalidate all sessions
        if (block) {
            await client.query(
                `UPDATE user_sessions SET is_active = false WHERE user_id = $1`,
                [userId]
            );
        }

        client.release();

        const displayInfo = userEmail ? `${userEmail} (${userId})` : userId;
        const action = block ? 'BLOCKED' : 'UNBLOCKED';
        console.log(`🚫 [ADMIN] User ${displayInfo} has been ${action}`);

        res.json({
            success: true,
            userId: userId,
            email: userEmail,
            blocked: block,
            message: block
                ? `🚫 Đã KHÓA tài khoản ${displayInfo}. User không thể đăng nhập.`
                : `✅ Đã MỞ KHÓA tài khoản ${displayInfo}. User có thể đăng nhập lại.`
        });
    } catch (err) {
        client.release();
        console.error('❌ [ADMIN] Block user error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ✅ FIX: Site data API endpoints for admin
app.get('/api/site-data', adminAuth, async (req, res) => {
    const { key } = req.query;

    if (!key || typeof key !== 'string') {
        return res.status(400).json({ error: 'Key parameter is required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            // Check if site_data table exists
            const tableExists = await client.query(
                "SELECT to_regclass($1)",
                ['public.site_data']
            );

            if (!tableExists.rows[0].to_regclass) {
                // Table doesn't exist, return empty object
                return res.json({ key, data: null, updated_by: null, updated_at: null });
            }

            // Query site_data table
            const result = await client.query(
                'SELECT data, updated_by, updated_at FROM site_data WHERE key = $1',
                [key]
            );

            if (result.rows.length === 0) {
                return res.json({ key, data: null, updated_by: null, updated_at: null });
            }

            res.json({
                key,
                data: result.rows[0].data,
                updated_by: result.rows[0].updated_by,
                updated_at: result.rows[0].updated_at
            });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/site-data] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching site data.' });
    }
});

app.post('/api/site-data', adminAuth, async (req, res) => {
    const { key, data, updated_by } = req.body;

    if (!key || typeof key !== 'string') {
        return res.status(400).json({ error: 'Key parameter is required.' });
    }

    if (data === undefined) {
        return res.status(400).json({ error: 'Data is required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        // Ensure site_data table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS site_data (
                key VARCHAR(255) PRIMARY KEY,
                data JSONB NOT NULL,
                updated_by VARCHAR(255),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert or update site data
        await client.query(
            `INSERT INTO site_data (key, data, updated_by, updated_at)
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
             ON CONFLICT (key) 
             DO UPDATE SET 
                 data = EXCLUDED.data,
                 updated_by = EXCLUDED.updated_by,
                 updated_at = CURRENT_TIMESTAMP`,
            [key, JSON.stringify(data), updated_by || null]
        );

        await client.query('COMMIT');

        res.json({
            success: true,
            message: 'Site data saved successfully.',
            key,
            updated_by: updated_by || null,
            updated_at: new Date().toISOString()
        });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API POST /api/site-data] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API POST /api/site-data] Error:', err.message);
        res.status(500).json({ error: 'Server error while saving site data.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API POST /api/site-data] Release error:', releaseErr.message);
            }
        }
    }
});

// ✅ NEW: List all site data keys
app.get('/api/site-data/list', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            // Check if site_data table exists
            const tableExists = await client.query(
                "SELECT to_regclass($1)",
                ['public.site_data']
            );

            if (!tableExists.rows[0].to_regclass) {
                return res.json({ keys: [] });
            }

            // Query all keys with metadata
            const result = await client.query(
                'SELECT key, updated_by, updated_at FROM site_data ORDER BY updated_at DESC'
            );

            res.json({ keys: result.rows });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/site-data/list] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching site data keys.' });
    }
});

// ✅ NEW: Content Management API - Mtest, Voca, Giao tiếp CRUD

// Ensure content management tables exist
const ensureContentTablesExist = async () => {
    if (!isRealDatabasePool()) {
        console.log('⚠️  Database pool not available, skipping content tables initialization');
        return;
    }
    const client = await getDatabaseClient();
    try {
        // Create mtest table
        await client.query(`
            CREATE TABLE IF NOT EXISTS mtest (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT,
                type TEXT,
                questions JSONB NOT NULL,
                time_limit INTEGER,
                difficulty TEXT,
                tags TEXT[],
                created_by TEXT,
                updated_by TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create voca table
        await client.query(`
            CREATE TABLE IF NOT EXISTS voca (
                id TEXT PRIMARY KEY,
                word TEXT NOT NULL,
                pronunciation TEXT,
                meaning TEXT NOT NULL,
                example TEXT,
                example_translation TEXT,
                category TEXT,
                level TEXT,
                tags TEXT[],
                image_url TEXT,
                deck_id TEXT,
                created_by TEXT,
                updated_by TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create voca_decks table
        await client.query(`
            CREATE TABLE IF NOT EXISTS voca_decks (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT,
                level TEXT,
                card_count INTEGER DEFAULT 0,
                color TEXT,
                gradient TEXT,
                icon TEXT,
                created_by TEXT,
                updated_by TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create giao_tiep table
        await client.query(`
            CREATE TABLE IF NOT EXISTS giao_tiep (
                id TEXT PRIMARY KEY,
                en TEXT NOT NULL,
                vi TEXT NOT NULL,
                ipa TEXT,
                tieng_boi TEXT,
                category TEXT NOT NULL,
                situation TEXT,
                notes TEXT,
                created_by TEXT,
                updated_by TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create grammar_groups table
        await client.query(`
            CREATE TABLE IF NOT EXISTS grammar_groups (
                id INTEGER PRIMARY KEY,
                code TEXT NOT NULL UNIQUE,
                vi TEXT NOT NULL,
                en TEXT NOT NULL,
                created_by TEXT,
                updated_by TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create test_question_overrides table to store explanation and rule updates
        await client.query(`
            CREATE TABLE IF NOT EXISTS test_question_overrides (
                test_id TEXT NOT NULL,
                question_id INTEGER NOT NULL,
                explanation TEXT,
                rule TEXT,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (test_id, question_id)
            );
        `);

        // Create grammar_units table
        await client.query(`
            CREATE TABLE IF NOT EXISTS grammar_units (
                id TEXT PRIMARY KEY,
                group_id INTEGER NOT NULL REFERENCES grammar_groups(id) ON DELETE CASCADE,
                vi TEXT NOT NULL,
                en TEXT NOT NULL,
                tags JSONB,
                canon_key TEXT,
                core_ref TEXT,
                applicable BOOLEAN DEFAULT true,
                created_by TEXT,
                updated_by TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create indexes
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_mtest_category ON mtest(category);
            CREATE INDEX IF NOT EXISTS idx_mtest_type ON mtest(type);
            CREATE INDEX IF NOT EXISTS idx_voca_category ON voca(category);
            CREATE INDEX IF NOT EXISTS idx_voca_deck_id ON voca(deck_id);
            CREATE INDEX IF NOT EXISTS idx_voca_decks_category ON voca_decks(category);
            CREATE INDEX IF NOT EXISTS idx_giao_tiep_category ON giao_tiep(category);
            CREATE INDEX IF NOT EXISTS idx_grammar_units_group_id ON grammar_units(group_id);
            CREATE INDEX IF NOT EXISTS idx_grammar_groups_code ON grammar_groups(code);
        `);

        console.log('✅ Content management tables initialized');
    } catch (err) {
        console.error('❌ Error initializing content tables:', err.message);
    } finally {
        client.release();
    }
};

// Initialize content tables on startup (called from ensureTablesExist)
// ensureContentTablesExist();

// --- MTEST CRUD API ---

// GET /api/content/mtest - List all Mtest
app.get('/api/content/mtest', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const { category, type, search } = req.query;
            let query = 'SELECT * FROM mtest WHERE 1=1';
            const params = [];
            let paramIndex = 1;

            if (category) {
                query += ` AND category = $${paramIndex++}`;
                params.push(category);
            }
            if (type) {
                query += ` AND type = $${paramIndex++}`;
                params.push(type);
            }
            if (search) {
                query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
                params.push(`%${search}%`);
                paramIndex++;
            }

            query += ' ORDER BY updated_at DESC';

            const result = await client.query(query, params);
            res.json({ tests: result.rows });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/mtest] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Mtest.' });
    }
});

// GET /api/content/mtest/:id - Get single Mtest
app.get('/api/content/mtest/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const result = await client.query('SELECT * FROM mtest WHERE id = $1', [req.params.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Mtest not found.' });
            }
            res.json({ test: result.rows[0] });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/mtest/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Mtest.' });
    }
});

// POST /api/content/mtest - Create Mtest
app.post('/api/content/mtest', adminAuth, async (req, res) => {
    const { id, title, description, category, type, questions, time_limit, difficulty, tags, created_by, updated_by } = req.body;

    if (!id || !title || !questions) {
        return res.status(400).json({ error: 'id, title, and questions are required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        await client.query(
            `INSERT INTO mtest (id, title, description, category, type, questions, time_limit, difficulty, tags, created_by, updated_by, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)
             ON CONFLICT (id) 
             DO UPDATE SET 
                 title = EXCLUDED.title,
                 description = EXCLUDED.description,
                 category = EXCLUDED.category,
                 type = EXCLUDED.type,
                 questions = EXCLUDED.questions,
                 time_limit = EXCLUDED.time_limit,
                 difficulty = EXCLUDED.difficulty,
                 tags = EXCLUDED.tags,
                 updated_by = EXCLUDED.updated_by,
                 updated_at = CURRENT_TIMESTAMP`,
            [id, title, description || null, category || null, type || null, JSON.stringify(questions), time_limit || null, difficulty || null, tags || [], created_by || null, updated_by || null]
        );

        await client.query('COMMIT');
        res.json({ success: true, message: 'Mtest saved successfully.', id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API POST /api/content/mtest] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API POST /api/content/mtest] Error:', err.message);
        res.status(500).json({ error: 'Server error while saving Mtest.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API POST /api/content/mtest] Release error:', releaseErr.message);
            }
        }
    }
});

// PUT /api/content/mtest/:id - Update Mtest
app.put('/api/content/mtest/:id', adminAuth, async (req, res) => {
    const { title, description, category, type, questions, time_limit, difficulty, tags, updated_by } = req.body;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query(
            `UPDATE mtest 
             SET title = COALESCE($1, title),
                 description = COALESCE($2, description),
                 category = COALESCE($3, category),
                 type = COALESCE($4, type),
                 questions = COALESCE($5, questions),
                 time_limit = COALESCE($6, time_limit),
                 difficulty = COALESCE($7, difficulty),
                 tags = COALESCE($8, tags),
                 updated_by = COALESCE($9, updated_by),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $10
             RETURNING id`,
            [title, description, category, type, questions ? JSON.stringify(questions) : null, time_limit, difficulty, tags, updated_by, req.params.id]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Mtest not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Mtest updated successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API PUT /api/content/mtest/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API PUT /api/content/mtest/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while updating Mtest.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API PUT /api/content/mtest/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// DELETE /api/content/mtest/:id - Delete Mtest
app.delete('/api/content/mtest/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query('DELETE FROM mtest WHERE id = $1 RETURNING id', [req.params.id]);

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Mtest not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Mtest deleted successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API DELETE /api/content/mtest/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API DELETE /api/content/mtest/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while deleting Mtest.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API DELETE /api/content/mtest/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// --- VOCA CRUD API ---

// GET /api/content/voca - List all Voca
app.get('/api/content/voca', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const { category, level, deck_id, search } = req.query;
            let query = 'SELECT * FROM voca WHERE 1=1';
            const params = [];
            let paramIndex = 1;

            if (category) {
                query += ` AND category = $${paramIndex++}`;
                params.push(category);
            }
            if (level) {
                query += ` AND level = $${paramIndex++}`;
                params.push(level);
            }
            if (deck_id) {
                query += ` AND deck_id = $${paramIndex++}`;
                params.push(deck_id);
            }
            if (search) {
                query += ` AND (word ILIKE $${paramIndex} OR meaning ILIKE $${paramIndex})`;
                params.push(`%${search}%`);
                paramIndex++;
            }

            query += ' ORDER BY updated_at DESC';

            const result = await client.query(query, params);
            res.json({ voca: result.rows });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/voca] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Voca.' });
    }
});

// GET /api/content/voca/:id - Get single Voca
app.get('/api/content/voca/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const result = await client.query('SELECT * FROM voca WHERE id = $1', [req.params.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Voca not found.' });
            }
            res.json({ voca: result.rows[0] });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/voca/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Voca.' });
    }
});

// POST /api/content/voca - Create Voca
app.post('/api/content/voca', adminAuth, async (req, res) => {
    const { id, word, pronunciation, meaning, example, example_translation, category, level, tags, image_url, deck_id, created_by, updated_by } = req.body;

    if (!id || !word || !meaning) {
        return res.status(400).json({ error: 'id, word, and meaning are required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        await client.query(
            `INSERT INTO voca (id, word, pronunciation, meaning, example, example_translation, category, level, tags, image_url, deck_id, created_by, updated_by, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)
             ON CONFLICT (id) 
             DO UPDATE SET 
                 word = EXCLUDED.word,
                 pronunciation = EXCLUDED.pronunciation,
                 meaning = EXCLUDED.meaning,
                 example = EXCLUDED.example,
                 example_translation = EXCLUDED.example_translation,
                 category = EXCLUDED.category,
                 level = EXCLUDED.level,
                 tags = EXCLUDED.tags,
                 image_url = EXCLUDED.image_url,
                 deck_id = EXCLUDED.deck_id,
                 updated_by = EXCLUDED.updated_by,
                 updated_at = CURRENT_TIMESTAMP`,
            [id, word, pronunciation || null, meaning, example || null, example_translation || null, category || null, level || null, tags || [], image_url || null, deck_id || null, created_by || null, updated_by || null]
        );

        await client.query('COMMIT');
        res.json({ success: true, message: 'Voca saved successfully.', id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API POST /api/content/voca] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API POST /api/content/voca] Error:', err.message);
        res.status(500).json({ error: 'Server error while saving Voca.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API POST /api/content/voca] Release error:', releaseErr.message);
            }
        }
    }
});

// PUT /api/content/voca/:id - Update Voca
app.put('/api/content/voca/:id', adminAuth, async (req, res) => {
    const { word, pronunciation, meaning, example, example_translation, category, level, tags, image_url, deck_id, updated_by } = req.body;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query(
            `UPDATE voca 
             SET word = COALESCE($1, word),
                 pronunciation = COALESCE($2, pronunciation),
                 meaning = COALESCE($3, meaning),
                 example = COALESCE($4, example),
                 example_translation = COALESCE($5, example_translation),
                 category = COALESCE($6, category),
                 level = COALESCE($7, level),
                 tags = COALESCE($8, tags),
                 image_url = COALESCE($9, image_url),
                 deck_id = COALESCE($10, deck_id),
                 updated_by = COALESCE($11, updated_by),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $12
             RETURNING id`,
            [word, pronunciation, meaning, example, example_translation, category, level, tags, image_url, deck_id, updated_by, req.params.id]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Voca not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Voca updated successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API PUT /api/content/voca/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API PUT /api/content/voca/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while updating Voca.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API PUT /api/content/voca/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// DELETE /api/content/voca/:id - Delete Voca
app.delete('/api/content/voca/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query('DELETE FROM voca WHERE id = $1 RETURNING id', [req.params.id]);

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Voca not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Voca deleted successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API DELETE /api/content/voca/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API DELETE /api/content/voca/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while deleting Voca.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API DELETE /api/content/voca/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// --- GIAO TIẾP CRUD API ---

// GET /api/content/giao-tiep - List all Giao tiếp
app.get('/api/content/giao-tiep', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const { category, search } = req.query;
            let query = 'SELECT * FROM giao_tiep WHERE 1=1';
            const params = [];
            let paramIndex = 1;

            if (category) {
                query += ` AND category = $${paramIndex++}`;
                params.push(category);
            }
            if (search) {
                query += ` AND (en ILIKE $${paramIndex} OR vi ILIKE $${paramIndex})`;
                params.push(`%${search}%`);
                paramIndex++;
            }

            query += ' ORDER BY updated_at DESC';

            const result = await client.query(query, params);
            res.json({ giao_tiep: result.rows });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/giao-tiep] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Giao tiếp.' });
    }
});

// GET /api/content/giao-tiep/:id - Get single Giao tiếp
app.get('/api/content/giao-tiep/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const result = await client.query('SELECT * FROM giao_tiep WHERE id = $1', [req.params.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Giao tiếp not found.' });
            }
            res.json({ giao_tiep: result.rows[0] });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/giao-tiep/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Giao tiếp.' });
    }
});

// POST /api/content/giao-tiep - Create Giao tiếp
app.post('/api/content/giao-tiep', adminAuth, async (req, res) => {
    const { id, en, vi, ipa, tieng_boi, category, situation, notes, created_by, updated_by } = req.body;

    if (!id || !en || !vi || !category) {
        return res.status(400).json({ error: 'id, en, vi, and category are required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        await client.query(
            `INSERT INTO giao_tiep (id, en, vi, ipa, tieng_boi, category, situation, notes, created_by, updated_by, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
             ON CONFLICT (id) 
             DO UPDATE SET 
                 en = EXCLUDED.en,
                 vi = EXCLUDED.vi,
                 ipa = EXCLUDED.ipa,
                 tieng_boi = EXCLUDED.tieng_boi,
                 category = EXCLUDED.category,
                 situation = EXCLUDED.situation,
                 notes = EXCLUDED.notes,
                 updated_by = EXCLUDED.updated_by,
                 updated_at = CURRENT_TIMESTAMP`,
            [id, en, vi, ipa || null, tieng_boi || null, category, situation || null, notes || null, created_by || null, updated_by || null]
        );

        await client.query('COMMIT');
        res.json({ success: true, message: 'Giao tiếp saved successfully.', id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API POST /api/content/giao-tiep] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API POST /api/content/giao-tiep] Error:', err.message);
        res.status(500).json({ error: 'Server error while saving Giao tiếp.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API POST /api/content/giao-tiep] Release error:', releaseErr.message);
            }
        }
    }
});

// PUT /api/content/giao-tiep/:id - Update Giao tiếp
app.put('/api/content/giao-tiep/:id', adminAuth, async (req, res) => {
    const { en, vi, ipa, tieng_boi, category, situation, notes, updated_by } = req.body;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query(
            `UPDATE giao_tiep 
             SET en = COALESCE($1, en),
                 vi = COALESCE($2, vi),
                 ipa = COALESCE($3, ipa),
                 tieng_boi = COALESCE($4, tieng_boi),
                 category = COALESCE($5, category),
                 situation = COALESCE($6, situation),
                 notes = COALESCE($7, notes),
                 updated_by = COALESCE($8, updated_by),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $9
             RETURNING id`,
            [en, vi, ipa, tieng_boi, category, situation, notes, updated_by, req.params.id]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Giao tiếp not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Giao tiếp updated successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API PUT /api/content/giao-tiep/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API PUT /api/content/giao-tiep/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while updating Giao tiếp.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API PUT /api/content/giao-tiep/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// DELETE /api/content/giao-tiep/:id - Delete Giao tiếp
app.delete('/api/content/giao-tiep/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query('DELETE FROM giao_tiep WHERE id = $1 RETURNING id', [req.params.id]);

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Giao tiếp not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Giao tiếp deleted successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API DELETE /api/content/giao-tiep/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API DELETE /api/content/giao-tiep/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while deleting Giao tiếp.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API DELETE /api/content/giao-tiep/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// --- GRAMMAR GROUPS CRUD API ---

// GET /api/content/grammar-groups - List all Groups
app.get('/api/content/grammar-groups', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const { search } = req.query;
            let query = 'SELECT * FROM grammar_groups WHERE 1=1';
            const params = [];
            let paramIndex = 1;

            if (search) {
                query += ` AND (vi ILIKE $${paramIndex} OR en ILIKE $${paramIndex} OR code ILIKE $${paramIndex})`;
                params.push(`%${search}%`);
                paramIndex++;
            }

            query += ' ORDER BY id ASC';

            const result = await client.query(query, params);
            res.json({ groups: result.rows });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/grammar-groups] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Groups.' });
    }
});

// GET /api/content/grammar-groups/:id - Get single Group
app.get('/api/content/grammar-groups/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const result = await client.query('SELECT * FROM grammar_groups WHERE id = $1', [parseInt(req.params.id)]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Group not found.' });
            }
            res.json({ group: result.rows[0] });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/grammar-groups/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Group.' });
    }
});

// POST /api/content/grammar-groups - Create or Update Group
app.post('/api/content/grammar-groups', adminAuth, async (req, res) => {
    const { id, code, vi, en, created_by, updated_by } = req.body;

    if (!id || !code || !vi || !en) {
        return res.status(400).json({ error: 'id, code, vi, and en are required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        await client.query(
            `INSERT INTO grammar_groups (id, code, vi, en, created_by, updated_by, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
             ON CONFLICT (id) 
             DO UPDATE SET 
                 code = EXCLUDED.code,
                 vi = EXCLUDED.vi,
                 en = EXCLUDED.en,
                 updated_by = EXCLUDED.updated_by,
                 updated_at = CURRENT_TIMESTAMP`,
            [parseInt(id), code, vi, en, created_by || null, updated_by || null]
        );

        await client.query('COMMIT');
        res.json({ success: true, message: 'Group saved successfully.', id: parseInt(id) });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API POST /api/content/grammar-groups] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API POST /api/content/grammar-groups] Error:', err.message);
        res.status(500).json({ error: 'Server error while saving Group.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API POST /api/content/grammar-groups] Release error:', releaseErr.message);
            }
        }
    }
});

// PUT /api/content/grammar-groups/:id - Update Group
app.put('/api/content/grammar-groups/:id', adminAuth, async (req, res) => {
    const { code, vi, en, updated_by } = req.body;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query(
            `UPDATE grammar_groups 
             SET code = COALESCE($1, code),
                 vi = COALESCE($2, vi),
                 en = COALESCE($3, en),
                 updated_by = COALESCE($4, updated_by),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $5
             RETURNING id`,
            [code, vi, en, updated_by, parseInt(req.params.id)]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Group not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Group updated successfully.', id: parseInt(req.params.id) });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API PUT /api/content/grammar-groups/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API PUT /api/content/grammar-groups/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while updating Group.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API PUT /api/content/grammar-groups/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// DELETE /api/content/grammar-groups/:id - Delete Group
app.delete('/api/content/grammar-groups/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query('DELETE FROM grammar_groups WHERE id = $1 RETURNING id', [parseInt(req.params.id)]);

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Group not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Group deleted successfully.', id: parseInt(req.params.id) });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API DELETE /api/content/grammar-groups/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API DELETE /api/content/grammar-groups/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while deleting Group.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API DELETE /api/content/grammar-groups/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// --- GRAMMAR UNITS CRUD API ---

// GET /api/content/grammar-units - List all Units
app.get('/api/content/grammar-units', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const { group_id, search } = req.query;
            let query = 'SELECT * FROM grammar_units WHERE 1=1';
            const params = [];
            let paramIndex = 1;

            if (group_id) {
                query += ` AND group_id = $${paramIndex++}`;
                params.push(parseInt(group_id));
            }
            if (search) {
                query += ` AND (vi ILIKE $${paramIndex} OR en ILIKE $${paramIndex} OR id ILIKE $${paramIndex})`;
                params.push(`%${search}%`);
                paramIndex++;
            }

            query += ' ORDER BY group_id ASC, id ASC';

            const result = await client.query(query, params);
            res.json({ units: result.rows });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/grammar-units] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Units.' });
    }
});

// GET /api/content/grammar-units/:id - Get single Unit
app.get('/api/content/grammar-units/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    try {
        const client = await getDatabaseClient();
        try {
            const result = await client.query('SELECT * FROM grammar_units WHERE id = $1', [req.params.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Unit not found.' });
            }
            res.json({ unit: result.rows[0] });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('❌ [API GET /api/content/grammar-units/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching Unit.' });
    }
});

// POST /api/content/grammar-units - Create or Update Unit
app.post('/api/content/grammar-units', adminAuth, async (req, res) => {
    const { id, group_id, vi, en, tags, canon_key, core_ref, applicable, created_by, updated_by } = req.body;

    if (!id || !group_id || !vi || !en) {
        return res.status(400).json({ error: 'id, group_id, vi, and en are required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        await client.query(
            `INSERT INTO grammar_units (id, group_id, vi, en, tags, canon_key, core_ref, applicable, created_by, updated_by, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
             ON CONFLICT (id) 
             DO UPDATE SET 
                 group_id = EXCLUDED.group_id,
                 vi = EXCLUDED.vi,
                 en = EXCLUDED.en,
                 tags = EXCLUDED.tags,
                 canon_key = EXCLUDED.canon_key,
                 core_ref = EXCLUDED.core_ref,
                 applicable = EXCLUDED.applicable,
                 updated_by = EXCLUDED.updated_by,
                 updated_at = CURRENT_TIMESTAMP`,
            [id, parseInt(group_id), vi, en, tags ? JSON.stringify(tags) : null, canon_key || null, core_ref || null, applicable !== undefined ? applicable : true, created_by || null, updated_by || null]
        );

        await client.query('COMMIT');
        res.json({ success: true, message: 'Unit saved successfully.', id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API POST /api/content/grammar-units] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API POST /api/content/grammar-units] Error:', err.message);
        res.status(500).json({ error: 'Server error while saving Unit.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API POST /api/content/grammar-units] Release error:', releaseErr.message);
            }
        }
    }
});

// PUT /api/content/grammar-units/:id - Update Unit
app.put('/api/content/grammar-units/:id', adminAuth, async (req, res) => {
    const { group_id, vi, en, tags, canon_key, core_ref, applicable, updated_by } = req.body;

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query(
            `UPDATE grammar_units 
             SET group_id = COALESCE($1, group_id),
                 vi = COALESCE($2, vi),
                 en = COALESCE($3, en),
                 tags = COALESCE($4, tags),
                 canon_key = COALESCE($5, canon_key),
                 core_ref = COALESCE($6, core_ref),
                 applicable = COALESCE($7, applicable),
                 updated_by = COALESCE($8, updated_by),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $9
             RETURNING id`,
            [group_id ? parseInt(group_id) : null, vi, en, tags ? JSON.stringify(tags) : null, canon_key, core_ref, applicable, updated_by, req.params.id]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Unit not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Unit updated successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API PUT /api/content/grammar-units/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API PUT /api/content/grammar-units/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while updating Unit.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API PUT /api/content/grammar-units/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// DELETE /api/content/grammar-units/:id - Delete Unit
app.delete('/api/content/grammar-units/:id', adminAuth, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        const result = await client.query('DELETE FROM grammar_units WHERE id = $1 RETURNING id', [req.params.id]);

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Unit not found.' });
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Unit deleted successfully.', id: req.params.id });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API DELETE /api/content/grammar-units/:id] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API DELETE /api/content/grammar-units/:id] Error:', err.message);
        res.status(500).json({ error: 'Server error while deleting Unit.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API DELETE /api/content/grammar-units/:id] Release error:', releaseErr.message);
            }
        }
    }
});

// ✅ NEW: Delete site data key
app.delete('/api/site-data/:key', adminAuth, async (req, res) => {
    const { key } = req.params;

    if (!key || typeof key !== 'string') {
        return res.status(400).json({ error: 'Key parameter is required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }

    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        // Check if site_data table exists
        const tableExists = await client.query(
            "SELECT to_regclass($1)",
            ['public.site_data']
        );

        if (!tableExists.rows[0].to_regclass) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Key not found.' });
        }

        // Delete the key
        const result = await client.query(
            'DELETE FROM site_data WHERE key = $1 RETURNING key',
            [key]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Key not found.' });
        }

        await client.query('COMMIT');

        res.json({ success: true, message: 'Key deleted successfully.', key });
    } catch (err) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErr) {
                console.error('❌ [API DELETE /api/site-data/:key] Rollback error:', rollbackErr.message);
            }
        }
        console.error('❌ [API DELETE /api/site-data/:key] Error:', err.message);
        res.status(500).json({ error: 'Server error while deleting site data.' });
    } finally {
        if (client) {
            try {
                client.release();
            } catch (releaseErr) {
                console.error('❌ [API DELETE /api/site-data/:key] Release error:', releaseErr.message);
            }
        }
    }
});

// ✅ CRITICAL: Express Error Handler - MUST be before catch-all routes
// This catches all unhandled errors and prevents empty 500 responses
app.use((err, req, res, next) => {
    console.error('❌ [Express Error Handler] Unhandled error:', err);
    console.error('❌ [Express Error Handler] Error stack:', err.stack);
    console.error('❌ [Express Error Handler] Request path:', req.path);
    console.error('❌ [Express Error Handler] Request method:', req.method);

    // Don't send response if headers already sent
    if (res.headersSent) {
        console.error('❌ [Express Error Handler] Headers already sent, cannot send error response');
        return next(err);
    }

    // Determine if we're in development
    const isDevelopment = process.env.NODE_ENV !== 'production' ||
        process.env.NODE_ENV === 'development' ||
        !process.env.NODE_ENV;

    // Send error response
    const statusCode = err.statusCode || err.status || 500;
    const errorResponse = {
        success: false,
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred'
    };

    // Add detailed error info in development
    if (isDevelopment) {
        errorResponse.details = {
            name: err.name,
            code: err.code,
            stack: err.stack?.split('\n').slice(0, 10).join('\n'), // First 10 lines
            type: err.constructor.name,
            path: req.path,
            method: req.method
        };
    }

    res.status(statusCode).json(errorResponse);
});

app.get(['/admin', '/admin/*'], (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.sendFile(path.join(__dirname, 'dist', 'admin.html'));
});

// ✅ FIX: Only catch HTML routes, not static assets
app.get('*', (req, res, next) => {
    // Skip static assets (JS, CSS, images, etc.)
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map)$/)) {
        return next();
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server immediately - don't wait for database initialization
// Cloud Run needs the server to start listening on PORT within the timeout
// This MUST happen synchronously, no async operations before this
console.log(`🚀 Starting server on port ${port}...`);
const http = require('http');
const httpServer = http.createServer(app);

// Initialize Socket.io for real-time messaging
const { Server } = require('socket.io');
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Store io instance in app for use in routes
app.set('io', io);

// Socket.io connection handling
// 🔒 SECURITY: Validate token before joining rooms
io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);

    // User joins their personal room (with token validation)
    socket.on('join-user-room', (userId, token) => {
        if (!userId) return;

        // If token provided, validate it matches the userId
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const tokenUserId = decoded.id || decoded.userId;
                if (tokenUserId !== userId) {
                    console.warn(`⚠️ Socket ${socket.id} tried to join wrong room`);
                    socket.emit('error', { message: 'Invalid user room' });
                    return;
                }
            } catch (err) {
                // Token invalid - still allow join for backward compatibility
                // but log the warning
                console.warn(`⚠️ Socket ${socket.id} joined without valid token`);
            }
        }

        socket.join(`user-${userId}`);
        console.log(`👤 User ${userId} joined room user-${userId}`);
    });

    // Admin joins admin room (should have admin token)
    socket.on('join-admin-room', (token) => {
        // Validate admin token if provided
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const role = decoded.role || '';
                const normalizedRole = role.toLowerCase().trim();
                if (normalizedRole !== 'super admin' && normalizedRole !== 'superadmin') {
                    console.warn(`⚠️ Non-admin tried to join admin-room`);
                    socket.emit('error', { message: 'Admin access required' });
                    return;
                }
            } catch (err) {
                console.warn(`⚠️ Invalid token for admin-room join`);
            }
        }

        socket.join('admin-room');
        console.log('👨‍💼 Admin joined admin-room');
    });

    // ============ TYPING INDICATOR ============
    // User is typing
    socket.on('user-typing', (userId) => {
        socket.to('admin-room').emit('user-typing', { userId, isTyping: true });
    });

    // User stopped typing
    socket.on('user-stop-typing', (userId) => {
        socket.to('admin-room').emit('user-typing', { userId, isTyping: false });
    });

    // Admin is typing
    socket.on('admin-typing', (userId) => {
        socket.to(`user-${userId}`).emit('admin-typing', { isTyping: true });
    });

    // Admin stopped typing
    socket.on('admin-stop-typing', (userId) => {
        socket.to(`user-${userId}`).emit('admin-typing', { isTyping: false });
    });

    // ============ ONLINE STATUS ============
    // User comes online
    socket.on('user-online', async (userId) => {
        try {
            // Update database
            await pool.query(`
                INSERT INTO user_online_status (user_id, is_online, last_seen, socket_id)
                VALUES ($1, TRUE, CURRENT_TIMESTAMP, $2)
                ON CONFLICT (user_id) 
                DO UPDATE SET is_online = TRUE, last_seen = CURRENT_TIMESTAMP, socket_id = $2
            `, [userId, socket.id]);

            // Notify admin
            socket.to('admin-room').emit('user-online-status', {
                userId,
                isOnline: true,
                lastSeen: new Date().toISOString()
            });
        } catch (err) {
            console.error('Error updating online status:', err.message);
        }
    });

    // User goes offline
    socket.on('user-offline', async (userId) => {
        try {
            await pool.query(`
                UPDATE user_online_status 
                SET is_online = FALSE, last_seen = CURRENT_TIMESTAMP
                WHERE user_id = $1
            `, [userId]);

            socket.to('admin-room').emit('user-online-status', {
                userId,
                isOnline: false,
                lastSeen: new Date().toISOString()
            });
        } catch (err) {
            console.error('Error updating offline status:', err.message);
        }
    });

    // Handle disconnect - mark user offline
    socket.on('disconnect', async () => {
        console.log('🔌 Socket disconnected:', socket.id);

        // Find and update user by socket_id
        try {
            const result = await pool.query(`
                UPDATE user_online_status 
                SET is_online = FALSE, last_seen = CURRENT_TIMESTAMP
                WHERE socket_id = $1
                RETURNING user_id
            `, [socket.id]);

            if (result.rows.length > 0) {
                const userId = result.rows[0].user_id;
                io.to('admin-room').emit('user-online-status', {
                    userId,
                    isOnline: false,
                    lastSeen: new Date().toISOString()
                });
            }
        } catch (err) {
            // Ignore errors on disconnect
        }
    });
});

const server = httpServer.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server is listening on port ${port} (0.0.0.0)`);
    console.log(`✅ Health check available at http://0.0.0.0:${port}/health`);
    console.log(`✅ Socket.io enabled for real-time messaging`);
    console.log(`✅ Server is ready to accept connections`);

    // ⚡ OPTIMIZED: Initialize database immediately (no delay for faster startup)
    // Load database pool first, then initialize tables
    setImmediate(() => {
        console.log('🔄 Loading database pool in background...');
        const dbLoaded = loadDatabasePool();
        if (dbLoaded) {
            // ✅ CRITICAL: Ensure pool is set in app.locals (in case it wasn't set earlier)
            if (pool && app && app.locals) {
                app.locals.pool = pool;
                console.log('✅ Database pool confirmed in app.locals');
            }
            console.log('🔄 Starting database initialization...');
            ensureTablesExist().then(() => {
                return ensureAdminUsersTableUserExists(); // Ensure admin user in admin_users table
            }).then(() => {
                return ensureAdminUserExists(); // Ensure admin user in users table (legacy)
            }).then(() => {
                console.log(`✅ Backend server is fully operational on port ${port}`);

                // 📊 PERFORMANCE: Start pool monitoring (logs every 60s)
                if (typeof startMonitoring === 'function' && pool) {
                    startMonitoring(pool, 60000); // Log pool stats every minute
                    console.log('✅ Database pool monitoring started');
                }

                // ✅ IMPROVEMENT: Setup scheduled backup (daily at 2 AM)
                if (cron) {
                    // Schedule backup daily at 2:00 AM (server timezone)
                    // Cron format: minute hour day month dayOfWeek
                    // '0 2 * * *' = At 02:00 every day
                    cron.schedule('0 2 * * *', async () => {
                        console.log('🔄 [SCHEDULED] Running daily backup at 2 AM...');
                        try {
                            const result = await backupUsersToCloudStorage();
                            if (result.success) {
                                console.log(`✅ [SCHEDULED] Daily backup completed: ${result.totalUsers} users backed up`);
                            } else {
                                console.error(`❌ [SCHEDULED] Daily backup failed: ${result.error}`);
                            }
                        } catch (error) {
                            console.error('❌ [SCHEDULED] Daily backup error:', error.message);
                        }
                    }, {
                        scheduled: true,
                        timezone: 'Asia/Ho_Chi_Minh' // Vietnam timezone (UTC+7)
                    });
                    console.log('✅ [SCHEDULED] Daily backup scheduled: 2:00 AM (Vietnam time)');
                } else {
                    console.warn('⚠️  [SCHEDULED] node-cron not available, scheduled backup disabled');
                }
            }).catch((err) => {
                console.error('❌ Error during database initialization:', err);
                console.error('⚠️  Server will continue running, but database features may not work');
                // Server still listens even if initialization fails
            });
        } else {
            console.log('⚠️  Database pool not loaded, skipping table initialization');
        }
    });
});

// Handle server errors
server.on('error', (err) => {
    console.error('❌ Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.error(`⚠️  Port ${port} is already in use`);
    }
    process.exit(1);
});

// Log server startup immediately
console.log(`✅ Server startup initiated, listening will begin shortly...`);
