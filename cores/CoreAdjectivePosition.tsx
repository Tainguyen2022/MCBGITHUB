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
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg',
        'transition-[transform,box-shadow] active:scale-95 ring-1 ring-white/20',
        'bg-gradient-to-r', colors,
        // Bố cục 2 dòng, label ở trên, formula ở dưới
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Chú giải (nhỏ hơn) */}
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      
      {/* Công thức (lớn hơn, kế thừa extrabold) */}
      <span className="truncate">{formula}</span>

      {/* toast nhỏ khi copy */}
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

export default function CoreAdjectivePosition() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📍 <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ TÍNH TỪ</span> — <i>Adjective Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tổng quan về các vị trí chính của tính từ trong câu: trước danh từ (thuộc tính), sau động từ nối (vị ngữ), và các trường hợp đặc biệt.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Thuộc tính (Attributive)" formula="a beautiful day" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Vị ngữ (Predicative)" formula="the day is beautiful" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Hậu bổ (Postpositive)" formula="something important" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#attributive">1. Vị trí Thuộc tính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#predicative">2. Vị trí Vị ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#postpositive">3. Vị trí Hậu bổ (Đặc biệt)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh các Vị trí</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="attributive" title="1. Vị trí Thuộc tính (Attributive Position)" emoji="➡️">
        <p>Đây là vị trí phổ biến nhất, khi tính từ đứng <b>ngay trước</b> danh từ mà nó bổ nghĩa.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>It is a <b>black</b> cat.</i></li>
            <li><i>I have a <b>big</b> and <b>friendly</b> dog.</i></li>
        </ul>
      </Section>

      <Section id="predicative" title="2. Vị trí Vị ngữ (Predicative Position)" emoji="⬅️">
        <p>Tính từ đứng <b>sau</b> một động từ nối (linking verb) và bổ nghĩa cho chủ ngữ của câu.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Động từ nối phổ biến:</b> be, seem, look, feel, taste, sound, become, get.</li>
            <li><i>The cat <b>is black</b>.</i></li>
            <li><i>The dog <b>seems friendly</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="postpositive" title="3. Vị trí Hậu bổ (Postpositive Position)" emoji="✨">
        <p>Đây là trường hợp đặc biệt khi tính từ đứng <b>ngay sau</b> danh từ hoặc đại từ mà nó bổ nghĩa.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Với các đại từ bất định:</b>
                <br/><i>e.g., I need to tell you something <b>important</b>. / Let's go somewhere <b>quiet</b>.</i>
            </li>
            <li><b>Khi tính từ có một cụm từ bổ nghĩa theo sau:</b>
                <br/><i>e.g., We found a solution <b>acceptable to everyone</b>.</i>
            </li>
            <li><b>Trong các cụm từ cố định (thường trang trọng):</b>
                <br/><i>e.g., the president <b>elect</b>, the attorney <b>general</b>, time <b>immemorial</b>.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="comparison" title="So sánh các Vị trí" emoji="⚖️">
         <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Vị trí</th>
                        <th className="border p-2 text-left">Mô tả</th>
                        <th className="border p-2 text-left">Ví dụ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2 font-semibold">Attributive (Thuộc tính)</td><td className="border p-2">Trước danh từ</td><td className="border p-2">a <b>happy</b> child</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-semibold">Predicative (Vị ngữ)</td><td className="border p-2">Sau động từ nối</td><td className="border p-2">The child is <b>happy</b>.</td></tr>
                     <tr><td className="border p-2 font-semibold">Postpositive (Hậu bổ)</td><td className="border p-2">Sau danh từ (đặc biệt)</td><td className="border p-2">something <b>new</b></td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định vị trí của tính từ in đậm (Attributive, Predicative, Postpositive):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She told me something <b>interesting</b>. → ____________</li>
            <li>The weather is <b>awful</b> today. → ____________</li>
            <li>It was a <b>long</b> and <b>tiring</b> day. → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}