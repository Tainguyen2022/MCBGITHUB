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

// ⚡ CLOUD RUN OPTIMIZED: Load core modules synchronously (lightweight)
const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

// 🔒 SECURITY: Rate limiting for authentication endpoints
// Prevent brute-force attacks on login/register
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for localhost in development
    return process.env.NODE_ENV === 'development' && 
           (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1');
  }
});

// Apply rate limiting to authentication endpoints
app.use('/api/login', authRateLimiter);
app.use('/api/register', authRateLimiter);
app.use('/api/auth/simple-login', authRateLimiter);
app.use('/api/auth/simple-register', authRateLimiter);

// Serve static files from dist directory
app.use(express.static('dist'));

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

        // Initialize content management tables (Mtest, Voca, Giao tiếp)
        await ensureContentTablesExist();

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
            console.log('✅ [SCHEMA] Added operating_system and login_time columns to user_sessions');
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
        const adminRole = 'Admin';
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
            // Use a placeholder password that will need to be changed (plain text)
            const placeholderPassword = 'CHANGE_ME'; // Plain text - no hashing
            const newUser = {
                id: `user_${Date.now()}`,
                name: adminName,
                email: adminEmail,
                password: placeholderPassword, // Placeholder - must be changed manually
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
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
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
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please login again.' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token. Please login again.' });
        }
        return res.status(500).json({ error: 'Token verification failed.' });
    }
};

// --- Admin Role Middleware ---
const requireAdminRole = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
    const user = req.user;
    
    if (!user) {
        console.warn('⚠️ [SECURITY] Missing user context for admin route:', {
            endpoint: req.path,
            method: req.method,
            ip: clientIP,
            timestamp: new Date().toISOString()
        });
        return res.status(401).json({ error: 'Authentication required. Please login again.' });
    }
    
    if (user.role !== 'Admin') {
        console.warn('⚠️ [SECURITY] Unauthorized admin API access attempt:', {
            endpoint: req.path,
            method: req.method,
            ip: clientIP,
            userId: user.userId,
            userRole: user.role,
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


// ============================================
// ✅ NEW: Clean Login Endpoint
// ============================================
// Code sạch, đơn giản, đồng bộ SQL
// Hỗ trợ migration tự động từ bcrypt sang plain text
// Không làm mất dữ liệu user cũ
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
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
                setTimeout(() => reject(new Error('Database connection timeout')), 10000)
            )
        ]);
        
        // Find user by email
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            client.release();
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = result.rows[0];
        
        // ✅ PASSWORD VERIFICATION: Support both bcrypt (old) and plain text (new)
        let passwordValid = false;
        let needsMigration = false;
        
        if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$') || user.password.startsWith('$2y$'))) {
            // Old format: bcrypt hash - verify with bcrypt
            passwordValid = await bcrypt.compare(password, user.password);
            needsMigration = passwordValid; // Migrate to plain text if correct
        } else {
            // New format: plain text - direct comparison
            passwordValid = (user.password === password);
        }
        
        if (!passwordValid) {
            client.release();
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        
        // ✅ AUTO-MIGRATION: Convert bcrypt to plain text (không làm mất dữ liệu)
        if (needsMigration) {
            try {
                await client.query('UPDATE users SET password = $1 WHERE id = $2', [password, user.id]);
                console.log(`✅ [LOGIN] Auto-migrated password for user: ${user.email}`);
            } catch (migrationErr) {
                // Migration failed but login succeeds - log warning only
                console.warn(`⚠️ [LOGIN] Password migration failed for ${user.email}:`, migrationErr.message);
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        client.release();

        // Return user data with token (exclude password)
        const { password: _, ...userWithoutPassword } = user;
        res.json({ 
            ...userWithoutPassword, 
            token
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
        
        // Specific error messages
        let errorMessage = 'Server error during login.';
        if (err.message && err.message.includes('timeout')) {
            errorMessage = 'Database connection timeout. Please try again.';
        } else if (err.message && err.message.includes('ECONNREFUSED')) {
            errorMessage = 'Database connection failed. Please try again later.';
        } else if (err.message && err.message.includes('does not exist')) {
            errorMessage = 'Database table not found. Please contact support.';
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
        
        // Check password: support both bcrypt (old) and plain text (new)
        let passwordValid = false;
        let needsMigration = false;
        
        if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$') || user.password.startsWith('$2y$'))) {
            // Password is bcrypt hash (old format) - verify with bcrypt
            passwordValid = await bcrypt.compare(password, user.password);
            needsMigration = passwordValid; // Migrate if password is correct
        } else {
            // Password is plain text (new format) - direct comparison
            passwordValid = (user.password === password);
        }
        
        if (!passwordValid) {
            client.release();
            return res.status(401).json({ error: 'Email hoặc password không đúng' });
        }
        
        // ✅ AUTO-MIGRATION: Convert bcrypt to plain text on successful login
        if (needsMigration) {
            try {
                await client.query('UPDATE users SET password = $1 WHERE id = $2', [password, user.id]);
                console.log(`✅ [SIMPLE-LOGIN] Auto-migrated password for user: ${user.email}`);
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
        
        // Store password as plain text (no hashing)
        const result = await client.query(
            `INSERT INTO users (name, email, password, role, bananas, registered_at) 
             VALUES ($1, $2, $3, 'user', 0, NOW()) 
             RETURNING id, name, email, role, bananas, registered_at`,
            [name, email, password]
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
    if (!isRealDatabasePool()) {
        return res.status(503).json({ error: 'Dịch vụ đang bảo trì. Vui lòng thử lại sau.' });
    }
    
    try {
        const client = await getDatabaseClient();
        const result = await client.query(
            'SELECT id, name, email, role, bananas, registered_at FROM users WHERE id = $1', 
            [req.user.userId]
        );
        client.release();
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error('❌ [AUTH-ME] Error:', err.message);
        res.status(500).json({ error: 'Lỗi server' });
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
        const newUser = {
            id: userId,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password, // Plain text
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
    const authenticatedUserId = req.user?.userId; // From JWT token
    
    // Check if user is authenticated
    if (!authenticatedUserId) {
        console.warn('⚠️ [AUTH] Unauthenticated request to get user score');
        return res.status(401).json({ error: 'Authentication required.' });
    }
    
    // 🔒 SECURITY: Verify user can only get their own score
    if (userId !== authenticatedUserId) {
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
        console.error('❌ API Get User Score Error:', {
            message: err.message,
            stack: err.stack,
            userId: userId
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
        
        res.status(500).json({ error: 'Server error while fetching user score.' });
    }
});

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    if (!isRealDatabasePool()) {
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
        console.error('API Get User Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching user.' });
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
        // ✅ SIMPLIFIED: Store password as plain text (no hashing)
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
    if (role && !['Free', 'Premium', 'Admin'].includes(role)) {
        console.warn('⚠️ [SECURITY] Invalid role in PUT request:', { id, role, ip: clientIP, adminId: requester.userId });
        return res.status(400).json({ error: 'Invalid role. Must be Free, Premium, or Admin.' });
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
        // ✅ SIMPLIFIED: Store password as plain text (no hashing)
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
                            [id, transactionType, amount, balanceBefore, balanceAfter, 'Admin adjustment', 'admin_panel', (req.user && req.user.userId) || 'system']
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
                    // Use a temporary plain text password that user must reset
                    const tempPassword = 'TEMP_RESET_REQUIRED'; // Plain text - no hashing
                    
                    await client.query(
                        `INSERT INTO users (id, name, email, password, role, packages, activated, "mobileLogin", "joinDate", "expiryDate", registered_at, "bananaBalance")
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                        [
                            user.id,
                            user.name,
                            user.email,
                            tempPassword, // Temporary password - user must reset
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

app.get(['/admin', '/admin/*'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'admin.html'));
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
