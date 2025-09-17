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

export default function CoreVerbAuxiliaryChain() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⛓️ <span className="underline decoration-4 decoration-amber-400">CHUỖI TRỢ ĐỘNG TỪ</span> — <i>Auxiliary Chain</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu quy tắc "bất di bất dịch" về trật tự của các trợ động từ (auxiliary verbs) để tạo nên mọi thì và thể trong tiếng Anh.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Thì (Tense)" formula="First Aux shows Tense" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Thể (Modality-Aspect-Voice)" formula="M > A > V" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Trật tự vàng" formula="Modal + have + be + be + V" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Cụm động từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#order">Thứ tự Vàng: Modality → Aspect → Voice</a></li>
            <li><a className="text-rose-700 hover:underline" href="#tense">Quy tắc "Trợ động từ đầu tiên"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ Phân tích</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Cụm động từ" emoji="🎯">
        <p>
            <b>Cụm động từ (Verb Phrase)</b> trong một câu bao gồm một động từ chính (main verb) và có thể có một hoặc nhiều <b>trợ động từ (auxiliary verbs)</b> đứng trước nó.
        </p>
        <p>Các trợ động từ này không mang ý nghĩa chính, mà chúng "trợ giúp" động từ chính để thể hiện các thông tin ngữ pháp như:</p>
        <ul className="list-disc pl-6">
            <li><b>Tense (Thì):</b> present / past</li>
            <li><b>Aspect (Thể):</b> perfect / progressive</li>
            <li><b>Voice (Dạng):</b> active / passive</li>
            <li><b>Modality (Tình thái):</b> possibility, necessity (can, must, will...)</li>
        </ul>
      </Section>

      <Section id="order" title="Thứ tự Vàng: Modality → Aspect → Voice" emoji="🥇">
        <p>
            Các trợ động từ phải xuất hiện theo một trật tự cố định không bao giờ thay đổi.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700 text-center font-mono tracking-wider">
                (MODAL) + (HAVE) + (BE) + (BE) + Main Verb
            </p>
        </div>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>1. MODAL (can, will, must...):</b> Luôn đứng đầu tiên. Theo sau là V-bare.
                <br/><i>e.g., He <b>will</b> go.</i>
            </li>
            <li><b>2. PERFECT (have):</b> Luôn theo sau MODAL (nếu có). Theo sau là V3/V-ed.
                <br/><i>e.g., He has <b>gone</b>. / He will <b>have gone</b>.</i>
            </li>
            <li><b>3. PROGRESSIVE (be):</b> Luôn theo sau PERFECT (nếu có). Theo sau là V-ing.
                <br/><i>e.g., He is <b>going</b>. / He has <b>been going</b>.</i>
            </li>
            <li><b>4. PASSIVE (be):</b> Luôn theo sau PROGRESSIVE (nếu có). Theo sau là V3/V-ed.
                <br/><i>e.g., It is <b>built</b>. / It is <b>being built</b>.</i>
            </li>
        </ul>
      </Section>
      
       <Section id="tense" title="Quy tắc 'Trợ động từ đầu tiên'" emoji="🔑">
        <p>
           <b>Thì (Tense)</b> của cả cụm động từ được quyết định bởi <b>trợ động từ đầu tiên</b> trong chuỗi. Nếu không có trợ động từ, động từ chính sẽ quyết định thì.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He <b>is</b> working.</i> (<b>is</b> = present → Present Progressive)</li>
            <li><i>He <b>was</b> working.</i> (<b>was</b> = past → Past Progressive)</li>
             <li><i>She <b>has</b> been waiting.</i> (<b>has</b> = present → Present Perfect Progressive)</li>
            <li><i>She <b>had</b> been waiting.</i> (<b>had</b> = past → Past Perfect Progressive)</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ Phân tích" emoji="🔬">
         <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Cụm động từ</th>
                        <th className="border p-2 text-left">Phân tích</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2 font-mono">will have been sent</td><td className="border p-2">Modal (will) + Perfect (have) + Passive (be) → Future Perfect Passive</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-mono">is being considered</td><td className="border p-2">Progressive (be) + Passive (be) → Present Progressive Passive</td></tr>
                     <tr><td className="border p-2 font-mono">had been working</td><td className="border p-2">Perfect (have) + Progressive (be) → Past Perfect Progressive</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định thì/thể/dạng của các cụm động từ sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The report <b>must have been finished</b>. → ___________________________</li>
            <li>They <b>have been discussing</b> the issue. → ___________________________</li>
            <li>A new policy <b>will be introduced</b>. → ___________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
