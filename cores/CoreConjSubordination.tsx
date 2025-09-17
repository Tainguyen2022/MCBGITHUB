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

export default function CoreConjSubordination() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⛓️ <span className="underline decoration-4 decoration-amber-400">CÁC LOẠI PHỤ THUỘC</span> — <i>Subordination Types</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu ba loại mệnh đề phụ thuộc chính: Mệnh đề Trạng ngữ, Mệnh đề Tính ngữ, và Mệnh đề Danh ngữ, và cách chúng được dùng để xây dựng câu phức.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="MĐ Trạng ngữ" formula="...because it was late." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="MĐ Tính ngữ" formula="...the man who lives there." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="MĐ Danh ngữ" formula="...what he said." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">1. Phụ thuộc là gì?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adverb">2. Mệnh đề Trạng ngữ (Adverb Clauses)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adjective">3. Mệnh đề Tính ngữ (Adjective Clauses)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#noun">4. Mệnh đề Danh ngữ (Noun Clauses)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">5. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="1. Phụ thuộc là gì?" emoji="🎯">
        <p>
            <b>Phụ thuộc (Subordination)</b> là việc kết nối một mệnh đề phụ thuộc (dependent clause - DC) vào một mệnh đề chính (independent clause - IC). Mệnh đề phụ không thể đứng một mình làm câu, nó phụ thuộc vào mệnh đề chính để hoàn thành ý nghĩa.
        </p>
        <p className="mt-2"><i>e.g., [<u>We stayed at home</u>] [<b>because it was raining</b>].</i> (IC + DC)</p>
        <p>Có 3 loại mệnh đề phụ thuộc chính, được đặt tên theo chức năng của chúng trong câu.</p>
      </Section>
      
      <Section id="adverb" title="2. Mệnh đề Trạng ngữ (Adverb Clauses)" emoji="🏃">
        <p>
            Đây là loại phổ biến nhất. Mệnh đề trạng ngữ hoạt động như một trạng từ, bổ nghĩa cho động từ trong mệnh đề chính. Chúng trả lời các câu hỏi <b>When?, Where?, Why?, How?, Under what condition?</b>.
        </p>
        <p>Chúng bắt đầu bằng các liên từ phụ thuộc như <b>because, when, while, if, although, since, until...</b></p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She will call you <b>when she arrives</b>.</i> (Trả lời: When?)</li>
            <li><i><b>Although the test was difficult,</b> he passed.</i> (Thể hiện sự tương phản)</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">Quy tắc dấu phẩy: Dùng dấu phẩy khi mệnh đề trạng ngữ đứng đầu câu.</p>
      </Section>

      <Section id="adjective" title="3. Mệnh đề Tính ngữ (Adjective / Relative Clauses)" emoji="🎨">
        <p>
            Mệnh đề tính ngữ hoạt động như một tính từ, bổ nghĩa cho một danh từ hoặc đại từ đứng trước nó.
        </p>
        <p>Chúng bắt đầu bằng các đại từ quan hệ như <b>who, whom, which, that, whose</b> hoặc trạng từ quan hệ <b>where, when, why</b>.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The man <b>who lives next door</b> is a doctor.</i> (Bổ nghĩa cho 'the man')</li>
            <li><i>This is the book <b>that I was telling you about</b>.</i> (Bổ nghĩa cho 'the book')</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">(Xem thêm các bài về Mệnh đề Quan hệ để biết chi tiết).</p>
      </Section>

      <Section id="noun" title="4. Mệnh đề Danh ngữ (Noun Clauses)" emoji="📚">
        <p>
            Mệnh đề danh ngữ hoạt động như một danh từ. Nó có thể làm <b>chủ ngữ, tân ngữ,</b> hoặc <b>bổ ngữ</b> trong câu.
        </p>
        <p>Chúng thường bắt đầu bằng các từ <b>that, what, when, where, why, how, who, if, whether</b>.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Làm Chủ ngữ:</b> <i><b>What she said</b> surprised everyone.</i></li>
            <li><b>Làm Tân ngữ:</b> <i>I don't know <b>where he lives</b>.</i></li>
            <li><b>Làm Bổ ngữ Chủ ngữ:</b> <i>The problem is <b>that we are out of time</b>.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="5. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Sentence Fragment:</b> Viết một mệnh đề phụ thuộc như một câu hoàn chỉnh. (❌ <i className="line-through">Although he is tired.</i>)</li>
          <li><b>Dùng sai dấu phẩy:</b> Đặc biệt là với mệnh đề trạng ngữ.</li>
          <li><b>Sai trật tự từ trong Mệnh đề Danh ngữ:</b> Dùng trật tự từ của câu hỏi. (❌ <i className="line-through">I know what is his name.</i> → ✅ I know <b>what his name is</b>.)</li>
        </ol>
      </Section>

      <Section id="drill" title="6. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định loại mệnh đề phụ thuộc được gạch chân (Trạng ngữ, Tính ngữ, hay Danh ngữ):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I'll wait here <u>until you get back</u>. → ________________</li>
            <li>I can't remember <u>where I put my keys</u>. → ________________</li>
            <li>The computer <u>that I bought last week</u> is very fast. → ________________</li>
            <li><u>What he did</u> was wrong. → ________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}