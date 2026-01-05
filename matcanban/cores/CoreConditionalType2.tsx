
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

export default function CoreConditionalType2() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🤔 <span className="underline decoration-4 decoration-amber-400">CÂU ĐIỀU KIỆN LOẠI 2</span> — Conditional Type 2
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một điều kiện <b>không có thật, trái với hiện tại</b> hoặc một tình huống tưởng tượng, không thể xảy ra ở hiện tại hoặc tương lai.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="If + S + V2/V-ed, S + would + V-bare" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Đảo mệnh đề" formula="S + would + V-bare if + S + V2/V-ed" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Đảo ngữ" formula="Were + S + ..., S + would + V-bare" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & "Were"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#variations">Biến thể (could, might)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#inversion">Đảo ngữ với "Were"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Loại 1</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu điều kiện loại 2 diễn tả một giả định trái với sự thật ở hiện tại, và kết quả tưởng tượng của nó.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Giả định trái với hiện tại:</b> <i>If I had a lot of money, I would travel the world.</i> (Sự thật: Tôi không có nhiều tiền ở hiện tại.)</li>
          <li><b>Đưa ra lời khuyên (dùng "If I were you"):</b> <i>If I were you, I would study harder.</i> (Sự thật: Tôi không phải là bạn, đây là lời khuyên.)</li>
          <li><b>Tình huống tưởng tượng, không thể xảy ra:</b> <i>If the cat were a dog, it would bark.</i> (Sự thật: Con mèo không phải là con chó.)</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & 'Were'" emoji="🧩">
        <p>Câu điều kiện loại 2 dùng thì Quá khứ đơn trong mệnh đề If, và 'would' + V(bare) trong mệnh đề chính.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Mệnh đề If: Thì Quá khứ đơn (Past Simple)</p>
            <p className="font-bold text-blue-700 mt-2">Mệnh đề chính: S + would + V(nguyên mẫu)</p>
            <p className="font-mono mt-2">If + S + V2/V-ed, S + would + V(nguyên mẫu)</p>
        </div>
        <p className="mt-2 font-semibold">Lưu ý đặc biệt với động từ "to be":</p>
        <ul className="list-disc pl-6">
            <li>Trong văn viết trang trọng và ngữ pháp chuẩn, ta dùng <b>were</b> cho tất cả các chủ ngữ (I, he, she, it, you, we, they) trong mệnh đề If của câu ĐK loại 2. Đây là dấu hiệu của thể giả định (subjunctive mood).
                <br/><i>e.g., If he <b>were</b> here, he would help us.</i> (Chuẩn)
            </li>
            <li>Trong văn nói thân mật, 'was' đôi khi được dùng cho 'I/he/she/it', nhưng 'were' luôn đúng và được ưu tiên trong các bài thi.
                <br/><i>e.g., If he <b>was</b> here...</i> (Thân mật, không trang trọng)
            </li>
        </ul>
      </Section>

      <Section id="variations" title="Biến thể (could, might)" emoji="✨">
        <p>Trong mệnh đề chính, có thể dùng <b>could</b> (chỉ khả năng) hoặc <b>might</b> (chỉ xác suất không chắc chắn) thay cho 'would'.</p>
        <ul className="list-disc pl-6">
            <li><b>Could:</b> <i>If we had a car, we <b>could</b> drive to the beach.</i> (Chúng ta có thể/có khả năng lái xe...)</li>
            <li><b>Might:</b> <i>If you asked him, he <b>might</b> help you.</i> (Anh ấy có lẽ sẽ giúp bạn, nhưng không chắc lắm.)</li>
        </ul>
      </Section>

      <Section id="inversion" title="Đảo ngữ với &quot;Were&quot;" emoji="🔄">
        <p>Để câu văn trang trọng hơn, ta có thể dùng đảo ngữ với "Were" thay cho "If".</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức 1 (với V thường): <code className="font-mono">Were + S + to + V(bare), ...</code></p>
            <p className="font-bold text-purple-700 mt-2">Công thức 2 (với to be/N/Adj): <code className="font-mono">Were + S + N/Adj, ...</code></p>
        </div>
        <p className="mt-2"><b>Ví dụ:</b></p>
        <ul className="list-disc pl-6">
            <li><i>If I were you, I would accept the offer.</i> → <i><b>Were I you</b>, I would accept the offer.</i></li>
            <li><i>If he studied harder, he would pass.</i> → <i><b>Were he to study</b> harder, he would pass.</i></li>
        </ul>
      </Section>
      
      <Section id="contrast" title="So sánh với Loại 1" emoji="⚖️">
        <ul className="list-disc pl-6">
            <li><b>Loại 1 (Có thật):</b> <i>If I <b>have</b> enough time, I <b>will</b> call you.</i> (Điều này có thể xảy ra).</li>
            <li><b>Loại 2 (Không có thật):</b> <i>If I <b>had</b> enough time, I <b>would</b> call you.</i> (Sự thật là tôi không có đủ thời gian ở hiện tại).</li>
        </ul>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
