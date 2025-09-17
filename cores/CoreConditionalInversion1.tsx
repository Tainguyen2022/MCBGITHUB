
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

export default function CoreConditionalInversion1() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔄 <span className="underline decoration-4 decoration-amber-400">ĐẢO NGỮ ĐIỀU KIỆN LOẠI 1</span> — <i>Inversion</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Một cách trang trọng để diễn đạt câu điều kiện loại 1 bằng cách dùng <b>"Should"</b> thay cho <b>"If"</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="Cấu trúc đảo ngữ" formula="Should + S + V-bare, S + will + V-bare" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Câu gốc (If)" formula="If + S + V-s/es, S + will + V-bare" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Mức độ trang trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#variations">Biến thể ở Mệnh đề chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lưu ý quan trọng</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Mức độ trang trọng" emoji="👔">
        <p>
            Đảo ngữ câu điều kiện loại 1 với "Should" được dùng chủ yếu trong văn viết trang trọng (email công việc, văn bản học thuật) hoặc trong văn nói lịch sự.
        </p>
        <ul className="list-disc pl-6">
          <li>Nó làm cho điều kiện nghe có vẻ ít khả năng xảy ra hơn một chút so với dùng "If", mang sắc thái "Nếu có tình cờ xảy ra...".</li>
          <li>Thể hiện sự lịch sự, đặc biệt khi đưa ra đề nghị hoặc yêu cầu trong môi trường công việc.</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Để tạo câu đảo ngữ, chúng ta bỏ "If", đưa "Should" lên đầu, và chuyển động từ về dạng nguyên mẫu không "to" (bare infinitive).</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Should + S + V(nguyên mẫu), Mệnh đề chính</p>
        </div>
        <p className="mt-2 font-semibold">So sánh:</p>
        <ul className="list-disc pl-6">
            <li><b>Câu gốc:</b> <i><b>If it rains</b>, the cat will sleep inside.</i></li>
            <li><b>Câu đảo ngữ:</b> <i><b>Should it rain</b>, the cat will sleep inside.</i></li>
            <li className="text-red-600">Lưu ý: "rains" chuyển thành "rain" (nguyên mẫu).</li>
        </ul>
      </Section>

      <Section id="variations" title="Biến thể ở Mệnh đề chính" emoji="✨">
        <p>Mệnh đề chính trong câu đảo ngữ loại 1 vẫn giữ nguyên cấu trúc như trong câu điều kiện loại 1 thông thường. Nó có thể là:</p>
        <ul className="list-disc pl-6">
            <li><b>Tương lai đơn:</b> <i>Should it rain, the match <b>will be cancelled</b>.</i></li>
            <li><b>Modal Verbs:</b> <i>Should you need assistance, you <b>can contact</b> customer service.</i></li>
            <li><b>Câu mệnh lệnh:</b> <i>Should you see her, <b>tell</b> her I called.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lưu ý quan trọng" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Động từ sau chủ ngữ trong mệnh đề "Should" <b>luôn ở dạng nguyên mẫu không 'to'</b>, kể cả với chủ ngữ ngôi thứ ba số ít. (❌ <i className="line-through">Should he calls...</i>)</li>
          <li>Không dùng "If" và "Should" cùng lúc. (❌ <i className="line-through">If should you need...</i>)</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
