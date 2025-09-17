
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

export default function CorePassivePresentSimple() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚙️ <span className="underline decoration-4 decoration-amber-400">BỊ ĐỘNG HIỆN TẠI ĐƠN</span> — <i>Passive (Present Simple)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để nhấn mạnh đối tượng chịu tác động của hành động, thay vì người thực hiện hành động. Thường dùng khi người thực hiện không rõ, không quan trọng, hoặc là một sự thật chung.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Khẳng định" formula="S + am/is/are + V3/V-ed" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Phủ định" formula="S + am/is/are not + V3/V-ed" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn" formula="Am/Is/Are + S + V3/V-ed?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Khi nào dùng Thể Bị động?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#agent">Thêm Tác nhân (by + agent)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh Chủ động & Bị động</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Khi nào dùng Thể Bị động?" emoji="🎯">
        <p>
            Chúng ta sử dụng thể bị động khi:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Muốn nhấn mạnh đối tượng nhận hành động:</b>
                <br/><i>e.g., This bridge <b>was built</b> in 1990. (Cây cầu quan trọng hơn người xây).</i>
            </li>
            <li><b>Người thực hiện hành động (agent) không rõ hoặc không quan trọng:</b>
                <br/><i>e.g., My wallet <b>has been stolen</b>. (Tôi không biết ai đã lấy cắp).</i>
            </li>
            <li><b>Muốn câu văn nghe khách quan, trang trọng (thường trong văn viết khoa học, báo chí):</b>
                <br/><i>e.g., It <b>is believed</b> that the new policy will be effective.</i>
            </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🔧">
        <p>
            Để tạo câu bị động ở thì Hiện tại đơn, ta dùng động từ 'to be' (am/is/are) chia theo chủ ngữ, theo sau là Quá khứ Phân từ (V3/V-ed) của động từ chính.
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">Subject + am/is/are + Past Participle (V3/V-ed)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>I <b>am invited</b> to the party.</li>
            <li>English <b>is spoken</b> all over the world.</li>
            <li>These cars <b>are made</b> in Japan.</li>
        </ul>
      </Section>
      
      <Section id="agent" title="Thêm Tác nhân (by + agent)" emoji="👤">
        <p>
            Nếu muốn đề cập đến người hoặc vật thực hiện hành động, ta dùng cụm từ <b>by + agent</b> ở cuối câu.
        </p>
        <ul className="list-disc pl-6">
            <li><i>The Mona Lisa was painted <b>by Leonardo da Vinci</b>.</i></li>
            <li><i>The decision is made <b>by the manager</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="comparison" title="So sánh Chủ động & Bị động" emoji="⚖️">
        <p>
            Chuyển từ câu chủ động sang bị động là một kỹ năng quan trọng.
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
                    <tr><td className="border p-2"><u>People</u> speak English here.</td><td className="border p-2"><u>English</u> is spoken here.</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2"><u>My mother</u> cleans the house every day.</td><td className="border p-2"><u>The house</u> is cleaned by my mother every day.</td></tr>
                     <tr><td className="border p-2"><u>They</u> produce a lot of cars in Germany.</td><td className="border p-2"><u>A lot of cars</u> are produced in Germany.</td></tr>
                </tbody>
            </table>
        </div>
        <p className="mt-2"><b>Quy trình chuyển đổi:</b> Tân ngữ của câu chủ động → Chủ ngữ của câu bị động. Động từ → am/is/are + V3. Chủ ngữ của câu chủ động → by + agent (hoặc lược bỏ).</p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên động từ 'to be':</b> (❌ <i className="line-through">The letters written by him.</i> → ✅ The letters <b>are</b> written by him.)</li>
          <li><b>Chia sai động từ 'to be':</b> (❌ <i className="line-through">The car are washed.</i> → ✅ The car <b>is</b> washed.)</li>
          <li><b>Dùng sai V3:</b> Sử dụng động từ nguyên mẫu hoặc V2 thay vì Quá khứ Phân từ. (❌ <i className="line-through">The window was break.</i> → ✅ ...was <b>broken</b>.)</li>
          <li><b>Chỉ có ngoại động từ (transitive verbs) mới có thể chuyển sang bị động.</b> Nội động từ (arrive, die, happen) không có dạng bị động.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu chủ động sau sang câu bị động:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>They grow coffee in Brazil.
            <br/>→ ____________________________________________</li>
            <li>Someone cleans this room every day.
            <br/>→ ____________________________________________</li>
            <li>The teacher explains the rules.
            <br/>→ ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
