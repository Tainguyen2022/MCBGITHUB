
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

export default function CoreWishFuture() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🙏 <span className="underline decoration-4 decoration-amber-400">CÂU ƯỚC Ở TƯƠNG LAI</span> — <i>Wish (future)</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để thể hiện mong muốn một điều gì đó <b>thay đổi trong tương lai</b>, thường mang ý nghĩa <b>phàn nàn</b> hoặc bày tỏ sự <b>thiếu kiên nhẫn</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="S + wish(es) + S + would + V(bare)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Phủ định" formula="S + wish(es) + S + wouldn't + V(bare)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Cấu trúc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#contrast">So sánh với "Hope"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <p>
            Câu ước ở tương lai với "would" không chỉ đơn thuần là mong ước, mà thường dùng để:
        </p>
        <ul className="list-disc pl-6">
          <li><b>Phàn nàn về một thói quen xấu:</b> <i>I wish you <b>would stop</b> making so much noise.</i> (Tôi muốn bạn dừng việc làm ồn ào lại).</li>
          <li><b>Bày tỏ mong muốn một tình huống thay đổi (mà có vẻ nó sẽ không thay đổi):</b> <i>I wish the dog <b>would stop</b> barking.</i> (Tôi muốn con chó ngừng sủa, nhưng có vẻ nó vẫn sủa).</li>
          <li><b>Lịch sự yêu cầu ai đó làm gì:</b> <i>I wish you <b>would help</b> me with this.</i></li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Cấu trúc" emoji="🧩">
        <p>Mệnh đề theo sau "wish" sử dụng <b>would + V(nguyên mẫu)</b>.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S1 + wish(es) + S2 + would/wouldn't + V(bare)</p>
        </div>
        <p className="mt-2 font-semibold text-red-700">Lưu ý quan trọng:</p>
        <ul className="list-disc pl-6">
            <li>Chủ ngữ của mệnh đề "wish" (S1) và chủ ngữ của mệnh đề "would" (S2) phải <b>khác nhau</b>. Chúng ta không thể tự ước cho bản thân mình với "would".
                <br/>❌ <i className="line-through">I wish I would be rich.</i> (Phải dùng câu ước ở hiện tại: <i>I wish I were rich.</i>)
            </li>
        </ul>
      </Section>

      <Section id="contrast" title="So sánh với &quot;Hope&quot;" emoji="⚖️">
        <p>Cả hai đều nói về tương lai, nhưng sắc thái khác nhau rõ rệt.</p>
        <ul className="list-disc pl-6">
            <li><b>Wish + would:</b> Thể hiện sự phàn nàn, mong muốn một sự thay đổi mà người nói không kiểm soát được, hoặc có ít hy vọng.
                <br/><i>I wish he <b>would call</b> me.</i> (Anh ta không gọi, và tôi đang phàn nàn về điều đó).
            </li>
            <li><b>Hope:</b> Thể hiện một mong muốn thực tế, có khả năng xảy ra.
                <br/><i>I hope he <b>will call</b> me.</i> (Tôi hy vọng và tin rằng anh ấy sẽ gọi).
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng "wish + would" khi hai chủ ngữ giống nhau. (❌ <i className="line-through">I wish I would pass the exam.</i> → ✅ I hope I will pass the exam.)</li>
          <li>Dùng "will" thay vì "would". (❌ <i className="line-through">I wish he will stop.</i>)</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
