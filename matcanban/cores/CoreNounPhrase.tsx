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

export default function CoreNounPhrase() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🏗️ <span className="underline decoration-4 decoration-amber-400">CẤU TRÚC CỤM DANH TỪ</span> — <i>Noun Phrase</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Học cách xây dựng các cụm danh từ, từ đơn giản đến phức tạp, bằng cách kết hợp danh từ chính (head noun) với các thành phần bổ nghĩa trước (pre-modifiers) và sau (post-modifiers).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc cơ bản" formula="Determiner + Adj + Noun" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Cấu trúc mở rộng" formula="Pre-modifiers + Noun + Post-modifiers" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Thành phần</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pre-modifiers">Thành phần Bổ nghĩa TRƯỚC (Pre-modifiers)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#post-modifiers">Thành phần Bổ nghĩa SAU (Post-modifiers)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Thành phần" emoji="🎯">
        <p>
            <b>Cụm danh từ (Noun Phrase)</b> là một nhóm từ hoạt động như một danh từ trong câu. Nó có thể là chủ ngữ, tân ngữ, hoặc bổ ngữ.
        </p>
         <p className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <b>Ví dụ phân tích:</b> <span className="text-indigo-600">[<u>The beautiful old house</u>]</span> <span className="text-blue-600">[<u>on the corner</u>]</span> is for sale.
            <br/>→ <b>house</b>: Danh từ chính (head noun)
            <br/>→ <b>The beautiful old</b>: Bổ nghĩa trước (Pre-modifiers)
            <br/>→ <b>on the corner</b>: Bổ nghĩa sau (Post-modifier)
        </p>
      </Section>

      <Section id="pre-modifiers" title="Thành phần Bổ nghĩa TRƯỚC (Pre-modifiers)" emoji="⬅️">
        <p>
            Các từ đứng trước danh từ chính thường theo một trật tự cụ thể để làm rõ hơn về danh từ đó.
        </p>
        <ol className="list-decimal pl-6 space-y-1 mt-2">
            <li><b>Determiners (Từ hạn định):</b> <i>a/an, the, my, your, this, that, some, any...</i></li>
            <li><b>Quantifiers (Lượng từ):</b> <i>one, two, many, several...</i></li>
            <li><b>Adjectives (Tính từ):</b> Theo trật tự OSASCOMP (<i>a <b>beautiful small old</b> car</i>).</li>
            <li><b>Nouns (Danh từ):</b> Một danh từ có thể làm bổ nghĩa cho danh từ khác.
                <br/><i>e.g., a <b>computer</b> screen, a <b>kitchen</b> table.</i>
            </li>
        </ol>
        <p className="mt-2"><b>Trật tự đầy đủ:</b> Determiner + Quantifier + Adjective(s) + Noun (modifier) + Noun (head)</p>
        <p><i>e.g., My two beautiful new kitchen chairs.</i></p>
      </Section>

      <Section id="post-modifiers" title="Thành phần Bổ nghĩa SAU (Post-modifiers)" emoji="➡️">
        <p>
            Các cụm từ hoặc mệnh đề đứng sau danh từ chính để cung cấp thông tin chi tiết hơn.
        </p>
         <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Prepositional Phrases (Cụm giới từ):</b>
                <br/><i>e.g., The book <b>on the table</b> is mine.</i>
            </li>
            <li><b>Participial Phrases (Cụm phân từ -ing/-ed):</b>
                 <br/><i>e.g., The man <b>wearing a red hat</b> is my uncle.</i> (Rút gọn MĐQH chủ động)
                 <br/><i>e.g., The letter <b>written by my father</b> arrived today.</i> (Rút gọn MĐQH bị động)
            </li>
             <li><b>Infinitive Phrases (Cụm động từ nguyên mẫu):</b>
                 <br/><i>e.g., I have some homework <b>to do</b>.</i>
                 <br/><i>e.g., His decision <b>to leave the company</b> surprised everyone.</i>
            </li>
             <li><b>Relative Clauses (Mệnh đề quan hệ):</b>
                 <br/><i>e.g., The student <b>who won the prize</b> is from my class.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Sai trật tự tính từ trong nhóm bổ nghĩa trước.</li>
          <li>Lỗi hòa hợp Chủ ngữ - Động từ: Động từ phải hòa hợp với <b>danh từ chính (head noun)</b>, không phải danh từ trong cụm giới từ.
             <br/>❌ <i className="line-through">The box of apples are heavy.</i> → ✅ The box of apples <b>is</b> heavy.
          </li>
          <li>Đặt một tính từ đơn sau danh từ. (❌ <i className="line-through">The house big...</i> → ✅ The big house...)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>A very expensive old painting.</b> — Một bức tranh cổ rất đắt tiền.</li>
          <li><b>The key to the front door.</b> — Chìa khóa của cửa chính.</li>
          <li><b>A man with a long beard.</b> — Một người đàn ông có bộ râu dài.</li>
          <li><b>The new employee who started last week.</b> — Nhân viên mới người mà đã bắt đầu làm tuần trước.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">A. Xác định danh từ chính (head noun) trong các cụm danh từ sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The tall man in the blue suit. → Head Noun: ____________</li>
            <li>A small box of old letters. → Head Noun: ____________</li>
          </ol>
          <p className="font-semibold mt-3">B. Sắp xếp các từ sau thành một cụm danh từ đúng:</p>
          <p className="pl-6">(a / wooden / beautiful / small / coffee / table)</p>
          <p className="pl-6">→ ____________________________________________</li>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}