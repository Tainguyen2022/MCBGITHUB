
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

export default function CorePrepositionalPhrases() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⛓️ <span className="underline decoration-4 decoration-amber-400">CỤM GIỚI TỪ</span> — <i>Prepositional Phrases</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là một nhóm từ bắt đầu bằng một giới từ và kết thúc bằng một danh từ hoặc đại từ. Chúng hoạt động như một tính từ hoặc một trạng từ trong câu.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc" formula="Preposition + (Modifiers) + Object" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Vai trò Tính từ" formula="The book [on the table]" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Vai trò Trạng từ" formula="He ran [down the street]" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adjective">Chức năng 1: Cụm Tính từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adverb">Chức năng 2: Cụm Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#placement">Vị trí trong câu</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Cấu trúc" emoji="🏗️">
        <p>
            Một cụm giới từ bao gồm một <b>giới từ</b> và <b>tân ngữ của giới từ</b> (Object of the Preposition). Tân ngữ này có thể là danh từ, đại từ, hoặc danh động từ (gerund).
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: Preposition + (Modifiers) + Object</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i><b>in</b> the garden</i></li>
            <li><i><b>after</b> the meeting</i></li>
            <li><i><b>with</b> me</i></li>
            <li><i>Tired <b>of waiting</b></i></li>
        </ul>
      </Section>
      
      <Section id="adjective" title="Chức năng 1: Cụm Tính từ (Adjective Phrases)" emoji="🎨">
        <p>
            Khi một cụm giới từ bổ nghĩa cho một danh từ hoặc đại từ, nó hoạt động như một tính từ. Nó thường trả lời câu hỏi <b>"Which one?"</b> hoặc <b>"What kind?"</b>.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The man <b>in the blue suit</b> is my boss.</i> (Which man?)</li>
            <li><i>I want a room <b>with a view</b>.</i> (What kind of room?)</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">Quy tắc vàng: Cụm giới từ làm tính từ thường đứng <b>ngay sau</b> danh từ mà nó bổ nghĩa.</p>
      </Section>
      
      <Section id="adverb" title="Chức năng 2: Cụm Trạng từ (Adverb Phrases)" emoji="🏃">
        <p>
            Khi một cụm giới từ bổ nghĩa cho một động từ, tính từ hoặc một trạng từ khác, nó hoạt động như một trạng từ. Nó thường trả lời câu hỏi <b>"Where?", "When?", "How?"</b>, hoặc <b>"Why?"</b>.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She put the book <b>on the shelf</b>.</i> (Where?)</li>
            <li><i>We will meet <b>after class</b>.</i> (When?)</li>
            <li><i>He answered <b>with a smile</b>.</i> (How?)</li>
        </ul>
      </Section>
      
      <Section id="placement" title="Vị trí trong câu" emoji="📍">
        <p>
            Vị trí của cụm giới từ rất quan trọng để tránh gây hiểu nhầm.
        </p>
         <ul className="list-disc pl-6">
            <li><b>Cụm tính từ:</b> Phải đứng gần danh từ nó bổ nghĩa.
                <br/><i>The girl <b>with the red hair</b> is talking to John.</i>
            </li>
            <li><b>Cụm trạng từ:</b> Có thể linh hoạt hơn, nhưng thường đứng cuối câu.
                <br/><i>He walked <b>down the street</b>.</i>
            </li>
            <li><b>Lỗi sai "Misplaced Modifier":</b>
                 <br/>Câu mơ hồ: <i>The police officer shot the robber <b>with a gun</b>.</i> (Ai có súng?)
                 <br/>Câu rõ ràng: <i>The police officer <b>with a gun</b> shot the robber.</i> (Cảnh sát có súng).
                 <br/>Hoặc: <i>The police officer shot the robber <b>by using a gun</b>.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Misplaced Modifiers:</b> Đặt cụm giới từ sai vị trí, làm thay đổi ý nghĩa của câu.</li>
          <li><b>Subject-Verb Agreement:</b> Động từ phải hòa hợp với chủ ngữ chính của câu, không phải với tân ngữ của giới từ.
             <br/>❌ <i className="line-through">The list of items are on the desk.</i> → ✅ The <b>list</b> of items <b>is</b> on the desk.
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>(Tính từ) The shop around the corner is open.</b> — Cửa hàng ở góc đường đang mở cửa.</li>
          <li><b>(Trạng từ) We talked for a few minutes.</b> — Chúng tôi đã nói chuyện trong vài phút.</li>
          <li><b>(Tính từ) This is a book about ancient history.</b> — Đây là một cuốn sách về lịch sử cổ đại.</li>
          <li><b>(Trạng từ) They arrived at the airport with plenty of time.</b> — Họ đã đến sân bay với nhiều thời gian dư dả.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định cụm giới từ trong câu và cho biết nó là cụm tính từ hay cụm trạng từ:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The keys on the table are mine.
            <br/>→ Cụm giới từ: ____________. Chức năng: ____________.</li>
            <li>He walked into the room.
            <br/>→ Cụm giới từ: ____________. Chức năng: ____________.</li>
            <li>The girl with glasses is reading a book.
            <br/>→ Cụm giới từ: ____________. Chức năng: ____________.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
