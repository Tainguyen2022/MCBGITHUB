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

export default function CoreModalDeduction() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🕵️ <span className="underline decoration-4 decoration-amber-400">MODALS: SUY LUẬN</span> — <i>Deduction</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng <b>must, can't, may, might, could</b> để đưa ra những kết luận logic dựa trên bằng chứng có sẵn.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Chắc chắn (✓)" formula="S + must + V" colors="from-green-500 via-emerald-500 to-teal-500"/>
          <FormulaChip label="Chắc chắn (✗)" formula="S + can't + V" colors="from-red-500 via-rose-500 to-pink-500"/>
          <FormulaChip label="Có thể (~50%)" formula="S + may/might/could + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Quá khứ (✓)" formula="S + must have + V3" colors="from-amber-500 via-orange-500 to-red-500"/>
          <FormulaChip label="Quá khứ (✗)" formula="S + can't/couldn't have + V3" colors="from-slate-600 via-gray-700 to-black"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mức độ chắc chắn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#present">Suy luận ở Hiện tại</a></li>
            <li><a className="text-rose-700 hover:underline" href="#past">Suy luận trong Quá khứ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">'Can't' vs. 'Mustn't'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mức độ chắc chắn" emoji="🎯">
        <p>Suy luận là việc đưa ra phán đoán dựa trên thông tin bạn có. Mức độ chắc chắn của bạn được thể hiện qua modal verb bạn chọn:</p>
        <ul className="list-disc pl-6">
            <li><b>must:</b> Rất chắc chắn (khoảng 95%) điều gì đó là thật.</li>
            <li><b>can't:</b> Rất chắc chắn (khoảng 95%) điều gì đó không phải là thật.</li>
            <li><b>may / might / could:</b> Có thể đúng (khoảng 50% hoặc thấp hơn), không chắc chắn.</li>
        </ul>
      </Section>

      <Section id="present" title="Suy luận ở Hiện tại" emoji="⏰">
        <p>Để suy luận về một tình huống ở hiện tại, ta dùng <b>modal + V(nguyên mẫu)</b>.</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><b>must + V:</b> <i>The cat is sleeping. It <b>must be</b> tired.</i> (Chắc hẳn là nó mệt).</li>
          <li><b>can't + V:</b> <i>The cat isn't eating. It <b>can't be</b> hungry.</i> (Chắc chắn là nó không đói).</li>
          <li><b>may/might/could + V:</b> <i>I don't know where the cat is. It <b>might be</b> outside.</i> (Có lẽ nó đang ở ngoài).</li>
        </ul>
      </Section>

      <Section id="past" title="Suy luận trong Quá khứ" emoji="🕰️">
        <p>Để suy luận về một tình huống trong quá khứ, ta dùng <b>modal + have + V3</b>.</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><b>must have + V3:</b> <i>The bowl is empty. The cat <b>must have eaten</b> all the food.</i> (Chắc hẳn con mèo đã ăn hết thức ăn).</li>
            <li><b>can't have / couldn't have + V3:</b> <i>The cat is inside. It <b>can't have opened</b> the door.</i> (Nó chắc chắn không thể đã mở cửa).</li>
            <li><b>may/might/could have + V3:</b> <i>The toy is broken. The dog <b>might have chewed</b> it.</i> (Có lẽ con chó đã nhai nó).</li>
        </ul>
      </Section>
      
      <Section id="comparison" title="'Can't' vs. 'Mustn't'" emoji="🚫">
        <p>Đây là hai từ rất dễ nhầm lẫn nhưng mang ý nghĩa hoàn toàn khác nhau:</p>
        <ul className="list-disc pl-6">
            <li><b>can't:</b> Dùng cho suy luận, nghĩa là "chắc chắn không thể".
                <br/><i>e.g., You've just eaten. You <b>can't be</b> hungry already!</i>
            </li>
            <li><b>mustn't:</b> Dùng cho cấm đoán, nghĩa là "không được phép".
                 <br/><i>e.g., You <b>mustn't tell</b> anyone my secret.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng 'mustn't' để suy luận. (❌ <i className="line-through">He mustn't be at home.</i>)</li>
          <li>Quên 'have' khi suy luận về quá khứ. (❌ <i className="line-through">It must rained.</i>)</li>
          <li>Dùng 'couldn't' để suy luận về quá khứ thay vì 'can't have'. Cả 'can't have' và 'couldn't have' đều đúng, nhưng 'can't have' phổ biến hơn.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>She looks very happy. She must have gotten good news.</b> — Trông cô ấy rất vui. Chắc hẳn cô ấy đã nhận được tin tốt.</li>
          <li><b>The streets are empty. There can't be many people outside.</b> — Đường phố vắng tanh. Chắc chắn không thể có nhiều người ở ngoài.</li>
          <li><b>I'm not sure what that noise was. It could have been the wind.</b> — Tôi không chắc tiếng động đó là gì. Có thể đó là tiếng gió.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền modal verb suy luận phù hợp (must, can't, might):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The phone is ringing. It ______ be Sarah. She said she would call.</li>
            <li>He's been driving all day. He ______ be tired.</li>
            <li>You just slept for 10 hours! You ______ be sleepy.</li>
            <li>I haven't seen the cat all day. It ______ have gone outside.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}