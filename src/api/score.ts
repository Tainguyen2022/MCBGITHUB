import { AttemptPayload, AttemptResult, ScoreSummary, Verdict } from '../types/score';

const USER_KEY = 'matcanban_user_id';
const USER = localStorage.getItem(USER_KEY) || (() => {
  const newId = cryptoRandomId();
  localStorage.setItem(USER_KEY, newId);
  return newId;
})();

export async function getNonce(exerciseItemId: string): Promise<{ attemptNonce: string }> {
  try {
    const r = await fetch(`/api/score/nonce?userId=${USER}&exerciseItemId=${encodeURIComponent(exerciseItemId)}`);
    if (!r.ok) {
      console.warn('Score nonce API not available, using fallback');
      return { attemptNonce: 'fallback-nonce' };
    }
    
    const contentType = r.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Score nonce API returned non-JSON response, using fallback');
      return { attemptNonce: 'fallback-nonce' };
    }
    
    return r.json();
  } catch (error) {
    console.error('Score nonce error:', error);
    return { attemptNonce: 'fallback-nonce' };
  }
}

export async function submitAttempt(params: { 
  mode: string;
  exerciseId: string;
  exerciseItemId: string; 
  verdict: Verdict 
}): Promise<AttemptResult> {
  try {
    const { attemptNonce } = await getNonce(params.exerciseItemId);
    const clientTs = Date.now();
    
    // Simple HMAC for security (server will verify)
    const base = `${USER}|${params.exerciseItemId}|${attemptNonce}|${params.verdict}|${clientTs}`;
    const hmac = btoa(base); // Simple encoding, server will do proper HMAC
    
    const payload: AttemptPayload = {
      userId: USER,
      mode: params.mode,
      exerciseId: params.exerciseId,
      exerciseItemId: params.exerciseItemId,
      verdict: params.verdict,
      clientTs,
      attemptNonce,
      hmac
    };

    const r = await fetch('/api/score/attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!r.ok) {
      console.warn('Score attempt API not available, using fallback');
      throw new Error('Failed to submit attempt');
    }
    
    const contentType = r.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Score attempt API returned non-JSON response, using fallback');
      throw new Error('Failed to submit attempt');
    }
    
    return r.json();
  } catch (error) {
    console.error('Score submission error:', error);
    // Fallback for offline/error cases
    return {
      counted: false,
      delta: 0,
      totalScore: 0,
      totalCorrect: 0,
      credits: 0,
      message: 'Không thể kết nối server. Thử lại sau!'
    };
  }
}

export async function getScoreSummary(): Promise<ScoreSummary> {
  try {
    const r = await fetch(`/api/score/summary?userId=${USER}`);
    if (!r.ok) {
      console.warn('Score summary API not available, using fallback');
      return { totalScore: 0, totalCorrect: 0, credits: 0 };
    }
    
    const contentType = r.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Score summary API returned non-JSON response, using fallback');
      return { totalScore: 0, totalCorrect: 0, credits: 0 };
    }
    
    return r.json();
  } catch (error) {
    console.error('Score summary error:', error);
    return { totalScore: 0, totalCorrect: 0, credits: 0 };
  }
}

function cryptoRandomId(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

export function userId(): string {
  return USER;
}

