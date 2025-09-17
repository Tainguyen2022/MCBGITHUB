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

export default function CorePresentPerfectContinuous(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔁 <span className="underline decoration-4 decoration-amber-400">HT HOÀN THÀNH TIẾP DIỄN</span> — Present Perfect Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Nhấn mạnh <b>quá trình kéo dài</b> của một hành động bắt đầu trong quá khứ, tiếp tục đến hiện tại, và có thể vẫn còn tiếp diễn.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + has/have + been + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + hasn't/haven't + been + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Has/Have + S + been + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + has/have + S + been + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với HT Hoàn thành</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Nhấn mạnh sự liên tục của hành động:</b> <i>I <u>have been waiting</u> for two hours.</i> (Và tôi vẫn đang đợi).</li>
          <li><b>Giải thích một kết quả ở hiện tại:</b> <i>The ground is wet because it <u>has been raining</u>.</i></li>
          <li><b>Hành động vừa mới kết thúc:</b> <i>I'm tired because I'<u>ve been running</u>.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + has/have + been + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + has not (hasn't) / have not (haven't) + been + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Has/Have + S + been + V-ing ?</i></li>
              <li><b>Chia 'have':</b> <b>has</b> (he, she, it) / <b>have</b> (I, you, we, they).</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>for</b>, <b>since</b>, <b>all day/week</b>, <b>how long</b>, <b>lately</b>, <b>recently</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Hiện tại Hoàn thành" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>HTHT Tiếp diễn</b>: Nhấn mạnh <u>quá trình, sự kéo dài</u> của hành động. — <i>I'<u>ve been reading</u> that book.</i> (Tôi vẫn đang đọc).</li>
          <li><b>HT Hoàn thành</b>: Nhấn mạnh <u>kết quả, sự hoàn tất</u> hoặc <u>số lần</u>. — <i>I'<u>ve read</u> that book.</i> (Tôi đã đọc xong). / <i>I'<u>ve read</u> it three times.</i></li>
          <li>Với động từ trạng thái (stative verbs), chỉ dùng HT Hoàn thành: <i>I've known him for years.</i> (Không dùng <i>I've been knowing</i>).</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với <i>stative verbs</i> (know, like, believe, own…) ❌.</li>
          <li>Thiếu <b>been</b> hoặc chia sai <b>has/have</b>.</li>
          <li>Nhầm với HT Hoàn thành khi muốn nói về kết quả hoặc số lượng.</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}