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

export default function CoreVerbNegationQuestions() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ❓ <span className="underline decoration-4 decoration-amber-400">PHỦ ĐỊNH & NGHI VẤN</span> — <i>Negation & Questions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu hai cơ chế chính để tạo câu phủ định và câu hỏi: dùng trợ động từ có sẵn (be, have, modals) và "mượn" trợ động từ "do/does/did" (do-support).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Phủ định (có Trợ V)" formula="S + Aux + not + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Nghi vấn (có Trợ V)" formula="Aux + S + V?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Phủ định (do-support)" formula="S + do/does not + V" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn (do-support)" formula="Do/Does + S + V?" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#mechanism">Hai Cơ chế Chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#with-aux">1. Với Trợ động từ có sẵn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#do-support">2. Với "Do-support"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#questions">Lưu ý về Câu hỏi Wh-</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="mechanism" title="Hai Cơ chế Chính" emoji="⚙️">
        <p>
            Trong tiếng Anh, để tạo câu phủ định và câu hỏi, bạn cần một <b>trợ động từ (Auxiliary Verb)</b>. Quy tắc rất đơn giản:
        </p>
        <ul className="list-disc pl-6">
            <li>Nếu câu đã có sẵn trợ động từ (<b>be, have, will, can, should...</b>), hãy dùng chính nó.</li>
            <li>Nếu câu chỉ có một động từ thường ở thì Hiện tại đơn hoặc Quá khứ đơn, bạn phải "mượn" trợ động từ <b>do, does,</b> hoặc <b>did</b>. Đây gọi là <b>"do-support"</b>.</li>
        </ul>
      </Section>
      
      <Section id="with-aux" title="1. Với Trợ động từ có sẵn (be, have, modals)" emoji="👍">
        <p>
            Đây là trường hợp đơn giản nhất.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">Phủ định: Thêm 'not'</p>
                <p>Đặt <b>'not'</b> ngay sau trợ động từ đầu tiên.</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><i>She <b>is</b> a doctor. → She <b>is not</b> (isn't) a doctor.</i></li>
                    <li><i>He <b>can</b> swim. → He <b>cannot</b> (can't) swim.</i></li>
                    <li><i>They <b>have</b> finished. → They <b>have not</b> (haven't) finished.</i></li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">Câu hỏi: Đảo ngữ (Inversion)</p>
                <p>Đảo trợ động từ đầu tiên lên trước chủ ngữ.</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><i>She <b>is</b> a doctor. → <b>Is</b> she a doctor?</i></li>
                     <li><i>He <b>can</b> swim. → <b>Can</b> he swim?</i></li>
                     <li><i>They <b>have</b> finished. → <b>Have</b> they finished?</i></li>
                </ul>
            </div>
        </div>
      </Section>

       <Section id="do-support" title="2. Với 'Do-support' (Động từ thường)" emoji="🔧">
        <p>
            Áp dụng cho thì Hiện tại đơn và Quá khứ đơn khi không có trợ động từ nào khác.
        </p>
        <p className="font-bold mt-2 text-red-700">Quy tắc vàng: Sau khi dùng 'do/does/did', động từ chính luôn trở về dạng nguyên mẫu không 'to' (bare infinitive).</p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">Phủ định: Thêm 'do/does/did + not'</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><i>He <b>works</b> hard. → He <b>does not work</b> hard.</i></li>
                    <li><i>They <b>liked</b> the movie. → They <b>did not like</b> the movie.</i></li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">Câu hỏi: Thêm 'Do/Does/Did'</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><i>He <b>works</b> hard. → <b>Does</b> he <b>work</b> hard?</i></li>
                     <li><i>They <b>liked</b> the movie. → <b>Did</b> they <b>like</b> the movie?</i></li>
                </ul>
            </div>
        </div>
      </Section>

       <Section id="questions" title="Lưu ý về Câu hỏi Wh-" emoji="❓">
        <p>
            Trật tự từ trong câu hỏi Wh- cũng tuân theo quy tắc đảo ngữ:
        </p>
        <p className="font-mono mt-2">Wh-word + Auxiliary + Subject + Main Verb?</p>
         <ul className="list-disc pl-6 mt-2">
            <li><i>Where <b>is</b> she going?</i> (Dùng trợ động từ có sẵn 'is')</li>
            <li><i>What <b>did</b> you see?</i> (Mượn trợ động từ 'did')</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            <b>Ngoại lệ:</b> Khi từ hỏi Wh- chính là chủ ngữ (who, what, which), không cần trợ động từ và không đảo ngữ.<br/>
            <i>e.g., <b>Who broke</b> the window? (Không phải "Who did break...")</i>
        </p>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên "do-support":</b> (❌ <i className="line-through">He no like coffee.</i>)</li>
          <li><b>Không đưa động từ chính về dạng nguyên mẫu:</b> (❌ <i className="line-through">Did he went?</i> / ❌ <i className="line-through">She doesn't works.</i>)</li>
          <li><b>Dùng "do-support" khi không cần thiết:</b> (❌ <i className="line-through">She doesn't be a doctor.</i>)</li>
          <li><b>Sai trật tự từ trong câu hỏi:</b> (❌ <i className="line-through">Where he is going?</i>)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau theo yêu cầu:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>(Phủ định) They have finished the project.
            <br/>→ ____________________________________________</li>
            <li>(Câu hỏi Yes/No) He works in a bank.
            <br/>→ ____________________________________________?</li>
            <li>(Phủ định) I saw him yesterday.
            <br/>→ ____________________________________________</li>
             <li>(Câu hỏi Wh-) She is going [to the library].
            <br/>→ Where ______________________________________?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}