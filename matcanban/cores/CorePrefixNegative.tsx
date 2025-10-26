
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

export default function CorePrefixNegative() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🚫 <span className="underline decoration-4 decoration-amber-400">TIỀN TỐ PHỦ ĐỊNH</span> — <i>Negative Prefixes</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là các tiền tố được thêm vào đầu một từ (tính từ, động từ, danh từ) để tạo ra từ có ý nghĩa trái ngược.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Phổ biến nhất" formula="un + happy → unhappy" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Quy tắc phụ âm" formula="im + possible → impossible" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Nghĩa 'sai'" formula="mis + understand → misunderstand" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Đảo ngược hành động" formula="dis + connect → disconnect" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#un-dis">Tiền tố 'un-' và 'dis-'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#in-im-il-ir">Tiền tố 'in-', 'im-', 'il-', 'ir-'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#mis-non">Tiền tố 'mis-' và 'non-'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#spelling">Quy tắc Chính tả</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="un-dis" title="Tiền tố 'un-' và 'dis-'" emoji="🤷">
        <p>Đây là hai tiền tố phủ định phổ biến nhất.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>un-:</b> Thường dùng với tính từ và trạng từ.
                <br/><i>e.g., happy → <b>un</b>happy; able → <b>un</b>able; fortunately → <b>un</b>fortunately.</i>
                <br/>Cũng dùng với một số động từ để đảo ngược hành động: <i>do → <b>un</b>do; lock → <b>un</b>lock.</i>
            </li>
            <li><b>dis-:</b> Thường dùng với động từ, tính từ và danh từ để chỉ sự thiếu vắng hoặc trái ngược.
                 <br/><i>e.g., agree → <b>dis</b>agree; appear → <b>dis</b>appear; honest → <b>dis</b>honest; advantage → <b>dis</b>advantage.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="in-im-il-ir" title="Tiền tố 'in-', 'im-', 'il-', 'ir-'" emoji=" phonetic️">
        <p>
            Nhóm tiền tố này có nguồn gốc Latinh và thường tuân theo một quy tắc về mặt phát âm để dễ đọc hơn.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><b>im-:</b> Thường đứng trước các từ bắt đầu bằng <b>m</b> hoặc <b>p</b>.
                <br/><i>e.g., possible → <b>im</b>possible; mature → <b>im</b>mature; polite → <b>im</b>polite.</i>
            </li>
            <li><b>il-:</b> Đứng trước các từ bắt đầu bằng <b>l</b>.
                 <br/><i>e.g., legal → <b>il</b>legal; logical → <b>il</b>logical.</i>
            </li>
             <li><b>ir-:</b> Đứng trước các từ bắt đầu bằng <b>r</b>.
                 <br/><i>e.g., regular → <b>ir</b>regular; responsible → <b>ir</b>responsible.</i>
            </li>
            <li><b>in-:</b> Dùng cho các trường hợp còn lại (thường là các chữ cái khác).
                 <br/><i>e.g., correct → <b>in</b>correct; complete → <b>in</b>complete; convenient → <b>in</b>convenient.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="mis-non" title="Tiền tố 'mis-' và 'non-'" emoji="❌">
        <p>Hai tiền tố này cũng mang nghĩa phủ định nhưng có sắc thái riêng.</p>
         <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><b>mis-:</b> Mang nghĩa "sai, tệ, không đúng".
                <br/><i>e.g., understand → <b>mis</b>understand (hiểu sai); spell → <b>mis</b>spell (viết sai chính tả); fortune → <b>mis</b>fortune (điều không may).</i>
            </li>
            <li><b>non-:</b> Mang nghĩa "không phải là", chỉ sự thiếu vắng. Thường có dấu gạch nối.
                 <br/><i>e.g., fiction → <b>non-</b>fiction; profit → <b>non-</b>profit; smoker → <b>non-</b>smoker.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="spelling" title="Quy tắc Chính tả" emoji="✍️">
        <p>
            Khi thêm một tiền tố vào đầu từ, chính tả của từ gốc <b>không thay đổi</b>.
        </p>
        <ul className="list-disc pl-6">
            <li>un + necessary → u<b>nn</b>ecessary (giữ cả hai chữ 'n')</li>
            <li>mis + spell → mi<b>ss</b>pell (giữ cả hai chữ 's')</li>
            <li>ir + regular → i<b>rr</b>egular (giữ cả hai chữ 'r')</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <p>
            Không có quy tắc tuyệt đối nào để biết một từ sẽ đi với tiền tố phủ định nào. Cách tốt nhất là học chúng như từ vựng mới.
        </p>
        <ul className="list-disc pl-6">
          <li>Sử dụng sai tiền tố. (❌ <i className="line-through">unpossible</i>, ❌ <i className="line-through">discorrect</i>)</li>
          <li>Quên nhân đôi phụ âm khi cần thiết (ví dụ: `unecessary`).</li>
        </ul>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>It's impossible to finish this work in one day.</b> — Không thể nào hoàn thành công việc này trong một ngày.</li>
          <li><b>He was dishonest about his past experience.</b> — Anh ta đã không trung thực về kinh nghiệm trong quá khứ của mình.</li>
          <li><b>I'm afraid your answer is incorrect.</b> — Tôi e rằng câu trả lời của bạn không chính xác.</li>
          <li><b>Don't misunderstand me; I'm not criticizing your work.</b> — Đừng hiểu lầm tôi; tôi không chỉ trích công việc của bạn.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền tiền tố phủ định đúng vào trước các từ sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>______ + regular → ____________</li>
            <li>______ + agree → ____________</li>
            <li>______ + polite → ____________</li>
            <li>______ + legal → ____________</li>
            <li>______ + behave → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}
