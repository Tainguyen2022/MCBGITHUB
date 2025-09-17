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

export default function CoreSentenceNegative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🚫 <span className="underline decoration-4 decoration-amber-400">CÂU PHỦ ĐỊNH</span> — <i>Negative Sentences</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Học hai phương pháp chính để tạo câu phủ định: thêm 'not' sau trợ động từ có sẵn, hoặc dùng 'do-support' (do/does/did + not) cho động từ thường.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Với Trợ V có sẵn" formula="S + Aux + not + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Với V thường" formula="S + do/does/did + not + V(bare)" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#mechanism">1. Hai Cơ chế Chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#with-aux">2. Phủ định với Trợ động từ có sẵn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#do-support">3. Phủ định với "Do-support"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="mechanism" title="1. Hai Cơ chế Chính" emoji="⚙️">
        <p>
            Để tạo câu phủ định, bạn cần một <b>trợ động từ (Auxiliary Verb)</b> và từ <b>'not'</b>. Quy tắc rất đơn giản:
        </p>
        <ul className="list-disc pl-6">
            <li>Nếu câu khẳng định đã có sẵn trợ động từ (<b>be, have, will, can, should...</b>), hãy dùng chính nó.</li>
            <li>Nếu câu khẳng định chỉ có một động từ thường ở thì Hiện tại đơn hoặc Quá khứ đơn, bạn phải "mượn" trợ động từ <b>do, does,</b> hoặc <b>did</b>. Đây gọi là <b>"do-support"</b>.</li>
        </ul>
      </Section>
      
      <Section id="with-aux" title="2. Phủ định với Trợ động từ có sẵn" emoji="👍">
        <p>
            Đây là trường hợp đơn giản nhất. Chỉ cần đặt <b>'not'</b> ngay sau trợ động từ đầu tiên.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Cấu trúc: Subject + Auxiliary Verb + not + ...</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She <b>is</b> a doctor. → She <b>is not</b> (isn't) a doctor.</i></li>
            <li><i>He <b>can</b> swim. → He <b>cannot</b> (can't) swim.</i></li>
            <li><i>They <b>have</b> finished their work. → They <b>have not</b> (haven't) finished their work.</i></li>
            <li><i>I <b>will</b> be there. → I <b>will not</b> (won't) be there.</i></li>
        </ul>
      </Section>

       <Section id="do-support" title="3. Phủ định với 'Do-support'" emoji="🔧">
        <p>
            Áp dụng cho thì Hiện tại đơn và Quá khứ đơn khi không có trợ động từ nào khác.
        </p>
        <p className="font-bold mt-2 text-red-700">Quy tắc vàng: Sau khi dùng 'do/does/did + not', động từ chính luôn trở về dạng nguyên mẫu không 'to' (bare infinitive).</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200 mt-2">
            <p className="font-bold text-purple-700">Cấu trúc: Subject + do/does/did + not + V(bare)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He <b>works</b> hard. → He <b>does not work</b> hard.</i></li>
            <li><i>They <b>liked</b> the movie. → They <b>did not like</b> the movie.</i></li>
            <li><i>I <b>know</b> the answer. → I <b>do not know</b> the answer.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Dùng sai trợ động từ:</b> Dùng "do-support" khi đã có sẵn trợ động từ.
            <br/>❌ <i className="line-through">She doesn't be tired.</i> → ✅ She <b>isn't</b> tired.
          </li>
          <li><b>Không đưa động từ chính về dạng nguyên mẫu:</b>
            <br/>❌ <i className="line-through">She didn't went to school.</i> → ✅ She <b>didn't go</b> to school.
          </li>
          <li><b>Phủ định hai lần (Double Negative):</b>
            <br/>❌ <i className="line-through">I don't know nothing.</i> → ✅ I <b>don't know anything</b>. / I <b>know nothing</b>.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau ở dạng phủ định:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>He is a teacher.
            <br/>→ ____________________________________________</li>
            <li>They work in this office.
            <br/>→ ____________________________________________</li>
            <li>She can play the guitar.
            <br/>→ ____________________________________________</li>
             <li>I saw that movie last night.
            <br/>→ ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}