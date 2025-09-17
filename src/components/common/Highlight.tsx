import React from 'react';

export interface FancyTokenType { en: string; vi: string; level?: 'B1'|'B2'|'C1'|'C2'; }

export function FancyToken({ t }: { t: FancyTokenType }) {
  const isHard = t.level && ['B2','C1','C2'].includes(t.level);
  return (
    <div className="py-1">
      <div className={`text-base ${isHard ? 'font-extrabold text-indigo-700' : 'font-semibold text-gray-900'}`}>
        {t.en}
        {isHard && <span className="ml-2 inline-block text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">{t.level}</span>}
      </div>
      <div className={`text-sm ${isHard ? 'font-bold text-rose-700' : 'text-gray-500'}`}>{t.vi}</div>
    </div>
  );
}


