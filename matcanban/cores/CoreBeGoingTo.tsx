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
        // Bố cục 2 dòng, label ở trên, formula ở dưới
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Chú giải (nhỏ hơn) */}
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      
      {/* Công thức (lớn hơn, kế thừa extrabold) */}
      <span className="truncate">{formula}</span>

      {/* toast nhỏ khi copy */}
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

export default function CoreBeGoingTo(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🗓️ <span className="underline decoration-4 decoration-amber-400">TƯƠNG LAI GẦN (BE GOING TO)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả <b>dự định, kế hoạch</b> đã có từ trước hoặc <b>dự đoán</b> có căn cứ, bằng chứng rõ ràng ở hiện tại.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + am/is/are + going to + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + am/is/are not + going to + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Am/Is/Are + S + going to + V(bare) ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh- + am/is/are + S + going to + V(bare) ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với "will"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Kế hoạch, dự định (Plans and Intentions):</b> Diễn tả một hành động đã được quyết định, lên kế hoạch từ trước thời điểm nói.
            <br/><i>e.g., We <u>are going to move</u> to a new apartment next month. (Chúng tôi đã quyết định và lên kế hoạch chuyển nhà).</i>
            <br/><i>e.g., I<u>'m going to start</u> exercising more regularly. (Đây là dự định của tôi).</i>
          </li>
          <li><b>Dự đoán có căn cứ, bằng chứng (Prediction with Evidence):</b> Diễn tả một sự việc sắp xảy ra dựa trên những dấu hiệu có thể thấy được ở hiện tại.
            <br/><i>e.g., Look at those dark clouds. It <u>is going to rain</u>. (Bằng chứng là những đám mây đen).</i>
            <br/><i>e.g., Be careful! You<u>'re going to fall</u>. (Thấy người đó đang mất thăng bằng).</i>
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + am/is/are + going to + V(bare)</i>.</li>
              <li><b>Phủ định:</b> <i>S + am/is/are + not + going to + V(bare)</i>.</li>
              <li><b>Yes/No:</b> <i>Am/Is/Are + S + going to + V(bare) ?</i></li>
              <li><b>Chia 'to be':</b> <b>am</b> (I), <b>is</b> (he, she, it), <b>are</b> (you, we, they).</li>
              <li><b>'gonna':</b> Trong văn nói thân mật, 'going to' thường được phát âm và viết là 'gonna'.</li>
            </ul>
        </div>
      </Section>

      <Section id="contrast" title="So sánh với &quot;will&quot;" emoji="⚖️">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <div className="font-bold text-blue-700">Be going to</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Kế hoạch có sẵn:</b> <i>I'<u>m going to watch</u> a movie tonight.</i> (Đã quyết định từ trước).</li>
              <li><b>Dự đoán có bằng chứng:</b> <i>The traffic is terrible. We'<u>re going to be</u> late.</i></li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <div className="font-bold text-purple-700">Will</div>
            <ul className="list-disc pl-5 mt-1">
                <li><b>Quyết định tức thời:</b> <i>A: It's cold in here. B: I'<u>ll close</u> the window.</i></li>
                <li><b>Dự đoán cá nhân:</b> <i>I think he'<u>ll be</u> a great leader.</i></li>
                <li><b>Lời hứa, đề nghị:</b> <i>I'<u>ll help</u> you.</i></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Quên động từ "to be". (❌ <i>I going to study</i>).</li>
          <li>Dùng "will" cho kế hoạch đã có từ trước, hoặc dùng "be going to" cho quyết định tức thời.</li>
          <li>Quên "to" sau "going". (❌ <i>She is going study</i>).</li>
          <li>Sử dụng "be going to go". Mặc dù đúng ngữ pháp, người bản xứ thường tránh lặp từ và dùng Hiện tại Tiếp diễn thay thế: <i>I'm going to the cinema tomorrow.</i> thay vì <i>I'm going to go to the cinema...</i></li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}