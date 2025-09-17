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

export default function CorePrefixDegree() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🌡️ <span className="underline decoration-4 decoration-amber-400">TIỀN TỐ CHỈ MỨC ĐỘ</span> — <i>Degree Prefixes</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là các tiền tố được thêm vào đầu từ để thay đổi quy mô, kích thước, hoặc cường độ của từ gốc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Quá mức" formula="over + cook → overcook" colors="from-red-500 via-rose-500 to-pink-600"/>
          <FormulaChip label="Thiếu hụt" formula="under + estimate → underestimate" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Siêu/Lớn" formula="super + market → supermarket" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Cùng nhau" formula="co + worker → co-worker" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#excess">Tiền tố chỉ sự Quá mức</a></li>
            <li><a className="text-rose-700 hover:underline" href="#insufficiency">Tiền tố chỉ sự Thiếu hụt</a></li>
            <li><a className="text-rose-700 hover:underline" href="#size-position">Tiền tố chỉ Kích thước & Vị trí</a></li>
            <li><a className="text-rose-700 hover:underline" href="#relationship">Tiền tố chỉ Quan hệ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            Tiền tố chỉ mức độ giúp chúng ta tạo ra từ mới một cách logic để diễn tả các khái niệm như "quá nhiều", "quá ít", "siêu lớn", "cực nhỏ", "cùng nhau", hoặc "chống lại".
        </p>
      </Section>

      <Section id="excess" title="Tiền tố chỉ sự Quá mức (Prefixes of Excess)" emoji="📈">
        <ul className="list-disc pl-6 space-y-1">
            <li><b>over-:</b> quá nhiều, vượt ngưỡng.
                <br/><i>e.g., <b>over</b>weight (thừa cân), <b>over</b>sleep (ngủ quên), <b>over</b>react (phản ứng thái quá).</i>
            </li>
            <li><b>hyper-:</b> cực kỳ, quá mức (thường dùng trong y học, tâm lý).
                 <br/><i>e.g., <b>hyper</b>active (tăng động), <b>hyper</b>tension (cao huyết áp).</i>
            </li>
            <li><b>ultra-:</b> vượt ra ngoài, cực kỳ (thường dùng trong khoa học, công nghệ).
                 <br/><i>e.g., <b>ultra</b>modern (siêu hiện đại), <b>ultra</b>violet (tia cực tím).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="insufficiency" title="Tiền tố chỉ sự Thiếu hụt (Prefixes of Insufficiency)" emoji="📉">
        <ul className="list-disc pl-6 space-y-1">
            <li><b>under-:</b> quá ít, dưới mức cần thiết.
                <br/><i>e.g., <b>under</b>paid (trả lương thấp), <b>under</b>estimate (đánh giá thấp), <b>under</b>cooked (chưa nấu chín).</i>
            </li>
            <li><b>hypo-:</b> dưới, thấp hơn bình thường (y học).
                 <br/><i>e.g., <b>hypo</b>thermia (hạ thân nhiệt).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="size-position" title="Tiền tố chỉ Kích thước & Vị trí" emoji="↔️">
         <ul className="list-disc pl-6 space-y-1">
            <li><b>sub-:</b> dưới, phụ.
                <br/><i>e.g., <b>sub</b>way (tàu điện ngầm), <b>sub</b>marine (tàu ngầm), <b>sub</b>standard (dưới tiêu chuẩn).</i>
            </li>
            <li><b>super-:</b> trên, lớn hơn, vượt trội.
                 <br/><i>e.g., <b>super</b>market (siêu thị), <b>super</b>human (siêu nhân), <b>super</b>star (siêu sao).</i>
            </li>
            <li><b>mini- / micro-:</b> nhỏ / rất nhỏ.
                 <br/><i>e.g., <b>mini</b>bus (xe buýt nhỏ), <b>micro</b>scope (kính hiển vi).</i>
            </li>
             <li><b>macro-:</b> lớn, vĩ mô.
                 <br/><i>e.g., <b>macro</b>economics (kinh tế vĩ mô).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="relationship" title="Tiền tố chỉ Quan hệ" emoji="🤝">
         <ul className="list-disc pl-6 space-y-1">
            <li><b>co-:</b> cùng nhau, đồng.
                <br/><i>e.g., <b>co-</b>worker (đồng nghiệp), <b>co-</b>operate (hợp tác), <b>co-</b>pilot (phi công phụ).</i>
            </li>
            <li><b>pro-:</b> ủng hộ.
                 <br/><i>e.g., <b>pro-</b>government (ủng hộ chính phủ), <b>pro-</b>democracy (ủng hộ dân chủ).</i>
            </li>
            <li><b>anti-:</b> chống lại.
                 <br/><i>e.g., <b>anti</b>virus (chống vi-rút), <b>anti</b>social (chống đối xã hội).</i>
            </li>
             <li><b>auto-:</b> tự động, tự thân.
                 <br/><i>e.g., <b>auto</b>biography (tự truyện), <b>auto</b>matic (tự động).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Don't underestimate your opponent; he is very strong.</b> — Đừng đánh giá thấp đối thủ của bạn; anh ấy rất mạnh.</li>
          <li><b>This technology is still substandard and needs improvement.</b> — Công nghệ này vẫn còn dưới tiêu chuẩn và cần được cải thiện.</li>
          <li><b>He and his co-founder started the company five years ago.</b> — Anh ấy và người đồng sáng lập của mình đã bắt đầu công ty cách đây 5 năm.</li>
          <li><b>The patient is suffering from hypothermia.</b> — Bệnh nhân đang bị hạ thân nhiệt.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Tạo từ mới bằng cách ghép tiền tố với từ gốc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>over + charge → ____________</li>
            <li>anti + social → ____________</li>
            <li>co + exist → ____________</li>
            <li>under + develop → ____________</li>
            <li>super + hero → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
