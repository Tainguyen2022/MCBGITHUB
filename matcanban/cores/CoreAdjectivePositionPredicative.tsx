
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

export default function CoreAdjectivePositionPredicative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎨 <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ VỊ NGỮ</span> — <i>Predicative Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Đây là vị trí của tính từ khi nó đứng <b>sau một động từ nối (linking verb)</b> và bổ nghĩa cho chủ ngữ của câu.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc cơ bản" formula="Subject + Linking Verb + Adjective" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Ví dụ" formula="The soup tastes delicious." colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#linking-verbs">Các Động từ Nối phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh với Vị trí Thuộc tính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Chức năng" emoji="🎯">
        <p>
            Vị trí <b>vị ngữ (predicative position)</b> là khi tính từ đứng sau một động từ nối để mô tả trạng thái hoặc đặc điểm của <b>chủ ngữ</b>. Nó hoạt động như một bổ ngữ cho chủ ngữ (subject complement).
        </p>
         <ul className="list-disc pl-6">
            <li><i>The children seem <b>happy</b>.</i> ('happy' mô tả 'The children')</li>
            <li><i>The problem is <b>difficult</b>.</i> ('difficult' mô tả 'The problem')</li>
        </ul>
      </Section>
      
      <Section id="linking-verbs" title="Các Động từ Nối phổ biến (Linking Verbs)" emoji="🔗">
        <p>
            Tính từ vị ngữ luôn đi sau động từ nối. Các động từ nối phổ biến bao gồm:
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>To be:</b> am, is, are, was, were, be, been, being.
              <br/><i>e.g., She <b>is</b> intelligent.</i>
            </li>
            <li className="mt-2"><b>Động từ giác quan (Senses):</b> look, sound, smell, taste, feel.
              <br/><i>e.g., You <b>look</b> tired. That music <b>sounds</b> loud.</i>
            </li>
             <li className="mt-2"><b>Động từ chỉ trạng thái/thay đổi:</b> become, get, grow, turn, seem, appear, remain, stay, prove.
              <br/><i>e.g., He <b>became</b> famous. The milk <b>turned</b> sour.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="comparison" title="So sánh với Vị trí Thuộc tính" emoji="⚖️">
        <p>
            Đây là hai vị trí chính của tính từ trong câu.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700">Vị trí Thuộc tính (Attributive)</p>
                <p>Đứng <b>trước</b> danh từ.</p>
                <p className="mt-1"><i>a <b>beautiful</b> flower</i></p>
                <p><i>an <b>interesting</b> story</i></p>
            </div>
            <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
                <p className="font-bold text-purple-700">Vị trí Vị ngữ (Predicative)</p>
                <p>Đứng <b>sau</b> động từ nối.</p>
                 <p className="mt-1"><i>The flower is <b>beautiful</b>.</i></p>
                <p><i>The story seems <b>interesting</b>.</i></p>
            </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">Hầu hết các tính từ thông thường có thể đứng ở cả hai vị trí, nhưng có một số tính từ chỉ có thể đứng ở một trong hai vị trí (ví dụ: 'asleep' chỉ có thể đứng ở vị trí vị ngữ).</p>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>After the workout, he felt tired.</b> — Sau buổi tập, anh ấy cảm thấy mệt.</li>
          <li><b>The situation remains serious.</b> — Tình hình vẫn nghiêm trọng.</li>
          <li><b>As she gets older, her hair is turning grey.</b> — Khi cô ấy già đi, tóc cô ấy đang chuyển sang màu xám.</li>
          <li><b>The new plan sounds promising.</b> — Kế hoạch mới nghe có vẻ hứa hẹn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold mt-3">A. Gạch chân tính từ vị ngữ trong các câu sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The soup smells delicious.</li>
            <li>Her story proved false.</li>
          </ol>
           <p className="font-semibold mt-3">B. Viết lại câu sau, chuyển tính từ từ vị trí thuộc tính sang vị trí vị ngữ:</p>
           <ol className="list-decimal pl-6 mt-2 space-y-2" start={3}>
            <li>This is a difficult exercise.
            <br/>→ This exercise is ______.</li>
           </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
