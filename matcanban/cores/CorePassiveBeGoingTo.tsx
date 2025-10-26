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

export default function CorePassiveBeGoingTo() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚙️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG TƯƠNG LAI GẦN (BE GOING TO)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động đã được lên kế hoạch <b>sẽ được thực hiện</b> trong tương lai, nhấn mạnh vào đối tượng chịu tác động.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="S + am/is/are + going to be + V3" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Phủ định" formula="S + am/is/are not + going to be + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn" formula="Am/Is/Are + S + going to be + V3?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
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
            Thể bị động của "be going to" được dùng để nói về một hành động trong tương lai khi:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Hành động đã được lên kế hoạch từ trước:</b>
                <br/><i>e.g., The old building <b>is going to be demolished</b> next month.</i> (Việc phá dỡ đã được quyết định).
            </li>
            <li><b>Dự đoán dựa trên bằng chứng ở hiện tại:</b>
                <br/><i>e.g., Look at those files! A lot of work <b>is going to be done</b>.</i> (Nhìn đống hồ sơ là biết có nhiều việc phải làm).
            </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🔧">
        <p>
            Cấu trúc của thì này là <b>"am/is/are + going to be"</b> + Quá khứ Phân từ (V3).
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + am/is/are + going to be + V3/V-ed</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>The new rules <b>are going to be implemented</b> soon.</li>
            <li>A new CEO <b>is going to be appointed</b>.</li>
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
                    <tr><td className="border p-2"><u>The city council</u> is going to build a new park.</td><td className="border p-2"><u>A new park</u> is going to be built by the city council.</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2"><u>They</u> are going to announce the results tomorrow.</td><td className="border p-2"><u>The results</u> are going to be announced tomorrow.</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên "be" sau "going to":</b> (❌ <i className="line-through">The project is going to finished.</i> → ✅ ...is going to <b>be</b> finished.)</li>
          <li><b>Dùng sai V3:</b> (❌ <i className="line-through">The walls are going to be paint.</i> → ✅ ...are going to be <b>painted</b>.)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The meeting is going to be rescheduled.</b> — Cuộc họp sẽ được dời lịch.</li>
          <li><b>These old computers are not going to be used anymore.</b> — Những chiếc máy tính cũ này sẽ không được sử dụng nữa.</li>
          <li><b>Is the new software going to be installed today?</b> — Phần mềm mới sẽ được cài đặt hôm nay phải không?</li>
          <li><b>A new supermarket is going to be opened in our neighborhood.</b> — Một siêu thị mới sẽ được mở ở khu phố của chúng ta.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu chủ động sau sang câu bị động:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>They are going to renovate the old library.
            <br/>→ The old library __________________________________________.</li>
            <li>The company is going to hire new employees.
            <br/>→ New employees ____________________________________________.</li>
            <li>Is she going to sell her car?
            <br/>→ Is her car _____________________________________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}