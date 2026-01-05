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

export default function CoreVerbEllipsis() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✂️ <span className="underline decoration-4 decoration-amber-400">LƯỢC BỎ & TRỢ ĐỘNG TỪ 'DO'</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu cách làm cho câu trả lời và so sánh trở nên ngắn gọn, tự nhiên bằng cách lược bỏ các thành phần lặp lại (ellipsis) và dùng 'do/does/did' để thay thế.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Với Trợ V có sẵn" formula="Are you ready? → Yes, I am." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Với 'do-support'" formula="Do you agree? → Yes, I do." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Trong So sánh" formula="He works harder than I do." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa Ellipsis</a></li>
            <li><a className="text-rose-700 hover:underline" href="#short-answers">1. Lược bỏ trong Câu trả lời ngắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparisons">2. Lược bỏ trong So sánh</a></li>
            <li><a className="text-rose-700 hover:underline" href="#so-neither">3. Lược bỏ với 'so' và 'neither'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa Ellipsis" emoji="🎯">
        <p>
            <b>Ellipsis (Lược bỏ)</b> là hiện tượng ngữ pháp trong đó một hoặc nhiều từ được lược bỏ khỏi một câu để tránh sự lặp lại không cần thiết. Câu vẫn giữ nguyên ý nghĩa vì các từ bị thiếu có thể được suy ra từ ngữ cảnh.
        </p>
        <p><b>Pro-verb 'do'</b> là việc sử dụng các dạng của 'do' (do, does, did) để thay thế cho cả một cụm động từ đã được nhắc đến trước đó.</p>
      </Section>
      
      <Section id="short-answers" title="1. Lược bỏ trong Câu trả lời ngắn (Short Answers)" emoji="💬">
        <p>
            Đây là trường hợp sử dụng ellipsis phổ biến nhất. Thay vì lặp lại toàn bộ động từ, chúng ta chỉ giữ lại trợ động từ.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Khi câu hỏi có trợ động từ (be, have, will, can...):</b>
                <br/><i>Q: Have you finished your homework?</i>
                <br/><i>A: Yes, I <b>have</b>. (thay vì "Yes, I have finished my homework.")</i>
            </li>
            <li><b>Khi câu hỏi dùng 'do-support':</b>
                <br/><i>Q: Do you like spicy food?</i>
                <br/><i>A: No, I <b>don't</b>. (thay vì "No, I don't like spicy food.")</i>
            </li>
             <li><b>Trong câu hỏi đuôi (Tag Questions):</b>
                <br/><i>She works here, <b>doesn't she</b>? — Yes, she <b>does</b>.</i>
            </li>
        </ul>
      </Section>

       <Section id="comparisons" title="2. Lược bỏ trong So sánh" emoji="⚖️">
        <p>
            Để tránh lặp lại động từ trong mệnh đề so sánh, chúng ta cũng dùng trợ động từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He runs faster than I <b>do</b>. (= than I run)</i></li>
            <li><i>She is more qualified than he <b>is</b>. (= than he is qualified)</i></li>
            <li><i>They've worked here longer than we <b>have</b>. (= than we have worked here)</i></li>
        </ul>
      </Section>

       <Section id="so-neither" title="3. Lược bỏ với 'so' và 'neither/nor'" emoji="👯">
        <p>
            Cấu trúc này được dùng để thể hiện sự đồng tình, cũng dùng trợ động từ và đảo ngữ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Đồng tình khẳng định: so + Aux + S</b>
                 <br/><i>A: I am tired. / B: <b>So am I</b>.</i>
                 <br/><i>A: She works hard. / B: <b>So does he</b>.</i>
            </li>
            <li><b>Đồng tình phủ định: neither/nor + Aux + S</b>
                 <br/><i>A: I can't swim. / B: <b>Neither can I</b>.</i>
                 <br/><i>A: He didn't go. / B: <b>Nor did we</b>.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng sai trợ động từ. (❌ <i>A: Do you like tea? B: Yes, I like.</i> → ✅ Yes, I <b>do</b>.)</li>
          <li>Lược bỏ cả trợ động từ. (❌ <i>A: Is he coming? B: Yes, he.</i> → ✅ Yes, he <b>is</b>.)</li>
        </ol>
      </Section>
      
      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Hoàn thành các câu trả lời/câu sau bằng cách dùng trợ động từ phù hợp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>A: Did you enjoy the film? B: Yes, I ______.</li>
            <li>A: Can you speak French? B: No, I ______.</li>
            <li>She works much harder than I ______.</li>
            <li>A: I haven't seen that movie. B: Neither ______ I.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}