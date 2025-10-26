
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

export default function CoreNounComplement() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✨ <span className="underline decoration-4 decoration-amber-400">BỔ NGỮ</span> — <i>Complements</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là từ hoặc cụm từ theo sau động từ để <b>hoàn thành ý nghĩa</b> của chủ ngữ (Subject Complement) hoặc tân ngữ (Object Complement).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Bổ ngữ Chủ ngữ (SC)" formula="S + Linking Verb + SC" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Bổ ngữ Tân ngữ (OC)" formula="S + V + DO + OC" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
           <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#sc">1. Bổ ngữ Chủ ngữ (Subject Complement)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#oc">2. Bổ ngữ Tân ngữ (Object Complement)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">3. So sánh Bổ ngữ & Tân ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="sc" title="1. Bổ ngữ Chủ ngữ (Subject Complement)" emoji="👤➡️✨">
        <p>
            <b>Bổ ngữ chủ ngữ (SC)</b> theo sau một <b>động từ nối (linking verb)</b> và mô tả hoặc định danh lại chủ ngữ. Nó có thể là một tính từ, danh từ, hoặc đại từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Là Tính từ:</b> <i>The soup tastes <b>delicious</b>.</i> ('delicious' mô tả 'The soup').</li>
            <li><b>Là Danh từ (hoặc Cụm danh từ):</b> <i>She is <b>a talented architect</b>.</i> ('a talented architect' định danh cho 'She').</li>
             <li><b>Động từ nối phổ biến:</b> be, become, seem, appear, feel, look, taste, smell, sound.</li>
        </ul>
      </Section>
      
      <Section id="oc" title="2. Bổ ngữ Tân ngữ (Object Complement)" emoji="📦➡️✨">
        <p>
            <b>Bổ ngữ tân ngữ (OC)</b> theo sau một <b>tân ngữ trực tiếp (direct object)</b> và mô tả hoặc định danh lại tân ngữ đó.
        </p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Cấu trúc: S + V + Direct Object + Object Complement</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Là Tính từ:</b> <i>The news made <b>me happy</b>.</i> ('happy' mô tả 'me').</li>
            <li><b>Là Danh từ:</b> <i>They elected <b>him president</b>.</i> ('president' định danh cho 'him').</li>
            <li><b>Động từ thường đi với OC:</b> make, name, call, choose, elect, consider, find.</li>
        </ul>
      </Section>
      
      <Section id="comparison" title="3. So sánh Bổ ngữ & Tân ngữ" emoji="⚖️">
        <p>
            Điểm khác biệt chính là mối quan hệ. Bổ ngữ mô tả hoặc định danh lại một danh từ khác trong câu, trong khi tân ngữ là một thực thể riêng biệt.
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li><b>Bổ ngữ (Complement):</b> <i>She is <u>a teacher</u>.</i> (She = a teacher).</li>
            <li><b>Tân ngữ (Object):</b> <i>She knows <u>a teacher</u>.</i> (She ≠ a teacher).</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Dùng trạng từ thay cho tính từ làm bổ ngữ:</b>
             <br/>❌ <i className="line-through">The food smells wonderfully.</i> → ✅ The food smells <b>wonderful</b>.
          </li>
          <li><b>Nhầm lẫn Bổ ngữ Tân ngữ với Tân ngữ Gián tiếp:</b>
            <br/>- <i>He called me <b>a taxi</b>.</i> (Tân ngữ gián tiếp: He called a taxi for me).
            <br/>- <i>He called me <b>a liar</b>.</i> (Bổ ngữ tân ngữ: He said that I was a liar).
          </li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định các thành phần được gạch chân (SC, OC, hay DO):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The coffee made <u>me</u> <u>energetic</u>.
            <br/>→ me: ______, energetic: ______</li>
            <li>My brother is <u>an engineer</u>.
            <br/>→ an engineer: ______</li>
            <li>We consider <u>the project</u> <u>a success</u>.
            <br/>→ the project: ______, a success: ______</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
