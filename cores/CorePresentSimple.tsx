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

export default function CorePresentSimple(){
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          🌞 <span className="underline decoration-4 decoration-amber-400">THÌ HIỆN TẠI ĐƠN</span> — Present Simple
        </h1>
        <p className="mt-2 text-gray-600">
          Dùng để diễn tả <b>thói quen</b>, <b>sự thật</b>, <b>lịch trình</b>, <b>trạng thái</b> và các sự kiện lặp lại theo chu kỳ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <FormulaChip label="AFFIRMATIVE (V THƯỜNG)" formula="S + V(s/es)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="NEGATIVE (V THƯỜNG)" formula="S + do/does + not + V" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
          <FormulaChip label="YES/NO QUESTION" formula="Do/Does + S + V ?" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="AFFIRMATIVE (TO BE)" formula="S + am/is/are + N/Adj" colors="from-purple-500 via-violet-500 to-indigo-600"/>
          <FormulaChip label="NEGATIVE (TO BE)" formula="S + am/is/are + not + N/Adj" colors="from-orange-500 via-amber-500 to-yellow-500"/>
          <FormulaChip label="WH-QUESTION" formula="Wh-word + do/does + S + V ?" colors="from-teal-500 via-cyan-500 to-blue-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#form">Công thức & Chính tả ngôi 3</a></li>
            <li><a className="text-rose-700 hover:underline" href="#neg">Phủ định & Câu hỏi</a></li>
            <li><a className="text-rose-700 hover:underline" href="#adv">Trạng từ tần suất & Vị trí</a></li>
            <li><a className="text-rose-700 hover:underline" href="#future">Dùng trong Mệnh đề Thời gian Tương lai</a></li>
            <li><a className="text-rose-700 hover:underline" href="#time">Dấu hiệu nhận biết</a></li>
            <li><a className="text-rose-700 hover:underline" href="#stative">Lưu ý về Động từ Trạng thái</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng chính" emoji="🎯">
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Thói quen, hành động lặp đi lặp lại (Habits and Routines):</b> Diễn tả các hành động xảy ra thường xuyên.
            <br/><i>e.g., I <u>get up</u> at 6 a.m. every day. / She often <u>visits</u> her grandparents on weekends.</i>
          </li>
          <li><b>Sự thật hiển nhiên, chân lý (General Truths):</b> Diễn tả những sự thật luôn đúng.
            <br/><i>e.g., The Earth <u>revolves</u> around the Sun. / Water <u>boils</u> at 100 degrees Celsius.</i>
          </li>
          <li><b>Lịch trình, thời gian biểu (Schedules and Timetables):</b> Dùng cho các sự kiện có lịch trình cố định như tàu, xe, chương trình TV...
            <br/><i>e.g., The train <u>leaves</u> at 9:00 AM. / The conference <u>starts</u> next Monday.</i>
          </li>
          <li><b>Trạng thái, cảm xúc, suy nghĩ (Stative Verbs):</b> Dùng với các động từ chỉ trạng thái, không dùng ở thì tiếp diễn.
            <br/><i>e.g., She <u>knows</u> the answer. / I <u>believe</u> you. / He <u>wants</u> a new car.</i>
          </li>
          <li><b>Tóm tắt nội dung (Summaries):</b> Dùng để kể lại nội dung một cuốn sách, bộ phim.
            <br/><i>e.g., In the film, the hero <u>rescues</u> the city from villains.</i>
          </li>
          <li><b>Hướng dẫn, chỉ đường (Instructions):</b>
            <br/><i>e.g., First, you <u>open</u> the box. Then, you <u>take</u> out the manual.</i>
          </li>
        </ul>
      </Section>

      <Section id="form" title="Công thức & Chính tả ngôi 3" emoji="🧩">
        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
          <div className="font-bold text-indigo-700 uppercase text-sm mb-1">Động từ thường</div>
          <p><b>Khẳng định:</b> <i>S + V(s/es)</i>. Với <b>He/She/It</b> (và danh từ số ít), động từ phải thêm <b>-s/-es</b>.</p>
          <p className="mt-1"><b>To be:</b> <i>S + am/is/are + N/Adj</i> (I <b>am</b>, He/She/It <b>is</b>, You/We/They <b>are</b>).</p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <div className="font-bold text-amber-700">Quy tắc thêm <u>-s/-es</u> (ngôi 3 số ít)</div>
            <ul className="list-disc pl-5 mt-1">
              <li>Hầu hết các động từ: thêm <b>-s</b> (e.g., works, plays, reads).</li>
              <li>Tận cùng bằng -o, -s, -x, -z, -sh, -ch: thêm <b>-es</b> (e.g., go → <b>goes</b>; watch → <b>watches</b>; fix → <b>fixes</b>).</li>
              <li>Phụ âm + y: đổi 'y' thành 'i' rồi thêm <b>-es</b> (e.g., study → studies; cry → cries).</li>
              <li>Bất quy tắc: have → <b>has</b>; do → <b>does</b>.</li>
            </ul>
          </div>
          <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200">
            <div className="font-bold text-emerald-700">Phát âm đuôi -s/-es</div>
            <ul className="list-disc pl-5 mt-1">
              <li>Phát âm là <b>/s/</b> sau các âm vô thanh /p/, /t/, /k/, /f/, /θ/. (e.g., stops, works).</li>
              <li>Phát âm là <b>/z/</b> sau các nguyên âm và phụ âm hữu thanh. (e.g., runs, loves, plays).</li>
              <li>Phát âm là <b>/ɪz/</b> sau các âm /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/. (e.g., watches, fixes, changes).</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="neg" title="Phủ định & Câu hỏi" emoji="❓">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-rose-50 border border-rose-200">
            <div className="font-bold text-rose-700">Động từ thường</div>
            <p><b>Phủ định:</b> <i>S + do/does + not + V(nguyên mẫu)</i>.</p>
            <p><b>Yes/No:</b> <i>Do/Does + S + V(nguyên mẫu)?</i></p>
            <p><b>Wh-:</b> <i>Wh-word + do/does + S + V(nguyên mẫu)?</i></p>
            <p><b>Short answers:</b> Yes, he <b>does</b>. / No, he <b>doesn’t</b>.</p>
          </div>
          <div className="rounded-xl p-4 bg-violet-50 border border-violet-200">
            <div className="font-bold text-violet-700">Động từ “to be”</div>
            <p><b>Phủ định:</b> <i>S + am/is/are + not …</i></p>
            <p><b>Yes/No:</b> <i>Am/Is/Are + S … ?</i></p>
            <p><b>Wh-:</b> <i>Wh-word + am/is/are + S … ?</i></p>
            <p><b>Short answers:</b> Yes, she <b>is</b>. / No, she <b>isn’t</b>.</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          <b className="uppercase">Lưu ý:</b> Khi đã dùng trợ động từ <b>do/does/don't/doesn't</b>, động từ chính luôn ở dạng nguyên mẫu. Không dùng <u>do/does</u> với <i>to be</i>. Không viết <i>don’t has</i> — đúng là <i>doesn’t have</i>.
        </p>
      </Section>

      <Section id="adv" title="Trạng từ tần suất & Vị trí" emoji="📊">
        <p>Trạng từ tần suất bất định (adverbs of indefinite frequency) rất hay được dùng với thì Hiện tại đơn.</p>
        <ul className="list-disc pl-6">
          <li><b>always, usually, often, sometimes, rarely, never, frequently, generally, occasionally...</b></li>
          <li><b>Vị trí:</b> Đứng <b>trước</b> động từ thường (She <u>often plays</u> tennis) và đứng <b>sau</b> động từ 'to be' (He <u>is usually</u> busy).</li>
          <li><b>Ngoại lệ:</b> 'Sometimes', 'usually', 'occasionally' có thể đứng đầu câu để nhấn mạnh. (e.g., <i>Sometimes, I walk to work.</i>)</li>
        </ul>
      </Section>
      
      <Section id="future" title="Dùng trong Mệnh đề Thời gian Tương lai" emoji="➡️">
        <p>
          Trong các mệnh đề phụ chỉ thời gian bắt đầu bằng <b>when, as soon as, until, before, after</b>, chúng ta dùng thì <b>Hiện tại đơn</b> để diễn tả một hành động trong tương lai.
        </p>
        <ul className="list-disc pl-6">
          <li>I will call you when I <u>arrive</u>. (<b>KHÔNG DÙNG:</b> when I will arrive)</li>
          <li>Please finish your homework before you <u>go</u> out.</li>
        </ul>
      </Section>
      
      <Section id="stative" title="Lưu ý về Động từ Trạng thái (Stative Verbs)" emoji="🧠">
        <p>Một trong những chức năng quan trọng nhất của thì Hiện tại đơn là dùng với các động từ trạng thái. Các động từ này mô tả trạng thái, suy nghĩ, cảm xúc, sở hữu, và giác quan, chứ không phải hành động. Do đó, chúng <b>không được dùng</b> ở các thì tiếp diễn.</p>
        <p><b>Các nhóm động từ trạng thái phổ biến:</b></p>
        <ul className="list-disc pl-6 mt-2">
          <li><b>Suy nghĩ/Ý kiến:</b> believe, know, think (khi là ý kiến), understand, remember, forget, mean, realize.</li>
          <li><b>Cảm xúc/Cảm giác:</b> love, like, hate, prefer, want, wish, need.</li>
          <li><b>Giác quan:</b> see, hear, smell, taste, seem, appear, look (khi có nghĩa là "trông có vẻ").</li>
          <li><b>Sở hữu:</b> have (khi là sở hữu), own, possess, belong to, contain.</li>
        </ul>
         <p className="mt-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
            ❌ <i className="line-through">I am needing your help.</i> → ✅ I <b>need</b> your help. <br/>
            ❌ <i className="line-through">She is seeming tired.</i> → ✅ She <b>seems</b> tired.
        </p>
      </Section>

      <Section id="time" title="Dấu hiệu nhận biết" emoji="⏱️">
        <p><b>every day/week/month</b>, <b>on Mondays</b>, <b>usually/often/sometimes</b>, <b>rarely/never</b>, <b>always</b>, <b>once/twice a week</b>, <b>from time to time</b>…</p>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Quên <b>-s/-es</b> với <b>He/She/It</b>.</li>
          <li>Vẫn chia <b>-s/-es</b> trong câu phủ định/nghi vấn có <b>doesn't/does</b>.</li>
          <li>Dùng thì Hiện tại đơn để diễn tả hành động đang diễn ra ngay lúc nói (phải dùng Hiện tại tiếp diễn).</li>
          <li>Dùng <i>will</i> trong các mệnh đề thời gian tương lai (when, as soon as...).</li>
        </ol>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}