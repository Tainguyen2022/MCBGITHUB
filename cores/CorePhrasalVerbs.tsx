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

export default function CorePhrasalVerbs() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🧩 <span className="underline decoration-4 decoration-amber-400">CỤM ĐỘNG TỪ</span> — <i>Phrasal Verbs</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Là sự kết hợp giữa một <b>động từ</b> và một hoặc hai <b>tiểu từ (particle)</b> - thường là giới từ hoặc trạng từ - để tạo ra một ý nghĩa mới, thường khác biệt so với động từ gốc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Có thể tách" formula="turn the light off" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Không thể tách" formula="look after the baby" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Dùng Đại từ (bắt buộc tách)" formula="turn it off" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#types">Loại Cụm động từ (Nội/Ngoại)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#separability">Tách được & Không tách được</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pronouns">Quy tắc với Đại từ (Quan trọng!)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#common">Các cụm động từ phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="types" title="Loại Cụm động từ (Nội/Ngoại)" emoji="↔️">
        <p>
            Giống như động từ thường, cụm động từ cũng được chia thành hai loại chính:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Ngoại động từ (Transitive):</b> Cần có một tân ngữ đi kèm.
                <br/><i>e.g., Please <b>take off</b> <u>your shoes</u>.</i> (Take off what? → your shoes)
            </li>
            <li><b>Nội động từ (Intransitive):</b> Không cần tân ngữ, tự nó đã đủ nghĩa.
                <br/><i>e.g., The plane <b>took off</b> on time.</i> (Hành động cất cánh không cần tân ngữ).
            </li>
        </ul>
      </Section>
      
      <Section id="separability" title="Tách được (Separable) & Không tách được (Inseparable)" emoji="✂️">
        <p>Đây là đặc điểm quan trọng và khó nhất của cụm động từ.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700">Tách được (Separable)</p>
                <p>Tân ngữ có thể đứng giữa động từ và tiểu từ, hoặc đứng sau cả cụm.</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><i>turn on the TV</i> ✅</li>
                    <li><i>turn the TV on</i> ✅</li>
                    <li><b>Ví dụ:</b> pick up, turn on/off, put on/away, give back.</li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
                <p className="font-bold text-purple-700">Không tách được (Inseparable)</p>
                <p>Tân ngữ bắt buộc phải đứng sau tiểu từ.</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><i>look after the children</i> ✅</li>
                     <li><i>look the children after</i> ❌</li>
                     <li><b>Ví dụ:</b> look for, look after, run into, get on/off (bus).</li>
                     <li><b>Ghi chú:</b> Tất cả các cụm động từ có 3 từ (verb + particle + particle) đều không tách được (e.g., <i>look forward to, put up with</i>).</li>
                </ul>
            </div>
        </div>
      </Section>

      <Section id="pronouns" title="Quy tắc với Đại từ (Quan trọng!)" emoji="⚠️">
        <p>
            Đây là quy tắc vàng cần nhớ:
        </p>
        <div className="rounded-xl p-4 bg-red-50 border border-red-200">
            <p className="font-bold text-red-700">Nếu tân ngữ là một ĐẠI TỪ (me, you, him, her, it, us, them), nó BẮT BUỘC phải đứng giữa động từ và tiểu từ đối với cụm động từ tách được.</p>
        </div>
         <ul className="list-disc pl-6 mt-2">
            <li><i>turn <b>it</b> on</i> ✅</li>
            <li><i>turn on <b>it</b></i> ❌</li>
            <br/>
             <li><i>pick <b>her</b> up</i> ✅</li>
             <li><i>pick up <b>her</b></i> ❌</li>
        </ul>
      </Section>

       <Section id="common" title="Các cụm động từ phổ biến" emoji="📚">
        <ul className="list-disc pl-6">
            <li><b>break down:</b> hỏng (xe cộ)</li>
            <li><b>call off:</b> hủy bỏ</li>
            <li><b>come across:</b> tình cờ gặp/thấy</li>
            <li><b>find out:</b> khám phá, tìm ra</li>
            <li><b>give up:</b> từ bỏ</li>
            <li><b>look forward to (+ V-ing):</b> mong chờ</li>
            <li><b>put on:</b> mặc (quần áo)</li>
            <li><b>put up with:</b> chịu đựng</li>
            <li><b>take off:</b> cởi ra (quần áo), cất cánh (máy bay)</li>
            <li><b>turn on / turn off:</b> bật / tắt</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="🚫">
        <ol className="list-decimal pl-6">
          <li>Đặt đại từ sai vị trí với cụm động từ tách được. (❌ <i className="line-through">I'll pick up you.</i>)</li>
          <li>Tách một cụm động từ không tách được. (❌ <i className="line-through">She looks her children after.</i>)</li>
          <li>Dùng 'to V' sau 'look forward to'. (❌ <i className="line-through">I look forward to see you.</i> → ✅ ...to <b>seeing</b> you.)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại câu, thay thế tân ngữ bằng đại từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Could you turn on the light? (it)
            <br/>→ ____________________________________________</li>
            <li>She looked after the baby. (him)
            <br/>→ ____________________________________________</li>
            <li>I will pick up my friend at the airport. (her)
            <br/>→ ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}