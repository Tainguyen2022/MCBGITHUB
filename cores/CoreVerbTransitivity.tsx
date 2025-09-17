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

export default function CoreVerbTransitivity() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        👉 <span className="underline decoration-4 decoration-amber-400">NỘI/NGOẠI ĐỘNG TỪ</span> — <i>Transitivity</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Phân biệt động từ cần tân ngữ (ngoại động từ) và động từ không cần tân ngữ (nội động từ) để hoàn thành ý nghĩa.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Ngoại động từ (Transitive)" formula="S + V + Object" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Nội động từ (Intransitive)" formula="S + V" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#transitive">Ngoại động từ (Transitive Verbs)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#intransitive">Nội động từ (Intransitive Verbs)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#ambitransitive">Động từ Lưỡng tính (Ambitransitive)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#how-to-check">Cách kiểm tra</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="transitive" title="Ngoại động từ (Transitive Verbs)" emoji="➡️📦">
        <p>
            <b>Ngoại động từ</b> là động từ cần một <b>tân ngữ trực tiếp (direct object)</b> để hoàn thành ý nghĩa. Hành động của động từ được "chuyển giao" (transfer) cho tân ngữ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She <b>reads</b>... (reads what?) → She reads <b>a book</b>.</i></li>
            <li><i>He <b>kicked</b>... (kicked what?) → He kicked <b>the ball</b>.</i></li>
            <li><b>Ví dụ phổ biến:</b> buy, bring, make, find, hit, love, like, read, send, take, write, see.</li>
        </ul>
      </Section>

      <Section id="intransitive" title="Nội động từ (Intransitive Verbs)" emoji="🧘">
        <p>
            <b>Nội động từ</b> là động từ không cần tân ngữ trực tiếp. Nó có thể tự đứng một mình hoặc đi kèm với trạng từ, cụm giới từ để bổ sung thông tin.
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li><i>The baby <b>cried</b>.</i> (Câu đã đủ nghĩa).</li>
            <li><i>He <b>arrived</b> late.</i> ('late' là trạng từ, không phải tân ngữ).</li>
            <li><i>They are <b>sleeping</b> in the bedroom.</i> ('in the bedroom' là cụm giới từ).</li>
            <li><b>Ví dụ phổ biến:</b> arrive, cry, die, fall, go, laugh, live, sleep, wait, work, exist.</li>
        </ul>
      </Section>

      <Section id="ambitransitive" title="Động từ Lưỡng tính (Ambitransitive)" emoji="↔️">
        <p>Nhiều động từ trong tiếng Anh có thể vừa là nội động từ, vừa là ngoại động từ, tùy thuộc vào ngữ cảnh.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>read:</b>
                <br/>- <i>She is <b>reading</b>.</i> (Intransitive)
                <br/>- <i>She is <b>reading a novel</b>.</i> (Transitive)
            </li>
            <li><b>open:</b>
                <br/>- <i>The door <b>opened</b>.</i> (Intransitive)
                <br/>- <i>I <b>opened the door</b>.</i> (Transitive)
            </li>
            <li><b>Các động từ khác:</b> run, eat, change, close, start, stop, move.</li>
        </ul>
      </Section>

      <Section id="how-to-check" title="Cách kiểm tra" emoji="🔍">
        <p>
            Để xác định một động từ là nội hay ngoại động từ trong một câu cụ thể, hãy đặt câu hỏi <b>"What?"</b> hoặc <b>"Whom?"</b> ngay sau động từ.
        </p>
        <ul className="list-disc pl-6">
            <li>Nếu có câu trả lời hợp lý trong câu, đó là <b>ngoại động từ</b>.</li>
            <li>Nếu không có, đó là <b>nội động từ</b>.</li>
        </ul>
        <p className="mt-2"><i>Ví dụ: "She bought a new car." → Bought what? → "a new car". ⇒ "bought" là ngoại động từ.</i></p>
        <p><i>Ví dụ: "He slept for eight hours." → Slept what? → Không có câu trả lời. ⇒ "slept" là nội động từ.</i></p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng nội động từ với tân ngữ trực tiếp. (❌ <i className="line-through">I arrived the city.</i> → ✅ I arrived <b>in</b> the city.)</li>
          <li>Không có tân ngữ cho ngoại động từ. (❌ <i className="line-through">She brought.</i> → ✅ She brought <b>a gift</b>.)</li>
          <li>Nhầm lẫn cụm giới từ với tân ngữ. Tân ngữ trực tiếp thường không có giới từ đứng trước.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>(Ngoại) I need some help.</b> — Tôi cần một vài sự giúp đỡ.</li>
          <li><b>(Nội) The sun is shining.</b> — Mặt trời đang tỏa nắng.</li>
          <li><b>(Lưỡng tính - Nội) The game has started.</b> — Trò chơi đã bắt đầu.</li>
          <li><b>(Lưỡng tính - Ngoại) She started the game.</b> — Cô ấy đã bắt đầu trò chơi.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Xác định động từ trong các câu sau là Nội động từ (I) hay Ngoại động từ (T):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The birds are singing beautifully. (____)</li>
            <li>He wrote a long letter to his friend. (____)</li>
            <li>The glass fell from the table. (____)</li>
            <li>She plays the piano very well. (____)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}