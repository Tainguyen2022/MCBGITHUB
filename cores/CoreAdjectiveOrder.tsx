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
        // Bố cục 2 dòng, label ở trên, formula ở dưới
        'flex flex-col items-start gap-1 text-left'
      ].join(' ')}
    >
      {/* Chú giải (nhỏ hơn) */}
      <span className="text-sm font-semibold text-white/80 truncate">{label}</span>
      
      {/* Công thức (lớn hơn, kế thừa extrabold) */}
      <span className="truncate">{formula}</span>

      {/* toast nhỏ khi copy */}
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

export default function CoreAdjectiveOrder() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎨 <span className="underline decoration-4 decoration-amber-400">TRẬT TỰ TÍNH TỪ</span> — <i>Order of Adjectives</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Khi có nhiều tính từ cùng bổ nghĩa cho một danh từ, chúng thường được sắp xếp theo một trật tự nhất định, được biết đến với tên gọi <b>OSASCOMP</b>.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Mẹo ghi nhớ" formula="OSASCOMP" colors="from-sky-500 via-blue-500 to-indigo-600"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#order">Trật tự OSASCOMP</a></li>
            <li><a className="text-rose-700 hover:underline" href="#punctuation">Quy tắc Dấu phẩy</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="order" title="Trật tự OSASCOMP" emoji="🔢">
        <p>
            Đây là quy tắc phổ biến để sắp xếp các tính từ. "OSASCOMP" là viết tắt của các loại tính từ sau:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2 font-mono">
            <li><b className="font-sans font-semibold text-red-600">O</b>pinion: beautiful, wonderful, ugly, terrible</li>
            <li><b className="font-sans font-semibold text-orange-600">S</b>ize: large, small, long, short</li>
            <li><b className="font-sans font-semibold text-yellow-600">A</b>ge: old, new, young, ancient</li>
            <li><b className="font-sans font-semibold text-green-600">S</b>hape: round, square, triangular</li>
            <li><b className="font-sans font-semibold text-blue-600">C</b>olor: red, blue, black, white</li>
            <li><b className="font-sans font-semibold text-indigo-600">O</b>rigin: Vietnamese, American, Japanese</li>
            <li><b className="font-sans font-semibold text-purple-600">M</b>aterial: wooden, plastic, silk, cotton</li>
            <li><b className="font-sans font-semibold text-gray-600">P</b>urpose: sleeping (bag), writing (desk)</li>
        </ol>
        <p className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <b>Ví dụ áp dụng:</b> A <span className="text-red-600">lovely</span> <span className="text-orange-600">small</span> <span className="text-blue-600">black</span> cat. (Opinion → Size → Color)
        </p>
      </Section>

      <Section id="punctuation" title="Quy tắc Dấu phẩy" emoji="✍️">
        <p>
            Việc sử dụng dấu phẩy giữa các tính từ phụ thuộc vào chúng có cùng loại hay không.
        </p>
        <ul className="list-disc pl-6">
            <li><b>KHÔNG dùng dấu phẩy</b> giữa các tính từ thuộc các loại khác nhau trong trật tự OSASCOMP.
            <br/><i>e.g., a big red ball (Size → Color)</i>
          </li>
            <li><b>CÓ THỂ dùng dấu phẩy</b> giữa hai hoặc nhiều tính từ cùng loại (thường là Opinion).
            <br/><i>e.g., a friendly, intelligent dog (cả hai đều là Opinion).</i>
          </li>
            <li><b>KHÔNG dùng dấu phẩy</b> giữa tính từ cuối cùng và danh từ.</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600 p-2 rounded-lg bg-gray-50 border">
            <b>Mẹo:</b> Nếu bạn có thể chèn từ "and" vào giữa hai tính từ và câu vẫn nghe tự nhiên, bạn có thể dùng dấu phẩy. (e.g., "a friendly and intelligent dog" → "a friendly, intelligent dog").
        </p>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Đặt tính từ chỉ quan điểm (Opinion) sai vị trí. Nó hầu như luôn đứng đầu.</li>
          <li>Sử dụng dấu phẩy không cần thiết giữa các tính từ khác loại.</li>
          <li>Sử dụng quá nhiều tính từ (thường 2-3 là đủ) khiến câu trở nên nặng nề và thiếu tự nhiên.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He bought a small black leather jacket.</b> — Anh ấy đã mua một chiếc áo khoác da màu đen nhỏ.
          <br/>(Size → Color → Material)
          </li>
          <li><b>She lives in a lovely new wooden house.</b> — Cô ấy sống trong một ngôi nhà gỗ mới xinh xắn.
          <br/>(Opinion → Age → Material)
          </li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Sắp xếp lại các tính từ trong ngoặc theo đúng trật tự:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She wore a (silk / beautiful / long) dress.
            <br/>→ She wore a ____________________________________________ dress.</li>
            <li>He is an (American / young / talented) actor.
            <br/>→ He is an ____________________________________________ actor.</li>
            <li>We sat at a (wooden / round / large) table.
            <br/>→ We sat at a ____________________________________________ table.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}