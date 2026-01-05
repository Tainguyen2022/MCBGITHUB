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

export default function CoreComparative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚖️ <span className="underline decoration-4 decoration-amber-400">SO SÁNH HƠN</span> — <i>Comparative</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để so sánh sự khác biệt về một tính chất nào đó giữa hai người, hai vật, hoặc hai sự việc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Tính từ ngắn" formula="Adj-er + than" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Tính từ dài" formula="more + Adj + than" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="Bất quy tắc" formula="better/worse... + than" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#short-adj">Quy tắc với Tính từ ngắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#long-adj">Quy tắc với Tính từ dài</a></li>
            <li><a className="text-rose-700 hover:underline" href="#irregular">Các trường hợp Bất quy tắc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adverbs">So sánh với Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            So sánh hơn được sử dụng để chỉ ra rằng một đối tượng có một đặc tính ở mức độ cao hơn (hoặc thấp hơn) so với đối tượng kia.
        </p>
        <ul className="list-disc pl-6">
          <li><i>He is <b>taller than</b> his brother.</i></li>
          <li><i>This car is <b>more expensive than</b> that one.</i></li>
        </ul>
      </Section>

      <Section id="short-adj" title="Quy tắc với Tính từ ngắn" emoji="📏">
        <p>Tính từ ngắn thường là tính từ có một âm tiết hoặc hai âm tiết kết thúc bằng -y, -le, -ow, -er, -et.</p>
        <ul className="list-disc pl-6">
            <li><b>Thêm -er:</b> tall → tall<b>er</b>; fast → fast<b>er</b>.</li>
            <li><b>Tận cùng là -e, chỉ thêm -r:</b> large → large<b>r</b>; simple → simple<b>r</b>.</li>
            <li><b>Phụ âm + y → -ier:</b> happy → happ<b>ier</b>; busy → bus<b>ier</b>.</li>
            <li><b>CVC (nguyên âm kẹp giữa 2 phụ âm):</b> Gấp đôi phụ âm cuối rồi thêm -er. big → bigg<b>er</b>; hot → hott<b>er</b>.</li>
        </ul>
      </Section>
      
      <Section id="long-adj" title="Quy tắc với Tính từ dài" emoji="📐">
        <p>Tính từ dài là các tính từ có hai âm tiết trở lên (không thuộc nhóm tính từ ngắn ở trên).</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">more / less + Tính từ dài + than</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She is <b>more intelligent than</b> her classmates.</i></li>
            <li><i>This book is <b>less interesting than</b> the movie.</i></li>
        </ul>
      </Section>
      
       <Section id="irregular" title="Các trường hợp Bất quy tắc" emoji="✨">
        <p>Một số tính từ và trạng từ có dạng so sánh hơn đặc biệt, không theo quy tắc nào.</p>
        <ul className="list-disc pl-6">
            <li>good → <b>better</b></li>
            <li>bad → <b>worse</b></li>
            <li>far → <b>farther</b> (khoảng cách vật lý) / <b>further</b> (khoảng cách, mức độ)</li>
            <li>little → <b>less</b></li>
            <li>many/much → <b>more</b></li>
        </ul>
      </Section>
      
      <Section id="adverbs" title="So sánh với Trạng từ" emoji="🏃">
        <p>Quy tắc so sánh hơn với trạng từ tương tự như tính từ.</p>
         <ul className="list-disc pl-6">
            <li><b>Trạng từ ngắn (thường giống tính từ):</b> fast → fast<b>er</b>; hard → hard<b>er</b>.</li>
            <li><b>Trạng từ dài (thường kết thúc bằng -ly):</b> Dùng <b>more/less</b>.
                <br/><i>e.g., He drives <b>more carefully than</b> his friend.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng cả "more" và đuôi "-er" cho tính từ ngắn. (❌ <i className="line-through">more taller</i>)</li>
          <li>Quên "than" khi so sánh.</li>
          <li>Chia sai dạng bất quy tắc. (❌ <i className="line-through">gooder</i> hoặc <i className="line-through">badder</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Your car is faster than mine.</b> — Xe của bạn nhanh hơn xe của tôi.</li>
          <li><b>This lesson is more difficult than the last one.</b> — Bài học này khó hơn bài học trước.</li>
          <li><b>The weather today is worse than it was yesterday.</b> — Thời tiết hôm nay tệ hơn hôm qua.</li>
          <li><b>She speaks English more fluently than I do.</b> — Cô ấy nói tiếng Anh trôi chảy hơn tôi.</li>
          <li><b>Living in the city is more expensive than living in the countryside.</b> — Sống ở thành phố đắt đỏ hơn sống ở nông thôn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dạng so sánh hơn đúng của từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>My house is (big) ______ than yours.</li>
            <li>This book is (interesting) ______ than the film.</li>
            <li>His performance in the test was (bad) ______ than mine.</li>
            <li>She is (happy) ______ now than she was last year.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}