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

export default function CorePresentPerfect(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔗 <span className="underline decoration-4 decoration-amber-400">THÌ HIỆN TẠI HOÀN THÀNH</span> — Present Perfect
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả hành động xảy ra trong quá khứ nhưng có <b>kết quả hoặc liên quan đến hiện tại</b>, hoặc hành động bắt đầu trong quá khứ và kéo dài đến hiện tại.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + has/have + V3" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + hasn't/haven't + V3" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Has/Have + S + V3 ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + has/have + S + V3 ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Quá khứ đơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6">
          <li><b>Hành động vừa mới xảy ra (với 'just'):</b> <i>I <u>have just finished</u> my work.</i></li>
          <li><b>Kinh nghiệm, trải nghiệm (thời gian không xác định):</b> <i>She <u>has visited</u> Paris three times.</i></li>
          <li><b>Hành động bắt đầu trong quá khứ, kéo dài đến hiện tại (với 'for'/'since'):</b> <i>We <u>have lived</u> here for 10 years.</i></li>
          <li><b>Hành động quá khứ có kết quả ở hiện tại:</b> <i>He <u>has lost</u> his keys. (So now he can't open the door).</i></li>
          <li><b>Hành động chưa xảy ra tính đến hiện tại (với 'yet'):</b> <i>They <u>haven't arrived</u> yet.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + has/have + V3</i>.</li>
              <li><b>Phủ định:</b> <i>S + has not (hasn't) / have not (haven't) + V3</i>.</li>
              <li><b>Yes/No:</b> <i>Has/Have + S + V3 ?</i></li>
              <li><b>Chia 'have':</b> <b>has</b> (he, she, it) / <b>have</b> (I, you, we, they).</li>
              <li><b>V3</b> là Past Participle (cột 3 Bảng Động từ Bất quy tắc, hoặc V-ed).</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>just</b>, <b>already</b>, <b>yet</b>, <b>ever</b>, <b>never</b>, <b>since</b>, <b>for</b>, <b>recently</b>, <b>lately</b>, <b>so far</b>, <b>up to now</b>, <b>it's the first/second time...</b></p>
      </Section>

      <Section id="contrast" title="So sánh với Quá khứ đơn" emoji="⚖️">
        <ul className="list-disc pl-6">
          <li><b>HT Hoàn thành</b>: Không có thời gian xác định, liên quan đến hiện tại. — <i>I <u>have seen</u> that movie.</i> (Tôi biết nội dung phim).</li>
          <li><b>Quá khứ đơn</b>: Có thời gian xác định trong quá khứ, đã chấm dứt. — <i>I <u>saw</u> that movie <b>last week</b>.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng với thời gian quá khứ xác định. (❌ <i className="line-through">I have seen him yesterday.</i>)</li>
          <li>Chia sai động từ V3 (Past Participle).</li>
          <li>Chia sai <b>has/have</b> với chủ ngữ.</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}