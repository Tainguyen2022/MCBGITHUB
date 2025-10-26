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

export default function CoreReducedRelativeTo() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✂️ <span className="underline decoration-4 decoration-amber-400">RÚT GỌN MĐQH (TO-INFINITIVE)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Rút gọn mệnh đề quan hệ bằng cách dùng động từ nguyên mẫu có 'to', thường sau các số thứ tự, so sánh nhất, hoặc 'the only/next/last'.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dạng đầy đủ" formula="the first person who went..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dạng rút gọn" formula="the first person to go..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Điều kiện</a></li>
            <li><a className="text-rose-700 hover:underline" href="#how-to">Cách Rút gọn (Step-by-Step)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh với Rút gọn V-ing/V-ed</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Điều kiện" emoji="🎯">
        <p>
            Rút gọn bằng To-infinitive được dùng để diễn tả mục đích, khả năng, hoặc một hành động sẽ xảy ra. Điều kiện để rút gọn:
        </p>
        <ol className="list-decimal pl-6 mt-2">
            <li>Danh từ đứng trước mệnh đề quan hệ thường có các từ như: <b>the first, the second, the last, the only, the next</b>, hoặc dạng <b>so sánh nhất</b>.</li>
            <li>Động từ trong mệnh đề quan hệ thường mang ý nghĩa tương lai, mục đích, hoặc có chứa các động từ khuyết thiếu (modal verbs) như <b>can, could, should, must, have to</b>.</li>
        </ol>
      </Section>
      
      <Section id="how-to" title="Cách Rút gọn (Step-by-Step)" emoji="🔧">
        <p>
            Quy trình rút gọn:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Bước 1:</b> Bỏ đại từ quan hệ (who, which, that).</li>
            <li><b>Bước 2:</b> Bỏ trợ động từ hoặc động từ khuyết thiếu (nếu có).</li>
            <li><b>Bước 3:</b> Chuyển động từ chính về dạng <b>to + V(nguyên mẫu)</b>.</li>
        </ol>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 mt-3 space-y-2">
            <div>
                <p className="font-bold text-blue-700">Ví dụ:</p>
                <p>He was the last person <span className="line-through">who left</span> the room.</p>
                <p>→ He was the last person <b>to leave</b> the room.</p>
            </div>
             <div>
                <p>This is the best hotel <span className="line-through">that you can find</span> in this city.</p>
                <p>→ This is the best hotel <b>to find</b> in this city.</p>
            </div>
        </div>
      </Section>
      
      <Section id="comparison" title="So sánh với Rút gọn V-ing/V-ed" emoji="⚖️">
        <p>
           Sự lựa chọn dạng rút gọn phụ thuộc vào ý nghĩa và cấu trúc câu gốc:
        </p>
        <ul className="list-disc pl-6">
            <li><b>To-infinitive:</b> Diễn tả <b>mục đích, khả năng, sự việc tiếp theo</b>. Thường đi sau các từ chỉ thứ tự, so sánh nhất.
                <br/><i>e.g., The next train <b>to arrive</b> is from Hanoi.</i>
            </li>
            <li><b>V-ing (Chủ động):</b> Diễn tả hành động <b>đang diễn ra</b> hoặc là <b>bản chất</b> của danh từ.
                 <br/><i>e.g., The train <b>arriving</b> now is from Hanoi.</i>
            </li>
            <li><b>V-ed (Bị động):</b> Diễn tả hành động <b>bị tác động</b> lên danh từ.
                 <br/><i>e.g., The schedule, <b>revised</b> yesterday, is now on the board.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Rút gọn khi không có các từ chỉ thứ tự/so sánh nhất. Cách rút gọn này không phải lúc nào cũng áp dụng được.</li>
          <li>Sử dụng sai dạng bị động. Khi mệnh đề gốc ở dạng bị động, ta dùng <b>to be + V3</b>.
          <br/><i>e.g., He is the youngest player <b>to be chosen</b> for the team.</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Original:</b> Neil Armstrong was the first person who walked on the moon.
          <br/><b>Reduced:</b> Neil Armstrong was the first person <b>to walk</b> on the moon.
          </li>
          <li><b>Original:</b> She is the only one who understands my problem.
          <br/><b>Reduced:</b> She is the only one <b>to understand</b> my problem.
          </li>
          <li><b>Original:</b> I have a lot of homework that I must do.
          <br/><b>Reduced:</b> I have a lot of homework <b>to do</b>.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Rút gọn các mệnh đề quan hệ sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>He was the last guest who left the party.
            <br/>→ ____________________________________________</li>
            <li>This is the most interesting book that you can read on this topic.
            <br/>→ ____________________________________________</li>
            <li>She was the second person who was hired by the company.
            <br/>→ She was the second person ____________________________. (Dạng bị động!)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}