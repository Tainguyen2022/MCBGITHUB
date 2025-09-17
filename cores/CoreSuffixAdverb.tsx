
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

export default function CoreSuffixAdverb() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🏃‍♀️ <span className="underline decoration-4 decoration-amber-400">HẬU TỐ TRẠNG TỪ</span> — <i>Adverb Suffixes</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Hầu hết các trạng từ chỉ cách thức (adverbs of manner) được thành lập bằng cách thêm đuôi <b>-ly</b> vào sau tính từ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Quy tắc chung" formula="Adjective + ly" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="y → ily" formula="happy → happily" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Bất quy tắc" formula="good → well" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Không đổi" formula="fast → fast" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#spelling">Quy tắc Chính tả đuôi "-ly"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#irregular">Trạng từ Bất quy tắc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#special-cases">Các trường hợp đặc biệt</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Chức năng" emoji="🎯">
        <p>
            Hậu tố trạng từ, chủ yếu là <b>-ly</b>, biến một tính từ (mô tả danh từ) thành một trạng từ (mô tả động từ). Chúng trả lời cho câu hỏi "How?" - Hành động được thực hiện như thế nào?
        </p>
         <ul className="list-disc pl-6">
            <li><i>She is a <b>slow</b> driver.</i> (tính từ 'slow' mô tả danh từ 'driver')</li>
            <li><i>She drives <b>slowly</b>.</i> (trạng từ 'slowly' mô tả động từ 'drives')</li>
        </ul>
      </Section>

      <Section id="spelling" title="Quy tắc Chính tả đuôi '-ly'" emoji="✍️">
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Quy tắc chung:</b> Thêm -ly vào cuối tính từ.
                <br/><i>e.g., quick → quick<b>ly</b>; careful → careful<b>ly</b>; beautiful → beautiful<b>ly</b>.</i>
            </li>
            <li><b>Tận cùng bằng -y:</b> Đổi -y thành -i rồi thêm -ly.
                <br/><i>e.g., happy → happ<b>ily</b>; easy → eas<b>ily</b>.</i>
            </li>
            <li><b>Tận cùng bằng -le:</b> Bỏ -e và thêm -y.
                <br/><i>e.g., simple → simp<b>ly</b>; terrible → terrib<b>ly</b>.</i>
            </li>
             <li><b>Tận cùng bằng -ic:</b> Thêm -ally (thường lệ).
                <br/><i>e.g., basic → basic<b>ally</b>; automatic → automatic<b>ally</b>. (Ngoại lệ: public → publicly).</i>
            </li>
        </ul>
      </Section>

      <Section id="irregular" title="Trạng từ Bất quy tắc" emoji="✨">
          <p>Một số trạng từ không được hình thành bằng cách thêm -ly.</p>
           <ul className="list-disc pl-6">
            <li><b>good → well</b></li>
            <li><b>fast → fast</b> (không có 'fastly')</li>
            <li><b>hard → hard</b></li>
            <li><b>late → late</b></li>
            <li><b>early → early</b></li>
          </ul>
      </Section>

      <Section id="special-cases" title="Các trường hợp đặc biệt" emoji="🤔">
        <p>
            Một số từ có cả hai dạng trạng từ (có -ly và không có -ly) nhưng mang ý nghĩa khác nhau.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>hard</b> (chăm chỉ) vs. <b>hardly</b> (hầu như không)
                <br/><i>e.g., He works <b>hard</b>. / He <b>hardly</b> works.</i>
            </li>
            <li><b>late</b> (trễ) vs. <b>lately</b> (gần đây)
                <br/><i>e.g., The bus arrived <b>late</b>. / Have you seen him <b>lately</b>?</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Thêm -ly vào các trạng từ bất quy tắc. (❌ <i className="line-through">He runs fastly.</i>)</li>
          <li>Dùng tính từ thay cho trạng từ. (❌ <i className="line-through">She sings beautiful.</i> → ✅ She sings <b>beautifully</b>.)</li>
          <li>Nhầm lẫn ý nghĩa giữa 'hard' và 'hardly', 'late' và 'lately'.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dạng trạng từ đúng của từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She answered the questions (honest) ______.</li>
            <li>He is a (good) ______ student, and he always does his homework (good) ______.</li>
            <li>I have been very busy (late) ______.</li>
            <li>He drove too (fast) ______.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
