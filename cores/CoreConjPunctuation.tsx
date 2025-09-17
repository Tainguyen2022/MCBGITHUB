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

export default function CoreConjunctionPunctuation() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✍️ <span className="underline decoration-4 decoration-amber-400">LIÊN TỪ & DẤU CÂU</span> — <i>Conjunctions & Punctuation</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tổng hợp các quy tắc dấu câu quan trọng nhất khi sử dụng các loại liên từ khác nhau để tránh các lỗi sai phổ biến như "comma splice".
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Coordinating" formula="IC, but IC." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Subordinating" formula="Because it rained, we left." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Conjunctive Adverb" formula="IC; however, IC." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#coordinating">Liên từ Kết hợp (FANBOYS)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#subordinating">Liên từ Phụ thuộc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#conjunctive">Trạng từ Liên kết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#summary">Bảng tóm tắt quy tắc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi "Comma Splice"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="coordinating" title="1. Liên từ Kết hợp (Coordinating Conjunctions - FANBOYS)" emoji="🔗">
        <p>Quy tắc phụ thuộc vào thành phần được nối.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Nối hai Mệnh đề Độc lập (IC):</b> Luôn dùng dấu phẩy <b>trước</b> liên từ.
                <p className="pl-4 text-sm text-gray-600"><i>The sun was shining<b>, but</b> it was still cold.</i></p>
            </li>
            <li><b>Nối hai từ hoặc cụm từ:</b> KHÔNG dùng dấu phẩy.
                 <br/><i>e.g., He is smart <b>and</b> funny.</i>
            </li>
            <li><b>Nối ba mục trở lên (trong danh sách):</b> Dùng dấu phẩy để ngăn cách các mục. Dấu phẩy cuối cùng trước "and" (Oxford comma) là tùy chọn nhưng được khuyến khích để rõ nghĩa.
                 <br/><i>e.g., We need to buy bread, cheese<b>, and</b> fruit.</i>
            </li>
        </ul>
      </Section>
      
       <Section id="subordinating" title="2. Liên từ Phụ thuộc (Subordinating Conjunctions)" emoji="⛓️">
        <p>Quy tắc phụ thuộc vào vị trí của mệnh đề phụ thuộc (DC).</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Khi Mệnh đề phụ thuộc (DC) đứng TRƯỚC:</b> Dùng dấu phẩy.
                <p className="pl-4 text-sm text-gray-600"><b className="font-mono">DC, IC.</b><br/><i><b>Although he was tired,</b> he finished the race.</i></p>
            </li>
            <li><b>Khi Mệnh đề phụ thuộc (DC) đứng SAU:</b> KHÔNG dùng dấu phẩy.
                <p className="pl-4 text-sm text-gray-600"><b className="font-mono">IC DC.</b><br/><i>He finished the race <b>although he was tired</b>.</i></p>
            </li>
        </ul>
      </Section>
      
      <Section id="conjunctive" title="3. Trạng từ Liên kết (Conjunctive Adverbs)" emoji="🔄">
        <p>Đây là trường hợp có quy tắc dấu câu nghiêm ngặt nhất vì chúng nối hai câu hoàn chỉnh.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Cách 1: Dùng Dấu chấm phẩy (;).</b> Đây là cách nối hai mệnh đề thành một câu ghép.
                <p className="pl-4 text-sm text-gray-600"><b className="font-mono">IC; adverb, IC.</b><br/><i>The traffic was heavy<b>; however,</b> we arrived on time.</i></p>
            </li>
            <li><b>Cách 2: Dùng Dấu chấm (.).</b> Tách thành hai câu riêng biệt.
                <p className="pl-4 text-sm text-gray-600"><b className="font-mono">IC. Adverb, IC.</b><br/><i>The traffic was heavy<b>. However,</b> we arrived on time.</i></p>
            </li>
        </ul>
      </Section>
      
      <Section id="summary" title="Bảng tóm tắt quy tắc" emoji="📜">
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Loại liên từ</th>
                        <th className="border p-2 text-left">Cấu trúc</th>
                        <th className="border p-2 text-left">Dấu câu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2 font-semibold">Coordinating (FANBOYS)</td><td className="border p-2">IC, but IC.</td><td className="border p-2"><b>Dấu phẩy</b> trước liên từ</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-semibold">Subordinating (DC trước)</td><td className="border p-2">Because..., IC.</td><td className="border p-2"><b>Dấu phẩy</b> sau DC</td></tr>
                     <tr><td className="border p-2 font-semibold">Subordinating (DC sau)</td><td className="border p-2">IC because...</td><td className="border p-2"><b>Không</b> có dấu phẩy</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-semibold">Conjunctive Adverb</td><td className="border p-2">IC; however, IC.</td><td className="border p-2"><b>Dấu chấm phẩy</b> trước, <b>dấu phẩy</b> sau</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi 'Comma Splice'" emoji="🚫">
        <p>
            <b>Comma Splice</b> là lỗi dùng một dấu phẩy để nối hai mệnh đề độc lập mà không có liên từ kết hợp (FANBOYS). Đây là một trong những lỗi ngữ pháp phổ biến nhất trong văn viết.
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li><b>SAI:</b> <i>He is a great leader, everyone respects him.</i></li>
            <li><b>SỬA:</b>
                <ul className="list-circle pl-5">
                    <li><i>He is a great leader<b>, so</b> everyone respects him.</i> (Dùng FANBOYS)</li>
                    <li><i>He is a great leader<b>;</b> everyone respects him.</i> (Dùng dấu chấm phẩy)</li>
                    <li><i>He is a great leader<b>.</b> Everyone respects him.</i> (Tách thành 2 câu)</li>
                    <li><i><b>Because</b> he is a great leader, everyone respects him.</i> (Dùng liên từ phụ thuộc)</li>
                </ul>
            </li>
        </ul>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dấu câu đúng (phẩy, chấm phẩy, hoặc không) vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She wanted to leave early __ but she had too much work to do.</li>
            <li>Although the test was difficult __ I think I did well.</li>
            <li>He forgot his wallet __ therefore __ he couldn't buy lunch.</li>
            <li>I'll wait here __ until you get back.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}