import React, { useState } from 'react';

const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 112; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    } else if (targetId === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

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
      <span className="break-words whitespace-normal">{formula}</span>

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

export default function CoreModalPossibility() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎲 <span className="underline decoration-4 decoration-amber-400">MODALS: KHẢ NĂNG & XÁC SUẤT</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng <b>may, might, could, can</b> để diễn tả mức độ chắc chắn về một sự việc có thể xảy ra.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="HT/TL (50%)" formula="S + may/could + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="HT/TL (&lt;30%)" formula="S + might + V" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Quá khứ" formula="S + may/might/could + have + V3" colors="from-rose-500 via-red-500 to-orange-500"/>
           <FormulaChip label="Khả năng chung" formula="S + can + V" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use" onClick={handleScrollTo}>Mức độ chắc chắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#present-future" onClick={handleScrollTo}>Khả năng ở Hiện tại & Tương lai</a></li>
            <li><a className="text-rose-700 hover:underline" href="#past" onClick={handleScrollTo}>Khả năng trong Quá khứ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#can" onClick={handleScrollTo}>"Can" cho Khả năng chung</a></li>
             <li><a className="text-rose-700 hover:underline" href="#negation" onClick={handleScrollTo}>Phủ định</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls" onClick={handleScrollTo}>Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples" onClick={handleScrollTo}>Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill" onClick={handleScrollTo}>Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mức độ chắc chắn" emoji="🎯">
        <p>Các modal verbs này thể hiện mức độ chắc chắn khác nhau của người nói về một sự việc.</p>
        <ul className="list-disc pl-6">
            <li><b>may / could:</b> Khá chắc chắn (khoảng 50%). Đây là hai lựa chọn phổ biến.</li>
            <li><b>might:</b> Ít chắc chắn hơn (khoảng 30% hoặc thấp hơn).</li>
            <li><b>can:</b> Dùng cho khả năng mang tính lý thuyết, chung chung, không phải dự đoán cụ thể.</li>
        </ul>
      </Section>

      <Section id="present-future" title="Khả năng ở Hiện tại & Tương lai" emoji="⏰">
        <p>Dùng <b>may, might, could</b> + V(nguyên mẫu) để nói về điều có thể đúng ở hiện tại hoặc có thể xảy ra trong tương lai.</p>
        <ul className="list-disc pl-6 mt-2">
          <li><i>Where is the cat? - It <b>may be</b> in the garden.</i> (Có lẽ nó đang ở trong vườn).</li>
          <li><i>Take an umbrella. It <b>might rain</b> later.</i> (Trời có thể mưa sau đó - không chắc lắm).</li>
          <li><i>This <b>could be</b> a problem.</i> (Đây có thể là một vấn đề).</li>
        </ul>
      </Section>

      <Section id="past" title="Khả năng trong Quá khứ" emoji="🕰️">
        <p>Để suy đoán về một khả năng trong quá khứ, ta dùng cấu trúc modal hoàn thành.</p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức:</p>
            <p className="font-mono mt-2">S + may/might/could + have + V3</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The cat is not here. It <b>might have gone</b> outside.</i> (Con mèo có lẽ đã đi ra ngoài).</li>
            <li><i>I can't find my keys. I <b>could have left</b> them in the car.</i> (Tôi có thể đã để quên chúng trong xe).</li>
        </ul>
      </Section>
      
      <Section id="can" title="'Can' cho Khả năng chung" emoji="🌍">
        <p><b>Can</b> không dùng để dự đoán một sự việc cụ thể mà dùng để nói về một khả năng có thật, một điều có thể xảy ra về mặt lý thuyết.</p>
        <ul className="list-disc pl-6">
            <li><i>Big dogs <b>can be</b> dangerous.</i> (Chó lớn có thể nguy hiểm - một sự thật chung).</li>
            <li><i>Compare: That dog looks angry. It <b>could be</b> dangerous.</i> (Một dự đoán cho con chó đó).</li>
        </ul>
      </Section>

      <Section id="negation" title="Phủ định: may not / might not" emoji="🚫">
        <p>Dùng <b>may not</b> hoặc <b>might not</b> (mightn't) để nói về một điều có thể sẽ không xảy ra.</p>
         <ul className="list-disc pl-6">
            <li><i>The cat <b>may not be</b> hungry. It just ate.</i> (Có lẽ con mèo không đói).</li>
            <li><i>Don't worry, it <b>might not rain</b>.</i> (Đừng lo, trời có lẽ sẽ không mưa đâu).</li>
        </ul>
        <p className="mt-2 text-sm text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
            <b>Lưu ý:</b> <b>"Cannot" (can't)</b> thường dùng cho suy luận chắc chắn rằng điều gì đó là không thể, chứ không phải là một khả năng.
            <br/><i>e.g., That <b>can't</b> be the cat; it's too big!</i> (Đó không thể nào là con mèo được; nó to quá!)
        </p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng "can" để dự đoán sự việc cụ thể. (❌ <i className="line-through">It can rain tomorrow.</i> → `It may/might rain...`)</li>
          <li>Nhầm lẫn giữa "maybe" (trạng từ) và "may be" (modal verb).
             <br/><i>e.g., <b>Maybe</b> the cat is hungry. = The cat <b>may be</b> hungry.</i>
          </li>
          <li>Quên "have" trong cấu trúc quá khứ. (❌ <i className="line-through">He might missed the train.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The new policy could have a big effect on the company.</b> — Chính sách mới có thể có tác động lớn đến công ty.</li>
          <li><b>She wasn't at home. She might have forgotten about our meeting.</b> — Cô ấy không có ở nhà. Cô ấy có lẽ đã quên cuộc hẹn của chúng ta.</li>
          <li><b>Don't eat those mushrooms. They can be poisonous.</b> — Đừng ăn những cây nấm đó. Chúng có thể có độc đấy. (khả năng chung)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền modal verb phù hợp (may, might, could, can):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Be careful. The floor is wet, and you ______ slip.</li>
            <li>I don't know where she is. She ______ have gone to the library.</li>
            <li>Winters in Canada ______ be extremely cold.</li>
            <li>He ______ not pass the exam. He didn't study much.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" onClick={handleScrollTo} className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}