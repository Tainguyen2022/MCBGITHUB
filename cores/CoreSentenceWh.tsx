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

export default function CoreSentenceWh() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🧐 <span className="underline decoration-4 decoration-amber-400">CÂU HỎI WH-</span> — <i>Wh- Questions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là dạng câu hỏi dùng các từ để hỏi (What, Where, When, Who, Why, Which, How) để thu thập thông tin cụ thể, không chỉ đơn thuần là "Yes" hoặc "No".
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chung (Đảo ngữ)" formula="Wh- + Aux + S + V?" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Khi Wh- là Chủ ngữ" formula="Who/What/Which + V...?" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#wh-words">1. Các Từ để hỏi (Wh- words)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#structure1">2. Cấu trúc 1: Wh- không phải Chủ ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#structure2">3. Cấu trúc 2: Wh- là Chủ ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="wh-words" title="1. Các Từ để hỏi (Wh- words)" emoji="❓">
        <p>Mỗi từ dùng để hỏi về một loại thông tin khác nhau:</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>What:</b> Cái gì, sự việc</li>
            <li><b>Where:</b> Ở đâu, nơi chốn</li>
            <li><b>When:</b> Khi nào, thời gian</li>
            <li><b>Who:</b> Ai (chủ ngữ)</li>
            <li><b>Whom:</b> Ai (tân ngữ - trang trọng)</li>
            <li><b>Why:</b> Tại sao, lý do</li>
            <li><b>Which:</b> Cái nào (trong một nhóm lựa chọn)</li>
            <li><b>Whose:</b> Của ai, sở hữu</li>
            <li><b>How:</b> Như thế nào (cách thức), bao nhiêu (how much/many/long...)</li>
        </ul>
      </Section>
      
      <Section id="structure1" title="2. Cấu trúc 1: Wh- không phải Chủ ngữ (Cần Đảo ngữ)" emoji="🔄">
        <p>
            Đây là cấu trúc phổ biến nhất. Nó giống hệt câu hỏi Yes/No, chỉ cần thêm từ hỏi Wh- vào đầu câu.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Cấu trúc: Wh-word + Auxiliary Verb + Subject + Main Verb ...?</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i><b>Where are</b> you going?</i></li>
            <li><i><b>What does</b> he want?</i></li>
            <li><i><b>When did</b> they arrive?</i></li>
            <li><i><b>Why have</b> you done that?</i></li>
        </ul>
      </Section>

       <Section id="structure2" title="3. Cấu trúc 2: Wh- là Chủ ngữ (Không Đảo ngữ)" emoji="👤">
        <p>
            Khi từ hỏi <b>Who, What, Which</b> đóng vai trò là <b>chủ ngữ</b> của câu, chúng ta <b>KHÔNG</b> đảo ngữ và <b>KHÔNG</b> dùng trợ động từ do/does/did. Câu hỏi có cấu trúc giống như một câu khẳng định.
        </p>
         <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Cấu trúc: Who / What / Which + Verb ...?</p>
        </div>
        <p className="mt-2"><b>Cách nhận biết:</b> Hãy thử trả lời câu hỏi. Nếu câu trả lời thay thế chính từ hỏi, thì từ hỏi đó là chủ ngữ.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i><b>Who broke</b> the window?</i> (Answer: <b>John</b> broke the window. → 'Who' = 'John' = Subject)</li>
            <li><i><b>What happened</b> yesterday?</i> (Answer: <b>An accident</b> happened yesterday. → 'What' = 'An accident' = Subject)</li>
            <li><i><b>Which car</b> is faster?</i> (Answer: <b>The red car</b> is faster. → 'Which car' = 'The red car' = Subject)</li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên đảo ngữ</b> khi Wh- không phải là chủ ngữ. (❌ <i className="line-through">Where you are going?</i>)</li>
          <li><b>Đảo ngữ không cần thiết</b> khi Wh- là chủ ngữ. (❌ <i className="line-through">Who did break the window?</i>)</li>
          <li><b>Sai trật tự từ trong câu hỏi gián tiếp:</b> (❌ <i className="line-through">I don't know where is he.</i> → ✅ I don't know where he <b>is</b>.)</li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết câu hỏi Wh- để hỏi về phần được gạch chân:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She lives <u>in London</u>.
            <br/>→ ____________________________________________?</li>
            <li><u>The children</u> are playing in the garden.
            <br/>→ ____________________________________________?</li>
            <li>He bought <u>a new car</u> last week.
            <br/>→ ____________________________________________?</li>
            <li>They are late <u>because the traffic is bad</u>.
            <br/>→ ____________________________________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}