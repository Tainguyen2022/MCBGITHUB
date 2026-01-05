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

export default function CoreNounApposition() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✨ <span className="underline decoration-4 decoration-amber-400">ĐỒNG VỊ NGỮ</span> — <i>Apposition</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là một danh từ hoặc cụm danh từ được đặt ngay cạnh một danh từ khác để giải thích, định danh hoặc cung cấp thêm thông tin cho nó.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Không xác định (Non-restrictive)" formula="Noun, Appositive," colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Xác định (Restrictive)" formula="Noun Appositive" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#definition">1. Định nghĩa & Chức năng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#non-restrictive">2. Đồng vị ngữ KHÔNG Xác định</a></li>
            <li><a className="text-rose-700 hover:underline" href="#restrictive">3. Đồng vị ngữ XÁC ĐỊNH</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">5. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="definition" title="1. Định nghĩa & Chức năng" emoji="🎯">
        <p>
            <b>Đồng vị ngữ (Appositive)</b> là một cách hiệu quả để kết hợp hai câu thành một, giúp cho văn viết trở nên cô đọng và mượt mà hơn. Nó có chức năng định danh hoặc giải thích rõ hơn cho danh từ đứng trước nó.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i><u>My brother</u> is a doctor. <u>He</u> lives in New York.</i></li>
            <li>→ <i>My brother, <b>a doctor</b>, lives in New York.</i> ('a doctor' là đồng vị ngữ cho 'My brother').</li>
        </ul>
      </Section>
      
      <Section id="non-restrictive" title="2. Đồng vị ngữ KHÔNG Xác định (Non-restrictive)" emoji="✍️">
        <p>
            Đây là loại phổ biến nhất. Đồng vị ngữ không xác định cung cấp thông tin <b>bổ sung, không thiết yếu</b>. Nếu lược bỏ nó, ý nghĩa cốt lõi của câu không thay đổi.
        </p>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Quy tắc vàng: Luôn được tách khỏi phần còn lại của câu bằng DẤU PHẨY (hoặc hai dấu phẩy nếu nó ở giữa câu).</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>The CEO, <b>a very respected man</b>, announced his retirement.</i> (Thông tin "a very respected man" là thông tin thêm).</li>
            <li><i>I'm visiting Paris, <b>the capital of France</b>.</i> (Paris đã là một danh từ xác định, "the capital of France" chỉ giải thích thêm).</li>
        </ul>
      </Section>

       <Section id="restrictive" title="3. Đồng vị ngữ XÁC ĐỊNH (Restrictive)" emoji="🚫">
        <p>
            Đồng vị ngữ xác định cung cấp thông tin <b>thiết yếu</b> để xác định danh từ đang được nói đến là ai/cái gì. Nếu lược bỏ nó, câu sẽ trở nên tối nghĩa.
        </p>
         <div className="rounded-xl p-4 bg-red-50 border border-red-200">
            <p className="font-bold text-red-700">Quy tắc vàng: KHÔNG dùng dấu phẩy.</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>My friend <b>Tom</b> is coming to the party.</i> (Tôi có nhiều bạn, 'Tom' là thông tin cần thiết để biết bạn nào).</li>
            <li><i>The author <b>Jane Austen</b> wrote "Pride and Prejudice".</i> ('Jane Austen' là cần thiết để xác định tác giả).</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Dùng sai dấu phẩy:</b> Quên dấu phẩy cho đồng vị ngữ không xác định, hoặc thêm dấu phẩy cho đồng vị ngữ xác định.</li>
          <li><b>Lỗi hòa hợp:</b> Động từ trong câu phải hòa hợp với danh từ chính, không phải đồng vị ngữ.
            <br/><i>e.g., The box, <b>full of old toys</b>, <b>is</b> in the attic. ('is' hòa hợp với 'box').</i>
          </li>
        </ol>
      </Section>

      <Section id="drill" title="5. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Kết hợp các câu sau thành một câu, sử dụng đồng vị ngữ. Thêm dấu phẩy nếu cần.</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Dr. Smith is my family doctor. He is very kind.
            <br/>→ ____________________________________________</li>
            <li>I read a book by Hemingway. The book is called "The Old Man and the Sea".
            <br/>→ I read the book __________________________________ by Hemingway.</li>
            <li>Mount Everest is the highest peak in the world. It is located in Nepal.
            <br/>→ __________________________________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}