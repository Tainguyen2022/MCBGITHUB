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

export default function CoreReducedRelativeVing() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✂️ <span className="underline decoration-4 decoration-amber-400">RÚT GỌN MĐQH (V-ING)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Một cách làm cho câu văn ngắn gọn và học thuật hơn bằng cách rút gọn mệnh đề quan hệ xác định có động từ ở dạng <b>chủ động (active voice)</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dạng đầy đủ" formula="The man who is sitting..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dạng rút gọn" formula="The man sitting..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Điều kiện</a></li>
            <li><a className="text-rose-700 hover:underline" href="#how-to">Cách Rút gọn (Step-by-Step)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh với Rút gọn V-ed</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Điều kiện" emoji="🎯">
        <p>
            Rút gọn mệnh đề quan hệ bằng V-ing giúp loại bỏ các từ không cần thiết, làm cho câu văn súc tích và trang trọng hơn. Để rút gọn, cần thỏa mãn 2 điều kiện sau:
        </p>
        <ol className="list-decimal pl-6 mt-2">
            <li>Mệnh đề quan hệ phải là <b>mệnh đề xác định</b> (không có dấu phẩy).</li>
            <li>Động từ trong mệnh đề quan hệ phải ở dạng <b>chủ động (active voice)</b>.</li>
        </ol>
      </Section>
      
      <Section id="how-to" title="Cách Rút gọn (Step-by-Step)" emoji="🔧">
        <p>
            Quy trình rút gọn rất đơn giản:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Bước 1:</b> Bỏ đại từ quan hệ (who, which, that).</li>
            <li><b>Bước 2:</b> Bỏ động từ "to be" nếu có (is, are, was, were).</li>
            <li><b>Bước 3:</b> Chuyển động từ chính về dạng <b>V-ing</b>.</li>
        </ol>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 mt-3 space-y-2">
            <div>
                <p className="font-bold text-blue-700">Ví dụ 1 (Thì tiếp diễn):</p>
                <p>The man <span className="line-through">who is</span> sitting over there is my father.</p>
                <p>→ The man <b>sitting</b> over there is my father.</p>
            </div>
             <div>
                <p className="font-bold text-blue-700">Ví dụ 2 (Thì đơn):</p>
                <p>The train <span className="line-through">that</span> arrives at 10:30 is from Hanoi.</p>
                <p>→ The train <b>arriving</b> at 10:30 is from Hanoi.</p>
            </div>
        </div>
      </Section>
      
      <Section id="comparison" title="So sánh với Rút gọn V-ed" emoji="⚖️">
        <p>
           Sự khác biệt nằm ở dạng của động từ trong mệnh đề quan hệ gốc:
        </p>
        <ul className="list-disc pl-6">
            <li><b>V-ing:</b> Dùng khi động từ ở dạng <b>chủ động</b>.
                <br/><i>e.g., The boy <b>who is kicking the ball</b> → The boy <b>kicking the ball</b>.</i> (Cậu bé tự đá quả bóng)
            </li>
            <li><b>V-ed (V3):</b> Dùng khi động từ ở dạng <b>bị động</b>.
                 <br/><i>e.g., The book <b>which was written by him</b> → The book <b>written by him</b>.</i> (Cuốn sách được viết)
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Rút gọn mệnh đề quan hệ không xác định (có dấu phẩy).</li>
          <li>Rút gọn mệnh đề ở dạng bị động bằng V-ing. (❌ <i className="line-through">The book writing by him...</i>)</li>
          <li>Quên bỏ động từ "to be". (❌ <i className="line-through">The man is sitting over there is my father.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Original:</b> The woman who works at the post office is my aunt.
          <br/><b>Reduced:</b> The woman <b>working</b> at the post office is my aunt.
          </li>
          <li><b>Original:</b> The road that leads to the city center is closed.
          <br/><b>Reduced:</b> The road <b>leading</b> to the city center is closed.
          </li>
          <li><b>Original:</b> Students who want to join the club should sign up here.
          <br/><b>Reduced:</b> Students <b>wanting</b> to join the club should sign up here.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Rút gọn các mệnh đề quan hệ sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The girl who is wearing the red dress is my sister.
            <br/>→ ____________________________________________</li>
            <li>The train that is arriving on platform 2 is delayed.
            <br/>→ ____________________________________________</li>
            <li>Any student who breaks the rules will be punished.
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