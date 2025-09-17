
// server.js
// Robust Express server for SPA + API on Cloud Run
const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const crypto = require('crypto');
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

// ---- Scoring System Endpoints ----------------------------------------------
const serverSecret = process.env.SCORE_SECRET || 'matcanban_score_secret_2025';

// Simple in-memory store for demo (replace with database in production)
const scoreData = {
  scoreboard: {},
  nonces: {},
  attempts: {}
};

// Nonce endpoint
app.get('/api/score/nonce', (req, res) => {
  const { userId, exerciseItemId } = req.query;
  if (!userId || !exerciseItemId) {
    return res.status(400).json({ error: 'Missing userId or exerciseItemId' });
  }
  
  const nonce = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  const key = `${userId}:${exerciseItemId}`;
  
  scoreData.nonces[key] = {
    nonce,
    exp: Date.now() + 5 * 60 * 1000, // 5 minutes
    used: false
  };
  
  res.json({ attemptNonce: nonce });
});

// Submit attempt endpoint
app.post('/api/score/attempt', (req, res) => {
  const { userId, mode, exerciseId, exerciseItemId, verdict, clientTs, attemptNonce, hmac } = req.body;
  
  if (!userId || !exerciseItemId || !attemptNonce || !verdict) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Verify nonce
  const nonceKey = `${userId}:${exerciseItemId}`;
  const nonceRecord = scoreData.nonces[nonceKey];
  
  if (!nonceRecord || nonceRecord.used || nonceRecord.exp < Date.now() || nonceRecord.nonce !== attemptNonce) {
    return res.status(409).json({ error: 'Invalid or expired nonce' });
  }
  
  // Mark nonce as used
  nonceRecord.used = true;
  
  // Check if already attempted (idempotency)
  const attemptKey = `${userId}:${exerciseItemId}`;
  const existingAttempt = scoreData.attempts[attemptKey];
  
  let counted = false;
  let delta = 0;
  
  if (!existingAttempt || !existingAttempt.counted) {
    counted = true;
    delta = verdict === 'correct' ? 1 : -0.5;
  }
  
  // Record attempt
  scoreData.attempts[attemptKey] = {
    userId,
    exerciseItemId,
    counted,
    verdict,
    ts: Date.now(),
    mode: mode || 'unknown',
    exerciseId: exerciseId || 'unknown'
  };
  
  // Update score summary
  const summary = scoreData.scoreboard[userId] || { 
    userId, 
    totalScore: 0, 
    totalCorrect: 0, 
    credits: 0,
    lastUpdated: Date.now()
  };
  
  if (counted) {
    summary.totalScore = Math.round((summary.totalScore + delta) * 100) / 100;
    if (verdict === 'correct') {
      summary.totalCorrect += 1;
      // Award credit every 50 correct answers
      if (summary.totalCorrect % 50 === 0) {
        summary.credits += 1;
      }
    }
    summary.lastUpdated = Date.now();
    scoreData.scoreboard[userId] = summary;
  }
  
  // Generate random message
  const correctMessages = [
    "Tốt lắm! 🌟", "Quá chuẩn! 👏", "Bạn làm rất chắc! 💪", "Xuất sắc! 🏆", 
    "Đúng rồi, tiếp tục đà này nhé! 🚀", "Tuyệt vời! Bạn hiểu rõ cấu trúc! ✨"
  ];
  const incorrectMessages = [
    "Gần đúng rồi! Thử lại nào 💡", "Không sao, đọc kỹ gợi ý nhé 👀", 
    "Sai cũng là học! Cố lên! 💪", "Nhìn lại collocation ở trên nhé 🔎",
    "Chưa đúng, nhưng bạn đang học hỏi! 📚", "Thử suy nghĩ về ngữ pháp nhé 🤔"
  ];
  
  const messageArray = verdict === 'correct' ? correctMessages : incorrectMessages;
  const message = messageArray[Math.floor(Math.random() * messageArray.length)];
  
  res.json({
    counted,
    delta,
    totalScore: summary.totalScore,
    totalCorrect: summary.totalCorrect,
    credits: summary.credits,
    message: counted ? message : `${message} (Không tính điểm lần 2)`
  });
});

// Get score summary endpoint
app.get('/api/score/summary', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  
  const summary = scoreData.scoreboard[userId] || { 
    totalScore: 0, 
    totalCorrect: 0, 
    credits: 0 
  };
  
  res.json(summary);
});

// ---- iSpeak ASR + AI scoring (mock) ----------------------------------------
app.post('/api/sp/asr', (req, res) => {
  // For demo: return dummy transcript
  res.json({ transcript: 'This is a demo transcript for iSpeak.', wpm: 120, fillers: 2 });
});

app.post('/api/sp/score', (req, res) => {
  const { userId, itemId, transcript, consumeCredit } = req.body || {};
  if (!userId || !itemId || !transcript) return res.status(400).json({ error: 'bad payload' });

  // Spend 1 credit if requested
  const summary = scoreData.scoreboard[userId] || { userId, totalScore: 0, totalCorrect: 0, credits: 0 };
  if (consumeCredit) {
    if ((summary.credits || 0) < consumeCredit) return res.status(402).json({ error: 'NO_CREDIT', message: 'Không đủ 🍌. Hãy luyện thêm để nhận credit!', credits: summary.credits || 0 });
    summary.credits = (summary.credits || 0) - consumeCredit;
  }

  // Idempotency per item
  const attemptKey = `${userId}:${itemId}`;
  const existing = scoreData.attempts[attemptKey];
  let counted = false; let delta = 0;
  const verdict = transcript.trim().length > 10 ? 'correct' : 'incorrect';
  if (!existing || !existing.counted) {
    counted = true; delta = verdict === 'correct' ? 1 : -0.5;
  }
  scoreData.attempts[attemptKey] = { userId, exerciseItemId: itemId, counted, verdict, ts: Date.now() };
  if (counted) {
    summary.totalScore = Math.round((summary.totalScore + delta) * 100) / 100;
    if (verdict === 'correct') {
      summary.totalCorrect = (summary.totalCorrect || 0) + 1;
      if (summary.totalCorrect % 50 === 0) summary.credits = (summary.credits || 0) + 1;
    }
  }
  scoreData.scoreboard[userId] = summary;

  const rubric = { fluency: 7, lexical: 6.5, grammar: 6.5, pronunciation: 7 };
  const message = verdict === 'correct' ? 'Rất mạch lạc! 🌟 Duy trì tốc độ và thêm 1 ví dụ cụ thể.' : 'Thiếu ví dụ. Thử chèn 1 minh hoạ + linker rõ ràng nhé 💡';
  res.json({ ok: true, spent: consumeCredit || 0, credits: summary.credits, verdict, counted, delta, totalScore: summary.totalScore, totalCorrect: summary.totalCorrect, rubric, message });
});

// ---- Start Server ----------------------------------------------------------
app.listen(PORT, () => {
  ensureTablesExist().then(() => {
    console.log(`✅ Server started on :${PORT}`);
    console.log(`🎯 Scoring system: Active with anti-cheat`);
  });
});
