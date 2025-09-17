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

export default function CoreSubjunctiveWere() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🤔 <span className="underline decoration-4 decoration-amber-400">THỂ GIẢ ĐỊNH (were)</span> — <i>Were-Subjunctive</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Một cấu trúc đặc biệt dùng <b>"were"</b> cho tất cả các chủ ngữ để diễn tả một tình huống giả định, không có thật hoặc trái với thực tế.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Với 'if'" formula="If + S + were..." colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Với 'wish'" formula="S + wish + S + were..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Với 'as if'" formula="S + V + as if + S + were..." colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#if">Dùng trong Câu điều kiện (If I were you...)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#as-if">Dùng với 'as if / as though'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#wish">Dùng với 'wish' (Ôn lại)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            <b>Were-Subjunctive</b> được dùng để nói về những điều không có thật, giả định hoặc trái với thực tế. Điểm mấu chốt là nó sử dụng <b>"were"</b> cho tất cả các ngôi, bao gồm cả <b>I, he, she, it</b>, thay vì "was". Việc sử dụng "were" là một tín hiệu ngữ pháp cho thấy tình huống đang được nói đến là một giả định.
        </p>
        <p>Cấu trúc này mang tính trang trọng hơn so với việc dùng "was" trong văn nói thân mật.</p>
      </Section>

      <Section id="if" title="Dùng trong Câu điều kiện (If I were you...)" emoji="🚦">
        <p>Đây là ứng dụng phổ biến nhất, nằm trong cấu trúc câu điều kiện loại 2.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Đưa ra lời khuyên:</b> Cụm từ <b>"If I were you..."</b> là cách nói tiêu chuẩn để cho lời khuyên.
                <br/><i>e.g., <b>If I were you</b>, I would apologize.</i> (Nếu tôi là bạn, tôi sẽ xin lỗi.)
            </li>
            <li><b>Giả định trái với hiện tại:</b>
                <br/><i>e.g., <b>If he were</b> here, he would help us.</i> (Sự thật: He is not here.)
            </li>
        </ul>
      </Section>

      <Section id="as-if" title="Dùng với 'as if / as though'" emoji="🎭">
        <p>Cấu trúc này được dùng để so sánh một hành động có thật với một tình huống giả định, không có thật.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: <code className="font-mono">S + V + as if / as though + S + were...</code></p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He acts <b>as if he were</b> the king.</i> (Anh ta hành động như thể anh ta là vua. Sự thật: anh ta không phải là vua.)</li>
            <li><i>She looked at me <b>as though she weren't</b> surprised.</i> (Cô ấy nhìn tôi như thể cô ấy không ngạc nhiên. Sự thật: cô ấy có ngạc nhiên.)</li>
        </ul>
      </Section>
      
      <Section id="wish" title="Dùng với 'wish' (Ôn lại)" emoji="🤞">
        <p>Thể giả định với "were" cũng được dùng trong câu ước trái với hiện tại.</p>
        <ul className="list-disc pl-6">
          <li><i>I wish I <b>were</b> on a beach right now.</i> (Ước gì bây giờ tôi đang ở trên bãi biển.)</li>
          <li><i>She wishes it <b>weren't</b> so cold today.</i> (Cô ấy ước hôm nay trời không lạnh như vậy.)</li>
        </ul>
      </Section>

       <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng "was" thay cho "were" trong văn viết trang trọng, đặc biệt với cấu trúc "If I were you".</li>
          <li>Nhầm lẫn với các tình huống có thật ở quá khứ (phải dùng "was").
            <br/><i>So sánh: "If he <b>was</b> at the party yesterday, I didn't see him." (Có thể anh ta đã ở đó - điều kiện có thật ở quá khứ) vs. "If he <b>were</b> at the party now, it would be more fun." (Anh ấy không ở đây bây giờ - giả định trái hiện tại).</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>If this were a simple problem, we would have solved it already.</b> — Nếu đây là một vấn đề đơn giản, chúng ta đã giải quyết nó rồi.</li>
          <li><b>He talks about the city as if he were a local.</b> — Anh ấy nói về thành phố như thể anh ấy là người dân địa phương.</li>
          <li><b>I wish my schedule weren't so busy this week.</b> — Tôi ước lịch trình của mình không bận rộn như vậy trong tuần này.</li>
          <li><b>If it were up to me, I would choose a different color.</b> — Nếu tùy thuộc vào tôi, tôi sẽ chọn một màu khác.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền "was" hoặc "were" vào chỗ trống. Dùng "were" cho các tình huống giả định.</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>If I ______ you, I would tell the truth.</li>
            <li>He wishes he ______ taller.</li>
            <li>She talked to me as if she ______ my boss.</li>
            <li>I'm not sure if he ______ at home last night. (Câu này là điều kiện có thật hay giả định?)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}