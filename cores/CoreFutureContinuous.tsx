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

export default function CoreFutureContinuous(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🕛 <span className="underline decoration-4 decoration-amber-400">THÌ TƯƠNG LAI TIẾP DIỄN</span> — Future Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>sẽ đang diễn ra</b> tại một thời điểm cụ thể trong tương lai.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + will be + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + won't be + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Will + S + be + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + will + S + be + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với các thì Tương lai khác</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Hành động đang diễn ra tại một thời điểm cụ thể trong tương lai:</b>
            <br/><i>e.g., This time next week, I <u>will be relaxing</u> on the beach. / At 10 a.m. tomorrow, she <u>will be giving</u> a presentation.</i>
          </li>
          <li><b>Hành động đang diễn ra thì có hành động khác xen vào (trong tương lai):</b> Hành động xen vào dùng Hiện tại đơn.
            <br/><i>e.g., I <u>will be waiting</u> for you when your bus <u>arrives</u>.</i>
          </li>
          <li><b>Dự đoán một hành động sẽ đang xảy ra như một lẽ thường tình:</b>
            <br/><i>e.g., Don't call him now, he'<u>ll be sleeping</u>.</i> (Dự đoán dựa trên thói quen của anh ấy).
          </li>
          <li><b>Hỏi một cách lịch sự về kế hoạch của ai đó:</b>
            <br/><i>e.g., <u>Will</u> you <u>be using</u> the printer later?</i> (Hỏi một cách gián tiếp để xem máy in có rảnh không).
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + will be + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + will not (won't) be + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Will + S + be + V-ing ?</i></li>
              <li><b>Ghi chú:</b> Dùng <b>will be</b> cho tất cả các chủ ngữ.</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>at this time tomorrow</b>, <b>at this moment next year</b>, <b>at + [giờ] + tomorrow</b>, <b>when + S + V(hiện tại đơn)</b>, <b>while + S + V(hiện tại tiếp diễn)</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với các thì Tương lai khác" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>Tương lai tiếp diễn</b>: Nhấn mạnh hành động <u>sẽ đang diễn ra</u> tại một điểm trong tương lai. — <i>At 8 p.m. tonight, I <u>will be watching</u> a movie.</i></li>
          <li><b>Tương lai đơn</b>: Nói về hành động sẽ bắt đầu hoặc kết thúc tại điểm đó. — <i>The movie <u>will start</u> at 8 p.m.</i></li>
          <li><b>Hiện tại tiếp diễn (cho tương lai)</b>: Nói về một kế hoạch đã được sắp xếp chắc chắn. — <i>I <u>am watching</u> a movie with friends tonight.</i> (đã hẹn)</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, want…) ❌.</li>
          <li>Quên động từ "be" sau "will". (❌ <i>I will studying</i>).</li>
          <li>Sử dụng khi không có mốc thời gian hoặc hành động bối cảnh cụ thể.</li>
          <li>Dùng thì tương lai trong mệnh đề 'when'. (❌ <i>...when your bus will arrive</i>).</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}