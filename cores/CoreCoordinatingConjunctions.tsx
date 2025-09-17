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

export default function CoreCoordinatingConjunctions() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔗 <span className="underline decoration-4 decoration-amber-400">LIÊN TỪ KẾT HỢP</span> — <i>Coordinating Conjunctions</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là bảy từ ngắn dùng để nối các từ, cụm từ, hoặc mệnh đề có chức năng ngữ pháp ngang bằng nhau. Mẹo nhớ: <b>FANBOYS</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Nối Mệnh đề Độc lập" formula="IC, and IC" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Nối Từ/Cụm từ" formula="word/phrase and word/phrase" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#fanboys">7 Liên từ FANBOYS</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc Dấu câu (Quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#parallelism">Cấu trúc Song song</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Chức năng" emoji="🎯">
        <p>
            <b>Liên từ kết hợp</b> là những từ nối các thành phần ngữ pháp có vai trò tương đương nhau: từ với từ, cụm từ với cụm từ, và mệnh đề độc lập với mệnh đề độc lập.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Nối từ:</b> <i>I like tea <b>and</b> coffee.</i> (noun + noun)</li>
            <li><b>Nối cụm từ:</b> <i>He works quickly <b>but</b> carefully.</i> (adverb + adverb)</li>
            <li><b>Nối mệnh đề độc lập:</b> <i>She studied hard, <b>so</b> she passed the exam.</i> (clause + clause)</li>
        </ul>
      </Section>

      <Section id="fanboys" title="7 Liên từ FANBOYS" emoji="🤝">
        <p>Đây là 7 liên từ kết hợp duy nhất trong tiếng Anh.</p>
         <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">F</b>or: Vì, bởi vì (giải thích nguyên nhân).</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">A</b>nd: Và (thêm thông tin).</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">N</b>or: Cũng không (nối 2 ý phủ định).</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">B</b>ut: Nhưng (chỉ sự đối lập).</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">O</b>r: Hoặc (đưa ra lựa chọn).</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">Y</b>et: Tuy nhiên (tương tự 'but').</div>
            <div className="rounded-xl p-3 bg-gray-50 border"><b className="font-mono text-indigo-600">S</b>o: Vì vậy, cho nên (chỉ kết quả).</div>
        </div>
      </Section>

      <Section id="punctuation" title="Quy tắc Dấu câu (Quan trọng!)" emoji="✍️">
        <p>Việc dùng dấu phẩy với liên từ kết hợp phụ thuộc vào thứ mà nó đang nối.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Nối hai mệnh đề độc lập (Independent Clauses):</b> BẮT BUỘC dùng dấu phẩy <b>trước</b> liên từ.
                <br/><i>e.g., I wanted to go to the beach<b>, but</b> it was raining.</i>
            </li>
            <li><b>Nối hai từ hoặc hai cụm từ:</b> KHÔNG dùng dấu phẩy.
                 <br/><i>e.g., He is smart <b>and</b> funny.</i>
            </li>
            <li><b>Nối ba mục trở lên trong một danh sách:</b> Có thể dùng dấu phẩy trước "and" (gọi là Oxford comma) để rõ nghĩa hơn.
                 <br/><i>e.g., I need to buy eggs, milk<b>, and</b> bread.</i>
            </li>
        </ul>
      </Section>

      <Section id="parallelism" title="Cấu trúc Song song (Parallel Structure)" emoji="⛓️">
        <p>
            Khi dùng liên từ kết hợp, các thành phần được nối phải có cùng dạng ngữ pháp. Điều này gọi là cấu trúc song song.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Danh từ:</b> <i>He likes <b>football</b> and <b>basketball</b>.</i></li>
            <li><b>Động từ nguyên mẫu:</b> <i>She wants <b>to travel</b> and <b>to see</b> the world.</i></li>
            <li><b>Danh động từ:</b> <i>My hobbies are <b>reading</b> and <b>writing</b>.</i></li>
            <li>❌ <i className="line-through">He likes to run and swimming.</i> → ✅ He likes <b>to run</b> and <b>to swim</b>. / He likes <b>running</b> and <b>swimming</b>.</li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Comma Splice:</b> Nối hai mệnh đề độc lập chỉ bằng dấu phẩy. (❌ <i className="line-through">I was tired, I went to bed.</i>)</li>
          <li><b>Quên dấu phẩy:</b> Không dùng dấu phẩy trước FANBOYS khi nối hai mệnh đề độc lập.</li>
          <li><b>Thiếu cấu trúc song song:</b> Nối các thành phần không tương đồng về ngữ pháp.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He studied diligently, so he got a high score.</b> — Anh ấy đã học chăm chỉ, vì vậy anh ấy đã đạt điểm cao.</li>
          <li><b>You can either wait here or come with me.</b> — Bạn có thể hoặc là đợi ở đây hoặc là đi với tôi.</li>
          <li><b>She doesn't like coffee, nor does she like tea.</b> — Cô ấy không thích cà phê, và cô ấy cũng không thích trà.</li>
          <li><b>I must go now, for I have an appointment.</b> — Tôi phải đi bây giờ, vì tôi có một cuộc hẹn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền liên từ FANBOYS phù hợp và thêm dấu phẩy nếu cần:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I wanted to call you ______ I didn't have your number.</li>
            <li>He is tired ______ he worked all night.</li>
            <li>Would you like tea ______ coffee?</li>
            <li>She is smart ______ talented.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}