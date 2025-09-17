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

export default function CoreSubjunctiveMandative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📜 <span className="underline decoration-4 decoration-amber-400">THỂ GIẢ ĐỊNH (that + V-bare)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Một cấu trúc trang trọng dùng sau một số động từ và tính từ để diễn tả một yêu cầu, đề nghị, sự cần thiết. Điểm đặc trưng là động từ luôn ở dạng <b>nguyên mẫu không "to"</b> (V-bare).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Với Động từ" formula="S + verb + that + S + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Với Tính từ" formula="It is + adj + that + S + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Mức độ trang trọng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#verbs">Cấu trúc với Động từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adjectives">Cấu trúc với Tính từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#notes">Lưu ý quan trọng (Phủ định, Bị động)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Mức độ trang trọng" emoji="👔">
        <p>
            <b>Thể giả định (Mandative Subjunctive)</b> không mô tả một sự thật, mà diễn tả một điều <b>nên</b> hoặc <b>phải</b> xảy ra. Nó rất trang trọng và thường được sử dụng trong:
        </p>
        <ul className="list-disc pl-6">
          <li>Văn bản pháp lý, nội quy, quy định.</li>
          <li>Email công việc, biên bản cuộc họp.</li>
          <li>Văn phong học thuật.</li>
        </ul>
        <p>So sánh: <i>The manager insists that every employee <b>be</b> on time.</i> (Giả định: đây là yêu cầu) vs. <i>The manager knows that every employee <b>is</b> on time.</i> (Hiện thực: đây là sự thật).</p>
      </Section>

      <Section id="verbs" title="Cấu trúc với Động từ" emoji="🗣️">
        <p>Cấu trúc này theo sau các động từ chỉ sự yêu cầu, đề nghị, gợi ý...</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: <code className="font-mono">S1 + verb + that + S2 + V(bare)</code></p>
        </div>
        <p className="mt-2">Các động từ thường gặp: <b>suggest, recommend, demand, insist, request, propose, ask, require, urge</b>.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The doctor recommended that he <b>stop</b> smoking.</i> (Không phải `stops` hay `to stop`)</li>
            <li><i>The law requires that everyone <b>wear</b> a seatbelt.</i> (Không phải `wears`)</li>
        </ul>
      </Section>

      <Section id="adjectives" title="Cấu trúc với Tính từ" emoji="✨">
        <p>Cấu trúc này theo sau các tính từ chỉ sự cần thiết, quan trọng...</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: <code className="font-mono">It is + adjective + that + S + V(bare)</code></p>
        </div>
        <p className="mt-2">Các tính từ thường gặp: <b>essential, important, necessary, vital, crucial, imperative, recommended, best</b>.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>It is essential that she <b>attend</b> the meeting.</i> (Không phải `attends`)</li>
            <li><i>It is important that he <b>be</b> informed immediately.</i></li>
        </ul>
      </Section>
      
      <Section id="notes" title="Lưu ý quan trọng (Phủ định, Bị động)" emoji="⚠️">
        <ol className="list-decimal pl-6 space-y-2">
            <li><b>Dạng phủ định:</b> Thêm "not" trước động từ nguyên mẫu.
                <br/><i>The professor insisted that the student <b>not be</b> late.</i>
            </li>
            <li><b>Dạng bị động:</b> Dùng "be + V3/V-ed".
                <br/><i>It is recommended that this report <b>be submitted</b> before Friday.</i>
            </li>
            <li><b>Thay thế bằng "should" (ít trang trọng hơn):</b> Đặc biệt trong tiếng Anh-Anh, cấu trúc `should + V(bare)` có thể được dùng thay thế.
                 <br/><i>The doctor suggested that he <b>should rest</b>.</i>
            </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The board proposed that the new policy be implemented immediately.</b> — Hội đồng quản trị đề xuất rằng chính sách mới phải được thi hành ngay lập tức.</li>
          <li><b>It is imperative that all staff members complete the training.</b> — Tất cả nhân viên bắt buộc phải hoàn thành khóa đào tạo.</li>
          <li><b>She asked that her name not be mentioned in the report.</b> — Cô ấy yêu cầu rằng tên của cô ấy không được đề cập trong báo cáo.</li>
          <li><b>The committee demands that the CEO resign.</b> — Ủy ban yêu cầu giám đốc điều hành từ chức.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The teacher suggested that he (do) ______ his homework.</li>
            <li>It is necessary that everyone (be) ______ here on time.</li>
            <li>They requested that the contract (review) ______ by a lawyer.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}