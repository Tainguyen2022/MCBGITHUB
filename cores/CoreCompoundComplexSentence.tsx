
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

export default function CoreCompoundComplexSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
           🧩 <span className="underline decoration-4 decoration-amber-400">CÂU PHỨC HỢP</span> — Compound-Complex Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là loại câu cao cấp nhất, kết hợp giữa câu ghép và câu phức, chứa ít nhất <b>hai mệnh đề độc lập (IC)</b> và ít nhất <b>một mệnh đề phụ thuộc (DC)</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="Cấu trúc 1" formula="DC, IC, and IC" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Cấu trúc 2" formula="IC, but IC DC" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Thành phần</a></li>
            <li><a className="text-rose-700 hover:underline" href="#structure">Cấu trúc & Sắp xếp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc dấu câu Nâng cao</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Thành phần" emoji="📖">
        <p>
          <b>Câu phức hợp</b> (Compound-Complex Sentence) dùng để diễn đạt những ý tưởng phức tạp, đa chiều trong cùng một câu. Nó được tạo thành từ:
        </p>
        <ul className="list-disc pl-6">
          <li><b>Ít nhất hai Mệnh đề độc lập (Independent Clauses - ICs):</b> Đây là phần "Compound" (ghép), được nối với nhau bằng liên từ kết hợp (FANBOYS) hoặc dấu chấm phẩy.</li>
          <li><b>Ít nhất một Mệnh đề phụ thuộc (Dependent Clause - DC):</b> Đây là phần "Complex" (phức), bắt đầu bằng một liên từ phụ thuộc.</li>
        </ul>
        <p className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <b>Ví dụ phân tích:</b> <span className="text-blue-600">[<u>When the cat is tired</u>]</span>, <span className="text-green-600">[it sleeps]</span>, <span className="text-red-600">but</span> <span className="text-green-600">[the dog plays]</span>.
          <br/>→ Mệnh đề phụ thuộc (DC) + Mệnh đề độc lập 1 (IC1) + Liên từ + Mệnh đề độc lập 2 (IC2).
        </p>
      </Section>

      <Section id="structure" title="Cấu trúc & Sắp xếp" emoji="🏗️">
        <p>Các mệnh đề có thể được sắp xếp theo nhiều cách khác nhau. Dưới đây là một vài cấu trúc phổ biến:</p>
        <div className="space-y-3">
            <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <p><b className="font-mono text-gray-700">DC, IC, coordinator IC.</b></p>
                <p className="pl-4"><i><span className="text-blue-600">When the movie ended</span>, <span className="text-green-600">we left the cinema</span>, <span className="text-red-600">and</span> <span className="text-green-600">we went for a coffee</span>.</i></p>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <p><b className="font-mono text-gray-700">IC, coordinator IC DC.</b></p>
                <p className="pl-4"><i><span className="text-green-600">She missed her flight</span>, <span className="text-red-600">so</span> <span className="text-green-600">she had to rebook</span> <span className="text-blue-600">because she had an important meeting</span>.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <p><b className="font-mono text-gray-700">IC DC, coordinator IC.</b></p>
                <p className="pl-4"><i><span className="text-green-600">The team celebrated</span> <span className="text-blue-600">after they won the championship</span>, <span className="text-red-600">but</span> <span className="text-green-600">they still had one more game to play</span>.</i></p>
            </div>
        </div>
      </Section>

      <Section id="punctuation" title="Quy tắc dấu câu Nâng cao" emoji="⚠️">
        <p>Dấu câu trong câu phức hợp tuân theo sự kết hợp của các quy tắc từ câu ghép và câu phức:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Luôn đặt dấu phẩy (,) trước liên từ FANBOYS</b> khi nó nối hai mệnh đề độc lập.</li>
            <li><b>Đặt dấu phẩy (,) sau mệnh đề phụ thuộc</b> khi nó đứng đầu câu.</li>
            <li><b>Không dùng dấu phẩy</b> khi mệnh đề phụ thuộc đứng sau mệnh đề độc lập mà nó bổ nghĩa.</li>
        </ul>
        <p className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <b>Ví dụ:</b> <i><b>Even though he was late,</b> John apologized, and the teacher forgave him.</i>
             <br/>(Dấu phẩy sau DC đứng đầu, và dấu phẩy trước 'and' nối hai IC).
        </p>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
