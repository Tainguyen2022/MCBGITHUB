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

export default function CoreNounPossessive() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔑 <span className="underline decoration-4 decoration-amber-400">SỞ HỮU CÁCH</span> — <i>Possessive Nouns</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để thể hiện sự sở hữu hoặc mối quan hệ, thường bằng cách thêm <b>'s</b> hoặc chỉ dấu nháy đơn <b>'</b> vào sau danh từ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Danh từ Số ít" formula="Noun + 's" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Danh từ Số nhiều (-s)" formula="Nouns'" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Danh từ Bất quy tắc" formula="Irregular Noun + 's" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Vô tri" formula="the ... of the ..." colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#rule-singular">Danh từ Số ít</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule-plural">Danh từ Số nhiều</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule-compound">Danh từ ghép & Sở hữu chung</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule-of">Dùng 'of' cho vật vô tri</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="rule-singular" title="Quy tắc với Danh từ Số ít" emoji="👤">
        <p>
            Với hầu hết các danh từ số ít, ta thêm <b>'s</b> vào cuối danh từ.
        </p>
        <ul className="list-disc pl-6 mt-2">
            <li><i><b>the boy's</b> ball</i> (quả bóng của cậu bé)</li>
            <li><i><b>my mother's</b> car</i> (xe của mẹ tôi)</li>
            <li>Đối với tên riêng kết thúc bằng -s, có thể thêm 's hoặc chỉ dấu ': <i><b>James's</b> house</i> hoặc <i><b>James'</b> house</i>. (Cách đầu tiên phổ biến hơn).</li>
        </ul>
      </Section>

      <Section id="rule-plural" title="Quy tắc với Danh từ Số nhiều" emoji="👨‍👩‍👧‍👦">
        <p>
            Cách tạo sở hữu cách cho danh từ số nhiều phụ thuộc vào đuôi của nó.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><b>Số nhiều có đuôi -s:</b> Chỉ cần thêm dấu nháy đơn <b>'</b>.
                <br/><i>e.g., the <b>students'</b> books</i> (sách của các học sinh)
                <br/><i>e.g., the <b>dogs'</b> toys</i> (đồ chơi của những con chó)
            </li>
            <li><b>Số nhiều bất quy tắc (không có đuôi -s):</b> Thêm <b>'s</b>.
                 <br/><i>e.g., the <b>children's</b> room</i> (phòng của bọn trẻ)
                 <br/><i>e.g., the <b>men's</b> team</i> (đội của những người đàn ông)
            </li>
        </ul>
      </Section>
      
      <Section id="rule-compound" title="Danh từ ghép & Sở hữu chung/riêng" emoji="🔗">
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Danh từ ghép:</b> Thêm 's vào cuối của cả cụm từ.
                <br/><i>e.g., my <b>mother-in-law's</b> house</i>
            </li>
            <li><b>Sở hữu chung:</b> Khi hai hoặc nhiều người cùng sở hữu một vật, chỉ thêm 's vào người cuối cùng.
                 <br/><i>e.g., <b>Tom and Jerry's</b> cartoon</i> (bộ phim hoạt hình chung của Tom và Jerry)
            </li>
            <li><b>Sở hữu riêng:</b> Khi mỗi người sở hữu một vật riêng, thêm 's cho tất cả.
                 <br/><i>e.g., <b>Tom's and Jerry's</b> tails are different.</i> (đuôi của Tom và đuôi của Jerry)
            </li>
        </ul>
      </Section>
      
      <Section id="rule-of" title="Dùng 'of' cho vật vô tri" emoji="🏢">
        <p>
            Thông thường, ta dùng cấu trúc <b>the ... of the ...</b> để chỉ sự sở hữu của những vật vô tri, thay vì dùng 's.
        </p>
        <ul className="list-disc pl-6">
            <li><i>the <b>leg of the table</b></i> (thay vì <i>the table's leg</i>)</li>
            <li><i>the <b>roof of the house</b></i> (thay vì <i>the house's roof</i>)</li>
            <li><b>Ngoại lệ:</b> Có thể dùng 's với các cụm từ chỉ thời gian (<i>a month's holiday</i>), khoảng cách (<i>a mile's walk</i>), và đôi khi với các tổ chức hoặc quốc gia (<i>the company's policy, Vietnam's economy</i>).</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Nhầm lẫn giữa "its" (của nó) và "it's" (it is). (❌ <i className="line-through">The dog wagged it's tail.</i> → ✅ ...<b>its</b> tail.)</li>
          <li>Đặt sai vị trí dấu ' cho danh từ số nhiều tận cùng bằng -s. (❌ <i className="line-through">the student's books</i> khi nói về nhiều học sinh)</li>
          <li>Dùng 's cho vật vô tri một cách thiếu tự nhiên.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>This is my sister's bike.</b> — Đây là xe đạp của chị gái tôi.</li>
          <li><b>Where are the women's changing rooms?</b> — Phòng thay đồ của nữ ở đâu?</li>
          <li><b>The cover of the book is blue.</b> — Bìa của cuốn sách có màu xanh.</li>
          <li><b>This is John and Mary's new car.</b> — Đây là chiếc xe hơi mới của John và Mary. (xe chung)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại các cụm sau sử dụng sở hữu cách:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>the toys of the children → ________________</li>
            <li>the house of my parents → ________________</li>
            <li>the car of Chris → ________________</li>
            <li>the end of the movie → ________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}