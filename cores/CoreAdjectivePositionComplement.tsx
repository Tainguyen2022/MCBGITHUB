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
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg',
        'transition-[transform,box-shadow] active:scale-95 ring-1 ring-white/20',
        'bg-gradient-to-r', colors,
        // Bố cục 2 dòng, label ở trên, formula ở dưới
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Chú giải (nhỏ hơn) */}
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      
      {/* Công thức (lớn hơn, kế thừa extrabold) */}
      <span className="truncate">{formula}</span>

      {/* toast nhỏ khi copy */}
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

export default function CoreAdjectivePositionComplement() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🧩 <span className="underline decoration-4 decoration-amber-400">TÍNH TỪ + BỔ NGỮ</span> — <i>Adjective + Complement</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Nhiều tính từ, đặc biệt ở vị trí vị ngữ, cần một cụm từ theo sau (bổ ngữ) để hoàn thiện ý nghĩa. Bổ ngữ này thường là một cụm giới từ hoặc một động từ nguyên mẫu có 'to'.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Adj + Cụm Giới từ" formula="afraid of the dark" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Adj + to-infinitive" formula="ready to go" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#prep-phrase">Bổ ngữ 1: Cụm Giới từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#inf-phrase">Bổ ngữ 2: Cụm To-infinitive</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lưu ý quan trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Chức năng" emoji="🎯">
        <p>
            Một <b>bổ ngữ của tính từ (adjective complement)</b> là một cụm từ theo sau một tính từ để hoàn thành ý nghĩa của nó. Nếu không có bổ ngữ, câu thường sẽ tối nghĩa hoặc không đầy đủ.
        </p>
         <ul className="list-disc pl-6">
            <li><i>She is proud.</i> (Proud of what? → Câu chưa hoàn chỉnh).</li>
            <li><i>She is proud <b>of her son</b>.</i> (Cụm "of her son" hoàn thành ý nghĩa cho "proud").</li>
        </ul>
        <p className="mt-2">Các tính từ này hầu như luôn đứng ở vị trí vị ngữ (sau động từ nối).</p>
      </Section>
      
      <Section id="prep-phrase" title="Bổ ngữ 1: Cụm Giới từ (Prepositional Phrase)" emoji="🔗">
        <p>
            Đây là loại bổ ngữ phổ biến nhất. Một cụm giới từ bắt đầu bằng một giới từ và kết thúc bằng một danh từ hoặc danh động từ (gerund).
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Cấu trúc: S + Linking Verb + Adjective + Preposition + Noun/Gerund</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He is <b>afraid of</b> dogs.</i></li>
            <li><i>She is <b>good at</b> playing chess.</i></li>
            <li><i>I am not <b>interested in</b> politics.</i></li>
            <li><i>They are <b>responsible for</b> the project.</i></li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">(Xem bài <b className="text-indigo-600">W_ADJ_PREP</b> để có danh sách đầy đủ các cụm Adjective + Preposition).</p>
      </Section>
      
      <Section id="inf-phrase" title="Bổ ngữ 2: Cụm To-infinitive (To-infinitive Phrase)" emoji="➡️">
        <p>
            Nhiều tính từ (đặc biệt là những tính từ chỉ cảm xúc, sự sẵn sàng, hoặc mức độ khó/dễ) được theo sau bởi một động từ nguyên mẫu có 'to'.
        </p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Cấu trúc: S + Linking Verb + Adjective + to + V(bare)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I am <b>happy to help</b> you.</i></li>
            <li><i>Are you <b>ready to go</b>?</i></li>
            <li><i>This exercise is <b>easy to understand</b>.</i></li>
             <li><i>She was <b>surprised to see</b> him there.</i></li>
        </ul>
      </Section>

       <Section id="pitfalls" title="Lưu ý quan trọng" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Sử dụng sai giới từ đi kèm với tính từ.</li>
          <li>Dùng to-infinitive sau một giới từ (phải dùng V-ing). (❌ <i className="line-through">I'm interested in to learn...</i>)</li>
          <li>Dùng V-ing sau các tính từ đòi hỏi to-infinitive. (❌ <i className="line-through">We are ready going.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He is famous for his creative ideas.</b> — Anh ấy nổi tiếng vì những ý tưởng sáng tạo của mình.</li>
          <li><b>She was afraid to tell her parents the truth.</b> — Cô ấy sợ phải nói sự thật cho bố mẹ.</li>
          <li><b>This material is similar to the one we used before.</b> — Vật liệu này tương tự như cái chúng ta đã dùng trước đây.</li>
          <li><b>It's very kind of you to help me.</b> — Bạn thật tốt bụng khi đã giúp tôi.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Hoàn thành các câu sau bằng cách điền giới từ hoặc 'to':</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I'm sorry ______ the noise.</li>
            <li>It was nice ______ meet you.</li>
            <li>He is very different ______ his brother.</li>
            <li>Are you ready ______ order?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}