
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
        // Vertical layout, aligned to the start
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Label (smaller) - NO truncate */}
      <span className="text-sm font-semibold text-white/80">{label}</span>
      
      {/* Formula (larger) - NO truncate, allow word breaking */}
      <span className="break-words">{formula}</span>

      {/* Copied toast */}
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

export default function CoreCompoundSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🔗 <span className="underline decoration-4 decoration-amber-400">CÂU GHÉP</span> — Compound Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là câu chứa từ <b>hai mệnh đề độc lập trở lên</b>, được nối với nhau bằng liên từ kết hợp (coordinators) hoặc dấu chấm phẩy (;).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="Dùng Liên từ (FANBOYS)" formula="IC, for/and/but... IC" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Dùng Dấu chấm phẩy" formula="IC; IC" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Dùng Trạng từ liên kết" formula="IC; however, IC" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Đặc điểm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#fanboys">7 Liên từ Kết hợp (FANBOYS)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc dấu câu (Quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp (Comma Splice)</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Đặc điểm" emoji="📖">
        <p>
          <b>Câu ghép</b> (Compound Sentence) nối hai hoặc nhiều ý tưởng hoàn chỉnh (mệnh đề độc lập) có tầm quan trọng ngang nhau về mặt ngữ pháp.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Mệnh đề độc lập (Independent Clause - IC):</b> Là một câu đơn hoàn chỉnh (có S + V) có thể đứng một mình.</li>
          <li><b>Ví dụ:</b> <i>[The cat sleeps]</i>, and <i>[the dog plays]</i>. Cả hai vế đều có thể đứng một mình làm câu.</li>
          <li>Câu ghép giúp tạo sự liên kết chặt chẽ về mặt ý nghĩa giữa các câu đơn, tránh làm cho đoạn văn bị rời rạc.</li>
        </ul>
      </Section>

      <Section id="fanboys" title="7 Liên từ Kết hợp (FANBOYS)" emoji="🤝">
        <p>Đây là cách phổ biến nhất để tạo câu ghép. Mẹo nhớ: <b>F-A-N-B-O-Y-S</b>.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">F</b>or (Vì): Giải thích nguyên nhân. Trang trọng, tương tự 'because'. <i>e.g., I went to bed, <b>for</b> I was tired.</i></div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">A</b>nd (Và): Thêm thông tin, nối các ý tương đồng. <i>e.g., He cooked dinner, <b>and</b> she washed the dishes.</i></div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">N</b>or (Cũng không): Nối hai ý phủ định. Mệnh đề thứ hai phải đảo ngữ. <i>e.g., He doesn't drink, <b>nor</b> does he smoke.</i></div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">B</b>ut (Nhưng): Chỉ sự đối lập, tương phản. <i>e.g., The book is long, <b>but</b> it is interesting.</i></div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">O</b>r (Hoặc): Đưa ra lựa chọn, khả năng. <i>e.g., We can watch a movie, <b>or</b> we can go for a walk.</i></div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Y</b>et (Tuy nhiên): Chỉ sự đối lập, tương phản (tương tự 'but'). <i>e.g., It was raining, <b>yet</b> he went out without an umbrella.</i></div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">S</b>o (Vì vậy): Chỉ kết quả, hệ quả. <i>e.g., She studied hard, <b>so</b> she passed the exam.</i></div>
        </div>
      </Section>

      <Section id="punctuation" title="Quy tắc dấu câu (Quan trọng!)" emoji="⚠️">
        <ul className="list-disc pl-6 space-y-2">
            <li><b>Dùng dấu phẩy (,) trước FANBOYS:</b> Khi nối hai mệnh đề độc lập, luôn đặt dấu phẩy trước liên từ.
                <p className="pl-4 text-sm text-gray-600"><i>He studied hard<b className="text-red-500">, so</b> he passed the exam.</i></p>
            </li>
            <li><b>Dùng dấu chấm phẩy (;):</b> Có thể dùng để nối hai mệnh đề độc lập rất gần gũi về ý nghĩa mà không cần liên từ. Đây là một cách viết nâng cao.
                <p className="pl-4 text-sm text-gray-600"><i>She is a talented musician<b className="text-red-500">;</b> she plays three instruments.</i></p>
            </li>
            <li><b>Dùng dấu chấm phẩy (;) và trạng từ liên kết:</b> Trạng từ liên kết (however, therefore,...) cũng nối hai mệnh đề độc lập nhưng đòi hỏi dấu câu khác.
                <p className="pl-4 text-sm text-gray-600"><i>I planned to go hiking<b className="text-red-500">; however,</b> it rained all day.</i></p>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp (Comma Splice)" emoji="🚫">
        <p className="mt-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
            <b>Lỗi sai phổ biến nhất (Comma Splice):</b> Chỉ dùng dấu phẩy để nối 2 mệnh đề độc lập mà không có liên từ FANBOYS.<br/>
            ❌ <i>The cat sleeps, the dog plays.</i>
            <br/><br/>
            <b>Cách sửa:</b><br/>
            ✅ <i>The cat sleeps<b>, and</b> the dog plays.</i> (Dùng FANBOYS)<br/>
            ✅ <i>The cat sleeps<b>;</b> the dog plays.</i> (Dùng dấu chấm phẩy)<br/>
            ✅ <i>The cat sleeps<b>.</b> The dog plays.</i> (Tách thành 2 câu)
        </p>
      </Section>
      
      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
