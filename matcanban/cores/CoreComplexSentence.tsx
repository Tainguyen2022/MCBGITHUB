
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
        // Vertical layout, aligned to the start
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Label (smaller) - NO truncate */}
      <span className="text-sm font-semibold text-white/80">{label}</span>
      
      {/* Formula (larger) - NO truncate, allow word breaking */}
      <span className="break-words">{formula}</span>

      {/* Copied toast */}
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

export default function CoreComplexSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🧩 <span className="underline decoration-4 decoration-amber-400">CÂU PHỨC</span> — Complex Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là câu chứa <b>một mệnh đề độc lập (IC)</b> và ít nhất <b>một mệnh đề phụ thuộc (DC)</b>, nối với nhau bằng liên từ phụ thuộc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="Mệnh đề phụ trước" formula="DC, IC" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Mệnh đề chính trước" formula="IC DC" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Đặc điểm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#conjunctions">Liên từ Phụ thuộc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#types">Các loại Mệnh đề Phụ thuộc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc dấu phẩy (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp (Sentence Fragment)</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Đặc điểm" emoji="📖">
        <p>
          <b>Câu phức</b> (Complex Sentence) kết hợp một ý chính (mệnh đề độc lập) với một ý phụ (mệnh đề phụ thuộc) để tạo ra mối quan hệ nguyên nhân-kết quả, điều kiện, thời gian, tương phản...
        </p>
        <ul className="list-disc pl-6">
          <li><b>Mệnh đề độc lập (Independent Clause - IC):</b> Là một câu đơn hoàn chỉnh, có thể đứng một mình. <i>(e.g., The cat sleeps.)</i></li>
          <li><b>Mệnh đề phụ thuộc (Dependent Clause - DC):</b> Bắt đầu bằng một liên từ phụ thuộc, không thể đứng một mình làm câu vì ý nghĩa của nó chưa hoàn chỉnh. <i>(e.g., <u>when it is tired</u>.)</i></li>
          <li><b>Kết hợp → Câu phức:</b> <i>The cat sleeps when it is tired.</i></li>
        </ul>
      </Section>

      <Section id="conjunctions" title="Liên từ Phụ thuộc (Subordinating Conjunctions)" emoji="🔗">
        <p>Đây là những từ nối mệnh đề phụ thuộc vào mệnh đề chính. Một số liên từ phổ biến:</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Thời gian (Time):</b> when, while, before, after, since, until, as, as soon as</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Nguyên nhân (Cause):</b> because, since, as</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Điều kiện (Condition):</b> if, unless, in case, provided that</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Tương phản (Contrast):</b> although, though, even though, while, whereas</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Mục đích (Purpose):</b> so that, in order that</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="text-indigo-600">Nơi chốn (Place):</b> where, wherever</div>
        </div>
      </Section>

      <Section id="types" title="Các loại Mệnh đề Phụ thuộc" emoji="📚">
        <p>Mệnh đề phụ thuộc có thể được phân thành ba loại chính dựa trên chức năng của chúng trong câu:</p>
        <ol className="list-decimal pl-6 space-y-2">
            <li><b>Mệnh đề Trạng ngữ (Adverb Clause):</b> Hoạt động như một trạng từ, bổ nghĩa cho động từ chính. Bắt đầu bằng các liên từ như <i>when, because, if, although...</i><br/><i>e.g., We cancelled the picnic <b>because it rained</b>.</i></li>
            <li><b>Mệnh đề Tính ngữ (Adjective Clause / Relative Clause):</b> Hoạt động như một tính từ, bổ nghĩa cho danh từ đứng trước. Bắt đầu bằng <i>who, which, that, where...</i><br/><i>e.g., The man <b>who lives next door</b> is very friendly.</i></li>
            <li><b>Mệnh đề Danh ngữ (Noun Clause):</b> Hoạt động như một danh từ, có thể làm chủ ngữ hoặc tân ngữ. Bắt đầu bằng <i>what, where, that, if...</i><br/><i>e.g., I don't know <b>what he said</b>.</i></li>
        </ol>
      </Section>

      <Section id="punctuation" title="Quy tắc dấu phẩy (Rất quan trọng!)" emoji="⚠️">
        <p>Quy tắc dấu phẩy trong câu phức rất đơn giản và nhất quán, chủ yếu áp dụng cho mệnh đề trạng ngữ:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Khi Mệnh đề Phụ thuộc (DC) đứng TRƯỚC:</b> Dùng dấu phẩy để ngăn cách hai mệnh đề.
                <p className="pl-4 text-sm text-gray-600 rounded-lg bg-green-50 p-2 border border-green-200">
                    <b className="font-mono">DC, IC.</b><br/>
                    <i><u>Although it was raining</u><b className="text-red-500">,</b> we went for a walk.</i>
                </p>
            </li>
            <li><b>Khi Mệnh đề Độc lập (IC) đứng TRƯỚC:</b> <b>KHÔNG</b> dùng dấu phẩy.
                <p className="pl-4 text-sm text-gray-600 rounded-lg bg-red-50 p-2 border border-red-200">
                    <b className="font-mono">IC DC.</b><br/>
                    <i>We went for a walk <u>although it was raining</u>.</i>
                </p>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp (Sentence Fragment)" emoji="🚫">
        <p className="mt-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
            <b>Lỗi sai phổ biến nhất (Sentence Fragment):</b> Viết một mệnh đề phụ thuộc như thể nó là một câu hoàn chỉnh. Mệnh đề phụ thuộc luôn phải đi kèm với một mệnh đề độc lập.<br/>
            ❌ <i>Because it was raining. We stayed home.</i>
            <br/><br/>
            <b>Cách sửa:</b><br/>
            ✅ <i><b>Because it was raining,</b> we stayed home.</i><br/>
            ✅ <i>We stayed home <b>because it was raining.</b></i>
        </p>
      </Section>
      
      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
