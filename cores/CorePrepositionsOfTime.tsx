import React, { useState } from 'react';

// Reusing the FormulaChip component structure from other cores for consistency
type Chip = { label: string; formula: string; colors: string };
const FormulaChip: React.FC<Chip> = ({ label, formula, colors }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(formula); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch {}
  };
  return (
    <button
      onClick={copy}
      title={`Copy: ${formula}`}
      className={[
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl',
        'text-white font-extrabold shadow-lg transition-[transform,box-shadow] active:scale-95',
        'ring-1 ring-white/20 bg-gradient-to-r', colors,
        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-left'
      ].join(' ')}
    >
      <span className="truncate">{label}</span>
      <span className="hidden sm:inline ml-2 text-white/85 font-semibold">({formula})</span>
      <span className="sm:hidden text-white/85 font-semibold text-xs leading-tight">({formula})</span>
      {copied && (
        <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/70">Copied!</span>
      )}
    </button>
  );
};

// Reusing the Section component
const Section: React.FC<{id:string; title:string; emoji?:string; children: React.ReactNode}> = ({id,title,emoji,children}) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-tight">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-500">
        {emoji} {title}
      </span>
    </h2>
    <div className="mt-4 space-y-3 text-[15px] leading-7">{children}</div>
  </section>
);

export default function CorePrepositionsOfTime() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⏰ <span className="underline decoration-4 decoration-amber-400">GIỚI TỪ CHỈ THỜI GIAN</span> — <i>Prepositions of Time</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Nắm vững cách sử dụng <b>at, on, in</b> để chỉ các thời điểm và khoảng thời gian khác nhau, từ cụ thể đến tổng quát.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cụ thể (Specific)" formula="at 7 AM, at noon" colors="from-red-500 via-rose-500 to-pink-600"/>
          <FormulaChip label="Trung bình (Medium)" formula="on Monday, on May 5th" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Tổng quát (General)" formula="in May, in 2024, in the morning" colors="from-sky-500 via-blue-500 to-indigo-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#pyramid">Kim tự tháp Thời gian: IN &gt; ON &gt; AT</a></li>
            <li><a className="text-rose-700 hover:underline" href="#at">Cách dùng "AT"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#on">Cách dùng "ON"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#in">Cách dùng "IN"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#exceptions">Trường hợp KHÔNG dùng Giới từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>
      
      <Section id="pyramid" title="Kim tự tháp Thời gian: IN &gt; ON &gt; AT" emoji="🔺">
        <p>
            Đây là một mẹo ghi nhớ hiệu quả. Hãy tưởng tượng một kim tự tháp: phần đáy rộng nhất là <b>IN</b> (khoảng thời gian lớn), phần giữa là <b>ON</b> (nhỏ hơn), và đỉnh nhọn là <b>AT</b> (thời điểm cụ thể nhất).
        </p>
         <div className="mt-3 p-4 bg-gray-50 border rounded-lg text-center font-mono">
            <div className="p-2 bg-indigo-100 border border-indigo-300 rounded-lg"><b>IN</b> (Thế kỷ, Thập kỷ, Năm, Mùa, Tháng, Buổi)</div>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-indigo-300 mx-auto"></div>
            <div className="p-2 bg-green-100 border border-green-300 rounded-lg mt-1"><b>ON</b> (Ngày lễ có 'Day', Ngày trong tuần, Ngày tháng)</div>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-green-300 mx-auto"></div>
             <div className="p-2 bg-red-100 border border-red-300 rounded-lg mt-1"><b>AT</b> (Giờ, Khoảnh khắc cụ thể)</div>
        </div>
      </Section>

      <Section id="at" title="Cách dùng 'AT' (Thời điểm cụ thể)" emoji="📍">
        <p>
            <b>AT</b> được dùng cho những thời điểm chính xác, cụ thể nhất.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Giờ giấc:</b> at 5 o'clock, at 10:30 AM</li>
            <li><b>Các thời điểm trong ngày:</b> at noon, at night, at midnight, at sunrise, at sunset</li>
            <li><b>Các dịp lễ (không có 'Day'):</b> at Christmas, at Easter</li>
            <li><b>Các cụm từ cố định:</b> at the moment, at the same time, at weekends (UK), at the end of...</li>
        </ul>
      </Section>
      
      <Section id="on" title="Cách dùng 'ON' (Ngày & Bề mặt Lịch)" emoji="🗓️">
        <p>
            <b>ON</b> được dùng cho các ngày và ngày tháng cụ thể. Hãy nghĩ đến việc bạn đặt ngón tay lên một ngày trên tờ lịch.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Ngày trong tuần:</b> on Monday, on Friday</li>
            <li><b>Ngày tháng năm đầy đủ:</b> on April 1st, 2024; on 25th December</li>
            <li><b>Ngày lễ có từ 'Day':</b> on Christmas Day, on New Year's Day</li>
            <li><b>Một buổi cụ thể của một ngày:</b> on Tuesday morning, on Friday evening</li>
        </ul>
      </Section>
      
      <Section id="in" title="Cách dùng 'IN' (Khoảng thời gian dài)" emoji="⏳">
        <p>
            <b>IN</b> được dùng cho những khoảng thời gian dài, không xác định chính xác, như một cái hộp chứa nhiều thời điểm nhỏ hơn.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Buổi trong ngày:</b> in the morning, in the afternoon, in the evening</li>
            <li><b>Tháng:</b> in May, in December</li>
            <li><b>Mùa:</b> in summer, in the winter</li>
            <li><b>Năm:</b> in 1990, in 2024</li>
            <li><b>Thập kỷ, Thế kỷ:</b> in the 1990s, in the 21st century</li>
            <li><b>Khoảng thời gian trong tương lai:</b> in two weeks, in ten minutes</li>
             <li><b>Các cụm từ cố định:</b> in the past, in the future</li>
        </ul>
      </Section>
      
      <Section id="exceptions" title="Trường hợp KHÔNG dùng Giới từ" emoji="🚫">
        <p>
            Chúng ta <b>không</b> dùng <b>at, on, in</b> với các từ <b>last, next, every, this</b>.
        </p>
        <ul className="list-disc pl-6">
            <li><i>I'll see you <b>next</b> Friday.</i> (Không dùng 'on next Friday')</li>
            <li><i>She went to Paris <b>last</b> year.</i> (Không dùng 'in last year')</li>
            <li><i>We meet <b>every</b> week.</i></li>
            <li><i>Are you busy <b>this</b> afternoon?</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Nhầm lẫn <b>in the morning</b> với <b>on Monday morning</b>.</li>
          <li>Nhầm lẫn <b>at Christmas</b> (dịp lễ) với <b>on Christmas Day</b> (ngày cụ thể).</li>
          <li>Dùng giới từ với 'last', 'next', 'every', 'this'.</li>
          <li>Nhầm <b>at night</b> với <b>in the evening</b>.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền giới từ đúng (at, on, in) hoặc không điền gì (∅) vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The meeting is ______ Monday ______ 10 AM.</li>
            <li>My birthday is ______ October.</li>
            <li>We are going on vacation ______ next week.</li>
            <li>I love to watch the stars ______ night.</li>
             <li>He was born ______ 1995.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}