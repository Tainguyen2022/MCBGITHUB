
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

export default function CoreReportedStatements() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🗣️ <span className="underline decoration-4 decoration-amber-400">CÂU TƯỜNG THUẬT (TRẦN THUẬT)</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để thuật lại lời nói của người khác dưới dạng gián tiếp, không dùng dấu ngoặc kép.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cấu trúc chung" formula="S + said (that) + S + V(lùi thì)" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Với 'tell'" formula="S + told + O + (that) + S + V(lùi thì)" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Quy tắc 3 thay đổi chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#backshift">Quy tắc lùi thì</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pronouns-adverbs">Thay đổi Đại từ & Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#verbs">Động từ tường thuật (say/tell)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Quy tắc 3 thay đổi chính" emoji="🔑">
        <p>
            Khi chuyển từ câu trực tiếp sang câu gián tiếp, chúng ta cần thực hiện 3 thay đổi cốt lõi:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Lùi thì (Backshift):</b> Động từ trong lời nói trực tiếp thường được lùi về một bậc quá khứ.</li>
            <li><b>Thay đổi Đại từ (Pronouns):</b> Đại từ nhân xưng, tính từ sở hữu và đại từ sở hữu được thay đổi cho phù hợp với ngữ cảnh mới.</li>
            <li><b>Thay đổi Trạng từ (Adverbs):</b> Các trạng từ chỉ thời gian và nơi chốn cũng cần được điều chỉnh.</li>
        </ol>
      </Section>

      <Section id="backshift" title="Quy tắc lùi thì (Backshift Rules)" emoji="🕰️">
        <p>Đây là thay đổi quan trọng nhất. Động từ tường thuật (said, told,...) thường ở thì quá khứ, nên động từ trong mệnh đề được tường thuật phải lùi thì.</p>
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 mt-2">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Direct Speech (Trực tiếp)</th>
                        <th className="border p-2 text-left">Reported Speech (Gián tiếp)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2">Hiện tại đơn (V/Vs)</td><td className="border p-2"><b>Quá khứ đơn (V2/Ved)</b></td></tr>
                    <tr><td className="border p-2 bg-gray-50">Hiện tại tiếp diễn (am/is/are + Ving)</td><td className="border p-2 bg-gray-50"><b>Quá khứ tiếp diễn (was/were + Ving)</b></td></tr>
                    <tr><td className="border p-2">Quá khứ đơn (V2/Ved)</td><td className="border p-2"><b>Quá khứ hoàn thành (had + V3)</b></td></tr>
                    <tr><td className="border p-2 bg-gray-50">Hiện tại hoàn thành (have/has + V3)</td><td className="border p-2 bg-gray-50"><b>Quá khứ hoàn thành (had + V3)</b></td></tr>
                    <tr><td className="border p-2">Tương lai đơn (will + V)</td><td className="border p-2"><b>would + V</b></td></tr>
                    <tr><td className="border p-2 bg-gray-50">can / may / must</td><td className="border p-2 bg-gray-50"><b>could / might / had to</b></td></tr>
                </tbody>
            </table>
        </div>
        <p className="text-sm mt-2 text-gray-600"><b>Ngoại lệ:</b> Không lùi thì khi tường thuật một chân lý, sự thật hiển nhiên, hoặc khi động từ tường thuật ở thì hiện tại (He says...).</p>
      </Section>

      <Section id="pronouns-adverbs" title="Thay đổi Đại từ & Trạng từ" emoji="🔄">
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <h3 className="font-bold">Thay đổi Đại từ & Tính từ sở hữu</h3>
                <ul className="list-disc pl-5 mt-1">
                    <li>I → he/she</li>
                    <li>we → they</li>
                    <li>you → I/we/they/he/she...</li>
                    <li>my → his/her</li>
                    <li>your → my/our/their...</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold">Thay đổi Trạng từ Thời gian & Nơi chốn</h3>
                <ul className="list-disc pl-5 mt-1">
                    <li>now → <b>then</b></li>
                    <li>today → <b>that day</b></li>
                    <li>yesterday → <b>the day before / the previous day</b></li>
                    <li>tomorrow → <b>the next day / the following day</b></li>
                    <li>here → <b>there</b></li>
                    <li>this/these → <b>that/those</b></li>
                </ul>
            </div>
        </div>
      </Section>
      
      <Section id="verbs" title="Động từ tường thuật (say vs. tell)" emoji="🗣️">
        <p><b>Say</b> và <b>tell</b> là hai động từ tường thuật phổ biến nhất, nhưng cách dùng khác nhau:</p>
        <ul className="list-disc pl-6">
          <li><b>say something (to someone):</b> Không bắt buộc có tân ngữ chỉ người nghe. Nếu có, phải dùng giới từ "to".
            <br/><i>e.g., He said (that) he was tired. / He said <b>to me</b> that he was tired.</i>
          </li>
          <li><b>tell someone something:</b> Bắt buộc phải có tân ngữ chỉ người nghe và không có "to".
            <br/><i>e.g., He told <b>me</b> (that) he was tired.</i> (❌ <i className="line-through">He told that...</i>)
          </li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Direct:</b> "The cat is sleeping now."
          <br/><b>Reported:</b> She said (that) the cat <b>was sleeping then</b>.
          </li>
          <li><b>Direct:</b> "We will visit our parents tomorrow."
          <br/><b>Reported:</b> They said (that) they <b>would visit their</b> parents <b>the next day</b>.
          </li>
          <li><b>Direct:</b> "I saw this movie yesterday."
          <br/><b>Reported:</b> He told me he <b>had seen that</b> movie <b>the day before</b>.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu trực tiếp sau sang câu gián tiếp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Tom said: "I am going to the library today."
            <br/>→ Tom said that ____________________________________________</li>
            <li>She said to me: "I will call you tomorrow."
            <br/>→ She told me that ____________________________________________</li>
            <li>He said: "I finished my homework yesterday."
            <br/>→ He said that ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
