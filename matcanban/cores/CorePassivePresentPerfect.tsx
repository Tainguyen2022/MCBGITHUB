
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

export default function CorePassivePresentPerfect(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚙️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG HT HOÀN THÀNH</span> — <i>Passive (Present Perfect)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động đã xảy ra tại một thời điểm không xác định trong quá khứ, nhưng kết quả của nó còn liên quan đến hiện tại.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="S + has/have + been + V3" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Phủ định" formula="S + hasn't/haven't + been + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn" formula="Has/Have + S + been + V3?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
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
            Thể bị động của thì Hiện tại Hoàn thành được dùng khi:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Hành động trong quá khứ có kết quả rõ ràng ở hiện tại.
                <br/><i>e.g., The window <b>has been broken</b>. (Bây giờ cửa sổ đang bị vỡ).</i>
            </li>
            <li>Hành động vừa mới xảy ra (thường đi với 'just').
                <br/><i>e.g., The decision <b>has just been made</b>.</i>
            </li>
            <li>Hành động chưa xảy ra tính đến bây giờ (thường đi với 'yet' trong câu phủ định/nghi vấn).
                <br/><i>e.g., The report <b>hasn't been finished</b> yet.</i>
            </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🔧">
        <p>
            Điểm mấu chốt của thì này là cấu trúc <b>"has/have been"</b> theo sau là Quá khứ Phân từ (V3).
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + has/have + been + Past Participle (V3/V-ed)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>He/She/It + <b>has been</b> + V3</li>
            <li>I/You/We/They + <b>have been</b> + V3</li>
            <li><i>e.g., A new policy <b>has been implemented</b>.</i></li>
            <li><i>e.g., All the tickets <b>have been sold</b>.</i></li>
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
                    <tr><td className="border p-2"><u>Someone</u> has stolen my bike.</td><td className="border p-2"><u>My bike</u> has been stolen.</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2"><u>The company</u> has hired new employees.</td><td className="border p-2"><u>New employees</u> have been hired by the company.</td></tr>
                     <tr><td className="border p-2"><u>She</u> has cleaned the rooms.</td><td className="border p-2"><u>The rooms</u> have been cleaned.</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên "been":</b> (❌ <i className="line-through">The work has finished.</i> → ✅ The work <b>has been finished</b>.)</li>
          <li><b>Chia sai "has/have":</b> (❌ <i className="line-through">The letters has been sent.</i> → ✅ The letters <b>have been</b> sent.)</li>
          <li><b>Dùng sai V3:</b> (❌ <i className="line-through">The door has been open.</i> → ✅ ...has been <b>opened</b>.)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The package has already been delivered.</b> — Gói hàng đã được giao rồi.</li>
          <li><b>Have all the arrangements been made for the party?</b> — Mọi sự sắp xếp cho bữa tiệc đã được thực hiện chưa?</li>
          <li><b>My application has been rejected.</b> — Đơn xin việc của tôi đã bị từ chối.</li>
          <li><b>Too much money has been spent on this project.</b> — Quá nhiều tiền đã được chi cho dự án này.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu chủ động sau sang câu bị động:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>They have cancelled the flight.
            <br/>→ The flight ____________________________________________.</li>
            <li>Someone has eaten all the cake.
            <br/>→ All the cake ____________________________________________.</li>
            <li>Has the manager signed the documents?
            <br/>→ Have the documents ___________________________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
