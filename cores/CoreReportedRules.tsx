
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

export default function CoreReportedRules() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📜 <span className="underline decoration-4 decoration-amber-400">QUY TẮC TƯỜNG THUẬT CHUNG</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tổng hợp các quy tắc cốt lõi khi chuyển từ lời nói trực tiếp sang gián tiếp: lùi thì, thay đổi đại từ, và các trường hợp ngoại lệ quan trọng.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Lùi thì" formula="Present → Past" colors="from-indigo-500 via-sky-500 to-cyan-500"/>
          <FormulaChip label="Đổi Đại từ" formula="I → he/she" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Đổi Trạng từ" formula="now → then" colors="from-rose-500 via-pink-500 to-fuchsia-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#backshift">Quy tắc Lùi thì (Backshift)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#changes">Thay đổi Đại từ & Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#exceptions">Khi nào KHÔNG lùi thì?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ tổng hợp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="backshift" title="Quy tắc Lùi thì (Backshift)" emoji="🕰️">
        <p>Khi động từ tường thuật (said, told, asked) ở thì quá khứ, động từ trong mệnh đề được tường thuật phải lùi về một bậc quá khứ so với thì gốc.</p>
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
                    <tr><td className="border p-2 bg-gray-50">Hiện tại tiếp diễn</td><td className="border p-2 bg-gray-50"><b>Quá khứ tiếp diễn</b></td></tr>
                     <tr><td className="border p-2">Hiện tại hoàn thành</td><td className="border p-2"><b>Quá khứ hoàn thành</b></td></tr>
                    <tr><td className="border p-2 bg-gray-50">Quá khứ đơn</td><td className="border p-2 bg-gray-50"><b>Quá khứ hoàn thành</b></td></tr>
                    <tr><td className="border p-2">Quá khứ tiếp diễn</td><td className="border p-2"><b>Quá khứ hoàn thành tiếp diễn</b></td></tr>
                    <tr><td className="border p-2 bg-gray-50">Tương lai đơn (will)</td><td className="border p-2 bg-gray-50"><b>would + V</b></td></tr>
                    <tr><td className="border p-2">can / may / must</td><td className="border p-2"><b>could / might / had to</b></td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="changes" title="Thay đổi Đại từ & Trạng từ" emoji="🔄">
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <h3 className="font-bold">Thay đổi Đại từ & Tính từ sở hữu</h3>
                <ul className="list-disc pl-5 mt-1">
                    <li>I → he/she</li>
                    <li>my → his/her</li>
                    <li>we → they</li>
                    <li>our → their</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold">Thay đổi Trạng từ Thời gian & Nơi chốn</h3>
                <ul className="list-disc pl-5 mt-1">
                    <li>now → then</li>
                    <li>today → that day</li>
                    <li>tonight → that night</li>
                    <li>yesterday → the day before</li>
                    <li>tomorrow → the next day</li>
                    <li>here → there</li>
                    <li>this → that</li>
                    <li>ago → before</li>
                </ul>
            </div>
        </div>
      </Section>
      
      <Section id="exceptions" title="Khi nào KHÔNG lùi thì?" emoji="❗️">
        <p>Không phải lúc nào chúng ta cũng lùi thì. Dưới đây là các trường hợp ngoại lệ quan trọng:</p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li><b>Tường thuật một chân lý, sự thật hiển nhiên:</b>
            <br/><i>Direct: "The Earth revolves around the Sun." → He said the Earth <b>revolves</b> around the Sun.</i>
          </li>
          <li><b>Động từ tường thuật ở thì hiện tại:</b>
            <br/><i>Direct: "I am tired." → He <b>says</b> he <b>is</b> tired.</i>
          </li>
          <li><b>Câu điều kiện loại 2 và 3:</b>
             <br/><i>Direct: "If I were you, I would go." → She said if she <b>were</b> me, she <b>would go</b>.</i>
          </li>
          <li><b>Lời nói vẫn còn đúng ở thời điểm tường thuật:</b>
             <br/><i>Direct: "My brother is a doctor." → Tom said his brother <b>is</b> a doctor. (Vẫn còn là bác sĩ)</i>
          </li>
           <li><b>Các động từ khuyết thiếu 'could', 'should', 'might', 'ought to':</b>
             <br/><i>Direct: "You should rest." → He said I <b>should</b> rest.</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ tổng hợp" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Direct:</b> "I will finish this report tomorrow."
          <br/><b>Reported:</b> He said he <b>would finish that</b> report <b>the next day</b>.
          </li>
          <li><b>Direct:</b> "We are studying here."
          <br/><b>Reported:</b> They said they <b>were studying there</b>.
          </li>
          <li><b>Direct:</b> "Water boils at 100 degrees Celsius." (Không lùi thì)
          <br/><b>Reported:</b> The teacher said that water <b>boils</b> at 100 degrees Celsius.
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chuyển các câu sau sang câu gián tiếp, chú ý các quy tắc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She said, "I am going to the cinema now."
            <br/>→ She said that ____________________________________________</li>
            <li>He said, "I bought this car yesterday."
            <br/>→ He said that ____________________________________________</li>
            <li>My teacher says, "The final exam will be difficult."
            <br/>→ My teacher says that ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
