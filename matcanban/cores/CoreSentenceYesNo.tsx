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

export default function CoreSentenceYesNo() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ❓ <span className="underline decoration-4 decoration-amber-400">CÂU HỎI YES/NO</span> — <i>Yes/No Questions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là dạng câu hỏi có câu trả lời là "Yes" hoặc "No". Chúng được hình thành bằng cách <b>đảo ngữ (inversion)</b> - đảo trợ động từ lên trước chủ ngữ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Với Trợ V có sẵn" formula="Aux + S + ...?" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Với V thường" formula="Do/Does/Did + S + V(bare)?" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#rule">1. Quy tắc Vàng: Đảo ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#with-aux">2. Với Trợ động từ có sẵn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#do-support">3. Với "Do-support"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#short-answers">4. Câu trả lời ngắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">5. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="rule" title="1. Quy tắc Vàng: Đảo ngữ (Inversion)" emoji="🔄">
        <p>
            Nguyên tắc cốt lõi để tạo câu hỏi Yes/No là <b>đảo vị trí</b> của chủ ngữ (Subject) và trợ động từ (Auxiliary Verb) đầu tiên.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Cấu trúc chung:</p>
            <p className="font-mono mt-2">Câu khẳng định: Subject + <b>Auxiliary</b> + Main Verb ...</p>
            <p className="font-mono mt-2">Câu hỏi Yes/No: <b>Auxiliary</b> + Subject + Main Verb ...?</p>
        </div>
      </Section>
      
      <Section id="with-aux" title="2. Với Trợ động từ có sẵn (be, have, modals)" emoji="👍">
        <p>
            Nếu câu đã có sẵn trợ động từ, chỉ cần đảo nó lên trước chủ ngữ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She <b>is</b> a doctor. → <b>Is</b> she a doctor?</i></li>
            <li><i>They <b>have</b> finished the project. → <b>Have</b> they finished the project?</i></li>
            <li><i>He <b>can</b> swim. → <b>Can</b> he swim?</i></li>
            <li><i>It <b>will</b> rain tomorrow. → <b>Will</b> it rain tomorrow?</i></li>
        </ul>
      </Section>

       <Section id="do-support" title="3. Với 'Do-support' (Động từ thường)" emoji="🔧">
        <p>
            Khi câu chỉ có động từ thường ở thì Hiện tại đơn hoặc Quá khứ đơn, ta phải "mượn" <b>do, does,</b> hoặc <b>did</b> đặt ở đầu câu.
        </p>
        <p className="font-bold mt-2 text-red-700">Quy tắc vàng: Sau khi dùng 'Do/Does/Did', động từ chính luôn trở về dạng nguyên mẫu không 'to' (bare infinitive).</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>You <b>like</b> coffee. → <b>Do</b> you <b>like</b> coffee?</i></li>
            <li><i>She <b>works</b> here. → <b>Does</b> she <b>work</b> here?</i></li>
            <li><i>They <b>went</b> home. → <b>Did</b> they <b>go</b> home?</i></li>
        </ul>
      </Section>
      
       <Section id="short-answers" title="4. Câu trả lời ngắn (Short Answers)" emoji="💬">
        <p>
            Để trả lời câu hỏi Yes/No một cách tự nhiên, ta dùng câu trả lời ngắn thay vì lặp lại cả câu.
        </p>
         <div className="rounded-xl p-4 bg-green-50 border border-green-200">
            <p className="font-bold text-green-700">Cấu trúc: Yes/No, + Subject Pronoun + Auxiliary.</p>
        </div>
        <p className="mt-2">Trợ động từ trong câu trả lời phải tương ứng với trợ động từ trong câu hỏi.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i><b>Are</b> you ready? → Yes, I <b>am</b>. / No, I'<b>m not</b>.</i></li>
            <li><i><b>Does</b> he live here? → Yes, he <b>does</b>. / No, he <b>doesn't</b>.</i></li>
            <li><i><b>Have</b> you seen it? → Yes, I <b>have</b>. / No, I <b>haven't</b>.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="5. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Không đảo ngữ:</b> Dùng giọng điệu lên ở cuối câu như trong văn nói. (❌ <i className="line-through">You are tired?</i>)</li>
          <li><b>Không đưa động từ chính về dạng nguyên mẫu:</b> (❌ <i className="line-through">Did she finished her work?</i>)</li>
          <li><b>Dùng "do-support" khi không cần thiết:</b> (❌ <i className="line-through">Do you can swim?</i>)</li>
        </ol>
      </Section>

      <Section id="drill" title="6. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu sau thành câu hỏi Yes/No:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She is from Canada.
            <br/>→ ____________________________________________?</li>
            <li>They play tennis every weekend.
            <br/>→ ____________________________________________?</li>
            <li>He has visited Paris.
            <br/>→ ____________________________________________?</li>
             <li>She saw the movie last night.
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