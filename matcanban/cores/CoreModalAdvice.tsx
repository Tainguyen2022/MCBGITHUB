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

export default function CoreModalAdvice() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        💡 <span className="underline decoration-4 decoration-amber-400">MODALS: LỜI KHUYÊN</span> — <i>Advice</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng <b>should, ought to, had better</b> và các cấu trúc khác để đưa ra lời khuyên, gợi ý, và cảnh báo.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Lời khuyên chung" formula="S + should + V" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Cảnh báo mạnh" formula="S + had better + V" colors="from-red-500 via-rose-500 to-pink-600"/>
          <FormulaChip label="Hối tiếc/Chỉ trích" formula="S + should have + V3" colors="from-slate-600 via-gray-700 to-black"/>
          <FormulaChip label="Gợi ý" formula="Why don't you...?" colors="from-sky-500 via-cyan-500 to-teal-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Mức độ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#should-ought-to">'Should' & 'Ought to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#had-better">'Had better'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#other-ways">Các cách khác để khuyên</a></li>
            <li><a className="text-rose-700 hover:underline" href="#past-advice">Lời khuyên về Quá khứ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Mức độ" emoji="🎯">
        <p>Các modal verbs này diễn tả các mức độ lời khuyên khác nhau, từ gợi ý nhẹ nhàng đến cảnh báo mạnh mẽ.</p>
        <ul className="list-disc pl-6">
            <li><b>Should / Ought to:</b> "Đây là một ý hay." (Lời khuyên chung)</li>
            <li><b>Had better:</b> "Bạn nên làm điều này, nếu không sẽ có hậu quả xấu." (Cảnh báo)</li>
        </ul>
      </Section>

      <Section id="should-ought-to" title="'Should' & 'Ought to' (Lời khuyên chung)" emoji="👍">
        <p><b>Should</b> là từ phổ biến nhất để đưa ra lời khuyên. <b>Ought to</b> có ý nghĩa tương tự nhưng trang trọng hơn và ít phổ biến hơn.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>You <b>should</b> see a doctor.</i></li>
            <li><i>He <b>shouldn't</b> eat so much junk food.</i></li>
            <li><i>The cat <b>ought to</b> stop playing with the wire.</i></li>
        </ul>
      </Section>

      <Section id="had-better" title="'Had better' (Cảnh báo mạnh)" emoji="⚠️">
        <p><b>Had better</b> được dùng để đưa ra lời khuyên mạnh, thường mang tính cấp bách hoặc cảnh báo về một hậu quả tiêu cực có thể xảy ra nếu không làm theo.</p>
         <div className="rounded-xl p-4 bg-red-50 border border-red-200">
            <p className="font-bold text-red-700">Công thức:</p>
            <p className="font-mono mt-2">S + had better ('d better) + (not) + V(nguyên mẫu)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The cat<b>'d better</b> not scratch the sofa.</i> (Tốt hơn là con mèo không nên cào ghế sofa.)</li>
            <li><i>We'<b>d better</b> leave now, or we'll miss the train.</i> (Tốt hơn là chúng ta nên đi bây giờ, nếu không sẽ lỡ tàu.)</li>
        </ul>
      </Section>

      <Section id="other-ways" title="Các cách khác để khuyên" emoji="💬">
        <p>Ngoài các modal verbs, có nhiều cách khác để đưa ra lời khuyên một cách thân mật hoặc gián tiếp hơn:</p>
        <ul className="list-disc pl-6">
            <li><b>Why don't you...?</b> - <i>e.g., Why don't you take a break?</i></li>
            <li><b>How about + V-ing?</b> - <i>e.g., How about going to the cinema?</i></li>
            <li><b>If I were you, I would...</b> - <i>e.g., If I were you, I would talk to him.</i></li>
        </ul>
      </Section>
      
      <Section id="past-advice" title="Lời khuyên về Quá khứ (Chỉ trích/Hối tiếc)" emoji="🕰️">
        <p>Để nói về một điều đáng lẽ đã nên xảy ra trong quá khứ nhưng không xảy ra, ta dùng <b>should have + V3</b>. Cấu trúc này thường mang ý nghĩa chỉ trích hoặc hối tiếc.</p>
        <ul className="list-disc pl-6">
            <li><i>You <b>should have listened</b> to my advice.</i> (Lẽ ra bạn nên nghe lời khuyên của tôi.)</li>
            <li><i>I <b>shouldn't have eaten</b> so much cake. I feel sick now.</i> (Lẽ ra tôi không nên ăn nhiều bánh như vậy.)</li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="🚫">
        <ol className="list-decimal pl-6">
          <li>Dùng "to" sau 'should' hoặc 'had better'. (❌ <i className="line-through">You should to rest.</i>)</li>
          <li>Chia 'had' trong 'had better'. (❌ <i className="line-through">You have better...</i>)</li>
          <li>Dùng dạng phủ định sai với 'had better'. (❌ <i className="line-through">You had better to not go.</i> → You'd better <b>not go</b>.)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>You look pale. You should go home and rest.</b> — Trông bạn xanh xao quá. Bạn nên về nhà nghỉ ngơi đi.</li>
          <li><b>It's a very important meeting. You'd better not be late.</b> — Đây là một cuộc họp rất quan trọng. Tốt hơn hết là bạn không nên đến muộn.</li>
          <li><b>The dog ate my homework. I should have been more careful.</b> — Con chó đã ăn mất bài tập của tôi. Lẽ ra tôi nên cẩn thận hơn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn đáp án đúng (should / had better):</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>It's a great movie. You ______ watch it.</li>
            <li>The train leaves in five minutes! We ______ run!</li>
            <li>I think you ______ apologize for your behavior.</li>
            <li>You ______ touch that wire. It's dangerous. (shouldn't / had better not)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}