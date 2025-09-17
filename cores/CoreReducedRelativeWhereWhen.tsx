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

export default function CoreReducedRelativeWhereWhen() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✂️ <span className="underline decoration-4 decoration-amber-400">RÚT GỌN MĐQH (WHERE/WHEN)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Học cách thay thế mệnh đề quan hệ với 'where' và 'when' bằng các cụm từ ngắn gọn hơn như cụm giới từ hoặc động từ nguyên mẫu (to-infinitive).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dạng đầy đủ (Where)" formula="the place where we can eat" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dạng rút gọn" formula="a place to eat" colors="from-emerald-500 via-lime-500 to-amber-500"/>
           <FormulaChip label="Dạng đầy đủ (When)" formula="a time when we should leave" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Dạng rút gọn" formula="time to leave" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Điều kiện</a></li>
            <li><a className="text-rose-700 hover:underline" href="#how-to">Cách Rút gọn thành To-infinitive</a></li>
            <li><a className="text-rose-700 hover:underline" href="#prepositional">Thay thế bằng Cụm giới từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#when-not-to">Khi nào KHÔNG thể rút gọn?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Điều kiện" emoji="🎯">
        <p>
            Không phải tất cả mệnh đề với "where" và "when" đều có thể rút gọn. Việc rút gọn thường khả thi khi mệnh đề quan hệ diễn tả <b>mục đích</b> hoặc <b>chức năng</b> của danh từ đứng trước.
        </p>
      </Section>
      
      <Section id="how-to" title="Cách Rút gọn thành To-infinitive" emoji="🔧">
        <p>
            Đây là cách rút gọn phổ biến nhất. Khi mệnh đề quan hệ với 'where' hoặc 'when' diễn tả một hành động có thể hoặc nên được thực hiện, ta có thể thay nó bằng một cụm <b>to-infinitive</b>.
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 mt-3 space-y-2">
            <div>
                <p className="font-bold text-blue-700">Rút gọn 'where'</p>
                <p>Original: <i>I need a place <b>where I can work</b> in peace.</i></p>
                <p>→ Reduced: <i>I need a place <b>to work</b> in peace.</i></p>
            </div>
             <div>
                <p className="font-bold text-blue-700">Rút gọn 'when'</p>
                <p>Original: <i>Now is the time <b>when we should take</b> action.</i></p>
                <p>→ Reduced: <i>Now is the time <b>to take</b> action.</i></p>
            </div>
        </div>
      </Section>
      
      <Section id="prepositional" title="Thay thế bằng Cụm giới từ" emoji="🗺️">
        <p>
           Trong nhiều trường hợp, 'where' và 'when' có thể được thay thế bằng một cụm giới từ trang trọng hơn. Đây không hẳn là "rút gọn" mà là một cách diễn đạt khác.
        </p>
        <ul className="list-disc pl-6">
            <li><b>where → in/at/on which</b>
                <br/><i>e.g., The hotel <b>where</b> we stayed was expensive.</i>
                <br/><i>→ The hotel <b>at which</b> we stayed was expensive.</i>
            </li>
            <li><b>when → on/in/at which</b>
                 <br/><i>e.g., I remember the day <b>when</b> we first met.</i>
                 <br/><i>→ I remember the day <b>on which</b> we first met.</i>
            </li>
        </ul>
      </Section>

      <Section id="when-not-to" title="Khi nào KHÔNG thể rút gọn?" emoji="🚫">
        <p>
           Khi mệnh đề quan hệ chỉ mô tả một sự kiện cụ thể đã xảy ra tại một nơi chốn/thời gian, chứ không phải là một mục đích hay chức năng, việc rút gọn thường không thể thực hiện mà không làm thay đổi ý nghĩa.
        </p>
         <ul className="list-disc pl-6">
            <li><i>I'll never forget the village <b>where I was born</b>.</i> (Không thể rút gọn thành 'the village to be born').</li>
            <li><i>The accident happened at a time <b>when I was very busy</b>.</i> (Không thể rút gọn).</li>
        </ul>
      </Section>
      
      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Original:</b> Is there a chair where I can sit?
          <br/><b>Reduced:</b> Is there a chair <b>to sit on</b>? (Lưu ý giới từ 'on' được giữ lại)
          </li>
          <li><b>Original:</b> The best time when you can visit Paris is in the spring.
          <br/><b>Reduced:</b> The best time <b>to visit</b> Paris is in the spring.
          </li>
          <li><b>Original:</b> He is looking for a quiet place where he can study for his exam.
          <br/><b>Reduced:</b> He is looking for a quiet place <b>to study</b> for his exam.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Rút gọn các mệnh đề quan hệ sau nếu có thể:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I need to find a shop where I can buy a new battery.
            <br/>→ ____________________________________________</li>
            <li>This is the park where we used to play as children.
            <br/>→ ____________________________________________</li>
            <li>He needs some tools with which he can fix the car. (Gợi ý: to fix the car with)
            <br/>→ He needs some tools ____________________________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}