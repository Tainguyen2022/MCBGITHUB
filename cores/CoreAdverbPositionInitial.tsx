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

export default function CoreAdverbPositionInitial() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ➡️ <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ ĐẦU CÂU</span> — <i>Initial Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Giải thích các trường hợp trạng từ được đặt ở đầu câu, thường để thiết lập bối cảnh, kết nối ý tưởng, hoặc đưa ra bình luận. Vị trí này luôn đòi hỏi có dấu phẩy đi theo sau.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Trạng từ Thời gian" formula="Yesterday, I was busy." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Trạng từ Liên kết" formula="However, the plan failed." colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Trạng từ Bình luận" formula="Fortunately, no one was hurt." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Trạng từ Tần suất" formula="Sometimes, I work from home." colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#types">Các loại Trạng từ phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc Dấu phẩy (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            Đặt trạng từ ở đầu câu (initial position) có ba mục đích chính:
        </p>
        <ul className="list-disc pl-6">
            <li><b>Thiết lập bối cảnh:</b> Cung cấp thông tin về thời gian hoặc nơi chốn cho cả câu theo sau.</li>
            <li><b>Kết nối các ý tưởng:</b> Hoạt động như một từ chuyển tiếp (transition word), nối ý của câu này với câu trước đó.</li>
            <li><b>Đưa ra bình luận:</b> Thể hiện thái độ hoặc quan điểm của người nói về toàn bộ sự việc trong câu.</li>
        </ul>
      </Section>
      
      <Section id="types" title="Các loại Trạng từ phổ biến ở Vị trí Đầu câu" emoji="📚">
        <div className="space-y-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>1. Trạng từ Thời gian (Time Adverbs):</b></p>
                <p className="text-sm text-gray-600"><i><b>Tomorrow,</b> we will have a meeting. / <b>In the morning,</b> I usually drink coffee.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>2. Trạng từ Liên kết (Connecting Adverbs):</b></p>
                <p className="text-sm text-gray-600"><i><b>However,</b> there was a problem. / <b>Therefore,</b> the flight was cancelled.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>3. Trạng từ Bình luận (Comment/Viewpoint Adverbs):</b></p>
                <p className="text-sm text-gray-600"><i><b>Luckily,</b> everyone escaped the fire. / <b>Honestly,</b> I don't like his new song.</i></p>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>4. Một số Trạng từ Tần suất (Frequency Adverbs):</b></p>
                <p className="text-sm text-gray-600">Chỉ một số trạng từ như <i>sometimes, usually, normally, occasionally</i> có thể đứng đầu câu để nhấn mạnh.</p>
                <p className="text-sm text-gray-600"><i><b>Sometimes,</b> I prefer to stay at home.</i></p>
                 <p className="text-sm text-red-600">Lưu ý: <b>Always, never, rarely, seldom</b> không đứng đầu câu trừ khi dùng trong cấu trúc đảo ngữ.</p>
            </div>
        </div>
      </Section>
      
      <Section id="punctuation" title="Quy tắc Dấu phẩy (Rất quan trọng!)" emoji="✍️">
        <p>
            Quy tắc vàng: Khi một trạng từ hoặc cụm trạng từ đứng ở đầu câu, nó phải được theo sau bởi một <b>dấu phẩy (,)</b>.
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li><i><b>Unfortunately,</b> we missed the train.</i></li>
            <li><i><b>Next week,</b> I will be on vacation.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Quên dấu phẩy:</b> Đây là lỗi phổ biến nhất. (❌ <i className="line-through">Suddenly the lights went out.</i>)</li>
          <li><b>Đặt sai loại trạng từ ở đầu câu:</b> Trạng từ chỉ cách thức (manner) như 'slowly', 'carefully' rất hiếm khi đứng đầu câu. (❌ <i className="line-through">Slowly, he opened the door.</i> - Có thể dùng trong văn viết sáng tạo, nhưng không phổ biến).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Generally, the students in this class are very hardworking.</b> — Nhìn chung, học sinh trong lớp này rất chăm chỉ.</li>
          <li><b>At the end of the day, it's your decision.</b> — Suy cho cùng, đó là quyết định của bạn.</li>
          <li><b>Surprisingly, he passed the exam with a high score.</b> — Thật ngạc nhiên, anh ấy đã vượt qua kỳ thi với điểm số cao.</li>
          <li><b>First, mix the flour and sugar. Then, add the eggs.</b> — Đầu tiên, trộn bột và đường. Sau đó, thêm trứng vào.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các câu sau, di chuyển trạng từ ra đầu câu và thêm dấu câu đúng:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I go for a run in the morning usually.
            <br/>→ ____________________________________________</li>
            <li>He was able to finish the project on time luckily.
            <br/>→ ____________________________________________</li>
            <li>We have to work this weekend unfortunately.
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