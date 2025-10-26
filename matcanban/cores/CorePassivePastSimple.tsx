
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

export default function CorePassivePastSimple() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚙️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG QUÁ KHỨ ĐƠN</span> — <i>Passive (Past Simple)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đã được thực hiện và hoàn tất</b> tại một thời điểm cụ thể trong quá khứ, nhấn mạnh vào đối tượng chịu tác động.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="S + was/were + V3/V-ed" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Phủ định" formula="S + was/were not + V3/V-ed" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn" formula="Was/Were + S + V3/V-ed?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
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
            Thể bị động của thì Quá khứ đơn được dùng để mô tả một hành động đã xảy ra và kết thúc trong quá khứ. Trọng tâm của câu là đối tượng nhận hành động.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><i>The telephone <b>was invented</b> by Alexander Graham Bell.</i> (Điện thoại quan trọng hơn người phát minh).</li>
            <li><i>The first prize <b>was won</b> by a student from our school.</i> (Giải nhất quan trọng hơn người thắng).</li>
            <li><i>This castle <b>was built</b> in the 15th century.</i> (Người xây không được đề cập).</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🔧">
        <p>
            Để tạo câu bị động ở thì Quá khứ đơn, ta dùng động từ 'to be' ở dạng quá khứ (was/were) chia theo chủ ngữ, theo sau là Quá khứ Phân từ (V3/V-ed).
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + was/were + Past Participle (V3/V-ed)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>I/He/She/It + <b>was</b> + V3</li>
            <li>You/We/They + <b>were</b> + V3</li>
            <li><i>e.g., The letter <b>was sent</b> yesterday.</i></li>
            <li><i>e.g., The windows <b>were broken</b> last night.</i></li>
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
                    <tr><td className="border p-2"><u>Shakespeare</u> wrote 'Hamlet'.</td><td className="border p-2"><u>'Hamlet'</u> was written by Shakespeare.</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2"><u>Someone</u> stole my car last week.</td><td className="border p-2"><u>My car</u> was stolen last week.</td></tr>
                     <tr><td className="border p-2"><u>They</u> built this bridge in 2005.</td><td className="border p-2"><u>This bridge</u> was built in 2005.</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên "was/were":</b> (❌ <i className="line-through">The food cooked by my mom.</i> → ✅ The food <b>was cooked</b>...)</li>
          <li><b>Chia sai "was/were":</b> (❌ <i className="line-through">The books was written...</i> → ✅ The books <b>were written</b>...)</li>
          <li><b>Dùng sai V3:</b> (❌ <i className="line-through">The song was sang...</i> → ✅ ...was <b>sung</b>.)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The new road was opened yesterday.</b> — Con đường mới đã được thông xe vào hôm qua.</li>
          <li><b>The thief was caught by the police.</b> — Tên trộm đã bị cảnh sát bắt.</li>
          <li><b>These photos were not taken by a professional photographer.</b> — Những bức ảnh này không phải do một nhiếp ảnh gia chuyên nghiệp chụp.</li>
          <li><b>Was this email sent to everyone in the department?</b> — Email này có được gửi cho mọi người trong phòng ban không?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu chủ động sau sang câu bị động:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The company launched a new product last year.
            <br/>→ A new product __________________________________________.</li>
            <li>Someone broke the window last night.
            <br/>→ The window ____________________________________________.</li>
            <li>Did they invite you to the party?
            <br/>→ Were __________________________________________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
