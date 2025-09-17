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

export default function CoreRelativePronounsOmission() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✂️ <span className="underline decoration-4 decoration-amber-400">ĐẠI TỪ QUAN HỆ & LƯỢC BỎ</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Học cách chọn đúng đại từ quan hệ (who, whom, which, that, whose) và quy tắc vàng để lược bỏ chúng, giúp câu văn tự nhiên hơn.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Chủ ngữ (Không lược bỏ)" formula="the man who lives..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Tân ngữ (Lược bỏ được)" formula="the man (who) I met" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Sở hữu" formula="the man whose car..." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#pronouns">Tổng quan về Đại từ Quan hệ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#omission">Quy tắc Vàng: Lược bỏ Đại từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#whose">'Whose' cho Sở hữu</a></li>
            <li><a className="text-rose-700 hover:underline" href="#prepositions">Giới từ trong MĐQH</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="pronouns" title="Tổng quan về Đại từ Quan hệ" emoji="👥">
        <p>
            Đại từ quan hệ được chọn dựa trên danh từ mà nó thay thế (người hay vật) và vai trò của nó trong mệnh đề (chủ ngữ hay tân ngữ).
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>who:</b> Thay thế cho chủ ngữ chỉ <b>người</b>.
                <br/><i>e.g., The artist <b>who</b> painted this is famous.</i>
            </li>
            <li><b>whom:</b> Thay thế cho tân ngữ chỉ <b>người</b> (trang trọng).
                 <br/><i>e.g., The man <b>whom</b> she married is a doctor.</i>
            </li>
            <li><b>which:</b> Thay thế cho chủ ngữ hoặc tân ngữ chỉ <b>vật</b>.
                 <br/><i>e.g., The phone <b>which</b> is on the table is new.</i>
            </li>
             <li><b>that:</b> Thay thế cho cả người và vật (thân mật hơn), chỉ dùng trong MĐQH <b>xác định</b>.
                 <br/><i>e.g., The artist <b>that</b> painted this... / The phone <b>that</b> is on the table...</i>
            </li>
        </ul>
      </Section>
      
      <Section id="omission" title="Quy tắc Vàng: Lược bỏ Đại từ" emoji="✂️">
        <p>
            Bạn <b>có thể</b> lược bỏ đại từ quan hệ (who, whom, which, that) khi nó đóng vai trò là <b>TÂN NGỮ (OBJECT)</b> trong mệnh đề quan hệ xác định.
        </p>
         <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">KHÔNG lược bỏ (Subject)</p>
                <p>Khi đại từ quan hệ được theo sau bởi một <b>động từ (verb)</b>.</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><i>The man <b>who <u>lives</u></b> next door is friendly.</i></li>
                    <li><i>I like the song <b>which <u>was</u></b> played on the radio.</i></li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">CÓ THỂ lược bỏ (Object)</p>
                <p>Khi đại từ quan hệ được theo sau bởi một <b>chủ ngữ khác (noun/pronoun)</b>.</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><i>The man <b>(who) <u>I</u></b> met was very kind.</i></li>
                     <li><i>This is the song <b>(which) <u>we</u></b> both like.</i></li>
                </ul>
            </div>
        </div>
      </Section>
      
      <Section id="whose" title="'Whose' cho Sở hữu" emoji="🤝">
        <p>
            <b>Whose</b> được dùng để chỉ sự sở hữu cho cả người và vật. Nó không bao giờ được lược bỏ.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: Noun + whose + Noun + V...</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>That's the student <b>whose phone</b> rang in the class.</i> (chiếc điện thoại của học sinh đó)</li>
            <li><i>I bought a book <b>whose cover</b> was beautifully designed.</i> (cái bìa của cuốn sách đó)</li>
        </ul>
      </Section>
      
      <Section id="prepositions" title="Giới từ trong MĐQH" emoji="📍">
        <p>
            Khi đại từ quan hệ là tân ngữ của một giới từ, có hai cách đặt giới từ:
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li><b>Trang trọng:</b> Giới từ + whom/which.
                <br/><i>e.g., The person <b>to whom</b> I spoke was very helpful.</i>
            </li>
            <li><b>Thân mật (phổ biến hơn):</b> Giới từ ở cuối mệnh đề. Đại từ có thể được lược bỏ.
                 <br/><i>e.g., The person (who) I spoke <b>to</b> was very helpful.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Lược bỏ đại từ quan hệ khi nó là chủ ngữ.</li>
          <li>Lặp lại tân ngữ. (❌ <i className="line-through">This is the cake which I made it.</i>)</li>
          <li>Dùng 'whom' cho chủ ngữ. (❌ <i className="line-through">The man whom lives there...</i>)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền đại từ quan hệ phù hợp. Ghi (∅) nếu có thể lược bỏ.</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The computer ______ I bought last week is already broken.</li>
            <li>The woman ______ is talking to the teacher is my mother.</li>
            <li>He is the artist ______ paintings are world-famous.</li>
            <li>I can't find the key ______ opens this door.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}