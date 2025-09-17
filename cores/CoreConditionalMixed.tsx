
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

export default function CoreConditionalMixed() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
         🔀 <span className="underline decoration-4 decoration-amber-400">CÂU ĐIỀU KIỆN HỖN HỢP</span> — <i>Mixed Conditionals</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Kết hợp câu điều kiện loại 2 và 3 để diễn tả một giả định ở một thời điểm này (quá khứ/hiện tại) và kết quả ở một thời điểm khác (hiện tại/quá khứ).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="Loại 3 → 2" formula="If + had + V3, S + would + V-bare" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Loại 2 → 3" formula="If + V2/V-ed, S + would have + V3" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng & Phân loại</a></li>
            <li><a className="text-rose-700 hover:underline" href="#type32">Loại 3 → 2: ĐK Quá khứ, KQ Hiện tại</a></li>
            <li><a className="text-rose-700 hover:underline" href="#type23">Loại 2 → 3: ĐK Hiện tại, KQ Quá khứ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#key">Ghi nhớ & Dấu hiệu</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng & Phân loại" emoji="🎯">
        <p>
            Câu điều kiện hỗn hợp dùng để liên kết hai khung thời gian khác nhau. Có hai loại chính:
        </p>
        <ul className="list-disc pl-6">
          <li><b>Loại 3 → 2:</b> Giả định <b>trái với quá khứ</b>, dẫn đến kết quả <b>trái với hiện tại</b>. (Rất phổ biến)</li>
          <li><b>Loại 2 → 3:</b> Giả định <b>trái với hiện tại</b> (thường là một tính chất, sự thật lâu dài), dẫn đến kết quả <b>trái với quá khứ</b>. (Ít phổ biến hơn)</li>
        </ul>
      </Section>

      <Section id="type32" title="Loại 3 → 2: ĐK Quá khứ, KQ Hiện tại" emoji="🕰️➡️⏰">
        <p>Đây là dạng hỗn hợp thường gặp nhất, diễn tả sự hối tiếc về một việc trong quá khứ đã ảnh hưởng đến hiện tại.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Mệnh đề If: Thì Quá khứ Hoàn thành (Loại 3)</p>
            <p className="font-bold text-blue-700 mt-2">Mệnh đề chính: S + would + V(nguyên mẫu) (Loại 2)</p>
            <p className="font-mono mt-2">If + S + had + V3, S + would + V(nguyên mẫu) ... <b>now</b>.</p>
        </div>
        <p className="mt-2"><b>Ví dụ:</b> <i>If the cat <b>had eaten</b>, it <b>would not be</b> hungry <b>now</b>.</i></p>
        <ul className="list-disc pl-6">
            <li>Sự thật Quá khứ: The cat didn't eat.</li>
            <li>Sự thật Hiện tại: The cat is hungry now.</li>
        </ul>
      </Section>

      <Section id="type23" title="Loại 2 → 3: ĐK Hiện tại, KQ Quá khứ" emoji="⏰➡️🕰️">
        <p>Dạng này ít gặp hơn, thường diễn tả một tính cách hoặc một sự thật chung (trái với hiện tại) đã gây ra một kết quả khác trong quá khứ.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Mệnh đề If: Thì Quá khứ đơn (Loại 2)</p>
            <p className="font-bold text-purple-700 mt-2">Mệnh đề chính: S + would have + V3 (Loại 3)</p>
            <p className="font-mono mt-2">If + S + V2/V-ed, S + would have + V3 ... <b>yesterday</b>.</p>
        </div>
        <p className="mt-2"><b>Ví dụ:</b> <i>If he <b>weren't</b> so lazy, he <b>would have finished</b> the project <b>on time</b>.</i></p>
        <ul className="list-disc pl-6">
            <li>Sự thật Hiện tại: He is lazy (in general).</li>
            <li>Sự thật Quá khứ: He didn't finish the project on time.</li>
        </ul>
      </Section>

      <Section id="key" title="Ghi nhớ & Dấu hiệu" emoji="🔑">
        <p>Để xác định đúng câu điều kiện hỗn hợp, hãy tìm các trạng từ chỉ thời gian ở hai mệnh đề:</p>
        <ul className="list-disc pl-6">
            <li><b>Loại 3 → 2:</b> Mệnh đề chính thường có <b>now</b>, <b>right now</b>, <b>today</b>.</li>
            <li><b>Loại 2 → 3:</b> Mệnh đề chính thường có <b>yesterday</b>, <b>last week</b>, <b>that day</b>. Mệnh đề If thường chỉ một đặc điểm cố hữu (<i>If I were you...</i>, <i>If he wasn't shy...</i>).</li>
        </ul>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
