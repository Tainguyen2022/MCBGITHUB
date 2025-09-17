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

export default function CoreFuturePerfectContinuous(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🏃‍♂️ <span className="underline decoration-4 decoration-amber-400">TƯƠNG LAI HOÀN THÀNH TIẾP DIỄN</span> — Future Perfect Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để nhấn mạnh <b>quá trình kéo dài</b> của một hành động cho đến một thời điểm hoặc một hành động khác trong tương lai.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + will have been + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + won't have been + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Will + S + have been + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + will + S + have been + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Tương lai Hoàn thành</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>Thì này tập trung vào <b>khoảng thời gian (duration)</b> của một hành động sẽ kéo dài đến một mốc cụ thể trong tương lai.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Nhấn mạnh sự liên tục của hành động đến một mốc tương lai:</b>
            <br/><i>e.g., By the time he retires, he <u>will have been working</u> here for 30 years.</i> (Nhấn mạnh quá trình làm việc liên tục trong 30 năm).
          </li>
          <li><b>Chỉ nguyên nhân của một tình trạng/kết quả trong tương lai:</b>
            <br/><i>e.g., Next week, my eyes will be tired because I <u>will have been studying</u> for my exams all week.</i> (Việc học liên tục là nguyên nhân gây mệt mỏi).
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + will have been + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + will not (won't) have been + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Will + S + have been + V-ing ?</i></li>
              <li><b>Ghi chú:</b> Dùng <b>will have been</b> cho tất cả các chủ ngữ.</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p>Thường đi kèm với các cụm từ chỉ thời gian bắt đầu bằng <b>by...</b> và một cụm từ chỉ khoảng thời gian với <b>for</b>.</p>
        <p><b>by... for + [khoảng thời gian]</b> (e.g., <i>by tomorrow for three hours</i>), <b>by the time + S + V(hiện tại đơn)</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Tương lai Hoàn thành" emoji="⚖️">
        <ul className="list-disc pl-6 space-y-2">
          <li><b>TLHT Tiếp diễn</b>: Nhấn mạnh <u>quá trình, sự kéo dài, sự liên tục</u>.
            <br/><i>e.g., By 9 p.m., I <u>will have been watching</u> TV for three hours.</i> (Tập trung vào khoảng thời gian 3 tiếng xem liên tục).
          </li>
          <li><b>TL Hoàn thành</b>: Nhấn mạnh <u>kết quả, sự hoàn tất</u> hoặc <u>số lượng</u>.
            <br/><i>e.g., By 9 p.m., I <u>will have watched</u> three episodes.</i> (Tập trung vào kết quả là xem xong 3 tập phim).
          </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, want…) ❌. Phải dùng Tương lai Hoàn thành trong trường hợp này. (<i>By next year, I will have known her for a decade.</i>)</li>
          <li>Thiếu <b>been</b> hoặc <b>have</b>.</li>
          <li>Nhầm lẫn với Tương lai Hoàn thành khi muốn nói về kết quả.</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}