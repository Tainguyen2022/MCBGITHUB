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

export default function CoreArticleAAn() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ☝️ <span className="underline decoration-4 decoration-amber-400">MẠO TỪ BẤT ĐỊNH: A / AN</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng trước một danh từ đếm được số ít không xác định, được nhắc đến lần đầu tiên hoặc mang ý nghĩa "một".
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Dùng 'a'" formula="a + Phụ âm (sound)" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Dùng 'an'" formula="an + Nguyên âm (sound)" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#rule">Quy tắc Vàng: Dựa vào ÂM THANH</a></li>
            <li><a className="text-rose-700 hover:underline" href="#when-to-use">Khi nào cần dùng 'a/an'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#when-not-to-use">Khi nào KHÔNG dùng 'a/an'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            Mạo từ bất định <b>a/an</b> được dùng khi chúng ta nói về một đối tượng chung chung, không cụ thể, hoặc khi đối tượng đó được nhắc đến lần đầu tiên trong cuộc hội thoại.
        </p>
        <ul className="list-disc pl-6">
            <li><i>I see <b>a</b> bird in the garden.</i> (Một con chim nào đó, không xác định).</li>
            <li><i>She wants to be <b>an</b> engineer.</i> (Một kỹ sư nói chung).</li>
        </ul>
      </Section>

      <Section id="rule" title="Quy tắc Vàng: Dựa vào ÂM THANH, không phải Chữ viết" emoji="🔊">
        <p>Đây là quy tắc quan trọng nhất và dễ gây nhầm lẫn nhất. Việc chọn 'a' hay 'an' phụ thuộc vào <b>âm thanh bắt đầu</b> của từ đứng ngay sau nó.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700">Dùng "a" trước ÂM PHỤ ÂM</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><b>a</b> cat, <b>a</b> dog, <b>a</b> big apple</li>
                    <li><b>a</b> u<span className="underline">ni</span>versity (bắt đầu bằng âm /j/, là phụ âm)</li>
                    <li><b>a</b> Eu<span className="underline">ro</span>pean country (bắt đầu bằng âm /j/)</li>
                    <li><b>a</b> one-way street (bắt đầu bằng âm /w/)</li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
                <p className="font-bold text-purple-700">Dùng "an" trước ÂM NGUYÊN ÂM</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><b>an</b> a<span className="underline">pp</span>le, <b>an</b> e<span className="underline">gg</span>, <b>an</b> i<span className="underline">dea</span></li>
                     <li><b>an</b> h<span className="underline">our</span> (chữ 'h' câm)</li>
                     <li><b>an</b> MBA (đọc là /em-bi-ei/, bắt đầu bằng âm /e/)</li>
                     <li><b>an</b> X-ray (đọc là /eks-rei/, bắt đầu bằng âm /e/)</li>
                </ul>
            </div>
        </div>
      </Section>

      <Section id="when-to-use" title="Khi nào cần dùng 'a/an'" emoji="✅">
        <ul className="list-disc pl-6 space-y-2">
            <li><b>Trước danh từ đếm được, số ít, không xác định:</b>
                <br/><i>e.g., Can you give me <b>a</b> pen?</i>
            </li>
            <li><b>Trước nghề nghiệp:</b>
                <br/><i>e.g., He is <b>an</b> architect. She is <b>a</b> teacher.</i>
            </li>
            <li><b>Trong các cụm từ chỉ số lượng nhất định:</b>
                <br/><i>e.g., <b>a</b> dozen eggs, <b>a</b> couple of days, <b>a</b> lot of people.</i>
            </li>
             <li><b>Trong các cụm từ chỉ giá cả, tốc độ, tần suất:</b>
                <br/><i>e.g., $5 <b>a</b> kilo, 100km <b>an</b> hour, twice <b>a</b> week.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="when-not-to-use" title="Khi nào KHÔNG dùng 'a/an'" emoji="🚫">
        <ol className="list-decimal pl-6">
          <li><b>Trước danh từ không đếm được:</b>
             <br/><i>e.g., advice, information, water, music.</i> (Phải dùng `a piece of advice`, `a glass of water`).
          </li>
           <li><b>Trước danh từ số nhiều:</b>
             <br/><i>e.g., cats, books, ideas.</i>
          </li>
        </ol>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <p>Lỗi phổ biến nhất là chỉ nhìn vào chữ cái đầu tiên (u, e, o, a, i) thay vì nghe âm thanh của nó.</p>
        <ul className="list-disc pl-6">
            <li>❌ <i className="line-through">an university</i> → ✅ <b>a university</b> (âm /j/)</li>
            <li>❌ <i className="line-through">a hour</i> → ✅ <b>an hour</b> (âm câm 'h')</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>I have a cat and an apple.</b> — Tôi có một con mèo và một quả táo.</li>
          <li><b>It takes me an hour to get to work.</b> — Tôi mất một tiếng để đi làm.</li>
          <li><b>He has a unique talent for music.</b> — Anh ấy có một tài năng âm nhạc độc đáo.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền 'a' hoặc 'an' vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>She is ______ honest person.</li>
            <li>I need to buy ______ new umbrella.</li>
            <li>He is studying for ______ MBA degree.</li>
            <li>It was ______ unforgettable experience.</li>
             <li>They live in ______ small apartment in ______ European city.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}