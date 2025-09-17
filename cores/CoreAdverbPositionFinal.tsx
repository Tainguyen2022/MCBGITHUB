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

export default function CoreAdverbPositionFinal() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔚 <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ CUỐI CÂU</span> — <i>Final Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Vị trí phổ biến nhất cho trạng từ, đặc biệt là trạng từ chỉ Cách thức, Nơi chốn, và Thời gian. Khi có nhiều trạng từ, chúng thường tuân theo trật tự <b>M-P-T (Manner-Place-Time)</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cách thức (Manner)" formula="He drives carefully." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Nơi chốn (Place)" formula="She works here." colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Thời gian (Time)" formula="They left yesterday." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Trật tự M-P-T" formula="V + M + P + T" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Các loại Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#mpt-rule">Quy tắc M-P-T (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#movement-verbs">Ngoại lệ: Động từ Di chuyển</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Các loại Trạng từ" emoji="🎯">
        <p>
            <b>Vị trí cuối câu (Final position)</b> là vị trí sau động từ chính và sau tân ngữ (nếu có). Đây là vị trí mặc định cho ba loại trạng từ quan trọng:
        </p>
        <ul className="list-disc pl-6">
            <li><b>Trạng từ chỉ Cách thức (Manner):</b> Trả lời câu hỏi "How?". <i>e.g., He speaks loudly.</i></li>
            <li><b>Trạng từ chỉ Nơi chốn (Place):</b> Trả lời câu hỏi "Where?". <i>e.g., The children are playing outside.</i></li>
            <li><b>Trạng từ chỉ Thời gian (Time):</b> Trả lời câu hỏi "When?". <i>e.g., I'll see you tomorrow.</i></li>
        </ul>
      </Section>
      
      <Section id="mpt-rule" title="Quy tắc M-P-T (Manner - Place - Time)" emoji="🚦">
        <p>
            Khi có nhiều hơn một trong ba loại trạng từ trên cùng xuất hiện ở cuối câu, chúng phải tuân theo một trật tự cố định để câu văn nghe tự nhiên.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Trật tự: Cách thức (Manner) → Nơi chốn (Place) → Thời gian (Time)</p>
        </div>
        <p className="mt-2 font-semibold">Ví dụ phân tích:</p>
         <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p><i>She sang <b>beautifully</b> (M) <b>at the concert</b> (P) <b>last night</b> (T).</i></p>
            <p><i>He worked <b>hard</b> (M) <b>in the garden</b> (P) <b>all afternoon</b> (T).</i></p>
        </div>
      </Section>
      
      <Section id="movement-verbs" title="Ngoại lệ: Động từ Di chuyển" emoji="🚗">
        <p>
            Khi câu có động từ chỉ sự di chuyển (go, come, travel, walk, arrive...), trật tự thường thay đổi để nhấn mạnh điểm đến trước.
        </p>
         <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Trật tự: Nơi chốn (Place) → Cách thức (Manner) → Thời gian (Time)</p>
        </div>
        <p className="mt-2"><i>e.g., I went <b>to the library</b> (P) <b>quietly</b> (M) <b>this morning</b> (T).</i></p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Đặt trạng từ giữa động từ và tân ngữ:</b> Đây là lỗi rất phổ biến. Trạng từ phải đứng sau tân ngữ.
             <br/>❌ <i className="line-through">She speaks fluently English.</i> 
             <br/>✅ <i>She speaks English <b>fluently</b>.</i>
          </li>
          <li><b>Sai trật tự M-P-T:</b>
             <br/>❌ <i className="line-through">I studied yesterday hard at the library.</i>
             <br/>✅ <i>I studied <b>hard</b> (M) <b>at the library</b> (P) <b>yesterday</b> (T).</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He works efficiently in his office every day.</b> — Anh ấy làm việc hiệu quả (M) tại văn phòng (P) mỗi ngày (T).</li>
          <li><b>The children played happily in the park all afternoon.</b> — Bọn trẻ đã chơi đùa vui vẻ (M) trong công viên (P) suốt buổi chiều (T).</li>
          <li><b>She traveled to London by train last week.</b> — Cô ấy đã đi đến London (P) bằng tàu hỏa (M) vào tuần trước (T). (Động từ di chuyển)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Sắp xếp lại các trạng từ trong ngoặc theo đúng trật tự:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She worked (all day / at her desk / quietly).
            <br/>→ She worked ____________________________________________.</li>
            <li>He arrived (at the airport / late / last night).
            <br/>→ He arrived ____________________________________________.</li>
            <li>They performed (brilliantly / on stage / in the final round).
            <br/>→ They performed ________________________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}