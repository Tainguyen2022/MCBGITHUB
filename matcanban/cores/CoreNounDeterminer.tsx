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
        <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0-5 rounded-full bg-black/70">Copied!</span>
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

export default function CoreNounDeterminer() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔢 <span className="underline decoration-4 decoration-amber-400">TỪ HẠN ĐỊNH & LƯỢNG TỪ</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Là những từ đứng trước danh từ để giới thiệu, xác định, hoặc chỉ số lượng của danh từ đó, đóng vai trò quan trọng trong việc xây dựng cụm danh từ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Xác định (Definite)" formula="the, this, my" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Bất định (Indefinite)" formula="a, an, some, any" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Lượng từ (Count)" formula="many, a few" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Lượng từ (Uncount)" formula="much, a little" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#determiners">1. Từ hạn định (Determiners) là gì?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#quantifiers">2. Lượng từ (Quantifiers) là gì?</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rules">3. Quy tắc sử dụng (Count vs. Uncount)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#few-little">4. 'Few' vs. 'A few' & 'Little' vs. 'A little'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">5. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="determiners" title="1. Từ hạn định (Determiners) là gì?" emoji="🎯">
        <p>
            <b>Từ hạn định</b> là những từ được đặt trước danh từ để giới thiệu danh từ đó. Chúng cho biết danh từ đang nói đến là xác định hay không xác định.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>Mạo từ (Articles):</b> a, an, the</li>
            <li><b>Từ chỉ định (Demonstratives):</b> this, that, these, those</li>
            <li><b>Từ sở hữu (Possessives):</b> my, your, his, her, its, our, their, John's</li>
        </ul>
      </Section>
      
      <Section id="quantifiers" title="2. Lượng từ (Quantifiers) là gì?" emoji="📊">
        <p>
            <b>Lượng từ</b> là một loại từ hạn định, cho biết số lượng hoặc khối lượng của một danh từ.
        </p>
      </Section>

      <Section id="rules" title="3. Quy tắc sử dụng (Count vs. Uncount)" emoji="⚖️">
        <p>Việc lựa chọn lượng từ phụ thuộc vào danh từ là đếm được (countable) hay không đếm được (uncountable).</p>
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Chỉ dùng với N đếm được</th>
                        <th className="border p-2 text-left">Chỉ dùng với N không đếm được</th>
                        <th className="border p-2 text-left">Dùng với cả hai</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2">many, a few, few, several, each, every</td>
                        <td className="border p-2">much, a little, little, a bit of</td>
                        <td className="border p-2">all, some, any, no, a lot of, plenty of, most</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </Section>
      
      <Section id="few-little" title="4. 'Few' vs. 'A few' & 'Little' vs. 'A little'" emoji="🤔">
        <p>
            Đây là một điểm ngữ pháp quan trọng, thể hiện sắc thái ý nghĩa khác nhau.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">Ý nghĩa Tích cực (+)</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><b>a few</b> (+ N đếm được): một vài, một ít (đủ để làm gì đó).
                        <br/><i>e.g., I have <b>a few</b> friends, so I'm not lonely.</i>
                    </li>
                    <li><b>a little</b> (+ N không đếm được): một chút, một ít (đủ để làm gì đó).
                        <br/><i>e.g., We have <b>a little</b> time, so we can have a coffee.</i>
                    </li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">Ý nghĩa Tiêu cực (-)</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><b>few</b> (+ N đếm được): rất ít, hầu như không có.
                        <br/><i>e.g., He has <b>few</b> friends, so he is often lonely.</i>
                     </li>
                     <li><b>little</b> (+ N không đếm được): rất ít, hầu như không có.
                        <br/><i>e.g., We have <b>little</b> time, so we must hurry.</i>
                     </li>
                </ul>
            </div>
        </div>
      </Section>
      
      <Section id="pitfalls" title="5. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng sai 'many' với danh từ không đếm được và 'much' với danh từ đếm được.</li>
          <li>Nhầm lẫn ý nghĩa giữa 'a few' và 'few', 'a little' và 'little'.</li>
          <li>Dùng 'every' với danh từ số nhiều. (❌ <i className="line-through">every students</i> → ✅ <b>every student</b>)</li>
        </ol>
      </Section>

      <Section id="drill" title="6. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn từ đúng trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>How (many/much) sugar do you want in your coffee?</li>
            <li>There aren't (many/much) people at the party.</li>
            <li>He spoke very (few/little) English, so I couldn't understand him.</li>
            <li>I have (a few/a little) good ideas for the project.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
