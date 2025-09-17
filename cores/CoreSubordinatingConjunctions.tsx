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

export default function CoreSubordinatingConjunctions() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⛓️ <span className="underline decoration-4 decoration-amber-400">LIÊN TỪ PHỤ THUỘC</span> — <i>Subordinating Conjunctions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là những từ dùng để bắt đầu một mệnh đề phụ thuộc (dependent clause) và nối nó vào một mệnh đề độc lập (independent clause), tạo thành một câu phức.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Mệnh đề phụ trước" formula="Sub-Conj + S + V, S + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Mệnh đề phụ sau" formula="S + V + Sub-Conj + S + V" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#types">Các loại Liên từ Phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc Dấu phẩy (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">Phân biệt với Liên từ Kết hợp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Chức năng" emoji="🎯">
        <p>
            <b>Liên từ phụ thuộc</b> tạo ra mối liên hệ về mặt ý nghĩa giữa hai mệnh đề không ngang hàng: một mệnh đề chính (independent clause - IC) và một mệnh đề phụ (dependent clause - DC). Mệnh đề phụ không thể đứng một mình như một câu hoàn chỉnh.
        </p>
        <p className="mt-2">Chúng trả lời cho các câu hỏi như: When? Why? How? Under what condition?</p>
      </Section>

      <Section id="types" title="Các loại Liên từ Phổ biến" emoji="📚">
        <p>Các liên từ phụ thuộc thường được nhóm theo ý nghĩa mà chúng thể hiện:</p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Thời gian (Time):</b> after, before, when, while, since, until, as, as soon as</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Nguyên nhân (Cause):</b> because, since, as</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Kết quả (Effect):</b> so that</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Tương phản (Contrast):</b> although, though, even though, while, whereas</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Điều kiện (Condition):</b> if, unless, in case, provided that</div>
        </div>
      </Section>

      <Section id="punctuation" title="Quy tắc Dấu phẩy (Rất quan trọng!)" emoji="✍️">
        <p>Quy tắc dấu phẩy với liên từ phụ thuộc rất đơn giản và nhất quán:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Khi Mệnh đề phụ thuộc (DC) đứng TRƯỚC:</b> Dùng dấu phẩy (,) để ngăn cách.
                <p className="pl-4 text-sm text-gray-600 rounded-lg bg-green-50 p-2 border border-green-200">
                    <b className="font-mono">DC, IC.</b><br/>
                    <i><b>Because it was raining,</b> we stayed indoors.</i>
                </p>
            </li>
            <li><b>Khi Mệnh đề phụ thuộc (DC) đứng SAU:</b> <b>KHÔNG</b> dùng dấu phẩy.
                <p className="pl-4 text-sm text-gray-600 rounded-lg bg-red-50 p-2 border border-red-200">
                    <b className="font-mono">IC DC.</b><br/>
                    <i>We stayed indoors <b>because it was raining</b>.</i>
                </p>
            </li>
        </ul>
      </Section>
      
       <Section id="comparison" title="Phân biệt với Liên từ Kết hợp" emoji="⚖️">
        <ul className="list-disc pl-6">
            <li><b>Liên từ Kết hợp (FANBOYS):</b> Nối 2 thành phần ngang hàng (IC + IC).
                <br/><i>e.g., It was raining, <b>so</b> we stayed indoors.</i>
            </li>
            <li><b>Liên từ Phụ thuộc:</b> Nối 1 thành phần phụ vào 1 thành phần chính (DC + IC).
                 <br/><i>e.g., <b>Because</b> it was raining, we stayed indoors.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Sentence Fragment:</b> Viết mệnh đề phụ thuộc như một câu hoàn chỉnh. (❌ <i className="line-through">Because it was raining.</i>)</li>
          <li><b>Sai dấu phẩy:</b> Quên dấu phẩy khi mệnh đề phụ đứng đầu, hoặc thêm dấu phẩy không cần thiết khi mệnh đề phụ đứng sau.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I will call you after I finish my work.</b> — Tôi sẽ gọi cho bạn sau khi tôi làm xong việc.</li>
          <li><b>Although he was tired, he continued working.</b> — Mặc dù đã mệt, anh ấy vẫn tiếp tục làm việc.</li>
          <li><b>You won't pass the exam unless you study harder.</b> — Bạn sẽ không thi đỗ trừ khi bạn học chăm chỉ hơn.</li>
          <li><b>Since you're not busy, could you help me with this?</b> — Vì bạn không bận, bạn có thể giúp tôi việc này được không?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Nối các câu sau bằng liên từ trong ngoặc. Chú ý dấu phẩy!</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>He felt sick. He went to the doctor. (because)
            <br/>→ ____________________________________________</li>
            <li>You must leave now. You will be late. (if) - (viết 2 cách)
            <br/>→ 1. ____________________________________________
            <br/>→ 2. ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}