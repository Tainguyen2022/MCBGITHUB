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

export default function CoreNounCompound() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🧩 <span className="underline decoration-4 decoration-amber-400">DANH TỪ GHÉP</span> — <i>Compound Nouns</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là danh từ được tạo thành từ hai hoặc nhiều từ riêng lẻ, tạo ra một ý nghĩa mới. Chúng có thể được viết liền, có gạch nối, hoặc viết rời.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dạng Đóng (Closed)" formula="football, bedroom" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dạng Mở (Open)" formula="ice cream, swimming pool" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Dạng Gạch nối (Hyphenated)" formula="mother-in-law" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#forms">3 Dạng Danh từ ghép</a></li>
            <li><a className="text-rose-700 hover:underline" href="#plurals">Quy tắc Số nhiều (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#stress">Trọng âm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="forms" title="3 Dạng Danh từ ghép" emoji="✍️">
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Dạng Đóng (Closed/Solid):</b> Hai từ được viết liền thành một.
                <br/><i>e.g., notebook, sunglasses, toothpaste, bedroom.</i>
            </li>
            <li><b>Dạng Mở (Open/Spaced):</b> Hai từ được viết riêng biệt nhưng tạo thành một cụm danh từ có ý nghĩa riêng.
                <br/><i>e.g., bus stop, swimming pool, high school, post office.</i>
            </li>
            <li><b>Dạng Gạch nối (Hyphenated):</b> Các từ được nối với nhau bằng dấu gạch nối.
                <br/><i>e.g., mother-in-law, state-of-the-art, well-being, editor-in-chief.</i>
            </li>
        </ol>
        <p className="mt-2 text-sm text-gray-600">Lưu ý: Không có quy tắc tuyệt đối cho việc một từ ghép thuộc dạng nào. Khi không chắc chắn, hãy tra từ điển.</p>
      </Section>

      <Section id="plurals" title="Quy tắc Số nhiều (Rất quan trọng!)" emoji="🔑">
        <p>
            Cách tạo dạng số nhiều cho danh từ ghép là một trong những điểm ngữ pháp dễ nhầm lẫn nhất.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Quy tắc 1 (Phổ biến nhất):</b> Thêm "-s" vào cuối của từ ghép. Quy tắc này áp dụng cho hầu hết các danh từ ghép dạng đóng và dạng mở khi không có danh từ chính rõ ràng.
                <br/><i>e.g., greenhouse → greenhouse<b>s</b>; swimming pool → swimming pool<b>s</b>.</i>
            </li>
            <li><b>Quy tắc 2 (Quan trọng):</b> Thêm "-s" vào <b>danh từ chính (head noun)</b> nếu đó là danh từ ghép dạng mở hoặc có gạch nối. Danh từ chính là từ mang ý nghĩa cốt lõi.
                <br/><i>e.g., mother-in-law → mother<b>s</b>-in-law (chính là "mother")</i>
                <br/><i>e.g., passer-by → passer<b>s</b>-by (chính là "passer")</i>
                 <br/><i>e.g., attorney general → attorney<b>s</b> general (chính là "attorney")</i>
            </li>
            <li><b>Quy tắc 3 (với -ful):</b> Thêm "-s" vào cuối từ.
                 <br/><i>e.g., spoonful → spoonful<b>s</b>; cupful → cupful<b>s</b>.</i>
            </li>
        </ul>
      </Section>

       <Section id="stress" title="Trọng âm (Stress)" emoji="🔊">
        <p>
            Hầu hết các danh từ ghép có trọng âm rơi vào âm tiết đầu tiên. Điều này giúp phân biệt chúng với một cụm tính từ + danh từ thông thường.
        </p>
        <ul className="list-disc pl-6">
            <li><i>a <b>green</b>house</i> (nhà kính) vs. <i>a green <b>house</b></i> (một ngôi nhà màu xanh)</li>
            <li><i>a <b>black</b>bird</i> (loài chim sáo) vs. <i>a black <b>bird</b></i> (một con chim màu đen)</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Thêm "-s" vào cuối các danh từ ghép có gạch nối. (❌ <i className="line-through">mother-in-laws</i>)</li>
          <li>Không chắc chắn về cách viết (liền, rời, hay gạch nối). Lời khuyên: tra từ điển.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I need to buy some toothpaste and a new toothbrush.</b> — Tôi cần mua một ít kem đánh răng và một cái bàn chải đánh răng mới.</li>
          <li><b>All of his sisters-in-law came to the party.</b> — Tất cả các chị/em dâu của anh ấy đã đến bữa tiệc.</li>
          <li><b>The bus stops are all being repainted.</b> — Tất cả các điểm dừng xe buýt đang được sơn lại.</li>
          <li><b>We need three cupfuls of flour for this recipe.</b> — Chúng ta cần ba cốc bột mì cho công thức này.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết dạng số nhiều của các danh từ ghép sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>credit card → ____________</li>
            <li>passer-by → ____________</li>
            <li>washing machine → ____________</li>
            <li>sister-in-law → ____________</li>
            <li>teaspoonful → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}