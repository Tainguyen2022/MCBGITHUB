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

export default function CoreVerbPatterns() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🧩 <span className="underline decoration-4 decoration-amber-400">DẠNG ĐỘNG TỪ</span> — <i>Verb Patterns</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Học các cấu trúc động từ theo sau một động từ khác, chẳng hạn như to-infinitive (to V), gerund (V-ing), hoặc bare infinitive (V nguyên mẫu).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="V + to-infinitive" formula="I want to go" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="V + Gerund" formula="He enjoys reading" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="V + O + to-infinitive" formula="She asked me to help" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="V + O + Bare Infinitive" formula="They let him leave" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#v-to-v">Verb + to-infinitive</a></li>
            <li><a className="text-rose-700 hover:underline" href="#v-ving">Verb + Gerund (V-ing)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#v-o-to-v">Verb + Object + to-infinitive</a></li>
            <li><a className="text-rose-700 hover:underline" href="#v-o-bare">Verb + Object + Bare Infinitive</a></li>
            <li><a className="text-rose-700 hover:underline" href="#meaning-change">Verbs with Meaning Change</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="v-to-v" title="Verb + to-infinitive" emoji="➡️">
        <p>
            Nhiều động từ, đặc biệt là những động từ diễn tả ý định, quyết định, kế hoạch, hoặc sự cố gắng, được theo sau bởi một động từ nguyên mẫu có 'to'.
        </p>
        <p className="font-bold mt-2">Động từ phổ biến:</p>
        <p className="text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            agree, decide, hope, learn, need, offer, plan, promise, refuse, seem, want, would like, afford, manage, attempt, fail.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>She <b>decided to sell</b> her car.</i></li>
            <li><i>We <b>hope to see</b> you again soon.</i></li>
        </ul>
      </Section>
      
      <Section id="v-ving" title="Verb + Gerund (V-ing)" emoji="🔄">
        <p>
            Một số động từ khác, đặc biệt là những động từ diễn tả sở thích, sự kết thúc, hoặc sự trốn tránh, được theo sau bởi một danh động từ (gerund).
        </p>
        <p className="font-bold mt-2">Động từ phổ biến:</p>
        <p className="text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            admit, avoid, consider, deny, enjoy, finish, imagine, keep, mind, miss, practice, suggest, quit, risk.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I really <b>enjoy listening</b> to music.</i></li>
            <li><i>He has <b>finished writing</b> his report.</i></li>
        </ul>
      </Section>

      <Section id="v-o-to-v" title="Verb + Object + to-infinitive" emoji="🗣️">
        <p>
            Cấu trúc này được dùng khi một người muốn, yêu cầu, hoặc cho phép người khác làm gì đó.
        </p>
        <p className="font-bold mt-2">Động từ phổ biến:</p>
        <p className="text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            advise, allow, ask, encourage, expect, force, invite, order, persuade, remind, teach, tell, want, warn.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The doctor <b>advised me to get</b> more rest.</i></li>
            <li><i>She <b>asked him not to be</b> late.</i></li>
        </ul>
      </Section>
      
      <Section id="v-o-bare" title="Verb + (Object) + Bare Infinitive" emoji="👀">
        <p>
            Một số ít động từ được theo sau bởi tân ngữ và động từ nguyên mẫu không 'to' (bare infinitive).
        </p>
         <ul className="list-disc pl-6">
            <li><b>make, let, help:</b>
                <br/><i>- My parents <b>let me stay</b> out late.</i>
                <br/><i>- The movie <b>made her cry</b>.</i>
                <br/><i>- He <b>helped me (to) carry</b> my bags. ('help' có thể dùng cả hai).</i>
            </li>
            <li className="mt-2"><b>Động từ tri giác (see, watch, hear, feel):</b>
                <br/><i>- I <b>saw him leave</b> the house. (chứng kiến toàn bộ hành động)</i>
                <br/><i>- I <b>saw him leaving</b> the house. (chứng kiến một phần hành động đang diễn ra)</i>
            </li>
        </ul>
      </Section>

      <Section id="meaning-change" title="Verbs with Meaning Change" emoji="⚖️">
        <p>
            Một số động từ có thể đi với cả 'to-infinitive' và 'gerund', nhưng ý nghĩa thay đổi.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>remember/forget:</b>
                <br/>- + <b>to-infinitive</b>: nhớ/quên sẽ phải làm gì (hành động tương lai). <i>Remember <b>to lock</b> the door.</i>
                <br/>- + <b>gerund</b>: nhớ/quên đã làm gì (hành động quá khứ). <i>I remember <b>locking</b> the door.</i>
            </li>
             <li><b>stop:</b>
                <br/>- + <b>to-infinitive</b>: dừng lại để làm một việc khác. <i>He stopped <b>to smoke</b> a cigarette.</i>
                <br/>- + <b>gerund</b>: dừng hẳn việc đang làm. <i>He stopped <b>smoking</b> last year.</i>
            </li>
             <li><b>try:</b>
                <br/>- + <b>to-infinitive</b>: cố gắng làm gì (thường là việc khó). <i>I tried <b>to open</b> the window, but it was stuck.</i>
                <br/>- + <b>gerund</b>: thử làm gì. <i>If you have a headache, try <b>taking</b> an aspirin.</i>
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Sử dụng sai dạng động từ theo sau. (❌ <i className="line-through">I enjoy to watch movies.</i>)</li>
          <li>Quên tân ngữ trong cấu trúc V + O + to-infinitive. (❌ <i className="line-through">She advised to study harder.</i>)</li>
          <li>Nhầm lẫn ý nghĩa của các động từ như 'stop', 'remember', 'try'.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I can't afford (to buy / buying) a new car.</li>
            <li>He suggested (to go / going) to the beach.</li>
            <li>Please let me (to know / know) your decision.</li>
            <li>I stopped (to drink / drinking) coffee because it upset my stomach.</li>
            <li>Don't forget (to turn off / turning off) the lights before you leave.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}