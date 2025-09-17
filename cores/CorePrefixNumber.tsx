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

export default function CorePrefixNumber() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔢 <span className="underline decoration-4 decoration-amber-400">TIỀN TỐ CHỈ SỐ LƯỢNG & VỊ TRÍ</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Là các tiền tố giúp xác định số lượng (một, hai, nhiều) hoặc mối quan hệ về không gian, vị trí (giữa, xuyên qua, dưới).
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Một" formula="uni + form → uniform" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Hai" formula="bi + cycle → bicycle" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Nhiều" formula="multi + national → multinational" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Giữa" formula="inter + national → international" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#number">Tiền tố chỉ Số lượng (Number)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#position">Tiền tố chỉ Vị trí (Position)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="number" title="Tiền tố chỉ Số lượng (Number Prefixes)" emoji="📊">
        <p>Các tiền tố này có nguồn gốc từ tiếng Latinh và Hy Lạp, thường được dùng trong các từ học thuật và kỹ thuật.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>uni- / mono-:</b> nghĩa là "một".
                <br/><i>e.g., <b>uni</b>corn (kỳ lân), <b>uni</b>form (đồng phục), <b>mono</b>logue (độc thoại), <b>mono</b>lingual (đơn ngữ).</i>
            </li>
            <li><b>bi- / di-:</b> nghĩa là "hai".
                 <br/><i>e.g., <b>bi</b>cycle (xe đạp), <b>bi</b>lingual (song ngữ), <b>di</b>oxide (điôxít), <b>di</b>lemma (thế tiến thoái lưỡng nan).</i>
            </li>
            <li><b>tri-:</b> nghĩa là "ba".
                 <br/><i>e.g., <b>tri</b>angle (hình tam giác), <b>tri</b>cycle (xe ba bánh), <b>tri</b>pod (giá ba chân).</i>
            </li>
            <li><b>multi- / poly-:</b> nghĩa là "nhiều".
                 <br/><i>e.g., <b>multi</b>national (đa quốc gia), <b>multi</b>media (đa phương tiện), <b>poly</b>gon (đa giác).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="position" title="Tiền tố chỉ Vị trí (Position Prefixes)" emoji="🗺️">
        <p>Các tiền tố này mô tả mối quan hệ về không gian hoặc vị trí tương đối.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>inter-:</b> nghĩa là "giữa", "lẫn nhau".
                <br/><i>e.g., <b>inter</b>national (quốc tế), <b>inter</b>act (tương tác), <b>inter</b>net (mạng lưới liên kết).</i>
            </li>
            <li><b>trans-:</b> nghĩa là "xuyên qua", "băng qua".
                 <br/><i>e.g., <b>trans</b>port (vận chuyển), <b>trans</b>atlantic (xuyên Đại Tây Dương), <b>trans</b>form (biến đổi).</i>
            </li>
            <li><b>sub-:</b> nghĩa là "dưới".
                 <br/><i>e.g., <b>sub</b>marine (tàu ngầm), <b>sub</b>way (tàu điện ngầm), <b>sub</b>merge (chìm xuống).</i>
            </li>
             <li><b>super-:</b> nghĩa là "trên", "vượt lên".
                 <br/><i>e.g., <b>super</b>structure (kiến trúc thượng tầng), <b>super</b>sonic (siêu thanh).</i>
            </li>
             <li><b>extra-:</b> nghĩa là "bên ngoài", "vượt ra ngoài".
                 <br/><i>e.g., <b>extra</b>curricular (ngoại khóa), <b>extra</b>ordinary (phi thường).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>She is multilingual; she can speak five languages.</b> — Cô ấy đa ngôn ngữ; cô ấy có thể nói năm thứ tiếng.</li>
          <li><b>The new subway system will help reduce traffic congestion.</b> — Hệ thống tàu điện ngầm mới sẽ giúp giảm ùn tắc giao thông.</li>
          <li><b>International cooperation is essential to solve global problems.</b> — Hợp tác quốc tế là cần thiết để giải quyết các vấn đề toàn cầu.</li>
          <li><b>The monologue in the play was very powerful.</b> — Màn độc thoại trong vở kịch rất mạnh mẽ.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Nối tiền tố với từ gốc để tạo từ phù hợp với định nghĩa:</p>
          <ol className="list-disc pl-6 mt-2 space-y-2">
            <li>(bi-, tri-, uni-): a vehicle with two wheels → a ____________</li>
            <li>(inter-, trans-, sub-): to change from one form to another → to ____________</li>
            <li>(mono-, multi-, bi-): involving many countries → ____________</li>
            <li>(extra-, inter-, super-): between different departments → ____________departmental</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
