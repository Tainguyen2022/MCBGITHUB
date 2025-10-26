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

export default function CorePrepositionsDependent() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔗 <span className="underline decoration-4 decoration-amber-400">GIỚI TỪ PHỤ THUỘC</span> — <i>Dependent Prepositions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Nhiều động từ, danh từ và tính từ trong tiếng Anh yêu cầu một giới từ cụ thể đi kèm. Các cụm từ này (collocations) cần được học thuộc lòng.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Verb + Preposition" formula="depend on" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Adjective + Preposition" formula="interested in" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Noun + Preposition" formula="a reason for" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#verb-prep">Verb + Preposition</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adj-prep">Adjective + Preposition</a></li>
            <li><a className="text-rose-700 hover:underline" href="#noun-prep">Noun + Preposition</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule">Quy tắc Vàng: Gerund (V-ing)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>
      
      <Section id="verb-prep" title="Verb + Preposition" emoji="🗣️">
        <p>
            Nhiều động từ cần một giới từ cụ thể để nối với tân ngữ của nó.
        </p>
         <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>believe in:</b> tin tưởng vào</p>
                <p><b>depend on:</b> phụ thuộc vào</p>
                <p><b>listen to:</b> lắng nghe</p>
                <p><b>apologize for:</b> xin lỗi vì</p>
                 <p><b>concentrate on:</b> tập trung vào</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>complain about:</b> phàn nàn về</p>
                <p><b>succeed in:</b> thành công trong việc</p>
                <p><b>insist on:</b> khăng khăng, nằng nặc</p>
                <p><b>rely on:</b> tin cậy, dựa vào</p>
                <p><b>refer to:</b> tham khảo, đề cập đến</p>
            </div>
        </div>
      </Section>

      <Section id="adj-prep" title="Adjective + Preposition" emoji="🎨">
        <p>
            Tương tự, nhiều tính từ cũng có giới từ đi kèm cố định. (Xem thêm bài 'Adjective + Preposition' để có danh sách đầy đủ).
        </p>
        <ul className="list-disc pl-6">
            <li><b>good at, bad at:</b> giỏi về, tệ về</li>
            <li><b>interested in:</b> quan tâm đến</li>
            <li><b>afraid of, scared of:</b> sợ hãi</li>
            <li><b>famous for:</b> nổi tiếng về</li>
            <li><b>proud of:</b> tự hào về</li>
            <li><b>different from:</b> khác với</li>
        </ul>
      </Section>
      
      <Section id="noun-prep" title="Noun + Preposition" emoji="📚">
        <p>
            Một số danh từ cũng cần giới từ để kết nối với các danh từ hoặc cụm từ khác.
        </p>
         <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>a reason for:</b> một lý do cho</p>
                <p><b>an advantage of:</b> một lợi thế của</p>
                <p><b>a solution to:</b> một giải pháp cho</p>
                <p><b>an interest in:</b> sự quan tâm đến</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>a cause of:</b> một nguyên nhân của</p>
                <p><b>a demand for:</b> một nhu cầu cho</p>
                <p><b>a relationship with:</b> một mối quan hệ với</p>
                <p><b>an effect on:</b> một ảnh hưởng lên</p>
            </div>
        </div>
      </Section>
      
      <Section id="rule" title="Quy tắc Vàng: Gerund (V-ing)" emoji="🔑">
        <p>
            Khi một động từ đi ngay sau một giới từ (bất kể là giới từ gì), động từ đó <b>luôn phải ở dạng V-ing (gerund)</b>.
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li><i>She apologized <b>for being</b> late.</i></li>
            <li><i>I'm interested <b>in learning</b> a new skill.</i></li>
            <li><i>He insisted <b>on paying</b> for the meal.</i></li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>You can't rely on the weather being good.</b> — Bạn không thể tin cậy vào việc thời tiết sẽ tốt được.</li>
          <li><b>What is the main reason for this decision?</b> — Lý do chính cho quyết định này là gì?</li>
          <li><b>He is very proud of his daughter's success.</b> — Ông ấy rất tự hào về thành công của con gái mình.</li>
          <li><b>I need to concentrate on my studies this weekend.</b> — Tôi cần tập trung vào việc học vào cuối tuần này.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền giới từ đúng vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Are you interested ______ modern art?</li>
            <li>She complained ______ the manager about the poor service.</li>
            <li>What is the solution ______ this problem?</li>
            <li>My final grade depends ______ the exam result.</li>
            <li>He succeeded ______ convincing his boss to give him a raise.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}