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

export default function CoreNounObject() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📦 <span className="underline decoration-4 decoration-amber-400">TÂN NGỮ</span> — <i>Objects</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu vai trò của tân ngữ (trực tiếp, gián tiếp, và của giới từ) trong việc tiếp nhận hành động hoặc hoàn thành ý nghĩa của động từ và giới từ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Tân ngữ Trực tiếp (DO)" formula="S + V + DO" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Tân ngữ Gián tiếp (IO)" formula="S + V + IO + DO" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Tân ngữ của Giới từ (OP)" formula="...Prep + OP" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#do">1. Tân ngữ Trực tiếp (Direct Object)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#io">2. Tân ngữ Gián tiếp (Indirect Object)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#op">3. Tân ngữ của Giới từ (Object of Preposition)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="do" title="1. Tân ngữ Trực tiếp (Direct Object)" emoji="➡️">
        <p>
            <b>Tân ngữ trực tiếp (DO)</b> là danh từ hoặc đại từ trực tiếp nhận hành động của một ngoại động từ. Nó trả lời cho câu hỏi <b>"Cái gì?"</b> hoặc <b>"Ai?"</b> sau động từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She bought <b>a new car</b>.</i> (Bought what? → a new car)</li>
            <li><i>The teacher praised <b>the students</b>.</i> (Praised whom? → the students)</li>
        </ul>
      </Section>
      
      <Section id="io" title="2. Tân ngữ Gián tiếp (Indirect Object)" emoji="📥">
        <p>
            <b>Tân ngữ gián tiếp (IO)</b> cho biết ai hoặc cái gì nhận được tân ngữ trực tiếp. Nó trả lời cho câu hỏi <b>"Cho ai/cái gì?"</b> hoặc <b>"Vì ai/cái gì?"</b>.
        </p>
        <p>Tân ngữ gián tiếp thường đứng giữa động từ và tân ngữ trực tiếp.</p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Cấu trúc: S + V + IO + DO</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He gave <b>me</b> a book.</i> (Gave a book to whom? → to me)</li>
            <li><i>My mother made <b>us</b> a cake.</i> (Made a cake for whom? → for us)</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            <b>Lưu ý:</b> Cấu trúc này có thể được viết lại bằng cách dùng giới từ "to" hoặc "for". Khi đó, tân ngữ gián tiếp sẽ trở thành tân ngữ của giới từ.<br/>
            <i>He gave a book <b>to me</b>. / My mother made a cake <b>for us</b>.</i>
        </p>
      </Section>

      <Section id="op" title="3. Tân ngữ của Giới từ (Object of a Preposition)" emoji="🔗">
        <p>
            <b>Tân ngữ của giới từ (OP)</b> là danh từ hoặc đại từ theo sau một giới từ. Toàn bộ cụm giới từ (giới từ + tân ngữ) hoạt động như một tính từ hoặc trạng từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The cat is sleeping on <b>the sofa</b>.</i></li>
            <li><i>She was talking to <b>him</b>.</i></li>
            <li><i>I'm not interested in <b>politics</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng sai dạng đại từ làm tân ngữ (subject vs. object pronouns). (❌ <i className="line-through">She gave the book to I.</i> → ✅ ...to <b>me</b>.)</li>
          <li>Nhầm lẫn giữa tân ngữ gián tiếp và tân ngữ của giới từ.</li>
          <li>Đặt tân ngữ trực tiếp trước tân ngữ gián tiếp khi không có giới từ. (❌ <i className="line-through">He gave a book me.</i>)</li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định các tân ngữ trong câu sau (DO, IO, hoặc OP):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The company offered <b>her</b> <b>a new job</b>.
            <br/>→ her: ______, a new job: ______</li>
            <li>I put <b>the keys</b> on <b>the table</b>.
            <br/>→ the keys: ______, the table: ______</li>
            <li>She sent <b>her parents</b> <b>an email</b> from <b>Paris</b>.
            <br/>→ her parents: ______, an email: ______, Paris: ______</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}