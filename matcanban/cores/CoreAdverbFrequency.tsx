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

export default function CoreAdverbFrequency() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔁 <span className="underline decoration-4 decoration-amber-400">TRẠNG TỪ TẦN SUẤT</span> — <i>Adverbs of Frequency</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để trả lời câu hỏi "How often?" (Bao lâu một lần?), mô tả mức độ thường xuyên của một hành động. Vị trí của chúng trong câu là quy tắc quan trọng nhất.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Trước V thường" formula="S + often + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Sau 'to be'" formula="S + is + always + Adj" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Sau trợ V" formula="S + have + never + V3" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#types">Phân loại & Thang đo</a></li>
            <li><a className="text-rose-700 hover:underline" href="#position">3 Quy tắc Vị trí Vàng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#exceptions">Trường hợp đặc biệt</a></li>
            <li><a className="text-rose-700 hover:underline" href="#definite">Tần suất Xác định</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="types" title="Phân loại & Thang đo Tần suất" emoji="📊">
        <p>
            Trạng từ tần suất bất định (adverbs of indefinite frequency) không chỉ ra một con số chính xác. Chúng thường được xếp trên một thang đo từ 100% đến 0%.
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><b>100%</b> - always</li>
            <li><b>90%</b> - usually, normally, generally</li>
            <li><b>70%</b> - often, frequently</li>
            <li><b>50%</b> - sometimes</li>
            <li><b>30%</b> - occasionally</li>
            <li><b>10%</b> - seldom, rarely, hardly ever</li>
            <li><b>0%</b> - never</li>
        </ul>
      </Section>

      <Section id="position" title="3 Quy tắc Vị trí Vàng" emoji="📍">
        <p>Đây là phần quan trọng nhất cần nhớ về trạng từ tần suất.</p>
        <ol className="list-decimal pl-6 space-y-3 mt-2">
            <li><b>Đứng TRƯỚC động từ thường:</b>
                <br/><i>e.g., He <b>always</b> <u>drinks</u> coffee in the morning.</i>
                <br/><i>e.g., They <b>rarely</b> <u>watch</u> television.</i>
            </li>
            <li><b>Đứng SAU động từ 'to be' (am, is, are, was, were):</b>
                 <br/><i>e.g., She <u>is</u> <b>often</b> late for class.</i>
                 <br/><i>e.g., I <u>am</u> <b>never</b> bored in his lessons.</i>
            </li>
            <li><b>Đứng SAU trợ động từ đầu tiên (have, will, can, must...) và TRƯỚC động từ chính:</b>
                 <br/><i>e.g., I <u>have</u> <b>never</b> <u>visited</u> Paris.</i>
                 <br/><i>e.g., You <u>should</u> <b>always</b> <u>check</u> your work.</i>
                  <br/><i>e.g., She <u>doesn't</u> <b>usually</b> <u>go</u> out on weekdays.</i>
            </li>
        </ol>
      </Section>
      
      <Section id="exceptions" title="Trường hợp đặc biệt" emoji="✨">
        <p>
            Các trạng từ <b>sometimes, usually, normally, frequently, occasionally</b> có thể đứng ở đầu câu để nhấn mạnh.
        </p>
        <ul className="list-disc pl-6">
            <li><i><b>Sometimes</b> I walk to work.</i></li>
            <li><i><b>Usually,</b> we eat dinner at 7 p.m.</i></li>
        </ul>
        <p><b>"Sometimes"</b> cũng có thể đứng ở cuối câu.</p>
         <ul className="list-disc pl-6">
            <li><i>I feel tired <b>sometimes</b>.</i></li>
        </ul>
      </Section>

       <Section id="definite" title="Tần suất Xác định" emoji="🗓️">
        <p>
           Các cụm trạng từ chỉ tần suất xác định (definite frequency) thường đứng ở cuối câu.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Ví dụ:</b> daily, weekly, monthly, yearly, once a day, twice a week, every month.</li>
            <li><i>e.g., I go to the gym <b>three times a week</b>.</i></li>
            <li><i>e.g., The magazine is published <b>monthly</b>.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Đặt trạng từ tần suất sai vị trí, đặc biệt là với động từ 'to be' và trợ động từ.
             <br/>❌ <i className="line-through">I always am happy.</i> → ✅ I <b>am always</b> happy.
          </li>
          <li>Dùng dạng đảo ngữ với 'never', 'rarely', 'seldom' mà không có lý do nhấn mạnh.
             <br/><i>Ví dụ: "I never go there." là câu bình thường. "Never do I go there." là câu nhấn mạnh và trang trọng.</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He has never been abroad.</b> — Anh ấy chưa bao giờ ra nước ngoài.</li>
          <li><b>I am usually very busy on Mondays.</b> — Tôi thường rất bận vào các ngày thứ Hai.</li>
          <li><b>Do you often go to the cinema?</b> — Bạn có thường đi xem phim không?</li>
          <li><b>Occasionally, we eat out at a nice restaurant.</b> — Thỉnh thoảng, chúng tôi đi ăn ngoài ở một nhà hàng sang trọng.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Đặt trạng từ trong ngoặc vào đúng vị trí trong câu:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She is late for work. (never)
            <br/>→ ____________________________________________</li>
            <li>I have seen a ghost. (never)
            <br/>→ ____________________________________________</li>
            <li>He plays tennis on weekends. (sometimes)
            <br/>→ ____________________________________________</li>
            <li>Do you get up early? (usually)
            <br/>→ ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}