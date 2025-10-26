
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

export default function CoreSuffixVerb() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🔧 <span className="underline decoration-4 decoration-amber-400">HẬU TỐ ĐỘNG TỪ</span> — <i>Verb Suffixes</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là các đuôi từ được thêm vào cuối danh từ hoặc tính từ để tạo thành động từ, thường mang ý nghĩa "làm cho..." hoặc "trở nên...".
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Noun → Verb" formula="vaccine + ate → vaccinate" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Adjective → Verb" formula="short + en → shorten" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Adjective → Verb" formula="simple + ify → simplify" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Noun → Verb" formula="modern + ize → modernize" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Cách dùng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#suffixes">Các hậu tố phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#spelling">Quy tắc Chính tả</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lưu ý quan trọng</a></li>
             <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Cách dùng" emoji="🎯">
        <p>
            Hậu tố động từ (verb suffixes) là một công cụ mạnh mẽ để mở rộng vốn từ. Chúng biến một danh từ hoặc tính từ thành một hành động, thường có nghĩa là "làm cho (cái gì đó) trở nên..." hoặc "thực hiện hành động của...".
        </p>
      </Section>

      <Section id="suffixes" title="Các hậu tố phổ biến" emoji="📚">
        <div className="space-y-3">
            <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>-ate:</b> Thường được thêm vào danh từ.
                    <br/><i>e.g., origin → origin<b>ate</b> (bắt nguồn), vaccine → vaccin<b>ate</b> (tiêm chủng), active → activ<b>ate</b> (kích hoạt).</i>
                </p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>-en:</b> Thường được thêm vào tính từ, có nghĩa là "làm cho... hơn" hoặc "trở nên... hơn".
                    <br/><i>e.g., short → short<b>en</b> (làm ngắn lại), wide → wid<b>en</b> (mở rộng), strong → strength<b>en</b> (củng cố).</i>
                </p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>-ify:</b> Có nghĩa là "làm cho...".
                    <br/><i>e.g., simple → simpl<b>ify</b> (đơn giản hóa), pure → pur<b>ify</b> (làm tinh khiết), class → class<b>ify</b> (phân loại).</i>
                </p>
            </div>
             <div className="rounded-xl p-4 bg-gray-50 border">
                <p><b>-ize / -ise:</b> Có nghĩa là "trở thành" hoặc "làm cho trở thành". '-ize' là cách viết của Anh-Mỹ, '-ise' là của Anh-Anh.
                    <br/><i>e.g., modern → modern<b>ize</b> (hiện đại hóa), critic → critic<b>ize</b> (phê bình), industrial → industrial<b>ize</b> (công nghiệp hóa).</i>
                </p>
            </div>
        </div>
      </Section>
      
      <Section id="spelling" title="Quy tắc Chính tả" emoji="✍️">
        <p>
            Một số thay đổi chính tả có thể xảy ra khi thêm hậu tố động từ:
        </p>
        <ul className="list-disc pl-6">
            <li><b>Bỏ 'e' cuối:</b> private → privat<b>ize</b>.</li>
            <li><b>Đổi 'y' thành 'i':</b> beauty → beaut<b>ify</b>.</li>
            <li><b>Một số tính từ/danh từ thay đổi hoàn toàn:</b> strong → strength<b>en</b> (thêm 'th').</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lưu ý quan trọng" emoji="⚠️">
        <p>
            Việc hình thành động từ không phải lúc nào cũng tuân theo quy tắc rõ ràng. Nhiều động từ không được tạo ra từ hậu tố (ví dụ: 'clean', 'open'). Hãy học các hậu tố này như một cách để nhận biết và mở rộng vốn từ, thay vì cố gắng áp dụng chúng cho mọi từ.
        </p>
      </Section>
      
      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The government plans to modernize the public transport system.</b> — Chính phủ có kế hoạch hiện đại hóa hệ thống giao thông công cộng.</li>
          <li><b>Can you simplify this explanation for me?</b> — Bạn có thể đơn giản hóa lời giải thích này cho tôi được không?</li>
          <li><b>You need to widen the hole to fit the pipe.</b> — Bạn cần phải mở rộng cái lỗ để vừa với cái ống.</li>
          <li><b>The new discovery will revolutionize the field of medicine.</b> — Phát hiện mới sẽ cách mạng hóa lĩnh vực y học.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Tạo động từ từ các từ sau bằng cách thêm hậu tố phù hợp:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>special (adjective) → ____________</li>
            <li>ident- (root) → ____________</li>
            <li>dark (adjective) → ____________</li>
            <li>apology (noun) → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
