// server.js
// ⚡ CLOUD RUN OPTIMIZED: Load environment variables first (non-blocking)
require('dotenv').config();

// 🔒 SECURITY: Validate required environment variables
const ADMIN_KEY = process.env.ADMIN_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_KEY) {
    console.error('❌ CRITICAL: ADMIN_KEY environment variable is required');
    console.error('   Server cannot start without admin key');
    process.exit(1);
}

if (!ADMIN_PASSWORD) {
    console.error('❌ CRITICAL: ADMIN_PASSWORD environment variable is required');
    console.error('   Server cannot start without admin password');
    process.exit(1);
}

console.log('✅ Admin credentials loaded from environment variables');

// ⚡ CLOUD RUN OPTIMIZED: Load core modules synchronously (lightweight)
const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// ⚡ CLOUD RUN OPTIMIZED: Initialize database pool as mock (non-blocking)
// Real pool will be loaded after server starts
let pool = {
  connect: () => ({
    query: () => Promise.resolve({ rows: [] }),
    release: () => {}
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
      console.log('✅ Database pool loaded successfully');
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
const JWT_SECRET = process.env.JWT_SECRET || 'e8a5cf0dcf47b00c4ac71e35e59a8b62d1f3cd30362f79bd452fe72c0767a1a4';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // 7 days

const app = express();
const port = process.env.PORT || 3000;

// Ensure server starts immediately - all initialization happens after
console.log(`🚀 Initializing server on port ${port}...`);

// --- Middleware ---
app.use(express.json({ limit: '20mb' })); // Increase limit for large sync payloads
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Admin-Key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Serve static files from dist directory
app.use(express.static('dist'));

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
                "bananaBalance" INTEGER
            );
        `);

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

        // Create user_sessions table to track active sessions (unlimited devices per user, deduped by fingerprint)
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_sessions (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                device_type TEXT NOT NULL CHECK (device_type IN ('laptop', 'mobile')),
                browser_fingerprint TEXT NOT NULL,
                session_token TEXT NOT NULL UNIQUE,
                user_agent TEXT,
                ip_address TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                last_activity TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT true,
                UNIQUE(user_id, device_type, browser_fingerprint)
            );
        `);

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_device_type ON user_sessions(device_type);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_session_token ON user_sessions(session_token);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_is_active ON user_sessions(is_active);
        `);

        // Ensure legacy constraint is removed and unique index exists for new rule (supporting multiple laptops)
        await client.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints
                    WHERE constraint_name = 'user_sessions_user_id_device_type_key'
                      AND table_name = 'user_sessions'
                ) THEN
                    ALTER TABLE user_sessions DROP CONSTRAINT user_sessions_user_id_device_type_key;
                END IF;

                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints
                    WHERE constraint_name = 'user_sessions_user_id_device_type_browser_fingerprint_key'
                      AND table_name = 'user_sessions'
                ) THEN
                    ALTER TABLE user_sessions 
                    ADD CONSTRAINT user_sessions_user_id_device_type_browser_fingerprint_key
                    UNIQUE (user_id, device_type, browser_fingerprint);
                END IF;
            END
            $$;
        `);

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
const ensureAdminUserExists = async () => {
    if (!isRealDatabasePool()) {
        console.log('⚠️  Database pool not available, skipping admin user initialization');
        return;
    }
    const client = await getDatabaseClient();
    try {
        const adminEmail = 'admin@gmail.com';
        // ❌ REMOVED: Hardcoded password '01111110' - security risk!
        // ✅ FIXED: Use environment variable
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        if (!adminPassword) {
            console.error('❌ ADMIN_PASSWORD environment variable is required');
            throw new Error('ADMIN_PASSWORD environment variable is required');
        }
        const adminName = 'Admin';
        const adminRole = 'Admin';
        const adminBananaBalance = 10000;

        // Check if admin user already exists
        const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [adminEmail]);
        
        if (existingUser.rows.length > 0) {
            // Update existing user to ensure it's admin
            const userId = existingUser.rows[0].id;
            await client.query(
                `UPDATE users 
                 SET role = $1, "bananaBalance" = $2, password = $3, name = $4
                 WHERE id = $5`,
                [adminRole, adminBananaBalance, adminPassword, adminName, userId]
            );
            console.log('✅ Admin user updated:', adminEmail);
        } else {
            // Create new admin user
            const newUser = {
                id: `user_${Date.now()}`,
                name: adminName,
                email: adminEmail,
                password: adminPassword,
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
        }
    } catch (err) {
        console.error("Error ensuring admin user exists:", err.message);
    } finally {
        client.release();
    }
};

// --- Admin Authentication Middleware ---
const adminAuth = (req, res, next) => {
    const adminKey = req.headers['x-admin-key'];
    // ✅ FIXED: Use ADMIN_KEY from top of file (already validated)
    if (adminKey && adminKey === ADMIN_KEY) { 
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Admin access required.' });
    }
};

// --- JWT Authentication Middleware ---
// ⚡ CLOUD RUN OPTIMIZED: Define authenticateToken BEFORE it's used in routes
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 🔒 SECURITY: Verify session is still active (only if database is available)
        // Check if pool is a real database pool (not mock)
        if (isRealDatabasePool()) {
            try {
                const client = await getDatabaseClient();
                try {
                    const sessionResult = await client.query(
                        `SELECT * FROM user_sessions 
                         WHERE user_id = $1 AND device_type = $2 AND browser_fingerprint = $3 AND is_active = true`,
                        [decoded.userId, decoded.deviceType, decoded.browserFingerprint]
                    );
                    
                    if (sessionResult.rows.length === 0) {
                        client.release();
                        return res.status(401).json({ error: 'Session expired or invalid. Please login again.' });
                    }
                    
                    // Update last activity
                    await client.query(
                        `UPDATE user_sessions SET last_activity = CURRENT_TIMESTAMP WHERE id = $1`,
                        [sessionResult.rows[0].id]
                    );
                    
                    client.release();
                } catch (sessionErr) {
                    client.release();
                    console.error('Session verification error:', sessionErr.message);
                    // Don't fail authentication if session check fails - allow request to proceed
                    // This prevents database issues from blocking all authenticated requests
                }
            } catch (dbErr) {
                console.error('Database connection error in authenticateToken:', dbErr.message);
                // Don't fail authentication if database is unavailable - allow request to proceed
                // This prevents database issues from blocking all authenticated requests
            }
        } else {
            // Database not available yet - skip session verification but still allow request
            console.warn('⚠️  Database pool not available, skipping session verification');
        }
        
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please login again.' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token. Please login again.' });
        }
        return res.status(500).json({ error: 'Token verification failed.' });
    }
};

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
                if(tableName === 'MATCANBAN_GRAMMAR_VOCAB') {
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


// User Auth with session management (1 laptop + 1 mobile per user)
app.post('/api/login', async (req, res) => {
    const { email, password, deviceType, browserFingerprint, isIncognito, userAgent, ipAddress } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // 🔒 SECURITY: Block incognito/private mode
    if (isIncognito) {
        return res.status(403).json({ error: 'Không thể đăng nhập ở chế độ ẩn danh. Vui lòng tắt chế độ ẩn danh và thử lại.' });
    }

    // 🔒 SECURITY: Require device type and browser fingerprint
    if (!deviceType || !browserFingerprint) {
        return res.status(400).json({ error: 'Device type and browser fingerprint are required.' });
    }

    // 🔒 SECURITY: Validate device type
    if (deviceType !== 'laptop' && deviceType !== 'mobile') {
        return res.status(400).json({ error: 'Invalid device type. Must be "laptop" or "mobile".' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }
    
    let client;
    try {
        client = await getDatabaseClient();
        await client.query('BEGIN');

        // Verify user credentials
        const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        // 🔒 SECURITY: Enforce device limits (max 2 laptops + 1 mobile) while allowing same machine multiple browsers
        // 🔒 SECURITY: Logout previous session on the same machine (same fingerprint)
        await client.query(
            `UPDATE user_sessions 
             SET is_active = false, last_activity = CURRENT_TIMESTAMP 
             WHERE user_id = $1 AND device_type = $2 AND browser_fingerprint = $3 AND is_active = true`,
            [user.id, deviceType, browserFingerprint]
        );

        // 🔒 SECURITY: Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                role: user.role,
                deviceType: deviceType,
                browserFingerprint: browserFingerprint
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Generate session token (separate from JWT for session tracking)
        const sessionToken = jwt.sign(
            { 
                userId: user.id,
                deviceType: deviceType,
                browserFingerprint: browserFingerprint,
                timestamp: Date.now()
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // 🔒 SECURITY: Create or update session (UPSERT)
        await client.query(
            `INSERT INTO user_sessions (user_id, device_type, browser_fingerprint, session_token, user_agent, ip_address, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, true)
             ON CONFLICT (user_id, device_type, browser_fingerprint) 
             DO UPDATE SET 
                 browser_fingerprint = EXCLUDED.browser_fingerprint,
                 session_token = EXCLUDED.session_token,
                 user_agent = EXCLUDED.user_agent,
                 ip_address = EXCLUDED.ip_address,
                 is_active = true,
                 last_activity = CURRENT_TIMESTAMP`,
            [user.id, deviceType, browserFingerprint, sessionToken, userAgent || null, ipAddress || req.ip || null]
        );

        await client.query('COMMIT');

        client.release();

        // Return user data with token (exclude password from response)
        const { password: _, ...userWithoutPassword } = user;
        res.json({ 
            ...userWithoutPassword, 
            token,
            sessionToken
        });
    } catch (err) {
        if (client) {
            await client.query('ROLLBACK');
            client.release();
        }
        console.error('API Login Error:', err.message);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// Logout endpoint - invalidate session
app.post('/api/logout', authenticateToken, async (req, res) => {
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }
    try {
        const client = await getDatabaseClient();
        try {
            await client.query('BEGIN');
            
            // Deactivate current session
            await client.query(
                `UPDATE user_sessions 
                 SET is_active = false, last_activity = CURRENT_TIMESTAMP 
                 WHERE user_id = $1 AND device_type = $2 AND browser_fingerprint = $3 AND is_active = true`,
                [req.user.userId, req.user.deviceType, req.user.browserFingerprint]
            );
            
            await client.query('COMMIT');
            res.json({ message: 'Logged out successfully.' });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('API Logout Error:', err.message);
        res.status(500).json({ error: 'Server error during logout.' });
    }
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('🟢 [API POST /api/register] Request:', { name, email });
    
    if (!name || !email || !password) {
        console.log('❌ [API POST] Missing required fields');
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }
    
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            console.log('❌ [API POST] Email already exists:', email);
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }

        const newUser = {
            id: `user_${Date.now()}`, name, email, password, role: 'Free',
            packages: [], activated: true, mobileLogin: false,
            joinDate: new Date().toLocaleDateString('en-GB'), expiryDate: '-',
            registered_at: new Date().toISOString(), bananaBalance: 30,
        };

        console.log('   → Inserting user into database:', newUser.id);
        await pool.query(
            `INSERT INTO users (id, name, email, password, role, packages, activated, "mobileLogin", "joinDate", "expiryDate", registered_at, "bananaBalance")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            Object.values(newUser)
        );
        
        console.log('✅ [API POST] User registered successfully:', newUser.id);
        
        // Backup users to Cloud Storage (async, non-blocking)
        backupUsersToCloudStorage().catch(err => {
            console.warn('Background backup failed after registration:', err.message);
        });
        
        res.status(201).json(newUser);
    } catch (err) {
        console.error('❌ [API POST] Registration Error:', err.message, err.stack);
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

app.get('/api/users', adminAuth, async (req, res) => {
    const adminKey = req.headers['x-admin-key'];
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    
    console.log('📋 [API GET /api/users] Request:', { adminKey: adminKey ? '***' : 'missing', ip: clientIP });
    
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }
    
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY "registered_at" DESC');
        console.log('✅ [API GET /api/users] Returned', result.rows.length, 'users');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ [API GET /api/users] Error:', err.message, err.stack);
        res.status(500).json({ error: 'Server error while fetching users.' });
    }
});

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Database service is not available. Please try again later.' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        console.error('API Get User Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching user.' });
    }
});


app.delete('/api/users/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const adminKey = req.headers['x-admin-key'];
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    
    console.log('🔴 [API DELETE /api/users/:id] Request:', { id, adminKey: adminKey ? '***' : 'missing', ip: clientIP });
    
    // 🔒 SECURITY: Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        console.warn('⚠️ [SECURITY] Invalid user ID in DELETE request:', { id, ip: clientIP });
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
            if (user.role === 'Admin') {
                const adminCount = await client.query('SELECT COUNT(*) as count FROM users WHERE role = $1', ['Admin']);
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
                adminKey: adminKey ? '***' : 'missing',
                ip: clientIP,
                timestamp: new Date().toISOString()
            });
            
            // Delete user (CASCADE will handle related records)
            await client.query('DELETE FROM users WHERE id = $1', [id]);
            await client.query('COMMIT');
            
            console.log('✅ [API DELETE] User deleted successfully:', { id, email: user.email, ip: clientIP });
            
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
app.put('/api/users/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, bananaBalance } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    
    console.log('👤 [API PUT /api/users/profile/:id] User profile update request:', { id, hasName: !!name, hasEmail: !!email, hasPassword: !!password, hasBananaBalance: bananaBalance !== undefined, ip: clientIP });
    
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
        fields.push(`password = $${fields.length + 1}`);
        values.push(password);
        console.log('✅ [API PUT /api/users/profile/:id] Password will be updated');
    }
    // Update bananaBalance if provided
    if (bananaBalance !== undefined && bananaBalance !== null) {
        // 🔒 SECURITY: Validate bananaBalance is a number and non-negative
        if (typeof bananaBalance !== 'number' || bananaBalance < 0) {
            console.warn('⚠️ [SECURITY] Invalid bananaBalance in profile update request:', { id, bananaBalance, ip: clientIP });
            return res.status(400).json({ error: 'Invalid banana balance.' });
        }
        fields.push(`"bananaBalance" = $${fields.length + 1}`);
        values.push(bananaBalance);
        console.log('✅ [API PUT /api/users/profile/:id] BananaBalance will be updated to:', bananaBalance);
    }
    // Always process email if provided (even if it's the same)
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
    
    if(fields.length === 0) {
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
            
            if(result.rows.length > 0) {
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
    const adminKey = req.headers['x-admin-key'];
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    
    console.log('🔵 [API PUT /api/users/:id] Request:', { id, name, bananaBalance, role, hasPassword: !!password, email: email, adminKey: adminKey ? '***' : 'missing', ip: clientIP });
    
    // 🔒 SECURITY: Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        console.warn('⚠️ [SECURITY] Invalid user ID in PUT request:', { id, ip: clientIP });
        return res.status(400).json({ error: 'Invalid user ID.' });
    }
    
    // 🔒 SECURITY: Validate email format if provided
    if (email !== undefined && email !== null && typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.warn('⚠️ [SECURITY] Invalid email format in PUT request:', { id, email, ip: clientIP });
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    
    // 🔒 SECURITY: Validate name if provided
    if (name !== undefined && name !== null && (typeof name !== 'string' || name.trim() === '')) {
        console.warn('⚠️ [SECURITY] Invalid name in PUT request:', { id, name, ip: clientIP });
        return res.status(400).json({ error: 'Name cannot be empty.' });
    }
    
    // 🔒 SECURITY: Validate role if provided
    if (role && !['Free', 'Premium', 'Admin'].includes(role)) {
        console.warn('⚠️ [SECURITY] Invalid role in PUT request:', { id, role, ip: clientIP });
        return res.status(400).json({ error: 'Invalid role. Must be Free, Premium, or Admin.' });
    }
    
    // 🔒 SECURITY: Validate bananaBalance if provided
    if (bananaBalance !== undefined && bananaBalance !== null) {
        if (typeof bananaBalance !== 'number' || isNaN(bananaBalance) || bananaBalance < 0) {
            console.warn('⚠️ [SECURITY] Invalid bananaBalance in PUT request:', { id, bananaBalance, ip: clientIP });
            return res.status(400).json({ error: 'Banana balance must be a non-negative number.' });
        }
        if (bananaBalance > 1000000) { // Max 1M bananas
            console.warn('⚠️ [SECURITY] Attempted to set excessive balance:', { userId: id, balance: bananaBalance, ip: clientIP });
            return res.status(400).json({ error: 'Balance exceeds maximum limit (1,000,000).' });
        }
    }
    
    // 🔒 SECURITY: Validate password if provided
    if (password !== undefined && password !== null) {
        if (typeof password !== 'string' || password.length < 5) {
            console.warn('⚠️ [SECURITY] Invalid password in PUT request:', { id, passwordLength: password?.length, ip: clientIP });
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
        fields.push(`password = $${fields.length + 1}`);
        values.push(password);
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
    
    if(fields.length === 0) {
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
                            [id, transactionType, amount, balanceBefore, balanceAfter, 'Admin adjustment', 'admin_panel', req.headers['x-admin-key'] || 'system']
                        );
                        console.log('📝 [API PUT] Transaction logged:', { userId: id, type: transactionType, amount, before: balanceBefore, after: balanceAfter });
                    }
                }
            }
            
            // Execute update query
            const result = await client.query(query, values);
            await client.query('COMMIT');
            
        if(result.rows.length > 0) {
                console.log('✅ [API PUT] User updated:', result.rows[0].id, 'Name:', result.rows[0].name, 'Email:', result.rows[0].email, 'Balance:', result.rows[0].bananaBalance);
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

// --- Helper Function to backup users data to Cloud Storage ---
const backupUsersToCloudStorage = async () => {
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
        console.log(`✅ Users backup successful: ${totalUsers} users saved to ${fileName} and ${latestFileName}`);
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

// Save test result
app.post('/api/test-results', async (req, res) => {
    const { userId, testType, testId, testName, score, totalQuestions, percentage, timeSpent, questionAnswers } = req.body;
    
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

// Get test results for a specific user
app.get('/api/test-results/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    
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
                COUNT(DISTINCT test_id) as unique_tests_count
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
// Get all gift rewards for a user
app.get('/api/gift-rewards/:userId', async (req, res) => {
    const { userId } = req.params;
    
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

// Claim a gift reward
app.post('/api/gift-rewards/claim', async (req, res) => {
    const { user_id, gift_level } = req.body;
    
    if (!user_id || !gift_level) {
        return res.status(400).json({ error: 'Missing required fields: user_id, gift_level' });
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

// Test data mapping - maps test IDs to their data file paths
const testDataMapping = {
    'toeic-part5-test1-2020': () => require('./data/toeic-part5-test1-2020-data').toeicPart5Test1_2020_Questions,
    'toeic-part5-test2-2020': () => require('./data/toeic-part5-test2-2020-data').toeicPart5Test2_2020_Questions,
    'toeic-part5-test3-2020': () => require('./data/toeic-part5-test3-2020-data').toeicPart5Test3_2020_Questions,
    'toeic-part5-test4-2020': () => require('./data/toeic-part5-test4-2020-data').toeicPart5Test4_2020_Questions,
    'toeic-part5-test5-2020': () => require('./data/toeic-part5-test5-2020-data').toeicPart5Test5_2020_Questions,
    'toeic-part5-test6-2020': () => require('./data/toeic-part5-test6-2020-data').toeicPart5Test6_2020_Questions,
    'toeic-part5-test7-2020': () => require('./data/toeic-part5-test7-2020-data').toeicPart5Test7_2020_Questions,
    'toeic-part5-test8-2020': () => require('./data/toeic-part5-test8-2020-data').toeicPart5Test8_2020_Questions,
    'toeic-part5-test9-2020': () => require('./data/toeic-part5-test9-2020-data').toeicPart5Test9_2020_Questions,
    'toeic-part5-test10-2020': () => require('./data/toeic-part5-test10-2020-data').toeicPart5Test10_2020_Questions,
    // Add more mappings as needed
};

// Get test questions
app.get('/api/test-questions/:testId', adminAuth, async (req, res) => {
    const { testId } = req.params;
    
    try {
        const getQuestions = testDataMapping[testId];
        if (!getQuestions) {
            return res.status(404).json({ error: `Test ${testId} not found` });
        }
        
        // For now, return the questions from the module
        // In production, you might want to cache or read from database
        const questions = getQuestions();
        
        res.json({ questions });
    } catch (err) {
        console.error('API Get Test Questions Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching test questions.' });
    }
});

// Update test question (explanation and rule only)
app.put('/api/test-questions/:testId/:questionId', adminAuth, async (req, res) => {
    const { testId, questionId } = req.params;
    const { explanation, rule } = req.body;
    
    try {
        // Get the data file path
        const getQuestions = testDataMapping[testId];
        if (!getQuestions) {
            return res.status(404).json({ error: `Test ${testId} not found` });
        }
        
        const dataFileMap = {
            'toeic-part5-test1-2020': 'data/toeic-part5-test1-2020-data.ts',
            'toeic-part5-test2-2020': 'data/toeic-part5-test2-2020-data.ts',
            'toeic-part5-test3-2020': 'data/toeic-part5-test3-2020-data.ts',
            'toeic-part5-test4-2020': 'data/toeic-part5-test4-2020-data.ts',
            'toeic-part5-test5-2020': 'data/toeic-part5-test5-2020-data.ts',
            'toeic-part5-test6-2020': 'data/toeic-part5-test6-2020-data.ts',
            'toeic-part5-test7-2020': 'data/toeic-part5-test7-2020-data.ts',
            'toeic-part5-test8-2020': 'data/toeic-part5-test8-2020-data.ts',
            'toeic-part5-test9-2020': 'data/toeic-part5-test9-2020-data.ts',
            'toeic-part5-test10-2020': 'data/toeic-part5-test10-2020-data.ts',
        };
        
        const filePath = dataFileMap[testId];
        if (!filePath) {
            return res.status(404).json({ error: `Test file for ${testId} not found` });
        }
        
        // Read the file
        const fullPath = path.join(__dirname, filePath);
        let fileContent = fs.readFileSync(fullPath, 'utf8');
        
        // Find and update the question
        const questionIdNum = parseInt(questionId, 10);
        const questionRegex = new RegExp(`(id:\\s*${questionIdNum}[^}]*explanation:\\s*")([^"]*)(")[^}]*rule:\\s*"([^"]*)(")`, 's');
        
        if (questionRegex.test(fileContent)) {
            fileContent = fileContent.replace(questionRegex, (match, p1, p2, p3, p4, p5) => {
                return `${p1}${explanation.replace(/"/g, '\\"')}${p3}${match.split('rule:')[0].split(explanation)[1]}rule: "${rule.replace(/"/g, '\\"')}"`;
            });
            
            // Write back to file
            fs.writeFileSync(fullPath, fileContent, 'utf8');
            
            res.json({ success: true, message: 'Question updated successfully' });
        } else {
            // Try alternative pattern (questions might be in separate files)
            res.status(404).json({ error: `Question ${questionId} not found in test ${testId}` });
        }
    } catch (err) {
        console.error('API Update Test Question Error:', err.message);
        res.status(500).json({ error: 'Server error while updating test question.' });
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
            [userId, transactionType, amount, balanceBefore, balanceAfter, reason || 'System transaction', source || 'system', req.headers['x-admin-key'] || 'system']
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
    try {
        const userCheck = await pool.query('SELECT id, email, password, "bananaBalance" FROM users WHERE id = $1 AND email = $2 AND password = $3', [userId, userEmail, userPassword]);
        if (userCheck.rows.length === 0) {
            console.warn('⚠️ [SECURITY] Invalid credentials in public banana transaction request:', { userId, email: userEmail, ip: clientIP });
            return res.status(401).json({ error: 'Invalid user credentials.' });
        }
        
        // ✅ User authenticated successfully
        console.log('✅ [SECURITY] User authenticated for public transaction:', { userId, email: userCheck.rows[0].email, ip: clientIP });
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
                    error: 'Bạn đã điểm danh hôm nay rồi! Vui lòng quay lại vào ngày mai.',
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
            WHERE u.role != 'Admin'
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server immediately - don't wait for database initialization
// Cloud Run needs the server to start listening on PORT within the timeout
// This MUST happen synchronously, no async operations before this
console.log(`🚀 Starting server on port ${port}...`);
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is listening on port ${port} (0.0.0.0)`);
  console.log(`✅ Health check available at http://0.0.0.0:${port}/health`);
  console.log(`✅ Server is ready to accept connections`);
  
  // Initialize database asynchronously (non-blocking, after server starts)
  // Load database pool first, then initialize tables
  setImmediate(() => {
    console.log('🔄 Loading database pool in background...');
    // Use setTimeout to give server time to fully start
    setTimeout(() => {
      const dbLoaded = loadDatabasePool();
      if (dbLoaded) {
        console.log('🔄 Starting database initialization...');
        ensureTablesExist().then(() => {
          return ensureAdminUserExists();
        }).then(() => {
          console.log(`✅ Backend server is fully operational on port ${port}`);
        }).catch((err) => {
          console.error('❌ Error during database initialization:', err);
          console.error('⚠️  Server will continue running, but database features may not work');
          // Server still listens even if initialization fails
        });
      } else {
        console.log('⚠️  Database pool not loaded, skipping table initialization');
      }
    }, 2000); // Wait 2 seconds after server starts to ensure it's fully ready
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
