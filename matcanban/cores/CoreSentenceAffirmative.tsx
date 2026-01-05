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

export default function CoreSentenceAffirmative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✅ <span className="underline decoration-4 decoration-amber-400">CÂU KHẲNG ĐỊNH</span> — <i>Affirmative Sentences</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là dạng câu cơ bản nhất, dùng để nêu một sự thật, một ý kiến, hoặc cung cấp thông tin. Mọi câu phức tạp đều được xây dựng dựa trên các cấu trúc khẳng định nền tảng.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cơ bản" formula="S + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Có Tân ngữ" formula="S + V + O" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Có Bổ ngữ" formula="S + V + C" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Mở rộng" formula="S + V + O + A" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">1. Định nghĩa & Thành phần</a></li>
            <li><a className="text-rose-700 hover:underline" href="#patterns">2. Năm Cấu trúc Câu cơ bản</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adverbials">3. Mở rộng câu với Trạng ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="1. Định nghĩa & Thành phần" emoji="🎯">
        <p>
            <b>Câu khẳng định (Affirmative Sentence)</b> là một câu trần thuật (statement) mang ý nghĩa xác nhận. Nó không phải câu phủ định hay câu hỏi.
        </p>
        <p className="mt-2">Các thành phần chính của câu bao gồm:</p>
        <ul className="list-disc pl-6">
            <li><b>S (Subject):</b> Chủ ngữ - Người hoặc vật thực hiện hành động.</li>
            <li><b>V (Verb):</b> Động từ - Hành động hoặc trạng thái.</li>
            <li><b>O (Object):</b> Tân ngữ - Đối tượng nhận hành động.</li>
            <li><b>C (Complement):</b> Bổ ngữ - Hoàn thành ý nghĩa cho chủ ngữ hoặc tân ngữ.</li>
            <li><b>A (Adverbial):</b> Trạng ngữ - Cung cấp thông tin về cách thức, nơi chốn, thời gian...</li>
        </ul>
      </Section>
      
      <Section id="patterns" title="2. Năm Cấu trúc Câu cơ bản" emoji="🏗️">
        <p>Hầu hết các câu trong tiếng Anh đều tuân theo một trong năm cấu trúc nền tảng này.</p>
        <div className="space-y-3 mt-2">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>1. S + V</b> (Nội động từ)</p>
                <p className="pl-4"><i>e.g., The sun <b>shines</b>. / The baby <b>is sleeping</b>.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>2. S + V + O</b> (Ngoại động từ)</p>
                <p className="pl-4"><i>e.g., She <b>reads books</b>. / I <b>love music</b>.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>3. S + V + C</b> (Động từ nối)</p>
                <p className="pl-4"><i>e.g., He <b>is a doctor</b>. / The weather <b>became cold</b>.</i></p>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>4. S + V + IO + DO</b> (Động từ có 2 tân ngữ)</p>
                <p className="pl-4"><i>e.g., My mother <b>told me a story</b>. / He <b>bought her a gift</b>.</i></p>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>5. S + V + O + C</b> (Động từ phức)</p>
                <p className="pl-4"><i>e.g., They <b>elected him president</b>. / The news <b>made her happy</b>.</i></p>
            </div>
        </div>
      </Section>

      <Section id="adverbials" title="3. Mở rộng câu với Trạng ngữ (Adverbials)" emoji="➕">
        <p>
            Bất kỳ cấu trúc câu cơ bản nào cũng có thể được mở rộng bằng cách thêm một hoặc nhiều trạng ngữ (A) để cung cấp thêm thông tin. Trạng ngữ thường đứng cuối câu theo trật tự <b>Cách thức - Nơi chốn - Thời gian (M-P-T)</b>.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The baby is sleeping <b>peacefully</b> (A - manner) <b>in his crib</b> (A - place).</i></li>
            <li><i>She reads books <b>in the library</b> (A - place) <b>every afternoon</b> (A - time).</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Thiếu Chủ ngữ hoặc Động từ:</b> Mọi câu hoàn chỉnh phải có ít nhất một cặp S-V.</li>
          <li><b>Sai trật tự từ:</b> Đặt tân ngữ hoặc trạng từ sai vị trí. (❌ <i className="line-through">I like very much this song.</i>)</li>
          <li><b>Lỗi hòa hợp Chủ ngữ-Động từ:</b> Động từ không được chia đúng với chủ ngữ. (❌ <i className="line-through">The students is studying.</i>)</li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định cấu trúc của các câu sau (S+V, S+V+O, S+V+C...):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The meeting started late. → ____________</li>
            <li>My parents gave me a new bike. → ____________</li>
            <li>This coffee tastes bitter. → ____________</li>
            <li>The committee appointed him chairman. → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}