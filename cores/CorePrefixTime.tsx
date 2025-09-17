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

export default function CorePrefixTime() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🕒 <span className="underline decoration-4 decoration-amber-400">TIỀN TỐ CHỈ THỜI GIAN & THỨ TỰ</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Là các tiền tố được thêm vào đầu từ để chỉ mối quan hệ về thời gian (trước, sau) hoặc thứ tự (lặp lại).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Trước" formula="pre + war → pre-war" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Sau" formula="post + war → post-war" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Làm lại" formula="re + build → rebuild" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Trước (dự đoán)" formula="fore + see → foresee" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#before">Tiền tố chỉ "Trước" (before)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#after">Tiền tố chỉ "Sau" (after)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#again">Tiền tố chỉ "Lại" (again)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            Các tiền tố này giúp làm rõ trình tự thời gian hoặc mối quan hệ thứ tự của một hành động hoặc khái niệm so với từ gốc. Chúng rất hữu ích trong việc mở rộng vốn từ vựng một cách hệ thống.
        </p>
      </Section>

      <Section id="before" title="Tiền tố chỉ 'Trước' (before)" emoji="⏮️">
        <ul className="list-disc pl-6 space-y-2">
            <li><b>pre-:</b> Là tiền tố phổ biến nhất, có nghĩa là "trước".
                <br/><i>e.g., <b>pre</b>view (xem trước), <b>pre</b>historic (tiền sử), <b>pre</b>-war (trước chiến tranh).</i>
            </li>
            <li><b>ante-:</b> Trang trọng hơn, cũng có nghĩa là "trước".
                 <br/><i>e.g., <b>ante</b>cedent (tiền lệ), <b>ante</b>room (phòng chờ).</i>
            </li>
            <li><b>fore-:</b> Có nghĩa là "phía trước" hoặc "trước đó".
                 <br/><i>e.g., <b>fore</b>see (thấy trước), <b>fore</b>cast (dự báo), <b>fore</b>head (trán).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="after" title="Tiền tố chỉ 'Sau' (after)" emoji="⏭️">
        <ul className="list-disc pl-6 space-y-1">
            <li><b>post-:</b> Là tiền tố phổ biến nhất, có nghĩa là "sau".
                <br/><i>e.g., <b>post</b>-war (sau chiến tranh), <b>post</b>graduate (sau đại học), <b>post</b>pone (trì hoãn).</i>
            </li>
             <li><b>ex-:</b> Có nghĩa là "cũ", "trước đây".
                <br/><i>e.g., <b>ex-</b>president (cựu tổng thống), <b>ex-</b>wife (vợ cũ).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="again" title="Tiền tố chỉ 'Lại' (again)" emoji="🔁">
         <ul className="list-disc pl-6 space-y-1">
            <li><b>re-:</b> Rất phổ biến, có nghĩa là "làm lại" hoặc "quay lại".
                <br/><i>e.g., <b>re</b>build (xây lại), <b>re</b>read (đọc lại), <b>re</b>turn (quay trở lại), <b>re</b>use (tái sử dụng).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>It's important to preview the chapter before class.</b> — Việc xem trước chương học trước buổi học là rất quan trọng.</li>
          <li><b>The post-war generation faced many challenges.</b> — Thế hệ sau chiến tranh đã đối mặt với nhiều thử thách.</li>
          <li><b>The company decided to restructure its management team.</b> — Công ty đã quyết định tái cấu trúc đội ngũ quản lý.</li>
          <li><b>No one could foresee the consequences of their actions.</b> — Không ai có thể thấy trước được hậu quả của hành động của họ.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Ghép tiền tố với từ gốc để tạo từ có nghĩa phù hợp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Làm nóng lò trước khi nướng: ______ + heat → ____________</li>
            <li>Viết lại một bài luận: ______ + write → ____________</li>
            <li>Một cuộc kiểm tra sau khi học xong: ______ + test → ____________</li>
            <li>Người chồng cũ của cô ấy: her ______ + husband → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
