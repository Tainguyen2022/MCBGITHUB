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

export default function CoreNounPlural() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📚 <span className="underline decoration-4 decoration-amber-400">DANH TỪ SỐ NHIỀU</span> — <i>Plural Nouns</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Nắm vững các quy tắc chính tả để chuyển danh từ đếm được từ số ít sang số nhiều, bao gồm các quy tắc thông thường và các trường hợp bất quy tắc.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Quy tắc chung" formula="Noun + s" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Tận cùng -s, -sh, -ch, -x, -z" formula="Noun + es" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Phụ âm + y" formula="y → ies" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Bất quy tắc" formula="child → children" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#regular">Quy tắc thông thường</a></li>
            <li><a className="text-rose-700 hover:underline" href="#irregular">Danh từ Bất quy tắc</a></li>
            <li><a className="text-rose-700 hover:underline" href="#no-change">Danh từ không thay đổi</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="regular" title="Quy tắc thông thường (Regular Plurals)" emoji="✍️">
        <p>
            Hầu hết các danh từ tạo dạng số nhiều bằng cách thêm đuôi "-s" hoặc "-es".
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><b>Thêm "-s":</b> Đây là quy tắc phổ biến nhất.
                <br/><i>e.g., car → car<b>s</b>, book → book<b>s</b>, apple → apple<b>s</b>.</i>
            </li>
            <li><b>Thêm "-es" cho danh từ tận cùng bằng -s, -ss, -sh, -ch, -x, -z:</b>
                <br/><i>e.g., bus → bus<b>es</b>, class → class<b>es</b>, dish → dish<b>es</b>, watch → watch<b>es</b>, box → box<b>es</b>, quiz → quiz<b>zes</b>.</i>
            </li>
            <li><b>Phụ âm + y → ies:</b>
                <br/><i>e.g., city → cit<b>ies</b>, baby → bab<b>ies</b>, story → stor<b>ies</b>.</i> (nhưng day → days, boy → boys)
            </li>
             <li><b>-f hoặc -fe → ves:</b>
                <br/><i>e.g., leaf → lea<b>ves</b>, wife → wi<b>ves</b>, life → li<b>ves</b>.</i> (Ngoại lệ: roof → roofs, chief → chiefs)
            </li>
             <li><b>-o:</b> Thường thêm "-es" (potato → potatoes, tomato → tomatoes), nhưng một số từ chỉ thêm "-s" (photo → photos, piano → pianos).</li>
        </ul>
      </Section>

      <Section id="irregular" title="Danh từ Bất quy tắc (Irregular Plurals)" emoji="✨">
        <p>
            Một số danh từ có dạng số nhiều không theo quy tắc nào và cần phải học thuộc.
        </p>
        <ul className="list-disc pl-6">
            <li>man → <b>men</b></li>
            <li>woman → <b>women</b></li>
            <li>child → <b>children</b></li>
            <li>person → <b>people</b></li>
            <li>foot → <b>feet</b></li>
            <li>tooth → <b>teeth</b></li>
            <li>goose → <b>geese</b></li>
            <li>mouse → <b>mice</b></li>
             <li>ox → <b>oxen</b></li>
             <li>cactus → <b>cacti</b></li>
             <li>focus → <b>foci</b></li>
             <li>fungus → <b>fungi</b></li>
        </ul>
      </Section>

       <Section id="no-change" title="Danh từ không thay đổi" emoji="🐑">
        <p>
            Một số danh từ có dạng số ít và số nhiều giống hệt nhau.
        </p>
        <ul className="list-disc pl-6">
            <li><b>sheep</b> (one sheep, two sheep)</li>
            <li><b>fish</b> (one fish, many fish - "fishes" được dùng khi nói về các loài cá khác nhau)</li>
            <li><b>deer</b> (one deer, a herd of deer)</li>
            <li><b>series</b> (one series, two series)</li>
            <li><b>species</b> (one species, many species)</li>
            <li><b>aircraft</b> (one aircraft, several aircraft)</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Thêm 's' vào danh từ bất quy tắc. (❌ <i className="line-through">childs, sheeps, peoples</i>)</li>
          <li>Quên đổi -y thành -ies. (❌ <i className="line-through">citys</i>)</li>
          <li>Thêm 's' vào danh từ không đếm được. (❌ <i className="line-through">informations, advices</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>There are three men and two women in the room.</b> — Có ba người đàn ông và hai người phụ nữ trong phòng.</li>
          <li><b>The children are playing with their toys.</b> — Bọn trẻ đang chơi với đồ chơi của chúng.</li>
          <li><b>She has two sharp teeth.</b> — Cô ấy có hai chiếc răng sắc nhọn.</li>
          <li><b>Many species of fish live in this lake.</b> — Nhiều loài cá sống trong hồ này.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết dạng số nhiều của các danh từ sau:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>potato → ____________</li>
            <li>wife → ____________</li>
            <li>person → ____________</li>
            <li>sheep → ____________</li>
             <li>baby → ____________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}