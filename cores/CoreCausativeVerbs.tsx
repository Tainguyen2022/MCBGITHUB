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

export default function CoreCausativeVerbs() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🛠️ <span className="underline decoration-4 decoration-amber-400">THỂ TRUYỀN KHIẾN</span> — <i>Causative Form</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Diễn tả việc chủ ngữ không trực tiếp thực hiện hành động mà sắp xếp, yêu cầu, hoặc cho phép người khác làm việc đó.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Nhờ/Yêu cầu (chủ động)" formula="have + sb + do sth" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Thuyết phục (chủ động)" formula="get + sb + to do sth" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Bắt buộc (chủ động)" formula="make + sb + do sth" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Nhờ/Thuê (bị động)" formula="have/get + sth + done" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#active">Thể truyền khiến Chủ động</a></li>
            <li><a className="text-rose-700 hover:underline" href="#passive">Thể truyền khiến Bị động</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh 'have', 'get', 'make'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="active" title="Thể truyền khiến Chủ động (Active Causative)" emoji="🗣️">
        <p>
            Dùng khi chúng ta biết rõ người thực hiện hành động. Cấu trúc thay đổi tùy theo động từ truyền khiến.
        </p>
        <ol className="list-decimal pl-6 space-y-3 mt-2">
            <li><b>HAVE somebody DO something:</b> Nhờ ai đó làm gì (thường là dịch vụ hoặc người có trách nhiệm).
                <br/><i>e.g., I <b>had the mechanic check</b> my car.</i>
            </li>
            <li><b>GET somebody TO DO something:</b> Thuyết phục, nhờ vả ai đó làm gì.
                <br/><i>e.g., She <b>got her friend to help</b> her move.</i>
            </li>
            <li><b>MAKE somebody DO something:</b> Bắt buộc ai đó làm gì.
                <br/><i>e.g., The teacher <b>made the students stay</b> after class.</i>
            </li>
            <li><b>LET somebody DO something:</b> Cho phép ai đó làm gì.
                <br/><i>e.g., My parents <b>let me go</b> to the party.</i>
            </li>
            <li><b>HELP somebody (TO) DO something:</b> Giúp ai đó làm gì. ('to' có thể được lược bỏ).
                <br/><i>e.g., He <b>helped me (to) carry</b> the boxes.</i>
            </li>
        </ol>
      </Section>

      <Section id="passive" title="Thể truyền khiến Bị động (Passive Causative)" emoji="⚙️">
        <p>
            Dùng khi chúng ta muốn nhấn mạnh vào hành động hoặc đối tượng bị tác động, chứ không phải người thực hiện hành động. Cấu trúc này rất phổ biến, đặc biệt khi nói về các dịch vụ.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức:</p>
            <p className="font-mono mt-2">S + have/get + something + done (V3/V-ed)</p>
        </div>
         <ul className="list-disc pl-6 mt-2">
            <li><i>I <b>had my hair cut</b> yesterday.</i> (Tôi đi cắt tóc - người cắt tóc không quan trọng).</li>
            <li><i>She is going to <b>get her car repaired</b>.</i> (Cô ấy sẽ đi sửa xe).</li>
            <li><i>We need to <b>have the document translated</b> into English.</i> (Chúng ta cần cho dịch tài liệu này sang tiếng Anh).</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">"Get" thường được dùng trong văn nói thân mật hơn "have".</p>
      </Section>
      
      <Section id="comparison" title="So sánh 'have', 'get', 'make'" emoji="⚖️">
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Động từ</th>
                        <th className="border p-2 text-left">Cấu trúc Chủ động</th>
                        <th className="border p-2 text-left">Ý nghĩa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2 font-bold">make</td><td className="border p-2">make + sb + <b>do</b></td><td className="border p-2">Bắt buộc (Force)</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-bold">have</td><td className="border p-2">have + sb + <b>do</b></td><td className="border p-2">Yêu cầu (Request)</td></tr>
                    <tr><td className="border p-2 font-bold">get</td><td className="border p-2">get + sb + <b>to do</b></td><td className="border p-2">Thuyết phục (Persuade)</td></tr>
                     <tr className="bg-gray-50"><td className="border p-2 font-bold">let</td><td className="border p-2">let + sb + <b>do</b></td><td className="border p-2">Cho phép (Permit)</td></tr>
                </tbody>
            </table>
        </div>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng 'to V' sau 'have', 'make', 'let' ở dạng chủ động. (❌ <i className="line-through">He made me to do it.</i>)</li>
          <li>Quên 'to' sau 'get' ở dạng chủ động. (❌ <i className="line-through">I got him fix my computer.</i>)</li>
          <li>Dùng động từ nguyên mẫu thay vì V3 ở dạng bị động. (❌ <i className="line-through">I had my car repair.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>My boss made me work overtime last night.</b> — Sếp của tôi đã bắt tôi làm thêm giờ tối qua.</li>
          <li><b>I'm going to have my house painted next week.</b> — Tôi sẽ cho sơn lại nhà vào tuần tới.</li>
          <li><b>Can you help me move this table?</b> — Bạn có thể giúp tôi di chuyển cái bàn này không?</li>
          <li><b>I finally got the computer to work.</b> — Cuối cùng tôi cũng làm cho cái máy tính hoạt động được.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I had my watch (repair / repaired) last week.</li>
            <li>She got her son (to clean / clean) his room.</li>
            <li>The teacher made the students (to rewrite / rewrite) their essays.</li>
            <li>I will have the gardener (to cut / cut) the grass.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
