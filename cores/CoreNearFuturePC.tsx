import React, { useState } from 'react';

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

export default function CoreNearFuturePC(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✅ <span className="underline decoration-4 decoration-amber-400">DỰ ĐỊNH TƯƠNG LAI (HTTD)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng thì <b>Hiện tại Tiếp diễn</b> để nói về các <b>kế hoạch, cuộc hẹn đã được sắp xếp chắc chắn</b> trong tương lai gần, thường có thời gian, địa điểm cụ thể.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="STRUCTURE" formula="S + am/is/are + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với "will" & "be going to"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Diễn tả một <b>sự sắp xếp chắc chắn (fixed arrangement)</b> trong tương lai. Đây không chỉ là một dự định mà là một kế hoạch đã được xác nhận, thường liên quan đến người khác và có thời gian/địa điểm cụ thể.
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li><i>I <u>am meeting</u> my friends for dinner on Friday.</i> (Đã hẹn với bạn bè, có thể đã đặt bàn).</li>
            <li><i>She <u>is flying</u> to Paris tomorrow morning.</i> (Đã mua vé máy bay, lịch trình đã cố định).</li>
            <li><i>What <u>are</u> you <u>doing</u> this weekend?</i> (Hỏi về kế hoạch đã sắp xếp của người khác).</li>
        </ul>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p>Luôn đi kèm với các trạng từ hoặc cụm từ chỉ thời gian trong tương lai để phân biệt với hành động đang diễn ra ở hiện tại:</p>
        <p><b>tomorrow</b>, <b>next week/month/year</b>, <b>on Monday</b>, <b>this evening</b>, <b>at 8 p.m. tonight</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với &quot;will&quot; & &quot;be going to&quot;" emoji="⚖️">
        <p>Mức độ chắc chắn và sự chuẩn bị tăng dần từ 'will' đến 'Present Continuous'.</p>
        <div className="grid md:grid-cols-3 gap-3">
            <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
                <div className="font-bold text-purple-700">Will</div>
                <p><b>Quyết định tức thời</b>, không có kế hoạch.</p>
                <p className="mt-1"><i>Maybe I'<b>ll have</b> a meeting later.</i></p>
            </div>
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <div className="font-bold text-blue-700">Be going to</div>
                <p><b>Dự định, ý định</b> của cá nhân. Có thể chưa sắp xếp cụ thể với ai.</p>
                <p className="mt-1"><i>I'<b>m going to have</b> a meeting soon.</i></p>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <div className="font-bold text-green-700">Present Continuous</div>
                <p><b>Sắp xếp chắc chắn</b>. Đã có lịch hẹn, kế hoạch cụ thể.</p>
                <p className="mt-1"><i>I'<b>m having</b> a meeting at 3 p.m.</i></p>
            </div>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng cho dự đoán. (❌ <i>Look at the clouds! It's raining.</i> → Phải dùng <i>It's going to rain.</i>)</li>
          <li>Sử dụng khi chỉ là ý định, chưa có sắp xếp cụ thể. (Nên dùng 'be going to').</li>
          <li>Quên trạng từ chỉ thời gian tương lai, gây nhầm lẫn với hành động đang diễn ra ở hiện tại.</li>
        </ol>
      </Section>
      
      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}