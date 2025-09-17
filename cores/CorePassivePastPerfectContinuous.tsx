
import React, { useState } from 'react';

// Reusing the FormulaChip component structure from other cores for consistency
type Chip = { label: string; formula: string; colors: string };
const FormulaChip: React.FC<Chip> = ({ label, formula, colors }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(formula); setCopied(true); setTimeout(()=>setCopied(false), 1200);} catch {} };
  return (
    <button
      onClick={copy}
      title={`Copy: ${formula}`}
      className={[
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg',
        'transition-[transform,box-shadow] active:scale-95 ring-1 ring-white/20',
        'bg-gradient-to-r', colors,
        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-left'
      ].join(' ')}
    >
      <span className="truncate">{label}</span>
      <span className="hidden sm:inline ml-2 text-white/85 font-semibold">({formula})</span>
      <span className="sm:hidden text-white/85 font-semibold text-xs leading-tight">({formula})</span>
      {copied && <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/70">Copied!</span>}
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

export default function CorePassivePastPerfectContinuous() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚠️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG QKHT TIẾP DIỄN</span> — <i>Passive (PPC)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Đây là một thì <b>cực kỳ hiếm gặp và nên tránh</b> trong tiếng Anh. Nó tồn tại về mặt lý thuyết nhưng không được sử dụng trong thực tế vì cấu trúc rườm rà.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc (Không tự nhiên)" formula="S + had + been being + V3" colors="from-slate-600 via-gray-700 to-black"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Tại sao thì này hiếm gặp?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức (để tham khảo)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#alternatives">Các cách diễn đạt thay thế tự nhiên hơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ & Cách cải thiện</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Tại sao thì này hiếm gặp?" emoji="🤔">
        <p>
            Mục đích của thì này là để nhấn mạnh quá trình kéo dài của một hành động bị động <b>trước</b> một thời điểm khác trong quá khứ. Tuy nhiên, cấu trúc <b>"had been being"</b> quá dài và không tự nhiên. Người bản xứ sẽ luôn tìm cách diễn đạt khác.
        </p>
        <div className="mt-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
            <b>Lời khuyên:</b> Giống như Bị động HTHT Tiếp diễn, hãy nhận biết thì này nhưng <b>đừng bao giờ sử dụng nó</b>. Hãy dùng các phương án thay thế.
        </div>
      </Section>

      <Section id="form" title="Công thức (để tham khảo)" emoji="🔧">
        <p>
            Về mặt lý thuyết, cấu trúc được hình thành như sau:
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + had + been + being + Past Participle (V3/V-ed)</p>
        </div>
        <p className="mt-2"><i>e.g., The road <b>had been being repaired</b> for months before they finally finished.</i> (Câu này đúng ngữ pháp nhưng không ai nói như vậy).</p>
      </Section>
      
      <Section id="alternatives" title="Các cách diễn đạt thay thế tự nhiên hơn" emoji="👍">
        <p>
            Để diễn tả ý "một hành động đã và đang được thực hiện liên tục trước một mốc quá khứ", hãy dùng các cách sau:
        </p>
        <ol className="list-decimal pl-6 space-y-3 mt-2">
            <li><b>Dùng thể Chủ động (Past Perfect Continuous):</b> Đây là cách tốt và tự nhiên nhất.
                <br/><i>Không tự nhiên: The house had been being built for a year before they ran out of money.</i>
                <br/><i>Tự nhiên hơn: <b>They had been building</b> the house for a year before they ran out of money.</i>
            </li>
            <li><b>Dùng Bị động Quá khứ Hoàn thành (Past Perfect Passive):</b> Cách này không nhấn mạnh sự liên tục, nhưng tự nhiên hơn nhiều.
                <br/><i>Không tự nhiên: The problem had been being discussed for hours before a solution was found.</i>
                <br/><i>Tự nhiên hơn: <b>The problem had been discussed</b> for hours before a solution was found.</i>
            </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ & Cách cải thiện" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Không tự nhiên:</b> The report had been being written for weeks before the deadline.
          <br/><b>Tốt hơn (Chủ động):</b> She <b>had been writing</b> the report for weeks before the deadline.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau theo cách tự nhiên hơn, sử dụng thể chủ động (Past Perfect Continuous):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The project had been being worked on for months before it was cancelled.
            <br/>→ They __________________________________________________.</li>
            <li>The patient had been being monitored closely before the doctor arrived.
            <br/>→ The nurses ______________________________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
