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

export default function CoreSuperlative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🏆 <span className="underline decoration-4 decoration-amber-400">SO SÁNH NHẤT</span> — <i>Superlative</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để so sánh một người/vật/sự việc với tất cả những đối tượng còn lại trong một nhóm (từ 3 đối tượng trở lên).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Tính từ ngắn" formula="the + Adj-est" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Tính từ dài" formula="the most + Adj" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="Bất quy tắc" formula="the best/worst..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#short-adj">Quy tắc với Tính từ ngắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#long-adj">Quy tắc với Tính từ dài</a></li>
            <li><a className="text-rose-700 hover:underline" href="#irregular">Các trường hợp Bất quy tắc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#prepositions">Giới từ đi kèm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            So sánh nhất được sử dụng để xác định một đối tượng có đặc tính ở mức độ cao nhất (hoặc thấp nhất) trong một nhóm hoặc một phạm vi so sánh.
        </p>
        <ul className="list-disc pl-6">
          <li><i>He is <b>the tallest</b> student in the class.</i></li>
          <li><i>This is <b>the most expensive</b> car I have ever seen.</i></li>
        </ul>
      </Section>

      <Section id="short-adj" title="Quy tắc với Tính từ ngắn" emoji="📏">
        <p>Tính từ ngắn thường là tính từ có một âm tiết hoặc hai âm tiết kết thúc bằng -y, -le, -ow, -er, -et.</p>
        <ul className="list-disc pl-6">
            <li><b>Thêm -est:</b> tall → the tall<b>est</b>; fast → the fast<b>est</b>.</li>
            <li><b>Tận cùng là -e, chỉ thêm -st:</b> large → the large<b>st</b>; simple → the simple<b>st</b>.</li>
            <li><b>Phụ âm + y → -iest:</b> happy → the happ<b>iest</b>; busy → the bus<b>iest</b>.</li>
            <li><b>CVC (nguyên âm kẹp giữa 2 phụ âm):</b> Gấp đôi phụ âm cuối rồi thêm -est. big → the bigg<b>est</b>; hot → the hott<b>est</b>.</li>
        </ul>
      </Section>
      
      <Section id="long-adj" title="Quy tắc với Tính từ dài" emoji="📐">
        <p>Tính từ dài là các tính từ có hai âm tiết trở lên (không thuộc nhóm tính từ ngắn ở trên).</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">the most / the least + Tính từ dài</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She is <b>the most intelligent</b> student in our school.</i></li>
            <li><i>This is <b>the least expensive</b> option.</i></li>
        </ul>
      </Section>
      
       <Section id="irregular" title="Các trường hợp Bất quy tắc" emoji="✨">
        <p>Một số tính từ và trạng từ có dạng so sánh nhất đặc biệt.</p>
        <ul className="list-disc pl-6">
            <li>good → <b>the best</b></li>
            <li>bad → <b>the worst</b></li>
            <li>far → <b>the farthest</b> / <b>the furthest</b></li>
            <li>little → <b>the least</b></li>
            <li>many/much → <b>the most</b></li>
        </ul>
      </Section>
      
      <Section id="prepositions" title="Giới từ đi kèm" emoji="📍">
        <p>Phạm vi so sánh thường được giới thiệu bằng các giới từ:</p>
         <ul className="list-disc pl-6">
            <li><b>in:</b> Dùng với nơi chốn hoặc một nhóm người.
                <br/><i>e.g., Mount Everest is the highest mountain <b>in the world</b>.</i>
            </li>
            <li><b>of:</b> Dùng khi so sánh với một khoảng thời gian hoặc một tập hợp cụ thể.
                <br/><i>e.g., It was the happiest day <b>of my life</b>.</i>
            </li>
            <li><b>Mệnh đề quan hệ:</b> Dùng để mô tả kinh nghiệm.
                 <br/><i>e.g., This is the best movie <b>that I have ever seen</b>.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Quên mạo từ <b>"the"</b> trước dạng so sánh nhất. (❌ <i className="line-through">He is tallest boy.</i>)</li>
          <li>Dùng cả "most" và đuôi "-est". (❌ <i className="line-through">the most tallest</i>)</li>
          <li>Chia sai dạng bất quy tắc. (❌ <i className="line-through">the goodest</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Who is the fastest runner in the team?</b> — Ai là người chạy nhanh nhất trong đội?</li>
          <li><b>This is the most beautiful painting in the gallery.</b> — Đây là bức tranh đẹp nhất trong phòng trưng bày.</li>
          <li><b>What is the worst movie you have ever watched?</b> — Bộ phim tệ nhất mà bạn từng xem là gì?</li>
          <li><b>He is by far the most qualified candidate for the job.</b> — Anh ấy là ứng cử viên đủ điều kiện nhất cho công việc này.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dạng so sánh nhất đúng của từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>This is (expensive) ______ watch in the store.</li>
            <li>He is (good) ______ football player on the team.</li>
            <li>What is (long) ______ river in the world?</li>
            <li>It was one of (happy) ______ days of her life.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}