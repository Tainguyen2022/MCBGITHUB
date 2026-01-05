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

export default function CoreAdjectivePositionAttributive() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎨 <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ THUỘC TÍNH</span> — <i>Attributive Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Đây là vị trí phổ biến nhất của tính từ: đứng <b>ngay trước</b> danh từ mà nó bổ nghĩa để mô tả hoặc phân loại danh từ đó.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc cơ bản" formula="Adjective + Noun" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Với Từ hạn định" formula="Determiner + Adj + Noun" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule">Quy tắc Vị trí cơ bản</a></li>
            <li><a className="text-rose-700 hover:underline" href="#order">Trật tự nhiều Tính từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Chức năng" emoji="🎯">
        <p>
            Vị trí <b>thuộc tính (attributive position)</b> là vị trí của tính từ khi nó là một phần của cụm danh từ, đứng trước danh từ để cung cấp thêm thông tin về danh từ đó.
        </p>
         <ul className="list-disc pl-6">
            <li>Nó trả lời cho câu hỏi "What kind?" (Loại nào?).</li>
            <li>Ví dụ: a <b>red</b> car (What kind of car? A red one).</li>
        </ul>
      </Section>
      
      <Section id="rule" title="Quy tắc Vị trí cơ bản" emoji="📍">
        <p>
            Trong tiếng Anh, tính từ thuộc tính hầu như luôn đứng ngay trước danh từ mà nó bổ nghĩa.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">(Determiner) + Adjective + Noun</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li>a <b>smart</b> student</li>
            <li>an <b>expensive</b> watch</li>
            <li>my <b>new</b> shoes</li>
        </ul>
      </Section>
      
      <Section id="order" title="Trật tự nhiều Tính từ" emoji="🔢">
        <p>
            Khi nhiều tính từ cùng đứng ở vị trí thuộc tính, chúng phải tuân theo một trật tự cụ thể được gọi là <b>OSASCOMP</b>.
        </p>
        <p className="mt-2 text-sm text-gray-600">
            (Xem bài <b className="text-indigo-600">W_ADJ_ORD</b> để biết chi tiết).
        </p>
        <p className="mt-2"><i>e.g., a <b>beautiful long silk</b> dress. (Opinion → Size → Material)</i></p>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He drives a fast red sports car.</b> — Anh ấy lái một chiếc xe thể thao màu đỏ, tốc độ nhanh.</li>
          <li><b>We had a wonderful traditional meal.</b> — Chúng tôi đã có một bữa ăn truyền thống tuyệt vời.</li>
          <li><b>This is an important historical document.</b> — Đây là một tài liệu lịch sử quan trọng.</li>
          <li><b>She has beautiful blue eyes.</b> — Cô ấy có đôi mắt xanh xinh đẹp.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Đặt tính từ trong ngoặc vào đúng vị trí trong câu:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>(interesting) I read an ______ book last night.</li>
            <li>(old, beautiful) She lives in a ______ ______ house.</li>
            <li>(leather, black) He bought a new ______ ______ jacket.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}