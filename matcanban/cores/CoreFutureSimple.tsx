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

export default function CoreFutureSimple(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🚀 <span className="underline decoration-4 decoration-amber-400">THÌ TƯƠNG LAI ĐƠN</span> — Future Simple (will)
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả <b>quyết định tức thời</b>, <b>dự đoán</b> không có căn cứ, <b>lời hứa</b>, <b>lời đề nghị</b>, và các sự kiện trong tương lai không có kế hoạch trước.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + will + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE" formula="S + will not (won't) + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Will + S + V(bare) ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + will + S + V(bare) ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với "Be going to"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Quyết định tức thời (Spontaneous Decision):</b> Quyết định được đưa ra ngay tại thời điểm nói, không có kế hoạch từ trước.
            <br/><i>e.g., A: "The phone is ringing." B: "I<u>'ll get</u> it."</i>
          </li>
          <li><b>Dự đoán không có căn cứ (Prediction based on opinion):</b> Diễn tả suy nghĩ, niềm tin cá nhân về tương lai.
            <br/><i>e.g., I think it <u>will rain</u> tomorrow. / He believes he <u>will win</u> the lottery.</i>
          </li>
          <li><b>Lời hứa, lời đề nghị, yêu cầu, lời mời (Promise, Offer, Request, Invitation):</b>
            <br/><i>e.g., I <u>will help</u> you with your homework. (Promise)</i>
            <br/><i>e.g., That bag looks heavy. I<u>'ll carry</u> it for you. (Offer)</i>
            <br/><i>e.g., <u>Will</u> you <u>open</u> the door, please? (Request)</i>
          </li>
          <li><b>Lời đe dọa hoặc cảnh báo (Threat or Warning):</b>
            <br/><i>e.g., Stop it or I <u>will tell</u> your mom.</i>
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + will ('ll) + V(bare)</i>.</li>
              <li><b>Phủ định:</b> <i>S + will not (won't) + V(bare)</i>.</li>
              <li><b>Yes/No:</b> <i>Will + S + V(bare) ?</i></li>
              <li><b>Wh-:</b> <i>Wh-word + will + S + V(bare) ?</i></li>
              <li><b>Ghi chú:</b> "will" dùng cho mọi chủ ngữ. Động từ theo sau luôn ở dạng nguyên mẫu không "to".</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>tomorrow</b>, <b>next week/month/year</b>, <b>in the future</b>, <b>soon</b>, <b>in X minutes/hours</b> (e.g., in five minutes).</p>
        <p>Thường đi kèm với các động từ chỉ quan điểm như: <b>think</b>, <b>believe</b>, <b>hope</b>, <b>expect</b>, <b>suppose</b>, hoặc trạng từ <b>perhaps</b>, <b>probably</b>, <b>certainly</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với &quot;Be going to&quot;" emoji="⚖️">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <div className="font-bold text-purple-700">Will</div>
            <ul className="list-disc pl-5 mt-1">
                <li><b>Quyết định tức thời:</b> <i>I'<u>ll have</u> the salad.</i> (Quyết định lúc gọi món).</li>
                <li><b>Dự đoán cá nhân:</b> <i>I think the traffic <u>will be</u> bad.</i> (Chỉ là ý kiến).</li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <div className="font-bold text-blue-700">Be going to</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Kế hoạch có sẵn:</b> <i>I'<u>m going to visit</u> my aunt this weekend.</i> (Đã lên kế hoạch từ trước).</li>
              <li><b>Dự đoán có bằng chứng:</b> <i>Look at those dark clouds! It'<u>s going to rain</u>.</i> (Có bằng chứng).</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Nhầm lẫn với "be going to" khi nói về kế hoạch đã có từ trước.</li>
          <li>Dùng động từ thêm "to" hoặc "-s" sau "will". (❌ <i>He will to go / He will goes</i>).</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}