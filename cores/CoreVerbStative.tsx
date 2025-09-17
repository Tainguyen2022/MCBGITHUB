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

export default function CoreVerbStative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🧘‍♂️ <span className="underline decoration-4 decoration-amber-400">ĐỘNG TỪ TRẠNG THÁI & HÀNH ĐỘNG</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Phân biệt động từ chỉ trạng thái (stative verbs) và động từ chỉ hành động (dynamic verbs), và tại sao động từ trạng thái không được dùng ở các thì tiếp diễn.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Hành động (Dynamic)" formula="He is running." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Trạng thái (Stative)" formula="He knows the answer." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#dynamic">Động từ Hành động (Dynamic)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#stative">Động từ Trạng thái (Stative)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#categories">Các nhóm Động từ Trạng thái</a></li>
            <li><a className="text-rose-700 hover:underline" href="#both">Động từ có thể là cả hai</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="dynamic" title="Động từ Hành động (Dynamic Verbs)" emoji="🏃">
        <p>
            <b>Động từ hành động</b> mô tả một hành động, quá trình, hoặc sự việc có sự bắt đầu và kết thúc. Chúng ta có thể thấy hoặc hình dung được hành động đó đang diễn ra.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Đặc điểm:</b> Có thể được sử dụng ở cả thì đơn và thì tiếp diễn.</li>
            <li><b>Ví dụ:</b> run, walk, eat, drink, play, study, work, build, write, talk.</li>
            <li><i>e.g., He <b>walks</b> to school every day. / He <b>is walking</b> to school now.</i></li>
        </ul>
      </Section>

      <Section id="stative" title="Động từ Trạng thái (Stative Verbs)" emoji="🧠">
        <p>
            <b>Động từ trạng thái</b> mô tả một trạng thái, tình trạng, cảm xúc, suy nghĩ, hoặc sự sở hữu. Chúng không phải là hành động.
        </p>
        <p className="font-bold mt-2 text-red-700">Quy tắc vàng: Động từ trạng thái KHÔNG được dùng ở các thì tiếp diễn (Present Continuous, Past Continuous, etc.).</p>
         <ul className="list-disc pl-6 mt-2">
            <li><b>Ví dụ:</b> know, believe, understand, love, hate, want, need, own, seem.</li>
            <li>✅ <i>I <b>understand</b> the problem.</i></li>
            <li>❌ <i className="line-through">I am understanding the problem.</i></li>
        </ul>
      </Section>

      <Section id="categories" title="Các nhóm Động từ Trạng thái phổ biến" emoji="📚">
        <div className="space-y-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>1. Suy nghĩ & Ý kiến:</b> believe, know, think (opinion), understand, remember, forget, mean, realize</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>2. Cảm xúc & Cảm giác:</b> love, like, hate, prefer, want, wish, need, feel</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>3. Giác quan:</b> see, hear, smell, taste, seem, appear, look (seem)</p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>4. Sở hữu & Đo lường:</b> have (own), own, possess, belong to, cost, weigh, contain</p>
            </div>
        </div>
      </Section>

      <Section id="both" title="Động từ có thể là cả hai" emoji="↔️">
        <p>Một số động từ có thể là stative hoặc dynamic, nhưng với ý nghĩa khác nhau.</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><b>think:</b>
                <br/>- <i>I <b>think</b> this is a good idea.</i> (Stative - opinion)
                <br/>- <i>I <b>am thinking</b> about my future.</i> (Dynamic - mental process)
            </li>
            <li><b>have:</b>
                <br/>- <i>She <b>has</b> a new car.</i> (Stative - possession)
                <br/>- <i>She <b>is having</b> dinner.</i> (Dynamic - action of eating)
            </li>
            <li><b>see:</b>
                <br/>- <i>I <b>see</b> a bird in the tree.</i> (Stative - perception)
                <br/>- <i>I <b>am seeing</b> the doctor tomorrow.</i> (Dynamic - appointment)
            </li>
            <li><b>taste/smell:</b>
                <br/>- <i>This soup <b>tastes</b> delicious.</i> (Stative - quality)
                <br/>- <i>The chef <b>is tasting</b> the soup.</i> (Dynamic - action)
            </li>
             <li><b>be:</b>
                <br/>- <i>He <b>is</b> selfish.</i> (Stative - personality trait)
                <br/>- <i>He <b>is being</b> selfish.</i> (Dynamic - temporary behavior)
            </li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <p>Lỗi sai phổ biến nhất là chia động từ trạng thái ở thì tiếp diễn.</p>
        <ul className="list-disc pl-6">
          <li>❌ <i className="line-through">I am needing your help.</i> → ✅ I <b>need</b> your help.</li>
          <li>❌ <i className="line-through">She is knowing the answer.</i> → ✅ She <b>knows</b> the answer.</li>
          <li>❌ <i className="line-through">They are wanting to go home.</i> → ✅ They <b>want</b> to go home.</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>(Stative) This perfume smells nice.</b> — Nước hoa này có mùi thơm.</li>
          <li><b>(Dynamic) Why are you smelling the milk?</b> — Tại sao bạn lại đang ngửi sữa vậy?</li>
          <li><b>(Stative) I feel that you are right.</b> — Tôi cảm thấy rằng bạn đúng.</li>
          <li><b>(Dynamic) I am feeling a little tired today.</b> — Hôm nay tôi đang cảm thấy hơi mệt.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She (has / is having) two brothers.</li>
            <li>I (think / am thinking) you should apply for the job.</li>
            <li>What (do you think / are you thinking) about?</li>
            <li>This coffee (tastes / is tasting) a bit strange.</li>
            <li>He (is / is being) very helpful today.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
