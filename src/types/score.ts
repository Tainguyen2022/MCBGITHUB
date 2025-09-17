export type Verdict = 'correct' | 'incorrect';

export interface AttemptPayload {
  userId: string;              // tạm thời FE tạo "local" hoặc lấy từ auth khi có
  mode: string;                // sorting/gap-fill/...
  exerciseId: string;          // id bài
  exerciseItemId: string;      // id câu/item trong bài (duy nhất)
  verdict: Verdict;            // kết quả người dùng
  clientTs: number;            // Date.now()
  attemptNonce: string;        // server cấp trước
  hmac: string;                // FE ký = HMAC(serverNonce + payloadCore)
}

export interface AttemptResult {
  counted: boolean;            // true nếu lần đầu → có tính điểm
  delta: number;               // +1 / -0.5 / 0
  totalScore: number;          // tổng tích lũy sau cập nhật
  totalCorrect: number;        // tổng câu đúng tích lũy
  credits: number;             // chuối hiện tại
  message: string;             // praise/encouragement
}

export interface ScoreSummary {
  totalScore: number;
  totalCorrect: number;
  credits: number;
}

