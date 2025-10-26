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

export default function CorePastSimple(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🕰️ <span className="underline decoration-4 decoration-amber-400">THÌ QUÁ KHỨ ĐƠN</span> — Past Simple
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đã bắt đầu và kết thúc</b> hoàn toàn trong quá khứ, thường có thời gian xác định.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE (V THƯỜNG)" formula="S + V2/V-ed" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE (V THƯỜNG)" formula="S + did not + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Did + S + V(bare) ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="AFFIRMATIVE (TO BE)" formula="S + was/were + N/Adj" colors="from-purple-500 via-violet-500 to-indigo-600"/>
          <FormulaChip label="NEGATIVE (TO BE)" formula="S + was/were + not" colors="from-orange-500 via-amber-500 to-yellow-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh + did + S + V(bare) ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Chính tả -ed</a></li>
            <li><a className="text-rose-700 hover:underline" href="#neg">Phủ định & Câu hỏi</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#used-to">So sánh với 'used to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Hành động đã kết thúc trong quá khứ (có thời gian xác định):</b> Đây là cách dùng phổ biến nhất.
            <br/><i>e.g., I <u>visited</u> Paris last year. / She <u>graduated</u> in 2020.</i>
          </li>
          <li><b>Chuỗi hành động xảy ra liên tiếp trong quá khứ:</b> Dùng để kể chuyện.
            <br/><i>e.g., He <u>came</u> in, <u>took</u> off his coat, and <u>sat</u> down.</i>
          </li>
          <li><b>Thói quen hoặc tình trạng trong quá khứ (nay đã chấm dứt):</b>
            <br/><i>e.g., He <u>played</u> the piano when he was a child. / They <u>lived</u> in a small village.</i> (Thường có thể thay thế bằng 'used to').
          </li>
          <li><b>Trong câu điều kiện loại 2:</b> Mệnh đề 'If' dùng thì Quá khứ đơn để diễn tả điều không có thật ở hiện tại.
            <br/><i>e.g., If I <u>had</u> more time, I would travel.</i>
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Chính tả -ed" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
          <div className="font-bold text-indigo-700 uppercase text-sm mb-1">Động từ thường</div>
          <p><b>Khẳng định:</b> <i>S + V2/V-ed</i>. (V2 là cột 2 của Bảng Động từ Bất quy tắc, V-ed dành cho động từ có quy tắc).</p>
          <div className="font-bold text-indigo-700 uppercase text-sm mt-2 mb-1">Động từ "to be"</div>
          <p><i>S + was/were</i>. (I/He/She/It + <b>was</b>; You/We/They + <b>were</b>).</p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <div className="font-bold text-amber-700">Quy tắc thêm <u>-ed</u></div>
            <ul className="list-disc pl-5 mt-1">
              <li>Hầu hết động từ: thêm <b>-ed</b> (e.g., watched, played).</li>
              <li>Tận cùng là -e: chỉ thêm <b>-d</b> (e.g., liked, moved).</li>
              <li>Phụ âm + y: đổi 'y' thành 'i' rồi thêm <b>-ed</b> (e.g., studied, tried).</li>
              <li>Một nguyên âm + một phụ âm (CVC): gấp đôi phụ âm cuối rồi thêm -ed (e.g., stopped, planned).</li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200">
            <div className="font-bold text-emerald-700">Phát âm đuôi -ed</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>/t/</b> sau các âm /p/, /k/, /f/, /s/, /ʃ/, /tʃ/: stopped, looked, laughed.</li>
              <li><b>/d/</b> sau các nguyên âm và phụ âm hữu thanh: played, lived, opened.</li>
              <li><b>/ɪd/</b> sau các âm /t/, /d/: wanted, needed, decided.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="neg" title="Phủ định & Câu hỏi" emoji="❓">
         <p className="font-semibold text-red-700">Quy tắc vàng: Khi đã dùng trợ động từ <b>did</b> hoặc <b>didn't</b>, động từ chính luôn ở dạng <b>nguyên mẫu không "to" (V-bare)</b>.</p>
        <div className="rounded-xl p-4 bg-rose-50 border border-rose-200 mt-2">
            <div className="font-bold text-rose-700">Động từ thường</div>
            <p><b>Phủ định:</b> <i>S + did not (didn't) + V(bare)</i>.</p>
            <p><b>Yes/No:</b> <i>Did + S + V(bare)?</i></p>
            <p><b>Short answers:</b> Yes, I <b>did</b>. / No, I <b>didn’t</b>.</p>
        </div>
        <p className="mt-3"><i>e.g., He <u>went</u> to school. → He <u>didn't go</u> to school. → <u>Did he go</u> to school?</i></p>
      </Section>
      
      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>yesterday</b>, <b>last night/week/month/year</b>, <b>... ago</b> (e.g., <i>two days ago</i>), <b>in + [năm quá khứ]</b> (e.g., <i>in 1990</i>), <b>when I was a child</b>, <b>the other day</b>.</p>
      </Section>

      <Section id="used-to" title="So sánh với 'used to'" emoji="🔄">
        <p>Khi nói về thói quen hoặc trạng thái kéo dài trong quá khứ, Quá khứ đơn và "used to" có thể thay thế cho nhau. Tuy nhiên, "used to" nhấn mạnh hơn sự tương phản với hiện tại (bây giờ không còn nữa).</p>
        <ul className="list-disc pl-6">
            <li><i>I <b>lived</b> in Tokyo for five years.</i> (Tương đương: <i>I <b>used to live</b> in Tokyo for five years.</i>)</li>
            <li><b>Lưu ý:</b> Không dùng "used to" cho hành động chỉ xảy ra một lần.
            <br/><i>e.g., I <b>visited</b> my grandmother yesterday.</i> (Không dùng <i>I used to visit...</i>)
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Vẫn chia động từ ở dạng quá khứ trong câu phủ định/nghi vấn có <b>did/didn't</b>. (❌ <i>I didn't went</i>).</li>
          <li>Chia sai động từ bất quy tắc (dùng V3 thay vì V2, hoặc thêm -ed). (❌ <i>I buyed a car</i>).</li>
          <li>Nhầm lẫn giữa <b>was</b> và <b>were</b>.</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}