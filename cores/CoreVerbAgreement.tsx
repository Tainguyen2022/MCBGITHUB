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

export default function CoreVerbAgreement() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🤝 <span className="underline decoration-4 decoration-amber-400">SỰ HÒA HỢP & DO-SUPPORT</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Nắm vững hai quy tắc nền tảng của ngữ pháp tiếng Anh: động từ phải "hòa hợp" với chủ ngữ, và cách dùng trợ động từ "do/does/did" để tạo câu hỏi và phủ định.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Hòa hợp (Số ít)" formula="He works" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Hòa hợp (Số nhiều)" formula="They work" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Phủ định (do-support)" formula="He doesn't work" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nghi vấn (do-support)" formula="Do you work?" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#agreement">1. Sự hòa hợp Chủ ngữ - Động từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#special-cases">2. Các trường hợp Chủ ngữ Đặc biệt</a></li>
            <li><a className="text-rose-700 hover:underline" href="#do-support">3. "Do-support" là gì?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#neg-q">4. Do-support trong Phủ định & Câu hỏi</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">5. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="agreement" title="1. Sự hòa hợp Chủ ngữ - Động từ" emoji="✅">
        <p>
            Đây là quy tắc cơ bản nhất: động từ phải thay đổi hình thức để "hòa hợp" với chủ ngữ của nó về mặt số (ít hay nhiều).
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Chủ ngữ số ít (he, she, it, the cat):</b> Động từ ở thì hiện tại đơn thêm <b>-s</b> hoặc <b>-es</b>.
                <br/><i>e.g., The sun <b>rises</b> in the east. / She <b>speaks</b> three languages.</i>
            </li>
            <li><b>Chủ ngữ số nhiều (they, we, the cats):</b> Động từ ở dạng nguyên mẫu.
                <br/><i>e.g., The stars <b>shine</b> brightly. / My parents <b>live</b> in the countryside.</i>
            </li>
            <li>('I' và 'you' là trường hợp đặc biệt, luôn đi với động từ dạng nguyên mẫu: <i>I <b>work</b>, you <b>work</b>.</i>)</li>
        </ul>
      </Section>
      
      <Section id="special-cases" title="2. Các trường hợp Chủ ngữ Đặc biệt" emoji="🧐">
        <ul className="list-disc pl-6 space-y-2">
            <li><b>Chủ ngữ ghép với 'and':</b> Thường là số nhiều.
                <br/><i>e.g., Tom and Jerry <b>are</b> famous characters.</i>
            </li>
             <li><b>Chủ ngữ ghép với 'or'/'nor':</b> Động từ hòa hợp với chủ ngữ gần nhất.
                <br/><i>e.g., Either the students or the <u>teacher</u> <b>is</b> responsible.</i>
                <br/><i>e.g., Neither the teacher nor the <u>students</u> <b>are</b> responsible.</i>
            </li>
             <li><b>Đại từ bất định:</b> Các từ như 'everyone', 'somebody', 'anything', 'each' luôn là số ít.
                <br/><i>e.g., <b>Everyone needs</b> to be quiet.</i>
            </li>
             <li><b>Cụm từ ngăn cách chủ ngữ và động từ:</b> Động từ phải hòa hợp với chủ ngữ chính, không phải danh từ trong cụm từ đó.
                <br/><i>e.g., The <u>box</u> of apples <b>is</b> on the table. (Động từ hòa hợp với 'box', không phải 'apples')</i>
            </li>
        </ul>
      </Section>

      <Section id="do-support" title="3. 'Do-support' là gì?" emoji="❓">
        <p>
            Trong tiếng Anh, các động từ thường (trừ 'to be' và các modal verbs) không thể tự tạo câu phủ định hoặc câu hỏi. Chúng cần một "trợ động từ" (auxiliary verb) để "hỗ trợ". Trợ động từ cho các thì đơn chính là <b>do, does, did</b>.
        </p>
      </Section>
      
      <Section id="neg-q" title="4. Do-support trong Phủ định & Câu hỏi" emoji="🔧">
        <p>
            Khi "do/does/did" xuất hiện, động từ chính luôn trở về dạng <b>nguyên mẫu không 'to' (bare infinitive)</b>.
        </p>
         <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">Phủ định</p>
                <p className="font-mono mt-1">S + do/does/did + not + V(bare)</p>
                <ul className="list-disc pl-5 mt-1">
                    <li>He likes coffee. → He <b>does not like</b> coffee.</li>
                    <li>They went home. → They <b>did not go</b> home.</li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">Câu hỏi</p>
                <p className="font-mono mt-1">Do/Does/Did + S + V(bare)?</p>
                <ul className="list-disc pl-5 mt-1">
                     <li>She lives here. → <b>Does</b> she <b>live</b> here?</li>
                     <li>You saw him. → <b>Did</b> you <b>see</b> him?</li>
                </ul>
            </div>
        </div>
      </Section>
      
      <Section id="pitfalls" title="5. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Quên thêm -s/-es cho chủ ngữ số ít ở thì hiện tại đơn.</li>
          <li>Động từ hòa hợp với danh từ gần nhất thay vì chủ ngữ chính.</li>
          <li>Vẫn chia động từ chính sau khi đã dùng 'do/does/did'. (❌ <i className="line-through">He doesn't works here.</i>)</li>
        </ol>
      </Section>

      <Section id="drill" title="6. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn dạng đúng của động từ hoặc viết lại câu:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Each of the students (has/have) a textbook.</li>
            <li>The quality of these products (is/are) very high.</li>
            <li>(Viết lại phủ định) She finished her homework.
            <br/>→ ____________________________________________</li>
             <li>(Viết lại câu hỏi) They play football on Sundays.
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