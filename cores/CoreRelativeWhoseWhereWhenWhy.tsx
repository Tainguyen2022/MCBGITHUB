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

export default function CoreRelativeWhoseWhereWhenWhy() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🗺️ <span className="underline decoration-4 decoration-amber-400">MĐQH: WHOSE, WHERE, WHEN, WHY</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Sử dụng các đại từ và trạng từ quan hệ này để cung cấp thông tin về sự sở hữu, nơi chốn, thời gian, và lý do.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Sở hữu" formula="...whose car..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Nơi chốn" formula="...the place where..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Thời gian" formula="...the day when..." colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Lý do" formula="...the reason why..." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#whose">'Whose' cho Sở hữu</a></li>
            <li><a className="text-rose-700 hover:underline" href="#where">'Where' cho Nơi chốn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#when">'When' cho Thời gian</a></li>
            <li><a className="text-rose-700 hover:underline" href="#why">'Why' cho Lý do</a></li>
            <li><a className="text-rose-700 hover:underline" href="#formal">Cấu trúc Trang trọng (Giới từ + which)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="whose" title="'Whose' cho Sở hữu" emoji="🤝">
        <p>
            <b>Whose</b> được dùng để chỉ sự sở hữu cho cả người và vật. Nó thay thế cho các tính từ sở hữu như his, her, its, their.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: Noun + whose + Noun + V...</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I know a man <b>whose brother</b> is a famous actor.</i> (Anh trai của người đàn ông đó)</li>
            <li><i>They live in a house <b>whose roof</b> is painted red.</i> (Mái nhà của ngôi nhà đó)</li>
        </ul>
      </Section>
      
      <Section id="where" title="'Where' cho Nơi chốn" emoji="📍">
        <p>
            <b>Where</b> được dùng để thay thế cho một danh từ chỉ nơi chốn. Nó tương đương với <b>in which, at which, on which</b>.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>This is the house <b>where</b> I grew up.</i> (= ...the house <b>in which</b> I grew up.)</li>
            <li><i>The city <b>where</b> they met is beautiful.</i> (= ...the city <b>in which</b> they met.)</li>
        </ul>
      </Section>
      
      <Section id="when" title="'When' cho Thời gian" emoji="⏰">
        <p>
            <b>When</b> được dùng để thay thế cho một danh từ chỉ thời gian. Nó tương đương với <b>in which, on which</b>.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I'll never forget the day <b>when</b> we first met.</i> (= ...the day <b>on which</b> we first met.)</li>
            <li><i>Summer is the season <b>when</b> everyone feels relaxed.</i> (= ...the season <b>in which</b> everyone feels relaxed.)</li>
        </ul>
      </Section>
      
      <Section id="why" title="'Why' cho Lý do" emoji="❓">
        <p>
            <b>Why</b> được dùng sau danh từ "the reason" để chỉ lý do. Nó có thể được thay thế bằng "that" hoặc thường được lược bỏ trong văn nói thân mật.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>Do you know the reason <b>why</b> the flight was cancelled?</i></li>
            <li><i>That's the reason <b>(that)</b> I can't come to the party.</i></li>
        </ul>
      </Section>

      <Section id="formal" title="Cấu trúc Trang trọng (Giới từ + which)" emoji="👔">
        <p>
           Trong văn viết trang trọng, người ta thường dùng <b>giới từ + which</b> thay vì <b>where</b> hoặc <b>when</b>.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Where:</b> <i>The hotel <b>where</b> we stayed was excellent.</i> → <i>The hotel <b>at which</b> we stayed was excellent.</i></li>
            <li><b>When:</b> <i>1999 was the year <b>when</b> he was born.</i> → <i>1999 was the year <b>in which</b> he was born.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Nhầm lẫn <b>whose</b> (của ai) và <b>who's</b> (who is / who has).</li>
          <li>Dùng 'which' cho nơi chốn mà không có giới từ. (❌ <i className="line-through">the village which I live</i> → ✅ the village <b>where</b> I live / the village <b>in which</b> I live)</li>
          <li>Lặp lại giới từ. (❌ <i className="line-through">the city where I live in it</i>)</li>
        </ol>
      </Section>
      
      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền đại từ hoặc trạng từ quan hệ phù hợp (whose, where, when, why):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>That's the restaurant ______ we had dinner last night.</li>
            <li>I met a girl ______ father is a famous scientist.</li>
            <li>Do you remember the time ______ we got lost in the city?</li>
            <li>Please tell me the reason ______ you were so late.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}