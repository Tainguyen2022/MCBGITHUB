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

export default function CoreCorrelativeComparison() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📈 <span className="underline decoration-4 decoration-amber-400">SO SÁNH KÉP & TIẾN TRIỂN</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả sự thay đổi tỷ lệ thuận (càng... càng...) hoặc sự thay đổi liên tục (càng ngày càng...).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Càng... càng..." formula="The + comparative, the + comparative" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Càng ngày càng..." formula="comparative + and + comparative" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#the-the">"The... the..." (Càng... càng...)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#progressive">"more and more" (Càng ngày càng...)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc dấu câu</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="the-the" title="So sánh kép: The... the... (Càng... càng...)" emoji="🔗">
        <p>
          Cấu trúc này diễn tả mối quan hệ nguyên nhân - kết quả hoặc sự thay đổi song song, tỷ lệ thuận giữa hai sự việc.
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">The + comparative + S + V, the + comparative + S + V</p>
        </div>
         <ul className="list-disc pl-6 mt-2">
            <li><i><b>The harder</b> you work, <b>the more successful</b> you will become.</i></li>
            <li><i><b>The sooner</b> we leave, <b>the earlier</b> we will arrive.</i></li>
            <li><i><b>The more</b> money he makes, <b>the more</b> useless things he buys.</i></li>
        </ul>
      </Section>
      
      <Section id="progressive" title="So sánh tiến triển (Càng ngày càng...)" emoji="📈">
        <p>Cấu trúc này dùng để mô tả một sự việc đang thay đổi liên tục theo một chiều hướng (tăng hoặc giảm).</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức:</p>
            <p className="font-mono mt-2">S + V + comparative + and + comparative</p>
        </div>
         <ul className="list-disc pl-6 mt-2">
            <li><b>Tính từ ngắn:</b> <i>The weather is getting <b>colder and colder</b>.</i></li>
            <li><b>Tính từ dài:</b> <i>She is becoming <b>more and more beautiful</b>.</i></li>
             <li><b>Phủ định:</b> <i>The problem is becoming <b>less and less</b> important.</i></li>
        </ul>
      </Section>
      
      <Section id="punctuation" title="Quy tắc dấu câu" emoji="✍️">
        <p>
            Trong cấu trúc "The... the...", luôn có một <b>dấu phẩy (,)</b> để ngăn cách hai mệnh đề.
        </p>
        <p><i>The more you practice<b>,</b> the better you get.</i></p>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Quên <b>"the"</b> trong cấu trúc so sánh kép. (❌ <i className="line-through">Harder you work, more successful you become.</i>)</li>
          <li>Sai trật tự từ, không đưa dạng so sánh lên đầu mệnh đề. (❌ <i className="line-through">The you work harder...</i>)</li>
          <li>Dùng sai dạng so sánh hơn (ví dụ: "more good" thay vì "better").</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The older I get, the happier I am.</b> — Tôi càng lớn tuổi, tôi càng hạnh phúc.</li>
          <li><b>The more you read, the more you know.</b> — Bạn càng đọc nhiều, bạn càng biết nhiều.</li>
          <li><b>It's getting darker and darker.</b> — Trời đang càng ngày càng tối.</li>
          <li><b>As technology advances, smartphones are becoming more and more powerful.</b> — Khi công nghệ tiến bộ, điện thoại thông minh đang trở nên ngày càng mạnh mẽ.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Nối các ý sau thành câu so sánh kép:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>If you study a lot, you will learn a lot.
            <br/>→ The more ____________________________________________</li>
            <li>When it is hot, I feel lazy.
            <br/>→ The hotter ____________________________________________</li>
            <li>His English is improving. It's getting (good).
            <br/>→ His English is getting ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}