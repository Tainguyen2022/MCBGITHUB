
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

export default function CoreReportedYesNoQuestions() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ❓ <span className="underline decoration-4 decoration-amber-400">TƯỜNG THUẬT CÂU HỎI YES/NO</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tường thuật lại một câu hỏi mà câu trả lời là "Yes" hoặc "No", sử dụng <b>if/whether</b> và chuyển về dạng câu trần thuật.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chính" formula="S + asked + if/whether + S + V(lùi thì)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Có tân ngữ" formula="S + asked + O + if/whether + S + V(lùi thì)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Quy tắc 4 thay đổi chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#structure">Cấu trúc & Trật tự từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#if-whether">'If' vs. 'Whether'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#backshift">Quy tắc lùi thì (nhắc lại)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Quy tắc 4 thay đổi chính" emoji="🔑">
        <p>
            Khi chuyển từ câu hỏi Yes/No trực tiếp sang gián tiếp, có 4 thay đổi quan trọng:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Thêm 'if' hoặc 'whether':</b> Thêm vào sau động từ tường thuật (thường là 'asked').</li>
            <li><b>Thay đổi trật tự từ:</b> Chuyển từ dạng câu hỏi (trợ động từ + chủ ngữ) sang dạng câu trần thuật (chủ ngữ + động từ).</li>
            <li><b>Bỏ dấu chấm hỏi:</b> Thay dấu chấm hỏi (?) bằng dấu chấm (.).</li>
            <li><b>Lùi thì, đổi đại từ & trạng từ:</b> Áp dụng các quy tắc tương tự như câu trần thuật.</li>
        </ol>
      </Section>

      <Section id="structure" title="Cấu trúc & Trật tự từ" emoji="🧩">
        <p>Đây là điểm dễ sai nhất. Cần nhớ rằng sau <b>if/whether</b>, mệnh đề phải ở dạng khẳng định.</p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S + asked (+ Object) + if/whether + S + V(lùi thì).</p>
        </div>
        <p className="mt-2 font-semibold">Ví dụ về thay đổi trật tự từ:</p>
        <ul className="list-disc pl-6">
            <li><b>Direct:</b> "<b>Do you like</b> pop music?" he asked.</li>
            <li><b>Reported:</b> He asked if <b>I liked</b> pop music.</li>
            <li className="text-red-600">❌ KHÔNG VIẾT: He asked if <b>did I like</b>...</li>
            <br/>
            <li><b>Direct:</b> "<b>Are you</b> coming to the party?" she asked.</li>
            <li><b>Reported:</b> She asked whether <b>I was</b> coming to the party.</li>
            <li className="text-red-600">❌ KHÔNG VIẾT: She asked whether <b>was I</b> coming...</li>
        </ul>
      </Section>

      <Section id="if-whether" title="'If' vs. 'Whether'" emoji="⚖️">
        <p>Trong hầu hết các trường hợp, "if" và "whether" có thể dùng thay thế cho nhau. Tuy nhiên:</p>
        <ul className="list-disc pl-6">
          <li><b>Whether</b> trang trọng hơn <b>if</b>.</li>
          <li><b>Whether</b> được ưu tiên khi có cụm từ <b>"or not"</b>.
            <br/><i>e.g., He asked <b>whether or not</b> I was interested.</i>
          </li>
          <li><b>Whether</b> là bắt buộc sau giới từ và trước "to-infinitive".
            <br/><i>e.g., We talked about <b>whether</b> we should go. / I'm not sure <b>whether</b> to stay or leave.</i>
          </li>
        </ul>
      </Section>
      
      <Section id="backshift" title="Quy tắc lùi thì (nhắc lại)" emoji="🕰️">
        <p>Các quy tắc lùi thì, thay đổi đại từ và trạng từ thời gian/nơi chốn được áp dụng giống hệt như khi tường thuật câu trần thuật.</p>
        <ul className="list-disc pl-5 mt-1">
            <li><b>Hiện tại đơn (do/does)</b> → <b>Quá khứ đơn (V2/Ved)</b></li>
            <li><b>Hiện tại tiếp diễn (is/are)</b> → <b>Quá khứ tiếp diễn (was/were)</b></li>
            <li><b>Quá khứ đơn (did)</b> → <b>Quá khứ hoàn thành (had + V3)</b></li>
            <li><b>Hiện tại hoàn thành (have/has)</b> → <b>Quá khứ hoàn thành (had + V3)</b></li>
            <li><b>will</b> → <b>would</b></li>
            <li><b>can</b> → <b>could</b></li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Direct:</b> "Is the cat sleeping?" my mom asked.
          <br/><b>Reported:</b> My mom asked <b>if the cat was sleeping</b>.
          </li>
          <li><b>Direct:</b> "Did you see the dog?" he asked me.
          <br/><b>Reported:</b> He asked me <b>whether I had seen the dog</b>.
          </li>
          <li><b>Direct:</b> "Can you swim?" she asked.
          <br/><b>Reported:</b> She asked <b>if I could swim</b>.
          </li>
          <li><b>Direct:</b> "Will you be here tomorrow?" Tom asked.
          <br/><b>Reported:</b> Tom asked <b>if I would be there the next day</b>.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu hỏi trực tiếp sau sang câu gián tiếp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>He asked me: "Do you have any siblings?"
            <br/>→ He asked me ____________________________________________</li>
            <li>She asked: "Is it raining outside?"
            <br/>→ She asked ____________________________________________</li>
            <li>They asked us: "Have you finished your work yet?"
            <br/>→ They asked us ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
