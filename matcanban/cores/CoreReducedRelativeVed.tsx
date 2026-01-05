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

export default function CoreReducedRelativeVed() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✂️ <span className="underline decoration-4 decoration-amber-400">RÚT GỌN MĐQH (V-ED/V3)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Rút gọn mệnh đề quan hệ xác định có động từ ở dạng <b>bị động (passive voice)</b> bằng cách dùng Quá khứ Phân từ (Past Participle).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dạng đầy đủ" formula="The book which was written..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dạng rút gọn" formula="The book written..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Điều kiện</a></li>
            <li><a className="text-rose-700 hover:underline" href="#how-to">Cách Rút gọn (Step-by-Step)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh với Rút gọn V-ing</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Điều kiện" emoji="🎯">
        <p>
            Rút gọn mệnh đề quan hệ bằng V-ed/V3 là một kỹ thuật nâng cao giúp câu văn trang trọng và súc tích hơn. Để rút gọn, cần thỏa mãn 2 điều kiện sau:
        </p>
        <ol className="list-decimal pl-6 mt-2">
            <li>Mệnh đề quan hệ phải là <b>mệnh đề xác định</b> (không có dấu phẩy).</li>
            <li>Động từ trong mệnh đề quan hệ phải ở dạng <b>bị động (passive voice)</b>.</li>
        </ol>
      </Section>
      
      <Section id="how-to" title="Cách Rút gọn (Step-by-Step)" emoji="🔧">
        <p>
            Quy trình rút gọn rất đơn giản:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Bước 1:</b> Bỏ đại từ quan hệ (who, which, that).</li>
            <li><b>Bước 2:</b> Bỏ động từ "to be" (is, are, was, were, etc.).</li>
            <li><b>Bước 3:</b> Giữ lại <b>Quá khứ Phân từ (V-ed/V3)</b>.</li>
        </ol>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 mt-3 space-y-2">
            <div>
                <p className="font-bold text-blue-700">Ví dụ:</p>
                <p>The book <span className="line-through">which was</span> written by Hemingway is a classic.</p>
                <p>→ The book <b>written</b> by Hemingway is a classic.</p>
            </div>
             <div>
                <p>The concepts <span className="line-through">that are</span> discussed in this chapter are important.</p>
                <p>→ The concepts <b>discussed</b> in this chapter are important.</p>
            </div>
        </div>
      </Section>
      
      <Section id="comparison" title="So sánh với Rút gọn V-ing" emoji="⚖️">
        <p>
           Sự khác biệt nằm ở dạng của động từ trong mệnh đề quan hệ gốc:
        </p>
        <ul className="list-disc pl-6">
            <li><b>V-ed (Bị động):</b> Dùng khi danh từ <b>nhận</b> hành động.
                <br/><i>e.g., The letter <b>that was sent</b> → The letter <b>sent</b>.</i> (Bức thư được gửi)
            </li>
            <li><b>V-ing (Chủ động):</b> Dùng khi danh từ <b>thực hiện</b> hành động.
                 <br/><i>e.g., The person <b>who sent the letter</b> → The person <b>sending the letter</b>.</i> (Người gửi thư)
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Rút gọn mệnh đề ở dạng chủ động bằng V-ed. (❌ <i className="line-through">The boy kicked the ball is my friend.</i>)</li>
          <li>Giữ lại động từ "to be". (❌ <i className="line-through">The car was washed by him is very clean.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Original:</b> The ideas which are presented in this book are fascinating.
          <br/><b>Reduced:</b> The ideas <b>presented</b> in this book are fascinating.
          </li>
          <li><b>Original:</b> The man who was injured in the accident was taken to the hospital.
          <br/><b>Reduced:</b> The man <b>injured</b> in the accident was taken to the hospital.
          </li>
          <li><b>Original:</b> I like the songs that were composed by Trinh Cong Son.
          <br/><b>Reduced:</b> I like the songs <b>composed</b> by Trinh Cong Son.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Rút gọn các mệnh đề quan hệ sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The cake that was made by my mother was delicious.
            <br/>→ ____________________________________________</li>
            <li>The languages that are spoken in Switzerland include German, French, and Italian.
            <br/>→ ____________________________________________</li>
            <li>Only the products which are approved by the manager can be sold.
            <br/>→ ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}