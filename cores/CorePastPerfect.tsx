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

export default function CorePastPerfect() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          ⏮️ <span className="underline decoration-4 decoration-amber-400">THÌ QUÁ KHỨ HOÀN THÀNH</span> — Past Perfect
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả một hành động <b>đã xảy ra và hoàn tất TRƯỚC</b> một hành động khác hoặc một thời điểm khác trong quá khứ.
        </p>

        {/* CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE"         formula="S + had + V3"                      colors="from-indigo-500 via-sky-500 to-cyan-500" />
          <FormulaChip label="NEGATIVE"            formula="S + had not + V3"                  colors="from-rose-500 via-pink-500 to-fuchsia-600" />
          <FormulaChip label="YES/NO QUESTION"     formula="Had + S + V3 ?"                    colors="from-emerald-500 via-lime-500 to-amber-500" />
          <FormulaChip label="WH-QUESTION"         formula="Wh + had + S + V3 ?"               colors="from-teal-500 via-cyan-500 to-blue-500" />
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Ghi chú</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với Quá khứ đơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#reported-speech">Dùng trong Câu Tường thuật</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>Quá khứ hoàn thành được mệnh danh là "thì quá khứ của quá khứ". Nó thiết lập một trình tự thời gian rõ ràng.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Hành động xảy ra trước một hành động khác trong quá khứ:</b> Đây là cách dùng phổ biến nhất.
            <br/><i>e.g., When I arrived at the station, the train <u>had already left</u>.</i> (Việc tàu rời đi xảy ra trước việc tôi đến nơi).
          </li>
          <li><b>Hành động xảy ra trước một mốc thời gian cụ thể trong quá khứ:</b>
            <br/><i>e.g., She <u>had finished</u> her homework by 9 p.m. last night.</i>
          </li>
          <li><b>Trong câu điều kiện loại 3:</b> Diễn tả một điều kiện không có thật trong quá khứ.
            <br/><i>e.g., If he <u>had studied</u> harder, he would have passed the exam.</i>
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Ghi chú" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + had + V3/V-ed</i>. (Dạng rút gọn: 'd + V3, e.g., I'd finished).</li>
              <li><b>Phủ định:</b> <i>S + had not (hadn't) + V3/V-ed</i>.</li>
              <li><b>Yes/No:</b> <i>Had + S + V3/V-ed ?</i></li>
              <li><b>Wh-:</b> <i>Wh-word + had + S + V3/V-ed ?</i></li>
              <li><b>V3</b> là động từ ở cột thứ 3 trong bảng động từ bất quy tắc (Past Participle), hoặc thêm <i>-ed</i> với động từ có quy tắc.</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p>Thường đi kèm với các liên từ và cụm từ chỉ thời gian để thiết lập trình tự:</p>
        <p><b>before, after, already, just, when, by the time, as soon as, until then, prior to that time</b>.</p>
      </Section>

      <Section id="contrast" title="So sánh với Quá khứ đơn" emoji="⚖️">
        <p>Sự khác biệt nằm ở thứ tự của các hành động.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>QKHT + QKĐ:</b> Hành động QKHT xảy ra <u>trước</u>.
            <br/><i>e.g., The film <b>had started</b> (1st action) when we <b>arrived</b> (2nd action).</i>
          </li>
          <li><b>QKĐ + QKĐ:</b> Các hành động xảy ra <u>nối tiếp nhau</u> theo trình tự kể.
            <br/><i>e.g., When we <b>arrived</b> (1st action), the film <b>started</b> (2nd action).</i>
          </li>
        </ul>
      </Section>

      <Section id="reported-speech" title="Dùng trong Câu Tường thuật (Reported Speech)" emoji="🗣️">
        <p>Thì Quá khứ hoàn thành đóng vai trò quan trọng trong việc lùi thì khi tường thuật lại lời nói.</p>
        <ul className="list-disc pl-6">
            <li>Khi tường thuật một câu ở thì <b>Quá khứ đơn</b>, ta lùi về <b>Quá khứ hoàn thành</b>.
                <br/><i>Direct: "I <b>saw</b> that movie." → Reported: He said he <b>had seen</b> that movie.</i>
            </li>
            <li>Khi tường thuật một câu ở thì <b>Hiện tại hoàn thành</b>, ta cũng lùi về <b>Quá khứ hoàn thành</b>.
                <br/><i>Direct: "I <b>have seen</b> that movie." → Reported: He said he <b>had seen</b> that movie.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Lạm dụng khi chỉ có một hành động duy nhất trong quá khứ hoặc khi các hành động xảy ra nối tiếp nhau (phải dùng Quá khứ đơn).</li>
          <li>Chia sai V3 đối với động từ bất quy tắc.</li>
          <li>Nhầm lẫn thứ tự trước-sau của hành động.</li>
          <li>Quên "had" hoặc dùng "have/has" thay thế.</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}