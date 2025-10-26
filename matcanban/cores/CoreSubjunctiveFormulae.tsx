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
        'group relative w-full min-w-0 px-4 py-3 rounded-2xl',
        'text-white font-extrabold shadow-lg transition-[transform,box-shadow] active:scale-95',
        'ring-1 ring-white/20 bg-gradient-to-r', colors,
        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-left'
      ].join(' ')}
    >
      <span className="truncate">{label}</span>
      <span className="hidden sm:inline ml-2 text-white/85 font-semibold">({formula})</span>
      <span className="sm:hidden text-white/85 font-semibold text-xs leading-tight">({formula})</span>
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

export default function CoreSubjunctiveFormulae() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✨ <span className="underline decoration-4 decoration-amber-400">GIẢ ĐỊNH: CÔNG THỨC CỐ ĐỊNH</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Các thành ngữ, cụm từ cố định sử dụng thể giả định để diễn đạt lời chúc, lời cầu nguyện, sự nhượng bộ hoặc mệnh lệnh một cách trang trọng.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Lời chúc" formula="Long live the King!" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Nhượng bộ" formula="Be that as it may..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Chấp nhận" formula="So be it." colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="Bất chấp" formula="Come what may..." colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Đặc điểm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#formulae">Các công thức phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#notes">Lưu ý quan trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Đặc điểm" emoji="🎯">
        <p>
            Các công thức giả định cố định là những "di tích" của ngữ pháp tiếng Anh cổ, nay được dùng như những thành ngữ. Chúng không tuân theo các quy tắc chia động từ thông thường.
        </p>
        <ul className="list-disc pl-6">
          <li>Động từ luôn ở dạng <b>nguyên mẫu không "to" (V-bare)</b>, bất kể chủ ngữ là gì.</li>
          <li>Thường được dùng trong các ngữ cảnh trang trọng, văn học, hoặc để tạo hiệu ứng tu từ.</li>
          <li>Diễn tả một mong muốn, lời cầu nguyện, sự chấp nhận một điều không mong muốn, hoặc sự nhượng bộ.</li>
        </ul>
      </Section>

      <Section id="formulae" title="Các công thức phổ biến" emoji="📜">
        <div className="space-y-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Long live... / God save... / Heaven help...</b></p>
                <p className="text-sm text-gray-600">Dùng để cầu chúc hoặc cầu nguyện.</p>
                <p className="pl-4"><i>e.g., <b>Long live</b> the Republic!</i> (Nền cộng hòa muôn năm!)</p>
                <p className="pl-4"><i>e.g., <b>God save</b> the Queen.</i> (Xin Chúa hãy phò hộ cho Nữ hoàng.)</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Be that as it may</b></p>
                <p className="text-sm text-gray-600">Một cách nói trang trọng của "nevertheless" hoặc "however" (tuy nhiên, mặc dù vậy).</p>
                <p className="pl-4"><i>e.g., His argument is interesting. <b>Be that as it may</b>, I still disagree.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>So be it</b></p>
                <p className="text-sm text-gray-600">Dùng để diễn tả sự chấp nhận một điều gì đó không mong muốn.</p>
                <p className="pl-4"><i>e.g., If he refuses to apologize, then <b>so be it</b>.</i> (Nếu anh ta không xin lỗi, thì đành vậy.)</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Come what may</b></p>
                <p className="text-sm text-gray-600">Có nghĩa là "whatever happens" (dù có chuyện gì xảy ra).</p>
                <p className="pl-4"><i>e.g., <b>Come what may</b>, I will stand by you.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Far be it from me to...</b></p>
                <p className="text-sm text-gray-600">Một cách lịch sự để đưa ra lời chỉ trích hoặc bất đồng. (Tôi nào dám...)</p>
                <p className="pl-4"><i>e.g., <b>Far be it from me to</b> tell you what to do, but I think you should reconsider.</i></p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>Suffice it to say...</b></p>
                <p className="text-sm text-gray-600">Dùng để nói "chỉ cần nói rằng là đủ", khi không muốn đi vào chi tiết.</p>
                <p className="pl-4"><i>e.g., I won't describe the whole argument; <b>suffice it to say</b>, we are not friends anymore.</i></p>
            </div>
        </div>
      </Section>
      
      <Section id="notes" title="Lưu ý quan trọng" emoji="⚠️">
        <p>Những cấu trúc này là <b>cố định</b>. Bạn không thể tự tạo ra các câu mới theo mẫu này. Hãy học chúng như những thành ngữ.</p>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Heaven forbid</b> that he should find out the truth! — Cầu trời cho anh ấy đừng phát hiện ra sự thật!</li>
          <li>He may be the boss, but <b>be that as it may</b>, he has no right to be rude. — Anh ta có thể là sếp, nhưng dù vậy, anh ta cũng không có quyền thô lỗ.</li>
          <li>If the committee decides against my proposal, then <b>so be it</b>. — Nếu ủy ban quyết định chống lại đề xuất của tôi, thì đành chịu vậy.</li>
          <li><b>Come what may</b>, we will finish this project on time. — Dù có chuyện gì xảy ra, chúng ta sẽ hoàn thành dự án này đúng hạn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Nối các cụm từ giả định với ý nghĩa phù hợp của chúng:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Come what may</li>
            <li>Be that as it may</li>
            <li>So be it</li>
            <li>Long live...</li>
          </ol>
           <ul className="list-none pl-6 mt-2 space-y-1 text-gray-700">
            <li>A. Nevertheless / However</li>
            <li>B. An expression of accepting something unpleasant</li>
            <li>C. A wish for someone/something to last a long time</li>
            <li>D. Whatever happens</li>
          </ul>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}