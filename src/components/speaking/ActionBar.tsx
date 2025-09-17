import React from 'react';

export default function ActionBar({
  recording, onToggleRecord, onAiCheck,
  onToggleVocab, onToggleOutline, onToggleFlow, onToggleModel,
  disabledCheck, credits
}: {
  recording: boolean;
  onToggleRecord: () => void;
  onAiCheck: () => void;
  onToggleVocab: () => void;
  onToggleOutline: () => void;
  onToggleFlow: () => void;
  onToggleModel: () => void;
  disabledCheck?: boolean;
  credits: number;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t z-50">
      <div className="max-w-5xl mx-auto px-3 py-2 flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onToggleRecord}
            className={`px-4 py-2 rounded-xl font-bold uppercase flex items-center gap-2 ${recording ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
            <span>{recording ? '⏺️ Đang ghi' : '🎙️ Ghi âm'}</span>
          </button>

          <button onClick={onAiCheck} disabled={disabledCheck || credits <= 0}
            className={`px-4 py-2 rounded-xl font-extrabold uppercase flex items-center gap-2 ${disabledCheck || credits <= 0 ? 'bg-gray-300 text-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            🧠 KIỂM TRA (AI) <span className="text-amber-200">−1 🍌</span>
          </button>

          <span className="ml-2 text-sm text-amber-700 font-semibold">🍌 Chuối: {credits}</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onToggleVocab} className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-bold uppercase">📚 Từ vựng</button>
          <button onClick={onToggleOutline} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold uppercase">🧭 Dàn ý</button>
          <button onClick={onToggleFlow} className="px-3 py-1.5 rounded-lg bg-pink-50 text-pink-700 font-bold uppercase">🧩 Answer Flow</button>
          <button onClick={onToggleModel} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold uppercase">🎤 Bài nói mẫu</button>
        </div>
      </div>
    </div>
  );
}


