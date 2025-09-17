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

export default function CoreNounSubject() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        👤 <span className="underline decoration-4 decoration-amber-400">CHỦ NGỮ & CHỦ NGỮ GIẢ</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu vai trò của chủ ngữ trong câu và cách sử dụng các "chủ ngữ giả" (dummy subjects) <b>it</b> và <b>there</b> một cách chính xác.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Chủ ngữ thật" formula="The cat sleeps." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Chủ ngữ giả 'It'" formula="It is raining." colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Chủ ngữ giả 'There'" formula="There is a cat." colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#real-subjects">1. Chủ ngữ Thật (Real Subjects)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#dummy-it">2. Chủ ngữ giả 'It'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#dummy-there">3. Chủ ngữ giả 'There'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#agreement">4. Sự hòa hợp Động từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">5. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="real-subjects" title="1. Chủ ngữ Thật (Real Subjects)" emoji="👤">
        <p>
            <b>Chủ ngữ thật</b> là người hoặc vật thực sự thực hiện hành động hoặc được mô tả trong câu.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Chủ ngữ đơn:</b> <i><b>The dog</b> is barking.</i></li>
            <li><b>Chủ ngữ ghép:</b> <i><b>My brother and I</b> are going to the cinema.</i></li>
            <li><b>Chủ ngữ là cụm danh từ:</b> <i><b>The tall man with the glasses</b> is my teacher.</i></li>
        </ul>
      </Section>
      
      <Section id="dummy-it" title="2. Chủ ngữ giả 'It' (Dummy Subject 'It')" emoji="🌦️">
        <p>
            <b>'It'</b> được dùng làm chủ ngữ ngữ pháp khi không có chủ ngữ thật nào thực hiện hành động. Động từ theo sau 'it' luôn ở dạng số ít.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><b>Thời tiết (Weather):</b> <i><b>It</b> is sunny today. / <b>It</b> rained a lot yesterday.</i></li>
            <li><b>Thời gian (Time):</b> <i><b>It</b> is half past ten. / <b>It's</b> my birthday.</i></li>
            <li><b>Khoảng cách (Distance):</b> <i><b>It</b> is a long way from here to the station.</i></li>
            <li><b>Đưa ra ý kiến/nhận định:</b> <i><b>It</b> is important to be on time. / <b>It</b>'s a pity that you can't come.</i></li>
        </ul>
      </Section>

      <Section id="dummy-there" title="3. Chủ ngữ giả 'There' (Dummy Subject 'There')" emoji="📍">
        <p>
            <b>'There'</b> được dùng để giới thiệu sự tồn tại hoặc hiện diện của một người hoặc vật. Nó cũng là một chủ ngữ giả, và chủ ngữ thật (real subject) sẽ đứng sau động từ.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: There + be + Real Subject + ...</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i><b>There is</b> <u>a book</u> on the table.</i></li>
            <li><i><b>There are</b> <u>many people</u> in the room.</i></li>
            <li><i><b>There seems</b> to be <u>a problem</u>.</i></li>
        </ul>
      </Section>

      <Section id="agreement" title="4. Sự hòa hợp Động từ (Verb Agreement)" emoji="🤝">
        <p>
            Đây là quy tắc quan trọng nhất cần nhớ với chủ ngữ giả:
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li>Với <b>'It'</b>, động từ luôn ở dạng <b>số ít</b>.
                <br/><i>e.g., It <b>is</b>... / It <b>was</b>...</i>
            </li>
            <li>Với <b>'There'</b>, động từ hòa hợp với <b>chủ ngữ thật đứng sau nó</b>.
                <br/><i>e.g., There <b>is</b> <u>a reason</u>... / There <b>are</b> <u>some reasons</u>...</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="5. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Chia sai động từ với "There". (❌ <i className="line-through">There is many books.</i>)</li>
          <li>Dùng "is" thay cho "it is". (❌ <i className="line-through">Is important to study.</i>)</li>
          <li>Nhầm lẫn giữa "There is" (có) và "It is" (đó là).</li>
        </ol>
      </Section>

      <Section id="drill" title="6. Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn 'It' hoặc 'There' và chia động từ 'to be' đúng:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>______ ______ a lot of cars on the road today.</li>
            <li>______ ______ getting late. We should go home.</li>
            <li>______ ______ a mistake in your calculation.</li>
            <li>______ ______ difficult to learn a new language.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}