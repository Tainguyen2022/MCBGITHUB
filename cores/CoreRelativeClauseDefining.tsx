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

export default function CoreRelativeClauseDefining() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔗 <span className="underline decoration-4 decoration-amber-400">MĐQH XÁC ĐỊNH</span> — <i>Defining Relative Clauses</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là mệnh đề cung cấp thông tin <b>thiết yếu</b> để xác định danh từ đang được nói đến là ai/cái gì. Nếu bỏ mệnh đề này đi, câu sẽ tối nghĩa.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dùng 'who'" formula="the man who lives next door" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dùng 'which'" formula="the book which is on the table" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Dùng 'that'" formula="the car that I bought" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Lược bỏ (Omission)" formula="the man (who) I met" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Đặc điểm chính</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pronouns">Các Đại từ Quan hệ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#omission">Lược bỏ Đại từ Quan hệ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc Dấu câu (KHÔNG DẤU PHẨY!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Đặc điểm chính" emoji="🎯">
        <p>
            Mệnh đề quan hệ xác định (MĐQHXD) trả lời cho câu hỏi "Which one?". Nó xác định chính xác đối tượng mà chúng ta đang đề cập đến.
        </p>
        <ul className="list-disc pl-6">
            <li><i>The woman <b>who lives next door</b> is a doctor.</i> (Mệnh đề "who lives next door" cho chúng ta biết đó là người phụ nữ nào).</li>
            <li>Nếu bỏ mệnh đề này đi, câu "The woman is a doctor" sẽ trở nên mơ hồ.</li>
        </ul>
      </Section>
      
      <Section id="pronouns" title="Các Đại từ Quan hệ (Relative Pronouns)" emoji="👤/📦">
        <p>Các đại từ quan hệ được sử dụng tùy thuộc vào danh từ mà chúng thay thế.</p>
        <ul className="list-disc pl-6 mt-2">
            <li><b>who:</b> Dùng cho <b>người</b>.
                <br/><i>e.g., He is the man <b>who</b> helped me.</i>
            </li>
            <li className="mt-2"><b>which:</b> Dùng cho <b>vật</b>.
                 <br/><i>e.g., This is the key <b>which</b> opens the front door.</i>
            </li>
            <li className="mt-2"><b>that:</b> Dùng cho cả <b>người và vật</b> (trong văn phong thân mật).
                 <br/><i>e.g., He is the man <b>that</b> helped me. / This is the key <b>that</b> opens the front door.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="omission" title="Lược bỏ Đại từ Quan hệ" emoji="✂️">
        <p>
            Đây là một quy tắc rất quan trọng: bạn có thể lược bỏ đại từ quan hệ (who, which, that) khi nó đóng vai trò là <b>TÂN NGỮ (object)</b> trong mệnh đề quan hệ.
        </p>
        <p className="font-bold mt-2">Cách kiểm tra:</p>
         <ul className="list-disc pl-6 mt-2">
            <li><b>KHÔNG lược bỏ khi là CHỦ NGỮ (Subject):</b> Khi ngay sau đại từ quan hệ là một động từ (verb).
                <br/><i>e.g., The woman <b>who <u>lives</u></b> next door...</i> (Không thể bỏ 'who')
            </li>
            <li><b>CÓ THỂ lược bỏ khi là TÂN NGỮ (Object):</b> Khi ngay sau đại từ quan hệ là một chủ ngữ khác (noun/pronoun).
                 <br/><i>e.g., The woman <b>(who) <u>I</u></b> met yesterday...</i> (Có thể bỏ 'who' vì sau nó là 'I')
                 <br/><i>e.g., The book <b>(which) <u>she</u></b> is reading...</i> (Có thể bỏ 'which' vì sau nó là 'she')
            </li>
        </ul>
      </Section>

      <Section id="punctuation" title="Quy tắc Dấu câu (KHÔNG DẤU PHẨY!)" emoji="🚫">
        <p>
           Quy tắc vàng của MĐQHXD là: <b>TUYỆT ĐỐI KHÔNG DÙNG DẤU PHẨY</b>. Vì mệnh đề này là thông tin thiết yếu, không thể tách rời khỏi danh từ mà nó bổ nghĩa.
        </p>
         <ul className="list-disc pl-6 mt-2">
            <li>✅ <i>The student who won the scholarship is my cousin.</i></li>
            <li>❌ <i className="line-through">The student, who won the scholarship, is my cousin.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng dấu phẩy với MĐQHXD.</li>
          <li>Lược bỏ đại từ quan hệ khi nó là chủ ngữ.</li>
          <li>Lặp lại tân ngữ trong mệnh đề quan hệ.
            <br/>❌ <i className="line-through">This is the book which I bought <b>it</b> yesterday.</i>
            <br/>✅ <i>This is the book which I bought yesterday.</i>
          </li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The keys that are on the table belong to me.</b> — Chùm chìa khóa mà ở trên bàn là của tôi.</li>
          <li><b>I didn't like the movie (that) we watched last night.</b> — Tôi không thích bộ phim (mà) chúng ta đã xem tối qua. (lược bỏ 'that')</li>
          <li><b>Do you know the girl (who) he is talking to?</b> — Bạn có biết cô gái (mà) anh ấy đang nói chuyện cùng không? (lược bỏ 'who')</li>
          <li><b>This is the reason why I can't come.</b> ('why' cũng được dùng như một đại từ quan hệ xác định).</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền đại từ quan hệ (who, which, that) vào chỗ trống. Ghi (∅) nếu có thể lược bỏ.</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The phone ______ is ringing is mine.</li>
            <li>The woman ______ I met at the party is a famous writer.</li>
            <li>I can't find the email ______ you sent me.</li>
            <li>He's the only person ______ can help us.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}