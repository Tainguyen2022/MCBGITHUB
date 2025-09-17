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

export default function CoreSuffixNoun() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🏷️ <span className="underline decoration-4 decoration-amber-400">HẬU TỐ DANH TỪ</span> — <i>Noun Suffixes</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là các đuôi từ được thêm vào cuối động từ hoặc tính từ để tạo thành danh từ, giúp mở rộng vốn từ vựng một cách hiệu quả.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Verb → Noun" formula="develop + ment → development" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Adjective → Noun" formula="happy + ness → happiness" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Verb → Person" formula="teach + er → teacher" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#verb-to-noun">Hậu tố từ Động từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adj-to-noun">Hậu tố từ Tính từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#people">Hậu tố chỉ Người</a></li>
            <li><a className="text-rose-700 hover:underline" href="#spelling">Quy tắc Chính tả</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lưu ý quan trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="verb-to-noun" title="Hậu tố tạo Danh từ từ Động từ (Verb → Noun)" emoji="🔧">
        <p>Các hậu tố này biến một hành động thành một khái niệm, sự vật, hoặc kết quả.</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><b>-ment:</b> agree → agree<b>ment</b>, develop → develop<b>ment</b>, govern → govern<b>ment</b>.</li>
            <li><b>-tion / -sion:</b> inform → informa<b>tion</b>, decide → deci<b>sion</b>, create → crea<b>tion</b>.</li>
            <li><b>-ance / -ence:</b> perform → perform<b>ance</b>, differ → differ<b>ence</b>, accept → accept<b>ance</b>.</li>
            <li><b>-al:</b> arrive → arriv<b>al</b>, refuse → refus<b>al</b>, approve → approv<b>al</b>.</li>
            <li><b>-age:</b> marry → marri<b>age</b>, pack → pack<b>age</b>, store → stor<b>age</b>.</li>
            <li><b>-ing (Gerund):</b> build → build<b>ing</b>, swim → swimm<b>ing</b>, paint → paint<b>ing</b>.</li>
        </ul>
      </Section>
      
      <Section id="adj-to-noun" title="Hậu tố tạo Danh từ từ Tính từ (Adjective → Noun)" emoji="✨">
        <p>Các hậu tố này biến một đặc điểm, tính chất thành một khái niệm hoặc trạng thái.</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><b>-ness:</b> happy → happi<b>ness</b>, kind → kind<b>ness</b>, sad → sad<b>ness</b>, dark → dark<b>ness</b>.</li>
            <li><b>-ity:</b> able → abil<b>ity</b>, possible → possibil<b>ity</b>, electric → electric<b>ity</b>.</li>
            <li><b>-ce / -cy:</b> important → importan<b>ce</b>, elegant → elegan<b>ce</b>, accurate → accura<b>cy</b>, private → priva<b>cy</b>.</li>
            <li><b>-th:</b> strong → streng<b>th</b>, wide → wid<b>th</b>, deep → dep<b>th</b>.</li>
        </ul>
      </Section>
      
      <Section id="people" title="Hậu tố chỉ Người (People)" emoji="👤">
        <p>Các hậu tố này thường được thêm vào động từ hoặc danh từ để chỉ người thực hiện hành động hoặc người làm một nghề nghiệp.</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><b>-er / -or:</b> teach → teach<b>er</b>, sing → sing<b>er</b>, act → act<b>or</b>, direct → direct<b>or</b>.</li>
            <li><b>-ist:</b> art → art<b>ist</b>, science → scient<b>ist</b>, piano → pian<b>ist</b>.</li>
            <li><b>-ant / -ent:</b> assist → assist<b>ant</b>, apply → applic<b>ant</b>, study → stud<b>ent</b>.</li>
            <li><b>-ian:</b> music → music<b>ian</b>, magic → magic<b>ian</b>, history → histor<b>ian</b>.</li>
        </ul>
      </Section>

      <Section id="spelling" title="Quy tắc Chính tả" emoji="✍️">
        <p>
            Khi thêm hậu tố, một số thay đổi về chính tả có thể xảy ra:
        </p>
        <ul className="list-disc pl-6">
            <li><b>Bỏ 'e' cuối:</b> create → creat<b>ion</b>; decide → deci<b>sion</b>.</li>
            <li><b>Đổi 'y' thành 'i':</b> happy → happ<b>iness</b>; apply → appl<b>icant</b>.</li>
            <li><b>Đổi '-ate' thành '-acy':</b> accurate → accur<b>acy</b>.</li>
            <li><b>Đổi '-able' thành '-ability':</b> able → ab<b>ility</b>.</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lưu ý quan trọng" emoji="⚠️">
        <p>
            Không có quy tắc tuyệt đối để biết từ nào đi với hậu tố nào. Cách tốt nhất là học chúng như từ vựng mới và chú ý đến các mẫu từ phổ biến. Khi không chắc chắn, hãy tra từ điển.
        </p>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Tạo danh từ từ các từ sau bằng cách thêm hậu tố phù hợp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>improve (verb) → ____________</li>
            <li>weak (adjective) → ____________</li>
            <li>propose (verb) → ____________</li>
            <li>similar (adjective) → ____________</li>
            <li>direct (verb, person) → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
