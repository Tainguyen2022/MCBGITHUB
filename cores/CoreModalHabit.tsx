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

export default function CoreModalHabit() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🕰️ <span className="underline decoration-4 decoration-amber-400">MODALS: THÓI QUEN TRONG QUÁ KHỨ</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng <b>used to</b> và <b>would</b> để nói về các thói quen, hành động, và trạng thái đã từng đúng trong quá khứ nhưng bây giờ không còn nữa.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Hành động & Trạng thái" formula="S + used to + V" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Hành động lặp lại" formula="S + would + V" colors="from-emerald-500 via-lime-500 to-amber-500"/>
           <FormulaChip label="Phủ định" formula="S + didn't use to + V" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích chung</a></li>
            <li><a className="text-rose-700 hover:underline" href="#used-to">'Used to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#would">'Would'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh 'Used to' và 'Would'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#be-used-to">Phân biệt với 'be/get used to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích chung" emoji="🎯">
        <p>
            Cả <b>used to</b> và <b>would</b> đều được dùng để nói về những điều đã từng xảy ra thường xuyên trong quá khứ nhưng nay đã chấm dứt. Chúng giúp nhấn mạnh sự tương phản giữa quá khứ và hiện tại.
        </p>
      </Section>

      <Section id="used-to" title="'Used to' (Hành động & Trạng thái)" emoji="✅">
        <p><b>Used to</b> là cấu trúc linh hoạt nhất, có thể dùng cho cả hành động lặp lại và trạng thái/tình huống kéo dài trong quá khứ.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Hành động (Action):</b> <i>The dog <b>used to chase</b> the cat.</i> (Bây giờ nó không đuổi nữa).</li>
            <li><b>Trạng thái (State):</b> <i>The cat <b>used to be</b> very small.</i> (Bây giờ nó không còn nhỏ nữa).</li>
            <li><b>Phủ định:</b> <i>The cat <b>didn't use to</b> like the dog.</i> (Lưu ý: "use" không có "d").</li>
            <li><b>Câu hỏi:</b> <i><b>Did you use to</b> have a pet?</i></li>
        </ul>
      </Section>

      <Section id="would" title="'Would' (Chỉ hành động lặp lại)" emoji="🔁">
        <p><b>Would</b> chỉ được dùng để nói về những <b>hành động lặp đi lặp lại</b> trong quá khứ, thường mang tính hồi tưởng, hoài niệm.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>When it was a puppy, the dog <b>would</b> always play with the ball.</i></li>
            <li><i>My grandfather <b>would</b> tell me stories every night.</i></li>
        </ul>
         <p className="mt-2 text-sm text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
            <b>Lưu ý quan trọng:</b> Không dùng 'would' với các động từ chỉ trạng thái (stative verbs) như <b>live, like, love, have, be, know, understand...</b>
             <br/>❌ <i className="line-through">I would live in a small village.</i> → ✅ I <b>used to live</b> in a small village.
        </p>
      </Section>
      
       <Section id="comparison" title="So sánh 'Used to' và 'Would'" emoji="⚖️">
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 mt-2">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Tiêu chí</th>
                        <th className="border p-2 text-left">Used to</th>
                         <th className="border p-2 text-left">Would</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2">Hành động lặp lại (Actions)</td><td className="border p-2 text-green-600 font-bold">✓</td><td className="border p-2 text-green-600 font-bold">✓</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2">Trạng thái (Stative Verbs)</td><td className="border p-2 text-green-600 font-bold">✓</td><td className="border p-2 text-red-600 font-bold">✗</td></tr>
                </tbody>
            </table>
        </div>
      </Section>
      
      <Section id="be-used-to" title="Phân biệt với 'be/get used to'" emoji="🧐">
        <p>Cần phân biệt rõ với cấu trúc "quen với việc gì đó":</p>
        <ul className="list-disc pl-6">
            <li><b>used to + V(bare):</b> Đã từng làm gì.
                <br/><i>e.g., I <b>used to live</b> in a cold climate.</i>
            </li>
            <li><b>be/get used to + V-ing/Noun:</b> Quen/trở nên quen với việc gì.
                 <br/><i>e.g., I <b>am used to living</b> in a cold climate.</i> (Tôi đã quen với việc sống ở...)
            </li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng 'would' với động từ chỉ trạng thái.</li>
          <li>Viết "didn't used to" (có "d"). Dạng đúng là <b>didn't use to</b>.</li>
          <li>Nhầm lẫn giữa "used to + V" và "be used to + V-ing".</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I used to have long hair, but now it's short.</b> — Tôi đã từng để tóc dài, nhưng giờ thì nó ngắn rồi.</li>
          <li><b>When we were kids, we would spend hours playing outside.</b> — Khi chúng tôi còn nhỏ, chúng tôi thường dành hàng giờ chơi ở ngoài.</li>
          <li><b>Did you use to live in this neighborhood?</b> — Bạn đã từng sống ở khu này phải không?</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn đáp án đúng. Nếu cả hai đều đúng, chọn cả hai.</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I ______ believe in ghosts when I was a child. (used to / would)</li>
            <li>My family ______ go camping every summer. (used to / would)</li>
            <li>She ______ be very shy, but now she's very confident. (used to / would)</li>
            <li>He ______ always bring us gifts when he visited. (used to / would)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}