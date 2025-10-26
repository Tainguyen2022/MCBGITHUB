
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

export default function CorePassiveFuturePerfect(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚙️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG TL HOÀN THÀNH</span> — <i>Passive (Future Perfect)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>sẽ đã được hoàn tất TRƯỚC</b> một thời điểm hoặc một hành động khác trong tương lai.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="S + will have been + V3" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Phủ định" formula="S + won't have been + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn" formula="Will + S + have been + V3?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Khi nào dùng?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh Chủ động & Bị động</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Khi nào dùng?" emoji="🎯">
        <p>
            Thể bị động của thì Tương lai Hoàn thành được dùng để nhấn mạnh hành động bị động sẽ hoàn tất trước một mốc thời gian trong tương lai.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><i>By next month, the new bridge <b>will have been completed</b>.</i> (Cây cầu sẽ được xây xong trước tháng sau).</li>
            <li><i>The report <b>will have been written</b> by the time the manager arrives.</i> (Báo cáo sẽ được viết xong trước khi giám đốc đến).</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🔧">
        <p>
            Cấu trúc của thì này là <b>"will have been"</b> + Quá khứ Phân từ (V3). Cấu trúc này dùng cho tất cả các chủ ngữ.
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + will have been + Past Participle (V3/V-ed)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>The work <b>will have been finished</b> by 5 PM.</li>
            <li>All the arrangements <b>will have been made</b> before the event.</li>
        </ul>
      </Section>
      
      <Section id="comparison" title="So sánh Chủ động & Bị động" emoji="⚖️">
        <p>
            Tân ngữ của câu chủ động trở thành chủ ngữ của câu bị động.
        </p>
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Active Voice</th>
                        <th className="border p-2 text-left">Passive Voice</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2"><u>They</u> will have built the house by June.</td><td className="border p-2"><u>The house</u> will have been built by June.</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2"><u>The team</u> will have completed the project by the deadline.</td><td className="border p-2"><u>The project</u> will have been completed by the deadline.</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên "been":</b> (❌ <i className="line-through">The job will have finished.</i> → ✅ The job <b>will have been finished</b>.)</li>
          <li><b>Quên "have":</b> (❌ <i className="line-through">It will been done by tomorrow.</i>)</li>
          <li><b>Dùng sai V3:</b> (❌ <i className="line-through">The meal will have been prepare.</i> → ✅ ...will have been <b>prepared</b>.)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>By 2030, all fossil fuel cars will have been replaced by electric ones.</b> — Đến năm 2030, tất cả xe hơi dùng nhiên liệu hóa thạch sẽ đã được thay thế bằng xe điện.</li>
          <li><b>The package won't have been delivered by the time you get home.</b> — Gói hàng sẽ chưa được giao trước khi bạn về đến nhà đâu.</li>
          <li><b>Will the preparations have been completed before the guests arrive?</b> — Liệu mọi sự chuẩn bị có được hoàn tất trước khi khách đến không?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu chủ động sau sang câu bị động:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>They will have finished the repairs by next week.
            <br/>→ The repairs __________________________________________.</li>
            <li>The company will have launched the new product by the end of the year.
            <br/>→ The new product _______________________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
