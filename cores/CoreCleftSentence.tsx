
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

export default function CoreCleftSentence() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🎯 <span className="underline decoration-4 decoration-amber-400">CÂU CHẺ</span> — Cleft Sentence
        </h1>
        <p className="mt-2 text-gray-700">
          Là một cấu trúc câu phức dùng để <b>nhấn mạnh</b> một thành phần cụ thể (chủ ngữ, tân ngữ, trạng ngữ) bằng cách "chẻ" một câu đơn thành hai mệnh đề.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="It-Cleft" formula="It is/was + [part] + that..." colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Wh-Cleft" formula="What... + is/was + [part]" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#def">Định nghĩa & Mục đích</a></li>
            <li><a className="text-rose-700 hover:underline" href="#it-cleft">Câu chẻ với "It" (It-cleft)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#wh-cleft">Câu chẻ với "Wh-" (Wh-cleft)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#when-to-use">Khi nào nên dùng câu chẻ?</a></li>
          </ol>
        </nav>
      </div>

      <Section id="def" title="Định nghĩa & Mục đích" emoji="📖">
        <p>
          <b>Câu chẻ</b> (Cleft Sentence) được dùng khi người nói muốn thu hút sự chú ý vào một phần thông tin nào đó, xem nó là phần quan trọng nhất, đáng chú ý nhất trong câu. Về cơ bản, nó lấy một câu đơn và chia thành hai phần để nhấn mạnh.
        </p>
        <ul className="list-disc pl-6">
          <li><b>Câu gốc:</b> <i>The cat sleeps in the box.</i></li>
          <li><b>Nhấn mạnh chủ ngữ:</b> <i><b>It is the cat that</b> sleeps in the box.</i> (Chính là con mèo...)</li>
          <li><b>Nhấn mạnh trạng ngữ:</b> <i><b>It is in the box that</b> the cat sleeps.</i> (Chính là trong cái hộp...)</li>
        </ul>
      </Section>

      <Section id="it-cleft" title="Câu chẻ với &quot;It&quot; (It-cleft)" emoji="👉">
        <p>Đây là dạng câu chẻ phổ biến nhất, dùng để nhấn mạnh chủ ngữ, tân ngữ, hoặc trạng ngữ.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: <code className="font-mono">It + be + [Thành phần nhấn mạnh] + who/that + ...</code></p>
            <ul className="list-disc pl-5 mt-2">
                <li>Dùng <b>who</b> khi nhấn mạnh chủ ngữ chỉ người.</li>
                <li>Dùng <b>that</b> cho các trường hợp còn lại (vật, nơi chốn, thời gian...). Trong văn nói thân mật, 'that' cũng có thể dùng cho người.</li>
                <li>Thì của động từ <b>be</b> (is/was) phải tương ứng với thì của động từ trong mệnh đề 'that'.</li>
            </ul>
        </div>
        <p className="mt-2"><b>Ví dụ:</b> <i>David broke the vase last night.</i></p>
        <ul className="list-disc pl-6">
          <li>Nhấn mạnh S (người): <i><b>It was David who</b> broke the vase last night.</i></li>
          <li>Nhấn mạnh O (vật): <i><b>It was the vase that</b> David broke last night.</i></li>
          <li>Nhấn mạnh Trạng ngữ (thời gian): <i><b>It was last night that</b> David broke the vase.</i></li>
        </ul>
      </Section>
      
      <Section id="wh-cleft" title="Câu chẻ với &quot;Wh-&quot; (Wh-cleft)" emoji="🤔">
        <p>Dạng này còn gọi là <b>pseudo-cleft</b>, thường dùng để nhấn mạnh hành động hoặc một ý tưởng, thông tin mới. Mệnh đề bắt đầu bằng "What" hoạt động như một danh từ.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: <code className="font-mono">What-clause + be + [Thành phần nhấn mạnh]</code></p>
            <p>Mệnh đề bắt đầu bằng <b>What</b> đóng vai trò chủ ngữ, theo sau là động từ <b>be</b>, rồi đến phần thông tin được nhấn mạnh.</p>
        </div>
        <p className="mt-2"><b>Ví dụ:</b> <i>The cat sleeps.</i> → <i><b>What the cat does is</b> sleep.</i> (Điều con mèo làm là ngủ.)</p>
        <p className="mt-2"><b>Ví dụ khác:</b> <i>He broke the window.</i> → <i><b>What he did was</b> break the window.</i> (Điều anh ấy đã làm là làm vỡ cửa sổ.)</p>
        <p className="mt-2">Các từ khác ngoài 'What' cũng có thể được dùng: <i><b>Where we need to go is</b> the main station.</i></p>
      </Section>

      <Section id="when-to-use" title="Khi nào nên dùng câu chẻ?" emoji="💡">
        <p>Câu chẻ không được dùng tùy tiện. Chúng hiệu quả nhất trong các tình huống sau:</p>
        <ul className="list-disc pl-6">
            <li><b>Để sửa thông tin sai:</b> <i>A: "Did the dog sleep?" B: "No, <b>it was the cat that</b> slept."</i></li>
            <li><b>Để trả lời câu hỏi, nhấn mạnh vào thông tin mới:</b> <i>A: "What does the cat do?" B: "<b>What the cat does is</b> sleep."</i></li>
            <li><b>Để tạo sự kịch tính hoặc nhấn mạnh trong văn viết:</b> <i><b>It was on that fateful night that</b> their lives changed forever.</i></li>
        </ul>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
