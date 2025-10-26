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

export default function CorePrepositionsEndPosition() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔚 <span className="underline decoration-4 decoration-amber-400">GIỚI TỪ CUỐI CÂU</span> — <i>End-position Prepositions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu các trường hợp một giới từ được đặt ở cuối mệnh đề hoặc câu, một cấu trúc rất phổ biến và tự nhiên trong tiếng Anh hiện đại.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Câu hỏi Wh-" formula="What are you looking at?" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Mệnh đề Quan hệ" formula="the person I spoke to" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Bị động" formula="The bed was slept in." colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nguyên mẫu" formula="a pen to write with" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#rule">Quy tắc chung & Lịch sử</a></li>
            <li><a className="text-rose-700 hover:underline" href="#questions">Trong Câu hỏi Wh-</a></li>
            <li><a className="text-rose-700 hover:underline" href="#clauses">Trong Mệnh đề Quan hệ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#passive">Trong Thể Bị động</a></li>
            <li><a className="text-rose-700 hover:underline" href="#infinitives">Với Động từ nguyên mẫu</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="rule" title="Quy tắc chung & Lịch sử" emoji="📜">
        <p>
            Hiện tượng giới từ đứng cuối câu xảy ra khi tân ngữ của nó được di chuyển đến một vị trí khác (thường là đầu câu). Điều này khiến giới từ bị "mắc kẹt" (stranded) ở cuối.
        </p>
         <p className="mt-2 text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            <b>Lưu ý lịch sử:</b> Quy tắc "không được kết thúc câu bằng giới từ" là một quy tắc ngữ pháp Latinh cũ được áp đặt lên tiếng Anh một cách không tự nhiên. Trong tiếng Anh hiện đại, việc kết thúc câu bằng giới từ là hoàn toàn chấp nhận được và phổ biến, đặc biệt là trong văn nói và văn phong thân mật.
        </p>
      </Section>
      
      <Section id="questions" title="Trong Câu hỏi Wh-" emoji="❓">
        <p>
            Đây là trường hợp phổ biến nhất. Tân ngữ của giới từ chính là từ hỏi Wh- đã được chuyển lên đầu câu.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>What are you talking <b>about</b>?</i> (You are talking about <u>what</u>.)</li>
            <li><i>Who did you give the book <b>to</b>?</i> (You gave the book to <u>who</u>.)</li>
            <li><i>Where does this bus go <b>to</b>?</i> (This bus goes to <u>where</u>.)</li>
        </ul>
        <p className="mt-2 text-sm">Cách nói trang trọng hơn (nhưng ít phổ biến) sẽ đặt giới từ lên trước: <i><b>To whom</b> did you give the book?</i></p>
      </Section>
      
      <Section id="clauses" title="Trong Mệnh đề Quan hệ" emoji="🔗">
        <p>
            Điều này xảy ra khi đại từ quan hệ (who, which, that) là tân ngữ của giới từ. Đại từ quan hệ này thường được lược bỏ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>This is the movie (that) I told you <b>about</b>.</i></li>
            <li><i>The music (that) we were listening <b>to</b> was very loud.</i></li>
            <li><i>He is the person (who) I am angry <b>with</b>.</i></li>
        </ul>
      </Section>

      <Section id="passive" title="Trong Thể Bị động" emoji="⚙️">
        <p>
            Khi một câu chủ động có cụm động từ đi với giới từ được chuyển sang bị động, giới từ sẽ đứng sau động từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li>Active: <i>Someone slept <b>in</b> this bed.</i> → Passive: <i>This bed has been slept <b>in</b>.</i></li>
            <li>Active: <i>We have already paid <b>for</b> the tickets.</i> → Passive: <i>The tickets have already been paid <b>for</b>.</i></li>
        </ul>
      </Section>
      
       <Section id="infinitives" title="Với Động từ nguyên mẫu (Infinitive Clauses)" emoji="➡️">
        <p>
            Một số cụm danh từ được theo sau bởi một động từ nguyên mẫu và một giới từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>This is not a good chair <b>to sit on</b>.</i></li>
            <li><i>She needs a pen <b>to write with</b>.</i></li>
            <li><i>He is a difficult person <b>to work with</b>.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Bỏ quên giới từ cuối câu:</b> Đây là lỗi phổ biến nhất. (❌ <i className="line-through">What are you waiting?</i> → ✅ What are you waiting <b>for</b>?)</li>
          <li><b>Lặp lại tân ngữ:</b> (❌ <i className="line-through">This is the book I was telling you about it.</i> → ✅ This is the book I was telling you <b>about</b>.)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Hoàn thành các câu sau bằng cách thêm giới từ phù hợp vào cuối câu:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Who were you talking ______ on the phone?</li>
            <li>This is the company I used to work ______.</li>
            <li>I don't have a pen to write ______. Can I borrow one?</li>
            <li>The problem needs to be dealt ______.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
