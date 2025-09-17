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

export default function CoreRelativeClauseNonDefining() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✍️ <span className="underline decoration-4 decoration-amber-400">MĐQH KHÔNG XÁC ĐỊNH</span> — <i>Non-Defining</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là mệnh đề cung cấp thông tin <b>bổ sung, không thiết yếu</b>. Nếu bỏ mệnh đề này đi, câu vẫn giữ nguyên ý nghĩa cốt lõi. Mệnh đề này luôn được tách biệt bằng <b>dấu phẩy</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dùng 'who'" formula="Noun, who ..., ..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dùng 'which'" formula="Noun, which ..., ..." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Không dùng 'that'" formula="❌ Noun, that ..., ..." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Đặc điểm chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pronouns">Các Đại từ Quan hệ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc 3 KHÔNG (Rất quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#comparison">So sánh với MĐQH Xác định</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Đặc điểm chính" emoji="🎯">
        <p>
            Mệnh đề quan hệ không xác định (MĐQHKXD) chỉ thêm thông tin phụ, thú vị về một danh từ đã được xác định rõ (thường là tên riêng hoặc danh từ duy nhất).
        </p>
        <ul className="list-disc pl-6">
            <li><i>My brother, <b>who lives in Da Nang</b>, is an engineer.</i> (Tôi chỉ có một người anh trai, và việc anh ấy sống ở Đà Nẵng là thông tin thêm).</li>
            <li>Nếu bỏ mệnh đề này đi, câu "My brother is an engineer" vẫn hoàn toàn có nghĩa.</li>
        </ul>
      </Section>
      
      <Section id="pronouns" title="Các Đại từ Quan hệ (Relative Pronouns)" emoji="👤/📦">
        <p>Các đại từ quan hệ được sử dụng trong MĐQHKXD bị giới hạn hơn so với MĐQHXD.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>who:</b> Dùng cho <b>người</b>.
                <br/><i>e.g., Mr. Smith, <b>who</b> is my neighbor, is very friendly.</i>
            </li>
            <li className="mt-2"><b>which:</b> Dùng cho <b>vật</b> hoặc cả một mệnh đề.
                 <br/><i>e.g., My car, <b>which</b> is 10 years old, still runs well.</i>
                 <br/><i>e.g., He passed the exam, <b>which</b> surprised everyone.</i> ('which' thay thế cho cả việc anh ấy thi đỗ).
            </li>
             <li className="mt-2"><b>whose:</b> Dùng để chỉ sự sở hữu.
                 <br/><i>e.g., Sarah, <b>whose</b> mother is a doctor, wants to study medicine.</i>
            </li>
             <li className="mt-2"><b>where/when:</b> Dùng cho nơi chốn/thời gian.
                 <br/><i>e.g., Paris, <b>where</b> I spent my childhood, is a beautiful city.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="punctuation" title="Quy tắc 3 KHÔNG (Rất quan trọng!)" emoji="🚫">
        <p>
           Đây là 3 quy tắc vàng để phân biệt MĐQHKXD với MĐQHXD.
        </p>
         <div className="rounded-xl p-4 bg-red-50 border border-red-200 space-y-2">
            <p><b>1. KHÔNG thể bỏ Đại từ quan hệ:</b> Kể cả khi nó là tân ngữ, bạn vẫn phải giữ lại đại từ quan hệ.
                <br/><i>e.g., This is my friend John, <b>whom</b> I met in college.</i> (Không thể bỏ 'whom').
            </p>
            <p><b>2. KHÔNG thể dùng 'that':</b> "That" không bao giờ được dùng trong MĐQHKXD.
                <br/>❌ <i className="line-through">My car, that is 10 years old, ...</i> → ✅ My car, <b>which</b> is...
            </p>
            <p><b>3. (LUÔN) PHẢI CÓ Dấu phẩy:</b> MĐQHKXD luôn được tách khỏi mệnh đề chính bằng một hoặc hai dấu phẩy.
                 <br/><i>e.g., The Eiffel Tower<b>,</b> which is in Paris<b>,</b> is a famous landmark.</i>
            </p>
        </div>
      </Section>
      
      <Section id="comparison" title="So sánh với MĐQH Xác định" emoji="⚖️">
         <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Tiêu chí</th>
                        <th className="border p-2 text-left">MĐQH Xác định</th>
                        <th className="border p-2 text-left">MĐQH Không Xác định</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border p-2 font-semibold">Mục đích</td><td className="border p-2">Thông tin thiết yếu</td><td className="border p-2">Thông tin bổ sung</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-semibold">Dấu phẩy</td><td className="border p-2 text-red-600 font-bold">KHÔNG</td><td className="border p-2 text-green-600 font-bold">CÓ</td></tr>
                     <tr><td className="border p-2 font-semibold">Dùng 'that'</td><td className="border p-2 text-green-600 font-bold">CÓ</td><td className="border p-2 text-red-600 font-bold">KHÔNG</td></tr>
                    <tr className="bg-gray-50"><td className="border p-2 font-semibold">Lược bỏ ĐTQH (tân ngữ)</td><td className="border p-2 text-green-600 font-bold">CÓ</td><td className="border p-2 text-red-600 font-bold">KHÔNG</td></tr>
                </tbody>
            </table>
        </div>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>My best friend, who I have known since childhood, is moving to another country.</b> — Bạn thân nhất của tôi, người mà tôi đã biết từ thời thơ ấu, sắp chuyển đến một quốc gia khác.</li>
          <li><b>We are going to visit the Louvre, which is one of the world's largest art museums.</b> — Chúng tôi sẽ đi thăm bảo tàng Louvre, một trong những bảo tàng nghệ thuật lớn nhất thế giới.</li>
          <li><b>He failed his exam, which means he has to retake the course.</b> — Anh ấy đã trượt kỳ thi, điều đó có nghĩa là anh ấy phải học lại khóa học.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Kết hợp các câu sau, dùng MĐQH Không xác định. Chú ý dấu câu!</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>This is my sister Sarah. She works as a lawyer.
            <br/>→ ____________________________________________</li>
            <li>I'm reading a book by Jane Austen. The book is called "Pride and Prejudice".
            <br/>→ I'm reading "Pride and Prejudice", _______________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}