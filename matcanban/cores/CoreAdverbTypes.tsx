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
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg',
        'transition-[transform,box-shadow] active:scale-95 ring-1 ring-white/20',
        'bg-gradient-to-r', colors,
        // Bố cục 2 dòng, label ở trên, formula ở dưới
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Chú giải (nhỏ hơn) */}
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      
      {/* Công thức (lớn hơn, kế thừa extrabold) */}
      <span className="truncate">{formula}</span>

      {/* toast nhỏ khi copy */}
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

export default function CoreAdverbTypes() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ❓ <span className="underline decoration-4 decoration-amber-400">LOẠI & CHỨC NĂNG TRẠNG TỪ</span> — <i>Adverb Types & Functions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Trạng từ là những từ bổ nghĩa cho động từ, tính từ, hoặc một trạng từ khác. Chúng trả lời các câu hỏi như How?, When?, Where?, và How often?.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cách thức (How?)" formula="He runs quickly." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Thời gian (When?)" formula="She arrived yesterday." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Nơi chốn (Where?)" formula="They are playing outside." colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Tần suất (How often?)" formula="I always drink coffee." colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#manner">1. Trạng từ chỉ Cách thức</a></li>
            <li><a className="text-rose-700 hover:underline" href="#place">2. Trạng từ chỉ Nơi chốn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#time">3. Trạng từ chỉ Thời gian</a></li>
            <li><a className="text-rose-700 hover:underline" href="#frequency">4. Trạng từ chỉ Tần suất</a></li>
            <li><a className="text-rose-700 hover:underline" href="#degree">5. Trạng từ chỉ Mức độ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#conjunctive">6. Trạng từ Liên kết</a></li>
          </ol>
        </nav>
      </div>

      <Section id="manner" title="1. Trạng từ chỉ Cách thức (Adverbs of Manner)" emoji="🏃">
        <p>
            Mô tả hành động diễn ra như thế nào. Đây là loại trạng từ phổ biến nhất và thường được tạo thành bằng cách thêm đuôi <b>-ly</b> vào sau tính từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He drives <b>carefully</b>.</i></li>
            <li><i>She sings <b>beautifully</b>.</i></li>
            <li><i>They worked <b>hard</b>.</i> (Bất quy tắc)</li>
        </ul>
      </Section>

      <Section id="place" title="2. Trạng từ chỉ Nơi chốn (Adverbs of Place)" emoji="📍">
        <p>
            Cho biết hành động xảy ra ở đâu.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The cat is sleeping <b>upstairs</b>.</i></li>
            <li><i>I looked for it <b>everywhere</b>.</i></li>
            <li><i>Please come <b>here</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="time" title="3. Trạng từ chỉ Thời gian (Adverbs of Time)" emoji="⏰">
        <p>
            Cho biết hành động xảy ra khi nào hoặc trong bao lâu.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>We will go to the cinema <b>tomorrow</b>.</i></li>
            <li><i>He left <b>early</b>.</i></li>
            <li><i>I haven't seen her <b>recently</b>.</i></li>
        </ul>
      </Section>

      <Section id="frequency" title="4. Trạng từ chỉ Tần suất (Adverbs of Frequency)" emoji="🔁">
        <p>
            Mô tả mức độ thường xuyên của một hành động.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Tần suất bất định:</b> <i>always, usually, often, sometimes, rarely, never.</i></li>
            <li><b>Tần suất xác định:</b> <i>daily, weekly, once a year, every day.</i></li>
            <li><i>She <b>always</b> arrives on time.</i></li>
        </ul>
         <p className="mt-2 text-sm text-gray-600">(Xem bài <b className="text-indigo-600">W_ADV_FREQ</b> để biết chi tiết về vị trí).</p>
      </Section>
      
       <Section id="degree" title="5. Trạng từ chỉ Mức độ (Adverbs of Degree)" emoji="🌡️">
        <p>
            Bổ nghĩa cho tính từ hoặc một trạng từ khác để chỉ mức độ, cường độ. Trả lời câu hỏi "To what extent?".
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The water is <b>very</b> cold.</i></li>
            <li><i>He runs <b>extremely</b> fast.</i></li>
            <li><i>I'm <b>almost</b> finished.</i></li>
             <li><b>Phổ biến:</b> very, really, extremely, quite, almost, too, enough.</li>
        </ul>
      </Section>
      
       <Section id="conjunctive" title="6. Trạng từ Liên kết (Conjunctive Adverbs)" emoji="🔗">
        <p>
           Nối hai mệnh đề độc lập để thể hiện mối quan hệ logic (tương phản, kết quả, bổ sung).
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He studied hard; <b>therefore</b>, he passed the exam.</i></li>
            <li><i>The traffic was bad; <b>however</b>, we arrived on time.</i></li>
            <li><b>Phổ biến:</b> however, therefore, moreover, consequently, furthermore.</li>
        </ul>
         <p className="mt-2 text-sm text-gray-600">(Xem bài <b className="text-indigo-600">W_CONJ_ADV</b> để biết chi tiết về dấu câu).</p>
      </Section>
      
      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
