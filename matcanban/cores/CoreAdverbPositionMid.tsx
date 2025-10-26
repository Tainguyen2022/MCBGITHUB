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

export default function CoreAdverbPositionMid() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📍 <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ GIỮA CÂU</span> — <i>Mid Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Giải thích vị trí của các trạng từ (tần suất, mức độ chắc chắn, nhấn mạnh) khi chúng đứng ở giữa câu, thường là giữa chủ ngữ và động từ chính.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Trước V thường" formula="S + often + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Sau 'to be'" formula="S + is + always + ..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Sau trợ V đầu tiên" formula="S + have + never + V3" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Các loại Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule1">Quy tắc 1: Trước Động từ thường</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule2">Quy tắc 2: Sau Động từ 'to be'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule3">Quy tắc 3: Sau Trợ động từ đầu tiên</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Các loại Trạng từ" emoji="🎯">
        <p>
            <b>Vị trí giữa câu (Mid-position)</b> là vị trí phổ biến của nhiều loại trạng từ ngắn. Nó không phải là một điểm cố định mà thay đổi tùy thuộc vào cấu trúc của động từ trong câu.
        </p>
        <p className="font-bold mt-2">Các loại trạng từ thường đứng ở vị trí này:</p>
        <ul className="list-disc pl-6">
            <li><b>Trạng từ tần suất (Frequency):</b> always, often, usually, sometimes, never, rarely...</li>
            <li><b>Trạng từ chỉ sự chắc chắn (Certainty):</b> probably, definitely, certainly...</li>
            <li><b>Trạng từ nhấn mạnh (Focus):</b> just, even, only, also, too...</li>
        </ul>
      </Section>
      
      <Section id="rule1" title="Quy tắc 1: Trước Động từ thường" emoji="1️⃣">
        <p>
            Khi câu chỉ có một động từ chính (không có trợ động từ hay 'to be'), trạng từ đứng ngay trước nó.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Cấu trúc: Subject + Adverb + Main Verb</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She <b>often</b> <u>visits</u> her grandparents.</i></li>
            <li><i>I <b>completely</b> <u>forgot</u> about the meeting.</i></li>
            <li><i>They <b>probably</b> <u>think</u> we are not coming.</i></li>
        </ul>
      </Section>
      
       <Section id="rule2" title="Quy tắc 2: Sau Động từ 'to be'" emoji="2️⃣">
        <p>
            Khi động từ chính trong câu là 'to be' (am, is, are, was, were), trạng từ đứng ngay sau nó.
        </p>
         <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Cấu trúc: Subject + 'to be' + Adverb</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>He <u>is</u> <b>always</b> late.</i></li>
            <li><i>The children <u>were</u> <b>probably</b> tired after the trip.</i></li>
            <li><i>I <u>am</u> <b>definitely</b> not happy about this.</i></li>
        </ul>
      </Section>

      <Section id="rule3" title="Quy tắc 3: Sau Trợ động từ đầu tiên" emoji="3️⃣">
        <p>
            Khi câu có trợ động từ (auxiliary verbs) hoặc động từ khuyết thiếu (modal verbs), trạng từ đứng sau trợ động từ <b>đầu tiên</b>.
        </p>
         <div className="rounded-xl p-4 bg-green-50 border border-green-200">
            <p className="font-bold text-green-700">Cấu trúc: Subject + Aux 1 + Adverb + (Aux 2) + Main Verb</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I <u>have</u> <b>never</b> <u>been</u> to Japan.</i> (Sau 'have')</li>
            <li><i>She <u>can</u> <b>probably</b> <u>help</u> you.</i> (Sau 'can')</li>
            <li><i>He <u>doesn't</u> <b>usually</b> <u>complain</u>.</i> (Sau 'doesn't')</li>
             <li><i>The project <u>will</u> <b>definitely</b> <u>be finished</u> on time.</i> (Sau 'will')</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Đặt trạng từ giữa động từ và tân ngữ. (❌ <i className="line-through">I like very much chocolate.</i> → ✅ I <b>very much</b> like chocolate.)</li>
          <li>Đặt trạng từ trước động từ 'to be'. (❌ <i className="line-through">She always is late.</i> → ✅ She <b>is always</b> late.)</li>
           <li>Đặt trạng từ trước trợ động từ. (❌ <i className="line-through">I never have seen that movie.</i> → ✅ I <b>have never</b> seen that movie.)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He has probably forgotten about our appointment.</b> — Anh ấy có lẽ đã quên cuộc hẹn của chúng ta rồi.</li>
          <li><b>I just want to ask one more question.</b> — Tôi chỉ muốn hỏi thêm một câu nữa thôi.</li>
          <li><b>You should always listen to your parents.</b> — Bạn nên luôn luôn lắng nghe lời bố mẹ.</li>
          <li><b>She is certainly a very talented musician.</b> — Cô ấy chắc chắn là một nhạc sĩ rất tài năng.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Đặt trạng từ trong ngoặc vào đúng vị trí trong câu:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I can remember his name. (never)
            <br/>→ ____________________________________________</li>
            <li>The train is late. (often)
            <br/>→ ____________________________________________</li>
            <li>He goes to bed early. (usually)
            <br/>→ ____________________________________________</li>
            <li>I have been to a concert. (rarely)
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