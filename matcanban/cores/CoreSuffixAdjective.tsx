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

export default function CoreSuffixAdjective() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎨 <span className="underline decoration-4 decoration-amber-400">HẬU TỐ TÍNH TỪ</span> — <i>Adjective Suffixes</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là các đuôi từ được thêm vào cuối danh từ hoặc động từ để tạo thành tính từ, mô tả đặc điểm hoặc tính chất của sự vật, sự việc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Noun → Adjective" formula="danger + ous → dangerous" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Verb → Adjective" formula="read + able → readable" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="'full of'" formula="beauty + ful → beautiful" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="'without'" formula="care + less → careless" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#noun-to-adj">Hậu tố từ Danh từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#verb-to-adj">Hậu tố từ Động từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#spelling">Quy tắc Chính tả</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lưu ý quan trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="noun-to-adj" title="Hậu tố tạo Tính từ từ Danh từ (Noun → Adjective)" emoji="📚➡️🎨">
        <p>Các hậu tố này biến một khái niệm hoặc sự vật thành một đặc điểm, tính chất.</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><b>-ful (full of):</b> beauty → beauti<b>ful</b>, success → success<b>ful</b>, care → care<b>ful</b>.</li>
            <li><b>-less (without):</b> home → home<b>less</b>, use → use<b>less</b>, care → care<b>less</b>.</li>
            <li><b>-al:</b> nation → nation<b>al</b>, music → music<b>al</b>, profession → profession<b>al</b>.</li>
            <li><b>-ous:</b> danger → danger<b>ous</b>, fame → fam<b>ous</b>, poison → poison<b>ous</b>.</li>
            <li><b>-y:</b> sun → sunn<b>y</b>, rain → rain<b>y</b>, health → health<b>y</b>.</li>
            <li><b>-ic:</b> economy → econom<b>ic</b>, hero → hero<b>ic</b>, history → histor<b>ic</b>.</li>
            <li><b>-ish:</b> child → child<b>ish</b>, fool → fool<b>ish</b>, self → self<b>ish</b>.</li>
        </ul>
      </Section>
      
      <Section id="verb-to-adj" title="Hậu tố tạo Tính từ từ Động từ (Verb → Adjective)" emoji="🔧➡️🎨">
        <p>Các hậu tố này biến một hành động thành một tính chất hoặc khả năng.</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><b>-able / -ible (can be done):</b> read → read<b>able</b>, accept → accept<b>able</b>, flex → flex<b>ible</b>, respond → respons<b>ible</b>.</li>
            <li><b>-ive:</b> create → creat<b>ive</b>, act → act<b>ive</b>, attract → attract<b>ive</b>.</li>
            <li><b>-ant / -ent:</b> differ → differ<b>ent</b>, import → import<b>ant</b>, please → pleas<b>ant</b>.</li>
            <li><b>-ing / -ed:</b> Đây là dạng Phân từ (Participles) được dùng như tính từ, mô tả bản chất (-ing) hoặc cảm xúc (-ed).
                <br/><i>e.g., interest → interest<b>ing</b> / interest<b>ed</b>; bore → bor<b>ing</b> / bor<b>ed</b>.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="spelling" title="Quy tắc Chính tả" emoji="✍️">
        <p>
            Khi thêm hậu tố, một số thay đổi về chính tả có thể xảy ra:
        </p>
        <ul className="list-disc pl-6">
            <li><b>Bỏ 'e' cuối:</b> response → respons<b>ible</b>; create → creat<b>ive</b>.</li>
            <li><b>Đổi 'y' thành 'i':</b> beauty → beaut<b>iful</b>; health → health<b>y</b>.</li>
            <li><b>Gấp đôi phụ âm:</b> sun → su<b>nny</b>.</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lưu ý quan trọng" emoji="⚠️">
        <p>
            Tương tự như hậu tố danh từ, không có quy tắc tuyệt đối để biết từ nào đi với hậu tố nào. Việc đọc nhiều và học từ vựng theo họ từ (word families) là cách hiệu quả nhất.
        </p>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Tạo tính từ từ các từ sau bằng cách thêm hậu tố phù hợp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>comfort (verb/noun) → ____________</li>
            <li>danger (noun) → ____________</li>
            <li>hope (noun/verb) → ____________ (có 2 dạng!)</li>
            <li>attract (verb) → ____________</li>
            <li>depend (verb) → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
