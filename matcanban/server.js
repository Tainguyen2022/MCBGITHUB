
// server.js
// Robust Express server for SPA + API on Cloud Run
const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const pool = require('./db').default;
const { Storage } = require('@google-cloud/storage');

const app = express();

// ---- Core settings ----------------------------------------------------------
const PORT = process.env.PORT || 8080;
app.set('trust proxy', true);

// Security & performance middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors());

// JSON body parsing for API
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

// --- Directories for frontend build ---
const STATIC_DIR = path.join(__dirname, ''); // Serves from the root directory
const INDEX_HTML = path.join(STATIC_DIR, 'index.html');

// ---- API ROUTES (define FIRST) ---------------------------------------------
const api = express.Router();

// --- Helper Function to ensure tables exist ---
const ensureTablesExist = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'Free',
                packages TEXT[], activated BOOLEAN, "mobileLogin" BOOLEAN, "joinDate" TEXT, "expiryDate" TEXT,
                registered_at TIMESTAMPTZ, "bananaBalance" INTEGER, "lastDailyBonus" TEXT
            );
        `);
        // Add other table creations here if needed
    } catch (err) {
        console.error("Error ensuring tables exist:", err.message);
    } finally {
        client.release();
    }
};

// Health check
api.get('/health', (req, res) => {
  res.json({ ok: true, now: new Date().toISOString() });
});

// /api/all-data
api.get('/all-data', async (req, res) => {
    const client = await pool.connect();
    const publicDataKeys = [
        'MATCANBAN_TIPS_DATA', 'MATCANBAN_PRACTICE_TESTS', 'MATCANBAN_FOUNDATION_DATA', 'MATCANBAN_SPEAKING_SCENARIOS',
        'MATCANBAN_CAMBRIDGE_STARTERS_DATA', 'MATCANBAN_GRAMMAR_UNITS', 'MATCANBAN_GRAMMAR_GROUPS', 'MATCANBAN_GRAMMAR_VOCAB',
        'MATCANBAN_WRITING_DATA',
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
        'MATCANBAN_WRITING_TOEIC_P1_SUBCATEGORIES', 'MATCANBAN_WRITING_TOEIC_P1_CONTENT',
        'MATCANBAN_WRITING_TOEIC_P2_SUBCATEGORIES', 'MATCANBAN_WRITING_TOEIC_P2_CONTENT',
        'MATCANBAN_WRITING_TOEIC_P3_SUBCATEGORIES', 'MATCANBAN_WRITING_TOEIC_P3_CONTENT',
        'MATCANBAN_WRITING_VSTEP_T1_SUBCATEGORIES', 'MATCANBAN_WRITING_VSTEP_T1_CONTENT',
        'MATCANBAN_WRITING_VSTEP_T2_SUBCATEGORIES', 'MATCANBAN_WRITING_VSTEP_T2_CONTENT',
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
            const tableExistsResult = await client.query("SELECT to_regclass($1)", [`public."${sanitizedTableName}"`]);
            if (tableExistsResult.rows[0].to_regclass) {
                const result = await client.query(`SELECT data FROM "${sanitizedTableName}"`);
                if(tableName === 'MATCANBAN_GRAMMAR_VOCAB') {
                    allData[tableName] = result.rows[0]?.data || {};
                } else {
                    allData[tableName] = result.rows.map(row => row.data);
                }
            } else {
                 allData[tableName] = [];
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

// /api/login
api.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) res.json(result.rows[0]);
        else res.status(401).json({ error: 'Invalid email or password.' });
    } catch (err) {
        console.error('API Login Error:', err.message);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// /api/users
api.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY "registered_at" DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('API Get Users Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching users.' });
    }
});

// 404 JSON handler for API routes not found
api.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'API route not found',
    route: req.method + ' ' + req.originalUrl,
  });
});

// Mount the API router before static files
app.use('/api', api);

// ---- STATIC FILES (after API) ----------------------------------------------
app.use(express.static(STATIC_DIR));

// ---- SPA CATCH-ALL (LAST) --------------------------------------------------
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next(); // Let API 404 handler catch it
  if (!fs.existsSync(INDEX_HTML)) {
    return res.status(500).send('index.html not found. Build your frontend first.');
  }
  res.sendFile(INDEX_HTML);
});

// ---- Error handler ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  const status = err.status || 500;
  if (req.originalUrl.startsWith('/api')) {
    return res.status(status).json({
      ok: false,
      error: err.message || 'Internal Server Error',
    });
  }
  res.status(status).send('Server error. Please try again later.');
});

// ---- Start Server ----------------------------------------------------------
app.listen(PORT, () => {
  ensureTablesExist().then(() => {
    console.log(`✅ Server started on :${PORT}`);
  });
});
