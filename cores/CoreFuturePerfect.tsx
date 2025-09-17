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

export default function CoreFuturePerfect(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          ⏳ <span className="underline decoration-4 decoration-amber-400">THÌ TƯƠNG LAI HOÀN THÀNH</span> — Future Perfect
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động sẽ <b>hoàn tất TRƯỚC</b> một thời điểm hoặc một hành động khác trong tương lai.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + will have + V3" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + won't have + V3" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Will + S + have + V3 ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + will + S + have + V3 ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Tương lai đơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#time-clauses">Trong Mệnh đề thời gian</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>Thì Tương lai Hoàn thành nhấn mạnh sự hoàn tất của một hành động so với một mốc thời gian trong tương lai.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Hành động sẽ hoàn tất trước một thời điểm cụ thể trong tương lai:</b>
            <br/><i>e.g., By 10 p.m. tonight, I <u>will have finished</u> my homework.</i> (Hành động 'làm xong bài tập' sẽ hoàn tất trước 10 giờ tối).
          </li>
          <li><b>Hành động sẽ hoàn tất trước một hành động khác trong tương lai:</b> Hành động làm mốc thời gian được chia ở thì Hiện tại đơn.
            <br/><i>e.g., She <u>will have left</u> by the time you <u>arrive</u>.</i> (Cô ấy sẽ rời đi trước khi bạn đến).
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + will have + V3/V-ed</i>.</li>
              <li><b>Phủ định:</b> <i>S + will not (won't) have + V3/V-ed</i>.</li>
              <li><b>Yes/No:</b> <i>Will + S + have + V3/V-ed ?</i></li>
              <li><b>Ghi chú:</b> Luôn dùng <b>have</b> cho tất cả các chủ ngữ (kể cả he/she/it). V3 là Quá khứ Phân từ (Past Participle).</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p>Dấu hiệu nhận biết quan trọng nhất là các cụm từ bắt đầu bằng <b>by</b>:</p>
        <p><b>by + [thời gian tương lai]</b> (e.g., <i>by tomorrow</i>, <i>by 8 o'clock</i>, <i>by the end of this year</i>), <b>by the time + S + V(hiện tại đơn)</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Tương lai đơn" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>Tương lai hoàn thành</b>: Nhấn mạnh sự hoàn tất <u>trước</u> một mốc. — <i>By next year, I <u>will have graduated</u>.</i></li>
          <li><b>Tương lai đơn</b>: Nói về một sự kiện chung chung sẽ xảy ra trong tương lai. — <i>I <u>will graduate</u> next year.</i></li>
        </ul>
      </Section>

      <Section id="time-clauses" title="Trong Mệnh đề thời gian" emoji="🔗">
          <p>Tương tự như thì Tương lai đơn, trong mệnh đề phụ chỉ thời gian (bắt đầu bằng <b>by the time, when, before</b>,...), động từ làm mốc sẽ được chia ở thì <b>Hiện tại đơn</b>, không phải Tương lai đơn.</p>
          <p className="mt-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
            ❌ <i className="line-through">The film will have started by the time we will get there.</i><br/>
            ✅ <i>The film will have started by the time we <b>get</b> there.</i>
          </p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng <i>will has</i> với he/she/it (đúng là <b>will have</b>).</li>
          <li>Sử dụng sai V3/Past Participle.</li>
          <li>Quên "have" trong câu.</li>
          <li>Nhầm mệnh đề "by the time" với thì tương lai (phải dùng hiện tại đơn). ❌ <i>by the time you will arrive</i>. → ✅ <i>by the time you <b>arrive</b></i>.</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}