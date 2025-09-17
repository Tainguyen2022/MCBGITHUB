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

export default function CoreAdverbComparison() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🚀 <span className="underline decoration-4 decoration-amber-400">SO SÁNH TRẠNG TỪ</span> — <i>Comparison of Adverbs</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để so sánh mức độ hoặc cách thức thực hiện một hành động giữa hai hoặc nhiều đối tượng.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Trạng từ ngắn" formula="adv-er + than" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Trạng từ dài" formula="more + adv + than" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="So sánh nhất" formula="the + adv-est / the most + adv" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Bất quy tắc" formula="better/worse..." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#rules">Quy tắc chung</a></li>
            <li><a className="text-rose-700 hover:underline" href="#short">Trạng từ Ngắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#long">Trạng từ Dài (-ly)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#irregular">Trạng từ Bất quy tắc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#equality">So sánh bằng (as...as)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="rules" title="Quy tắc chung" emoji="📜">
        <p>
            Giống như tính từ, trạng từ cũng có thể được dùng trong so sánh hơn và so sánh nhất. Quy tắc hình thành cũng tương tự, dựa trên số âm tiết và cấu trúc của trạng từ.
        </p>
      </Section>

      <Section id="short" title="Trạng từ Ngắn" emoji="📏">
        <p>
            Trạng từ ngắn (thường có một âm tiết và có hình thức giống tính từ) tạo dạng so sánh hơn bằng cách thêm <b>-er</b> và so sánh nhất bằng cách thêm <b>the ...-est</b>.
        </p>
        <ul className="list-disc pl-6">
            <li><b>fast → faster → the fastest</b></li>
            <li><b>hard → harder → the hardest</b></li>
            <li><b>late → later → the latest</b></li>
            <li><b>early → earlier → the earliest</b></li>
        </ul>
        <p className="mt-2"><i>e.g., He runs <b>faster than</b> me. / She works <b>the hardest</b> of all.</i></p>
      </Section>

      <Section id="long" title="Trạng từ Dài (kết thúc bằng -ly)" emoji="📐">
        <p>
            Hầu hết các trạng từ được tạo thành bằng cách thêm <b>-ly</b> vào sau tính từ. Chúng ta dùng <b>more/less</b> cho so sánh hơn và <b>the most/the least</b> cho so sánh nhất.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">more/less + Adverb + than</p>
            <p className="font-mono mt-2">the most/the least + Adverb</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>slowly → <b>more slowly</b> → <b>the most slowly</b></li>
            <li>carefully → <b>more carefully</b> → <b>the most carefully</b></li>
        </ul>
         <p className="mt-2"><i>e.g., Please speak <b>more slowly</b>. / He drives <b>the most carefully</b> in his family.</i></p>
      </Section>
      
      <Section id="irregular" title="Trạng từ Bất quy tắc" emoji="✨">
        <p>
            Một số trạng từ có dạng so sánh hoàn toàn bất quy tắc.
        </p>
        <ul className="list-disc pl-6">
            <li><b>well → better → the best</b></li>
            <li><b>badly → worse → the worst</b></li>
            <li><b>far → farther/further → the farthest/the furthest</b></li>
            <li><b>little → less → the least</b></li>
            <li><b>much → more → the most</b></li>
        </ul>
         <p className="mt-2"><i>e.g., She performed <b>better than</b> last time. / He was hurt <b>the worst</b> in the accident.</i></p>
      </Section>
      
      <Section id="equality" title="So sánh bằng (as...as)" emoji="=">
        <p>
            Để diễn tả hai hành động được thực hiện ở mức độ ngang nhau, ta dùng cấu trúc <b>as + adverb + as</b>.
        </p>
        <p><i>e.g., He can run <b>as fast as</b> his brother.</i></p>
        <p><i>e.g., She doesn't speak English <b>as fluently as</b> she writes it.</i></p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Thêm đuôi "-er" vào trạng từ dài. (❌ <i className="line-through">He speaks slowlier than me.</i>)</li>
          <li>Nhầm lẫn giữa so sánh của tính từ "good" (better) và trạng từ "well" (better). Mặc dù dạng so sánh giống nhau, cách dùng trong câu khác nhau.
            <br/><i>e.g., He is a <b>better</b> player. (tính từ) vs. He plays <b>better</b>. (trạng từ)</i>
          </li>
          <li>Nhầm lẫn giữa "hard" (chăm chỉ) và "hardly" (hầu như không).
            <br/><i>e.g., He works <b>harder</b>. (chăm chỉ hơn) vs. He <b>hardly</b> works. (hầu như không làm việc)</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Can you please talk more quietly? The baby is sleeping.</b> — Bạn có thể nói nhỏ hơn được không? Em bé đang ngủ.</li>
          <li><b>Of all the students, Maria answered the questions the most intelligently.</b> — Trong tất cả các học sinh, Maria đã trả lời các câu hỏi một cách thông minh nhất.</li>
          <li><b>He drives farther than anyone I know.</b> — Anh ấy lái xe xa hơn bất kỳ ai tôi biết.</li>
          <li><b>She dances better than she sings.</b> — Cô ấy nhảy đẹp hơn là hát.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dạng so sánh đúng của trạng từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>You need to work (hard) ______ if you want a promotion.</li>
            <li>She explained the situation (clearly) ______ than anyone else.</li>
            <li>He did (badly) ______ on the test than he had expected.</li>
            <li>Who can run (fast) ______ in your class? (so sánh nhất)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}