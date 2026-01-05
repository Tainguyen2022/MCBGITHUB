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

export default function CoreNounCountability() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔢 <span className="underline decoration-4 decoration-amber-400">DANH TỪ ĐẾM ĐƯỢC & KHÔNG ĐẾM ĐƯỢC</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Phân biệt hai loại danh từ cơ bản, quyết định việc sử dụng mạo từ (a/an), lượng từ (many/much) và dạng số nhiều.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Đếm được" formula="a book, many books" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Không đếm được" formula="water, much water" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">Định nghĩa & Đặc điểm</a></li>
            <li><a className="text-rose-700 hover:underline" href="#quantifiers">Lượng từ (Quantifiers)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#tricky">Danh từ đặc biệt</a></li>
            <li><a className="text-rose-700 hover:underline" href="#partitives">Cách "đếm" danh từ không đếm được</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="Định nghĩa & Đặc điểm" emoji="🎯">
        <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700">Danh từ Đếm được (Countable Nouns)</p>
                <ul className="list-disc pl-5 mt-1">
                    <li>Có thể đếm trực tiếp: <i>one apple, two apples</i>.</li>
                    <li>Có cả dạng số ít và số nhiều.</li>
                    <li>Có thể dùng với 'a/an' và các con số.</li>
                    <li><b>Ví dụ:</b> book, chair, student, idea, car.</li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
                <p className="font-bold text-purple-700">Danh từ Không đếm được (Uncountable Nouns)</p>
                <ul className="list-disc pl-5 mt-1">
                     <li>Không thể đếm trực tiếp. (Không thể nói <i>one water, two waters</i>).</li>
                     <li>Chỉ có dạng số ít.</li>
                     <li>Không dùng với 'a/an' hoặc các con số.</li>
                     <li><b>Ví dụ:</b> water, information, music, advice, rice, money.</li>
                </ul>
            </div>
        </div>
      </Section>

      <Section id="quantifiers" title="Lượng từ (Many, Much, Few, Little...)" emoji="⚖️">
        <p>Việc lựa chọn lượng từ phụ thuộc vào loại danh từ.</p>
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Lượng từ</th>
                        <th className="border p-2 text-left">Dùng với Danh từ Đếm được</th>
                        <th className="border p-2 text-left">Dùng với Danh từ Không đếm được</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2 font-semibold">Nhiều</td>
                        <td className="border p-2"><b>many</b> (How many books?)</td>
                        <td className="border p-2"><b>much</b> (How much money?)</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="border p-2 font-semibold">Ít</td>
                         <td className="border p-2"><b>a few</b> (một vài), <b>few</b> (rất ít)</td>
                         <td className="border p-2"><b>a little</b> (một chút), <b>little</b> (rất ít)</td>
                    </tr>
                     <tr>
                        <td className="border p-2 font-semibold">Một vài / Một chút / Bất kỳ</td>
                        <td className="border p-2" colSpan={2}><b>some, any, a lot of, plenty of</b> (dùng cho cả hai loại)</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </Section>

       <Section id="tricky" title="Danh từ đặc biệt (Tricky Nouns)" emoji="🤔">
        <p>Một số danh từ có thể vừa đếm được, vừa không đếm được, tùy thuộc vào ngữ cảnh.</p>
        <ul className="list-disc pl-6">
            <li><b>hair:</b> <i>She has beautiful long <b>hair</b>.</i> (không đếm được) vs. <i>There's <b>a hair</b> in my soup!</i> (đếm được, một sợi tóc)</li>
            <li><b>paper:</b> <i>I need some <b>paper</b> to write on.</i> (giấy) vs. <i>I have to write <b>a paper</b> for my class.</i> (một bài báo/luận)</li>
            <li><b>time:</b> <i>I don't have much <b>time</b>.</i> (thời gian) vs. <i>We had <b>a</b> great <b>time</b> at the party. / I've seen that movie three <b>times</b>.</i> (một khoảng thời gian/số lần)</li>
            <li><b>coffee/tea/beer:</b> <i>I like <b>coffee</b>.</i> (cà phê nói chung) vs. <i>Can I have <b>two coffees</b>, please?</i> (hai tách cà phê)</li>
        </ul>
      </Section>
      
       <Section id="partitives" title="Cách 'đếm' danh từ không đếm được" emoji="🧩">
        <p>Để chỉ một lượng cụ thể của danh từ không đếm được, ta dùng các cụm từ chỉ đơn vị (partitives).</p>
        <ul className="list-disc pl-6">
            <li><b>a piece of</b> advice / information / furniture</li>
            <li><b>a glass of</b> water / milk</li>
            <li><b>a cup of</b> tea / coffee</li>
            <li><b>a loaf of</b> bread</li>
            <li><b>a bar of</b> chocolate / soap</li>
            <li><b>a bottle of</b> wine</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Thêm 's' vào danh từ không đếm được. (❌ <i className="line-through">advices, informations</i>)</li>
          <li>Dùng "many" với danh từ không đếm được và "much" với danh từ đếm được.</li>
          <li>Dùng 'a/an' với danh từ không đếm được. (❌ <i className="line-through">an advice</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>How many chairs do we need for the meeting?</b> — Chúng ta cần bao nhiêu cái ghế cho cuộc họp?</li>
          <li><b>There isn't much traffic on the roads today.</b> — Hôm nay không có nhiều xe cộ trên đường.</li>
          <li><b>Can I give you a piece of advice?</b> — Tôi cho bạn một lời khuyên được không?</li>
          <li><b>I'd like a little milk in my tea, please.</b> — Vui lòng cho tôi một chút sữa vào trà.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn từ đúng trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>How (many/much) students are in your class?</li>
            <li>I don't have (many/much) furniture in my apartment.</li>
            <li>We only have (a few/a little) time left.</li>
            <li>Could you buy (a loaf of/a piece of) bread?</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}