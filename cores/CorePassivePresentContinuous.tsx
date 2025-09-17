
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

export default function CorePassivePresentContinuous() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚙️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG HT TIẾP DIỄN</span> — <i>Passive (Present Continuous)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đang được thực hiện</b> ngay tại thời điểm nói, nhấn mạnh vào đối tượng chịu tác động.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="S + am/is/are + being + V3" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Phủ định" formula="S + am/is/are not + being + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn" formula="Am/Is/Are + S + being + V3?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
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
            Thể bị động của thì Hiện tại Tiếp diễn được dùng để mô tả một hành động đang trong quá trình diễn ra ngay tại thời điểm nói, nhưng người nói muốn tập trung vào đối tượng bị tác động thay vì chủ thể thực hiện hành động đó.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><i>The house is very noisy because a party <b>is being held</b> next door.</i> (Bữa tiệc đang được tổ chức).</li>
            <li><i>Look! The bridge <b>is being repaired</b>.</i> (Cây cầu đang được sửa chữa).</li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🔧">
        <p>
            Điểm mấu chốt của thì này là sự có mặt của <b>"being"</b> sau "am/is/are" và trước V3.
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + am/is/are + being + Past Participle (V3/V-ed)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>I <b>am being watched</b>.</li>
            <li>A new road <b>is being built</b>.</li>
            <li>The documents <b>are being printed</b> right now.</li>
        </ul>
      </Section>
      
      <Section id="comparison" title="So sánh Chủ động & Bị động" emoji="⚖️">
        <p>
            Hãy xem cách tân ngữ của câu chủ động trở thành chủ ngữ của câu bị động.
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
                    <tr><td className="border p-2"><u>Someone</u> is cleaning the room.</td><td className="border p-2"><u>The room</u> is being cleaned.</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2"><u>They</u> are building a new hospital.</td><td className="border p-2"><u>A new hospital</u> is being built.</td></tr>
                     <tr><td className="border p-2"><u>The chef</u> is preparing the meal.</td><td className="border p-2"><u>The meal</u> is being prepared by the chef.</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên "being":</b> Đây là lỗi phổ biến nhất, làm câu sai ngữ pháp hoàn toàn. (❌ <i className="line-through">The house is built.</i> → ✅ The house <b>is being built</b>.)</li>
          <li><b>Quên "am/is/are":</b> (❌ <i className="line-through">The food being prepared.</i>)</li>
          <li><b>Dùng với động từ trạng thái (stative verbs):</b> Các động từ như 'know', 'love', 'understand' không có dạng tiếp diễn, do đó cũng không có dạng bị động tiếp diễn.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>A new plan is being developed by the team.</b> — Một kế hoạch mới đang được đội ngũ phát triển.</li>
          <li><b>Excuse the noise. The kitchen is being redecorated.</b> — Xin lỗi vì tiếng ồn. Nhà bếp đang được trang trí lại.</li>
          <li><b>Is anything being done about the problem?</b> — Có biện pháp nào đang được thực hiện về vấn đề này không?</li>
          <li><b>Your order is being processed and will be shipped soon.</b> — Đơn hàng của bạn đang được xử lý và sẽ sớm được giao.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu chủ động sau sang câu bị động:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The company is launching a new product.
            <br/>→ A new product __________________________________________.</li>
            <li>Someone is following us.
            <br/>→ We ____________________________________________________.</li>
            <li>Are they interviewing the new candidates now?
            <br/>→ Are the new candidates ________________________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
