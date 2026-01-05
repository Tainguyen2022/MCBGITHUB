
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

export default function CoreComparisonEquality() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ＝ <span className="underline decoration-4 decoration-amber-400">SO SÁNH BẰNG</span> — <i>Comparison of Equality</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả sự ngang bằng hoặc không ngang bằng về một đặc tính nào đó giữa hai người, vật, hoặc sự việc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="as + adj/adv + as" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Phủ định" formula="not as/so + adj/adv + as" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="Danh từ" formula="the same + (N) + as" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adj-adv">Với Tính từ & Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#nouns">Với Danh từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#quantifiers">Với Lượng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            So sánh bằng được sử dụng để chỉ ra rằng hai đối tượng có một đặc tính ở mức độ tương đương nhau (bằng nhau) hoặc không tương đương (không bằng nhau).
        </p>
      </Section>

      <Section id="adj-adv" title="Với Tính từ & Trạng từ" emoji="🎨">
        <p>Đây là cấu trúc phổ biến nhất của so sánh bằng.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Khẳng định: as + adj/adv + as</p>
            <p><i>e.g., The cat is <b>as big as</b> the dog.</i></p>
            <p><i>e.g., She speaks English <b>as fluently as</b> a native speaker.</i></p>
        </div>
        <div className="rounded-xl p-4 bg-red-50 border border-red-200 mt-3">
            <p className="font-bold text-red-700">Phủ định: not as + adj/adv + as / not so + adj/adv + as</p>
            <p><i>e.g., This book is <b>not as interesting as</b> the one I read last week.</i></p>
            <p><i>e.g., He does<b>n't</b> run <b>so fast as</b> his brother.</i> ("so" thường dùng trong phủ định)</p>
        </div>
      </Section>
      
      <Section id="nouns" title="Với Danh từ" emoji="📚">
        <p>Khi muốn so sánh sự giống nhau về một danh từ cụ thể, ta dùng cấu trúc "the same as".</p>
         <div className="rounded-xl p-4 bg-green-50 border border-green-2