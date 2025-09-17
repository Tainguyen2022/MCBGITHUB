import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), 'server', 'data');
const SCORE_FILE = path.join(ROOT, 'scoreboard.json');
const NONCE_FILE = path.join(ROOT, 'attempt_nonces.json');
const ATTEMPT_FILE = path.join(ROOT, 'attempts.json');

type ScoreRow = { 
  userId: string; 
  totalScore: number; 
  totalCorrect: number; 
  credits: number;
  lastUpdated: number;
};

type AttemptRow = { 
  userId: string; 
  exerciseItemId: string; 
  counted: boolean; 
  verdict: 'correct' | 'incorrect'; 
  ts: number;
  mode: string;
  exerciseId: string;
};

type NonceRecord = {
  nonce: string;
  exp: number;
  used?: boolean;
};

function readJson<T>(file: string, fallback: T): T {
  try { 
    return JSON.parse(fs.readFileSync(file, 'utf8')); 
  } catch { 
    return fallback; 
  }
}

function writeJson(file: string, data: any) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

export function getSummary(userId: string): ScoreRow {
  const all = readJson<Record<string, ScoreRow>>(SCORE_FILE, {});
  return all[userId] ?? { 
    userId, 
    totalScore: 0, 
    totalCorrect: 0, 
    credits: 0,
    lastUpdated: Date.now()
  };
}

export function saveSummary(row: ScoreRow) {
  const all = readJson<Record<string, ScoreRow>>(SCORE_FILE, {});
  row.lastUpdated = Date.now();
  all[row.userId] = row;
  writeJson(SCORE_FILE, all);
}

export function nonceCreate(userId: string, exerciseItemId: string): string {
  const map = readJson<Record<string, NonceRecord>>(NONCE_FILE, {});
  const key = `${userId}:${exerciseItemId}`;
  const nonce = cryptoRandomId();
  
  // Clean up expired nonces
  Object.keys(map).forEach(k => {
    if (map[k].exp < Date.now()) {
      delete map[k];
    }
  });
  
  map[key] = { 
    nonce, 
    exp: Date.now() + 5 * 60 * 1000, // 5 minutes
    used: false 
  };
  
  writeJson(NONCE_FILE, map);
  return nonce;
}

export function nonceUse(userId: string, exerciseItemId: string, nonce: string): boolean {
  const map = readJson<Record<string, NonceRecord>>(NONCE_FILE, {});
  const key = `${userId}:${exerciseItemId}`;
  const rec = map[key];
  
  if (!rec || rec.used || rec.exp < Date.now() || rec.nonce !== nonce) {
    return false;
  }
  
  rec.used = true;
  writeJson(NONCE_FILE, map);
  return true;
}

export function hasCountedAttempt(userId: string, exerciseItemId: string): boolean {
  const all = readJson<Record<string, AttemptRow>>(ATTEMPT_FILE, {});
  const key = `${userId}:${exerciseItemId}`;
  return !!all[key]?.counted;
}

export function recordAttempt(row: AttemptRow) {
  const all = readJson<Record<string, AttemptRow>>(ATTEMPT_FILE, {});
  const key = `${row.userId}:${row.exerciseItemId}`;
  all[key] = row;
  writeJson(ATTEMPT_FILE, all);
}

export function getLeaderboard(limit: number = 10): ScoreRow[] {
  const all = readJson<Record<string, ScoreRow>>(SCORE_FILE, {});
  return Object.values(all)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit);
}

function cryptoRandomId(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

// Praise and encouragement messages
export function randomPraise(): string {
  const messages = [
    "Tốt lắm! 🌟",
    "Quá chuẩn! 👏", 
    "Bạn làm rất chắc! 💪",
    "Xuất sắc! 🏆",
    "Đúng rồi, tiếp tục đà này nhé! 🚀",
    "Tuyệt vời! Bạn hiểu rõ cấu trúc! ✨",
    "Chính xác hoàn toàn! 🎯",
    "Giỏi quá! Keep it up! 💫"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function randomEncouragement(): string {
  const messages = [
    "Gần đúng rồi! Thử lại nào 💡",
    "Không sao, đọc kỹ gợi ý nhé 👀", 
    "Sai cũng là học! Cố lên! 💪",
    "Nhìn lại collocation ở trên nhé 🔎",
    "Chưa đúng, nhưng bạn đang học hỏi! 📚",
    "Thử suy nghĩ về ngữ pháp nhé 🤔",
    "Đừng nản, mỗi lỗi là một bài học! 🌱",
    "Xem lại từ vựng và thử lại! 📖"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

