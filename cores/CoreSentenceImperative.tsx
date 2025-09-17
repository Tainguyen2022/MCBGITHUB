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

export default function CoreSentenceImperative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📣 <span className="underline decoration-4 decoration-amber-400">CÂU MỆNH LỆNH & GỢI Ý</span> — <i>Imperatives & Suggestions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Học cách đưa ra mệnh lệnh, yêu cầu, hướng dẫn (imperatives) và cách đề xuất một hành động chung (suggestions) một cách lịch sự và hiệu quả.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Mệnh lệnh" formula="Open the door." colors="from-red-500 via-rose-500 to-pink-600"/>
          <FormulaChip label="Phủ định" formula="Don't be late." colors="from-slate-600 via-gray-700 to-black"/>
          <FormulaChip label="Gợi ý (Let's)" formula="Let's go." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Gợi ý (How about)" formula="How about going?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#imperatives">1. Câu Mệnh lệnh (Imperatives)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#suggestions">2. Các cấu trúc Gợi ý (Suggestions)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">3. Phân biệt Mệnh lệnh & Gợi ý</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="imperatives" title="1. Câu Mệnh lệnh (Imperatives)" emoji="👉">
        <p>
            Câu mệnh lệnh được dùng để đưa ra yêu cầu, mệnh lệnh, hướng dẫn, hoặc cảnh báo trực tiếp đến người nghe. Chủ ngữ ngầm định là <b>"You"</b> và thường được lược bỏ.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Mệnh lệnh khẳng định:</b> Dùng động từ nguyên mẫu không 'to' (bare infinitive).
                <br/><i>e.g., <b>Close</b> the window. / <b>Be</b> quiet.</i>
            </li>
            <li><b>Mệnh lệnh phủ định:</b> Dùng <b>Don't</b> + động từ nguyên mẫu không 'to'.
                <br/><i>e.g., <b>Don't touch</b> that. / <b>Don't be</b> afraid.</i>
            </li>
             <li><b>Làm cho lịch sự hơn:</b> Thêm "please" vào đầu hoặc cuối câu.
                <br/><i>e.g., <b>Please</b> sit down. / Sit down, <b>please</b>.</i>
            </li>
             <li><b>Nhấn mạnh:</b> Dùng "Do" trước động từ để nhấn mạnh sự khẩn thiết hoặc chân thành.
                <br/><i>e.g., <b>Do</b> come in!</i>
            </li>
        </ul>
      </Section>
      
      <Section id="suggestions" title="2. Các cấu trúc Gợi ý (Suggestions)" emoji="🤝">
        <p>
            Khi muốn đề xuất một hành động mà người nói cũng tham gia, hoặc đưa ra một gợi ý thân mật, ta dùng các cấu trúc sau:
        </p>
        <div className="space-y-3 mt-2">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Let's...:</b> Là viết tắt của "Let us", dùng để rủ rê, đề nghị cùng làm gì đó.</p>
                <p className="font-mono mt-1">Let's + V(bare) ...</p>
                <p className="pl-4"><i>e.g., <b>Let's go</b> to the cinema. / <b>Let's not</b> argue.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Why don't we/you...?:</b> Một cách thân mật để đưa ra gợi ý dưới dạng câu hỏi.</p>
                <p className="font-mono mt-1">Why don't we/you + V(bare) ...?</p>
                <p className="pl-4"><i>e.g., <b>Why don't we</b> order a pizza?</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>How about / What about...?:</b> Dùng với danh động từ (V-ing).</p>
                <p className="font-mono mt-1">How about / What about + V-ing ...?</p>
                <p className="pl-4"><i>e.g., <b>How about watching</b> a movie tonight?</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Shall we...?:</b> Một cách khá trang trọng để hỏi ý kiến, xin phép cùng làm gì đó (thường trong Anh-Anh).</p>
                <p className="font-mono mt-1">Shall we + V(bare) ...?</p>
                <p className="pl-4"><i>e.g., <b>Shall we</b> dance?</i></p>
            </div>
        </div>
      </Section>

      <Section id="comparison" title="3. Phân biệt Mệnh lệnh & Gợi ý" emoji="⚖️">
         <ul className="list-disc pl-6 mt-2">
            <li><b>Mệnh lệnh:</b> Hướng đến người nghe (You). Người nói ra lệnh/yêu cầu.
                <br/><i>e.g., <b>(You) Open</b> the window.</i>
            </li>
            <li><b>Gợi ý (Let's):</b> Bao gồm cả người nói (We). Người nói rủ rê/đề nghị.
                 <br/><i>e.g., <b>Let's open</b> the window.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng động từ có 'to' trong câu mệnh lệnh. (❌ <i className="line-through">To be quiet.</i>)</li>
          <li>Dùng động từ nguyên mẫu sau 'How about'. (❌ <i className="line-through">How about go to the park?</i> → ✅ How about <b>going</b>...)</li>
          <li>Dùng 'Let's' khi chỉ muốn ra lệnh cho người khác.</li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau theo yêu cầu:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>(Đưa ra mệnh lệnh phủ định) Make a noise.
            <br/>→ ____________________________________________</li>
            <li>(Đưa ra gợi ý dùng Let's) We should start the project now.
            <br/>→ ____________________________________________</li>
            <li>(Đưa ra gợi ý dùng How about) We could have a picnic.
            <br/>→ ____________________________________________</li>
             <li>(Đưa ra yêu cầu lịch sự) Help me with this box.
            <br/>→ ____________________________________________, please.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
