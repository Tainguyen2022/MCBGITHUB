
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

export default function CoreConjCorrelative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
         🤝 <span className="underline decoration-4 decoration-amber-400">LIÊN TỪ TƯƠNG QUAN</span> — <i>Correlative Conjunctions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là những cặp liên từ luôn đi cùng nhau để nối các thành phần ngữ pháp tương đương trong câu.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cả... và..." formula="both... and..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Hoặc... hoặc..." formula="either... or..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Không... cũng không..." formula="neither... nor..." colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Không những... mà còn..." formula="not only... but also..." colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">1. Liên từ Tương quan là gì?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#parallelism">2. Quy tắc Vàng: Cấu trúc Song song</a></li>
            <li><a className="text-rose-700 hover:underline" href="#agreement">3. Quy tắc Hòa hợp Chủ ngữ-Động từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">5. Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="1. Liên từ Tương quan là gì?" emoji="🎯">
        <p>
            <b>Liên từ tương quan (Correlative Conjunctions)</b> là những cặp liên từ luôn đi cùng nhau để nối các thành phần ngữ pháp có chức năng và cấu trúc tương đương nhau trong một câu.
        </p>
        <p className="font-bold mt-2">Các cặp phổ biến:</p>
        <ul className="list-disc pl-6">
            <li><b>both ... and ...</b> (cả ... và ...)</li>
            <li><b>either ... or ...</b> (hoặc ... hoặc ...)</li>
            <li><b>neither ... nor ...</b> (không ... cũng không ...)</li>
            <li><b>not only ... but also ...</b> (không những ... mà còn ...)</li>
            <li><b>whether ... or ...</b> (liệu ... hay ...)</li>
            <li><b>as ... as ...</b> (bằng ... như ...)</li>
        </ul>
      </Section>
      
       <Section id="parallelism" title="2. Quy tắc Vàng: Cấu trúc Song song (Parallelism)" emoji="⛓️">
        <p>
            Đây là quy tắc quan trọng nhất. Cấu trúc ngữ pháp theo sau mỗi phần của cặp liên từ phải giống hệt nhau.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Nối Danh từ:</b> She likes <b>both</b> <u>apples</u> <b>and</b> <u>oranges</u>.</li>
            <li><b>Nối Tính từ:</b> He is <b>not only</b> <u>smart</u> <b>but also</b> <u>funny</u>.</li>
            <li><b>Nối Cụm giới từ:</b> You can find the book <b>either</b> <u>on the table</u> <b>or</b> <u>in the drawer</u>.</li>
            <li><b>Nối Mệnh đề:</b> <b>Not only</b> <u>did he arrive late</u>, <b>but he also</b> <u>forgot his wallet</u>.</li>
        </ul>
         <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-bold text-red-700">Lỗi sai phổ biến:</p>
            <p>❌ <i>He is not only famous <b>but also</b> a great actor.</i> (Tính từ vs. Cụm danh từ)</p>
            <p className="font-bold text-green-700 mt-1">Cách sửa:</p>
            <p>✅ <i>He is not only <u>famous</u> <b>but also</b> <u>talented</u>.</i> (Tính từ // Tính từ)</p>
            <p>✅ <i>He is not only <u>a famous person</u> <b>but also</b> <u>a great actor</u>.</i> (Cụm danh từ // Cụm danh từ)</p>
        </div>
      </Section>

      <Section id="agreement" title="3. Quy tắc Hòa hợp Chủ ngữ-Động từ" emoji="✍️">
        <p>
            Khi dùng <b>either...or</b> hoặc <b>neither...nor</b> để nối hai chủ ngữ, động từ sẽ chia theo chủ ngữ đứng <b>gần nó nhất</b> (Proximity Rule).
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><i><b>Neither</b> my brother <b>nor</b> my <u>sisters</u> <b>want</b> to go.</i> (Động từ "want" chia theo "sisters")</li>
            <li><i><b>Neither</b> my sisters <b>nor</b> my <u>brother</u> <b>wants</b> to go.</i> (Động từ "wants" chia theo "brother")</li>
            <li><i><b>Either</b> you <b>or</b> <u>I</u> <b>am</b> wrong.</i> (Động từ "am" chia theo "I")</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            <b>Lưu ý:</b> Với <b>both...and...</b>, chủ ngữ luôn là số nhiều. <i><b>Both</b> he <b>and</b> she <b>are</b> coming.</i>
        </p>
      </Section>
      
      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Vi phạm cấu trúc song song. Đây là lỗi phổ biến và nghiêm trọng nhất.</li>
          <li>Chia sai động từ với "either...or" và "neither...nor".</li>
          <li>Dùng sai cặp: Dùng "neither...or" hoặc "either...nor".</li>
          <li>Quên đảo ngữ: Khi "Not only" đứng đầu câu, mệnh đề đầu tiên phải đảo ngữ.
            <br/><i>e.g., <b>Not only is he</b> intelligent, but he is also kind.</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="5. Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>You can have either tea or coffee.</b> — Bạn có thể dùng hoặc là trà hoặc là cà phê.</li>
          <li><b>Neither the players nor the coach was happy with the result.</b> — Cả các cầu thủ lẫn huấn luyện viên đều không hài lòng với kết quả.</li>
          <li><b>He is not only a talented musician but also a brilliant composer.</b> — Anh ấy không chỉ là một nhạc sĩ tài năng mà còn là một nhà soạn nhạc xuất sắc.</li>
          <li><b>I'm not sure whether I should stay or go.</b> — Tôi không chắc liệu tôi nên ở lại hay ra đi.</li>
        </ol>
      </Section>
      
      <Section id="drill" title="6. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Hoàn thành các câu sau bằng cách điền từ và chia động từ đúng:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>______ my uncle ______ my aunt is coming to the party. (neither/nor)</li>
            <li>She can ______ speak English ______ French fluently. (not only/but also)</li>
            <li>______ you ______ your friends have to clean this mess. (either/or)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
