import React, { useState } from 'react';

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

const Section: React.FC<{id:string; title:string; emoji?:string; children: React.ReactNode;}> = ({id,title,emoji,children}) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-tight">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-500">
        {emoji} {title}
      </span>
    </h2>
    <div className="mt-4 space-y-3 text-[15px] leading-7">{children}</div>
  </section>
);

export default function CorePresentContinuous() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          💧 <span className="underline decoration-4 decoration-amber-400">THÌ HIỆN TẠI TIẾP DIỄN</span> — Present Continuous
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả hành động <b>đang diễn ra</b> ngay lúc nói hoặc <b>quanh hiện tại</b>; ngoài ra còn dùng cho <b>kế hoạch đã sắp xếp</b> (near-future arrangements).
        </p>

        {/* CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE" formula="S + am/is/are + V-ing" colors="from-indigo-500 via-sky-500 to-cyan-500" />
          <FormulaChip label="NEGATIVE"    formula="S + am/is/are + not + V-ing" colors="from-rose-500 via-pink-500 to-fuchsia-600" />
          <FormulaChip label="YES/NO Q."   formula="Am/Is/Are + S + V-ing ?" colors="from-emerald-500 via-lime-500 to-amber-500" />
          <FormulaChip label="WH-QUESTION" formula="Wh + am/is/are + S + V-ing ?" colors="from-teal-500 via-cyan-500 to-blue-500" />
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Chính tả -ing</a></li>
            <li><a className="text-rose-700 hover:underline" href="#signals">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh với Hiện tại đơn</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp (Stative Verbs)</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Hành động đang xảy ra tại thời điểm nói:</b>
            <br/><i>e.g., Please be quiet. The baby <u>is sleeping</u>. / Look! It <u>is raining</u>.</i>
          </li>
          <li><b>Hành động tạm thời diễn ra quanh hiện tại (không nhất thiết ngay lúc nói):</b>
            <br/><i>e.g., I<u>'m reading</u> a really interesting book at the moment. / She<u>'s staying</u> with her aunt for a few days.</i>
          </li>
          <li><b>Kế hoạch chắc chắn trong tương lai gần (Near-future Arrangements):</b>
            <br/><i>e.g., We<u>'re meeting</u> our new supervisor tomorrow at 10 AM. / I<u>'m flying</u> to Paris next week.</i>
          </li>
          <li><b>Tình huống đang thay đổi hoặc phát triển:</b>
            <br/><i>e.g., The climate <u>is getting</u> warmer. / Your English <u>is improving</u>.</i>
          </li>
          <li><b>Hành động lặp đi lặp lại gây khó chịu (với 'always', 'constantly'):</b>
            <br/><i>e.g., He<u>'s always losing</u> his keys! / You<u>'re constantly interrupting</u> me.</i>
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Chính tả với V-ing" emoji="✍️">
         <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
            <div className="font-bold text-indigo-700">Cấu trúc</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Khẳng định:</b> <i>S + am/is/are + V-ing</i>.</li>
              <li><b>Phủ định:</b> <i>S + am/is/are + not + V-ing</i>.</li>
              <li><b>Yes/No:</b> <i>Am/Is/Are + S + V-ing ?</i></li>
              <li><b>Wh-:</b> <i>Wh-word + am/is/are + S + V-ing ?</i></li>
            </ul>
        </div>
        <div className="rounded-xl p-4 bg-amber-50 border border-amber-200 mt-3">
            <div className="font-bold text-amber-700">Quy tắc thêm đuôi -ing</div>
            <ul className="list-disc pl-5 mt-1">
              <li><b>Tận cùng là -e:</b> Bỏ -e rồi thêm -ing (e.g., make → <b>making</b>; write → <b>writing</b>). (Ngoại lệ: see → seeing, agree → agreeing).</li>
              <li><b>Một nguyên âm + một phụ âm:</b> Gấp đôi phụ âm cuối rồi thêm -ing (e.g., run → <b>running</b>; sit → <b>sitting</b>; stop → <b>stopping</b>). Không gấp đôi với w, x, y.</li>
              <li><b>Tận cùng là -ie:</b> Đổi -ie thành -y rồi thêm -ing (e.g., lie → <b>lying</b>; die → <b>dying</b>).</li>
            </ul>
        </div>
      </Section>

      <Section id="signals" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>now, right now, at the moment, currently, at present, today, this week/month</b>. Các câu mệnh lệnh như <b>Look!, Listen!, Be quiet!</b> cũng là dấu hiệu cho thấy một hành động đang diễn ra.</p>
      </Section>

      <Section id="comparison" title="So sánh với Hiện tại đơn" emoji="⚖️">
        <p>Đây là một trong những điểm ngữ pháp dễ nhầm lẫn nhất.</p>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <div className="font-bold text-purple-700">Hiện tại Tiếp diễn</div>
            <ul className="list-disc pl-5 mt-1">
                <li>Hành động <b>đang diễn ra</b> hoặc <b>tạm thời</b>.</li>
                <li><i>e.g., The chef <b>is tasting</b> the soup.</i> (hành động nếm)</li>
                <li><i>e.g., I'<b>m living</b> with my parents until I find an apartment.</i> (tình huống tạm thời)</li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <div className="font-bold text-blue-700">Hiện tại Đơn</div>
            <ul className="list-disc pl-5 mt-1">
              <li>Hành động <b>thường xuyên, lặp lại</b> hoặc là <b>sự thật, trạng thái</b>.</li>
              <li><i>e.g., The soup <b>tastes</b> delicious.</i> (trạng thái, tính chất)</li>
              <li><i>e.g., I <b>live</b> with my parents.</i> (tình huống lâu dài, ổn định)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp (Stative Verbs)" emoji="⚠️">
        <p className="text-red-700 font-semibold">Lỗi sai lớn nhất là dùng thì Hiện tại Tiếp diễn với các động từ chỉ trạng thái (stative verbs).</p>
        <p>Các động từ này mô tả trạng thái, suy nghĩ, cảm xúc, sở hữu, chứ không phải hành động. Chúng phải được dùng ở thì Hiện tại đơn.</p>
        <ul className="list-decimal pl-6 mt-2">
          <li><b>Suy nghĩ/Ý kiến:</b> know, believe, understand, remember, want, need, prefer.
             <br/>❌ <i className="line-through">I am needing your help.</i> → ✅ I <b>need</b> your help.
          </li>
           <li><b>Sở hữu:</b> have, own, belong, possess.
             <br/>❌ <i className="line-through">She is having a car.</i> → ✅ She <b>has</b> a car.
          </li>
           <li><b>Cảm xúc/Giác quan:</b> like, love, hate, see, hear, seem.
             <br/>❌ <i className="line-through">He is seeming tired.</i> → ✅ He <b>seems</b> tired.
          </li>
        </ul>
         <p className="mt-2 text-sm text-gray-600">(Lưu ý: Một số động từ như 'think', 'have', 'see' có thể dùng ở dạng tiếp diễn nhưng với ý nghĩa khác, mang tính hành động).</p>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}