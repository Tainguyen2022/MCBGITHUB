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

export default function CoreAdjectivePositionPostpositive() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✨ <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ HẬU BỔ</span> — <i>Postpositive Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Đây là trường hợp đặc biệt khi tính từ đứng <b>ngay sau</b> danh từ hoặc đại từ mà nó bổ nghĩa, thường xảy ra với đại từ bất định hoặc khi tính từ có bổ ngữ đi kèm.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Đại từ Bất định" formula="something important" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Cụm từ Cố định" formula="attorney general" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Có Bổ ngữ" formula="a solution acceptable to all" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#indefinite">1. Với Đại từ Bất định</a></li>
            <li><a className="text-rose-700 hover:underline" href="#complements">2. Khi Tính từ có Bổ ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#fixed">3. Cụm từ Cố định & Trang trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh các Vị trí</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Chức năng" emoji="🎯">
        <p>
            Vị trí <b>hậu bổ (postpositive)</b> là khi tính từ được đặt ngay sau danh từ hoặc đại từ mà nó bổ nghĩa. Đây là một trường hợp không phổ biến bằng vị trí thuộc tính (trước danh từ) nhưng rất quan trọng trong một số ngữ cảnh nhất định.
        </p>
      </Section>
      
      <Section id="indefinite" title="1. Với Đại từ Bất định (Indefinite Pronouns)" emoji="👤">
        <p>
            Đây là trường hợp phổ biến nhất của vị trí hậu bổ. Tính từ luôn đứng sau các đại từ như <b>something, anything, nothing, everything, someone, anyone, no one, everyone, somewhere, anywhere</b>.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I want to try <b>something new</b>.</i></li>
            <li><i>Is there <b>anyone available</b> to help?</i></li>
            <li><i>Let's go <b>somewhere quiet</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="complements" title="2. Khi Tính từ có Bổ ngữ (Adjective with Complements)" emoji="🧩">
        <p>
            Khi một tính từ được bổ nghĩa bởi một cụm từ (thường là cụm giới từ hoặc to-infinitive), cả cụm tính từ đó (tính từ + bổ ngữ) phải đứng sau danh từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>We are looking for <b>a person responsible for this department</b>.</i></li>
            <li><i>It was <b>a decision difficult to make</b>.</i></li>
            <li><i>This is <b>a movie suitable for all ages</b>.</i></li>
        </ul>
      </Section>

      <Section id="fixed" title="3. Cụm từ Cố định & Trang trọng (Fixed & Formal Phrases)" emoji="📜">
        <p>
            Một số cụm từ cố định, thường có nguồn gốc từ tiếng Pháp hoặc trong lĩnh vực pháp lý, giữ lại trật tự danh từ + tính từ.
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><b>Chức danh:</b> <i>attorney <b>general</b>, president <b>elect</b>, heir <b>apparent</b>.</i></li>
            <li><b>Cụm từ pháp lý/trang trọng:</b> <i>time <b>immemorial</b>, court-<b>martial</b>.</i></li>
            <li><b>Một số tính từ cụ thể:</b> 'involved', 'concerned', 'present' có thể đứng sau danh từ để mang ý nghĩa khác.
                <br/><i>- All <b>the people involved</b> were questioned.</i> (Những người có liên quan)
                <br/>- <i>The list of <b>members present</b> is on the table.</i> (Các thành viên có mặt)
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
                    <tr><td className="border p-2 font-semibold">Attributive (Thuộc tính)</td><td className="border p-2">Trước danh từ</td><td className="border p-2">a <b>responsible</b> person</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-semibold">Predicative (Vị ngữ)</td><td className="border p-2">Sau động từ nối</td><td className="border p-2">The person is <b>responsible</b>.</td></tr>
                     <tr><td className="border p-2 font-semibold">Postpositive (Hậu bổ)</td><td className="border p-2">Sau danh từ (đặc biệt)</td><td className="border p-2">a person <b>responsible for the team</b></td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại câu, sử dụng vị trí hậu bổ cho tính từ:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I need an available room.
            <br/>→ I need a room ______________.</li>
            <li>I met an interesting person.
            <br/>→ I met someone ______________.</li>
            <li>This is a difficult problem to solve.
            <br/>→ This is a problem _________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}