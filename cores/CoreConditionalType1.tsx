
import React, { useState } from 'react';

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

export default function CoreConditionalType1() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✅ <span className="underline decoration-4 decoration-amber-400">CÂU ĐIỀU KIỆN LOẠI 1</span> — Conditional Type 1
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một điều kiện <b>có thật, có thể xảy ra</b> ở hiện tại hoặc tương lai và kết quả có thể xảy ra của nó.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="If + S + V-s/es, S + will + V-bare" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Đảo mệnh đề" formula="S + will + V-bare if + S + V-s/es" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Đảo ngữ" formula="Should + S + V-bare, ..." colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#variations">Biến thể (can, may, imperative)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#unless">Dùng 'Unless'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu điều kiện loại 1 (còn gọi là "điều kiện có thật ở tương lai") được dùng để nói về những tình huống có khả năng xảy ra.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Dự đoán một kết quả có thể xảy ra:</b> <i>If it rains, the cat will sleep inside.</i> (Việc trời mưa là có thể, và kết quả là con mèo sẽ ngủ trong nhà).</li>
          <li><b>Đưa ra lời hứa hoặc cảnh báo:</b> <i>If you finish your homework, I will let you watch TV.</i> (Lời hứa). <i>If you touch that wire, you will get an electric shock.</i> (Cảnh báo).</li>
          <li><b>Đưa ra lời đề nghị hoặc gợi ý:</b> <i>If you are hungry, I can make you a sandwich.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Câu điều kiện loại 1 dùng thì Hiện tại đơn trong mệnh đề If, và Tương lai đơn trong mệnh đề chính.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Mệnh đề If: Thì Hiện tại đơn (Present Simple)</p>
            <p className="font-bold text-blue-700 mt-2">Mệnh đề chính: S + will + V(nguyên mẫu)</p>
            <p className="font-mono mt-2">If + S + V(s/es), S + will + V(nguyên mẫu)</p>
        </div>
        <p className="mt-2 font-semibold">Quy tắc dấu phẩy:</p>
        <ul className="list-disc pl-6">
            <li>Khi mệnh đề "If" đứng đầu câu, dùng dấu phẩy để ngăn cách hai mệnh đề.
                <br/><i>e.g., If you study hard, you will pass the exam.</i>
            </li>
            <li>Khi mệnh đề chính đứng đầu câu, không dùng dấu phẩy.
                <br/><i>e.g., You will pass the exam if you study hard.</i>
            </li>
        </ul>
      </Section>

      <Section id="variations" title="Biến thể (can, may, imperative)" emoji="✨">
        <p>Trong mệnh đề chính, có thể dùng các động từ khuyết thiếu khác hoặc câu mệnh lệnh thay cho 'will' để thay đổi sắc thái ý nghĩa.</p>
        <ul className="list-disc pl-6">
            <li><b>can/may (chỉ khả năng/sự cho phép):</b> <i>If you finish your work early, you <b>can</b> go home.</i></li>
            <li><b>must/should (chỉ sự cần thiết/lời khuyên):</b> <i>If you want to be healthy, you <b>should</b> eat more vegetables.</i></li>
            <li><b>Câu mệnh lệnh (Imperative):</b> <i>If you see John, <b>tell</b> him to call me.</i></li>
        </ul>
      </Section>

      <Section id="unless" title="Dùng 'Unless' thay cho 'If...not'" emoji="🔄">
        <p><b>Unless</b> có nghĩa là "trừ khi", tương đương với <b>If...not</b>.</p>
        <ul className="list-disc pl-6">
            <li><i>You will fail the test <b>if you do not study</b>.</i></li>
            <li>→ <i>You will fail the test <b>unless you study</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng 'will' trong mệnh đề 'If'. (❌ <i className="line-through">If it will rain, ...</i>)</li>
          <li>Chia sai động từ trong mệnh đề 'If' với chủ ngữ ngôi thứ ba số ít. (❌ <i className="line-through">If he study...</i> → ✅ If he <b>studies</b>...)</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
