
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

export default function CorePassivePastPerfect() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚙️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG QK HOÀN THÀNH</span> — <i>Passive (Past Perfect)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đã được hoàn tất TRƯỚC</b> một hành động hoặc một thời điểm khác trong quá khứ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="S + had been + V3" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Phủ định" formula="S + had not been + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn" formula="Had + S + been + V3?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
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
            Thể bị động của thì Quá khứ Hoàn thành được dùng để nhấn mạnh hành động bị động đã xảy ra và hoàn tất trước một hành động/thời điểm khác trong quá khứ.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><i>By the time I arrived, the cake <b>had already been eaten</b>.</i> (Việc ăn bánh đã xong trước khi tôi đến).</li>
            <li><i>He told me that his car <b>had been stolen</b> a few days before.</i> (Việc xe bị trộm xảy ra trước khi anh ấy kể).</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🔧">
        <p>
            Cấu trúc của thì này là <b>"had been"</b> + Quá khứ Phân từ (V3). "Had been" được dùng cho tất cả các chủ ngữ.
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + had been + Past Participle (V3/V-ed)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>The report <b>had been finished</b> before the deadline.</li>
            <li>All the arrangements <b>had been made</b> before the guests arrived.</li>
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
                    <tr><td className="border p-2"><u>They</u> had built the road before 2010.</td><td className="border p-2"><u>The road</u> had been built before 2010.</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2"><u>Someone</u> had cleaned the room before I got there.</td><td className="border p-2"><u>The room</u> had been cleaned before I got there.</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên "been":</b> (❌ <i className="line-through">The letter had sent.</i> → ✅ The letter <b>had been sent</b>.)</li>
          <li><b>Dùng "have/has" thay vì "had":</b> (❌ <i className="line-through">It has been done before he came.</i>)</li>
          <li><b>Dùng sai V3:</b> (❌ <i className="line-through">The food had been ate.</i> → ✅ ...had been <b>eaten</b>.)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The contract had been signed before the meeting started.</b> — Hợp đồng đã được ký trước khi cuộc họp bắt đầu.</li>
          <li><b>The patient had been taken to the hospital before the ambulance arrived.</b> — Bệnh nhân đã được đưa đến bệnh viện trước khi xe cứu thương đến.</li>
          <li><b>Had the warning been issued earlier, the disaster might have been avoided.</b> — Nếu lời cảnh báo được đưa ra sớm hơn, thảm họa có lẽ đã được tránh khỏi. (Đảo ngữ)</li>
          <li><b>He realized the mistake had not been corrected.</b> — Anh ấy nhận ra rằng lỗi lầm vẫn chưa được sửa.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu chủ động sau sang câu bị động:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The company had hired a new manager before I joined.
            <br/>→ A new manager __________________________________________.</li>
            <li>Someone had already informed him about the changes.
            <br/>→ He ____________________________________________________.</li>
            <li>They had finished all the preparations by the time we arrived.
            <br/>→ All the preparations ____________________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
