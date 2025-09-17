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

export default function CoreWouldRather() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🤔 <span className="underline decoration-4 decoration-amber-400">WOULD RATHER / SOONER</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng để diễn tả sự ưu tiên hoặc mong muốn một điều gì đó hơn một điều khác, thường mang tính giả định.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Cùng chủ ngữ" formula="S + would rather + V(bare)" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Khác chủ ngữ (Hiện tại)" formula="S1 + would rather + S2 + V2/V-ed" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="So sánh" formula="... rather + V1 + than + V2" colors="from-rose-500 via-red-500 to-orange-500"/>
          <FormulaChip label="Khác chủ ngữ (Quá khứ)" formula="S1 + would rather + S2 + had V3" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#same-subject">1. Cùng Chủ ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#different-subjects">2. Khác Chủ ngữ (Giả định)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#than">3. So sánh với 'than'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">4. Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">5. Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">6. Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="same-subject" title="1. Cùng Chủ ngữ (Same Subject)" emoji="👤">
        <p>
            Khi người nói diễn tả mong muốn của chính mình về hành động của chính mình, ta dùng cấu trúc với động từ nguyên mẫu không 'to'.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: S + would rather ('d rather) + (not) + V(bare)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I'<b>d rather stay</b> home tonight.</i> (Tôi thà ở nhà tối nay.)</li>
            <li><i>She'<b>d rather not talk</b> about it.</i> (Cô ấy thà không nói về chuyện đó.)</li>
        </ul>
      </Section>
      
      <Section id="different-subjects" title="2. Khác Chủ ngữ (Different Subjects - Subjunctive)" emoji="👥">
        <p>
            Khi người nói muốn người khác làm (hoặc không làm) gì đó, ta dùng cấu trúc giả định. Mệnh đề sau sẽ được lùi thì.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><b>Mong muốn ở hiện tại/tương lai:</b> Dùng thì <b>Quá khứ đơn (Past Simple)</b>.
                <br/><i>e.g., I'<b>d rather you didn't smoke</b> in here.</i> (Tôi muốn bạn không hút thuốc ở đây. - Trái với hiện tại)
                <br/><i>e.g., He'<b>d rather she came</b> tomorrow instead of today.</i> (Anh ấy muốn cô ấy đến vào ngày mai.)
            </li>
            <li><b>Mong muốn ở quá khứ (hối tiếc):</b> Dùng thì <b>Quá khứ Hoàn thành (Past Perfect)</b>.
                 <br/><i>e.g., I'<b>d rather you hadn't told</b> him the secret yesterday.</i> (Tôi thà rằng hôm qua bạn đã không nói cho anh ta bí mật.)
            </li>
        </ul>
      </Section>

       <Section id="than" title="3. So sánh với 'than'" emoji="⚖️">
        <p>
            Khi muốn so sánh hai lựa chọn, ta dùng 'than'. Các động từ theo sau 'would rather' và 'than' phải ở cùng dạng (nguyên mẫu không 'to').
        </p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: S + would rather + V1(bare) + than + V2(bare)</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i>I'<b>d rather walk than drive</b> to work.</i></li>
            <li><i>She'<b>d rather read a book than watch</b> TV.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="4. Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng 'to V' sau 'would rather'. (❌ <i className="line-through">I'd rather to stay.</i>)</li>
          <li>Không lùi thì khi có hai chủ ngữ khác nhau. (❌ <i className="line-through">I'd rather you don't smoke.</i>)</li>
          <li>Dùng V-ing sau 'than'. (❌ <i className="line-through">I'd rather walk than driving.</i>)</li>
        </ol>
      </Section>
      
      <Section id="examples" title="5. Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
            <li><b>A: Do you want to go out? B: No, I'd rather stay in.</b> — A: Bạn có muốn đi chơi không? B: Không, tôi thà ở nhà.</li>
            <li><b>I'd rather you paid me in cash.</b> — Tôi muốn bạn trả tôi bằng tiền mặt hơn.</li>
            <li><b>My parents would rather I studied medicine, but I prefer art.</b> — Bố mẹ tôi muốn tôi học ngành y hơn, nhưng tôi lại thích nghệ thuật.</li>
        </ol>
      </Section>

      <Section id="drill" title="6. Bài tập nhanh" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn dạng đúng của động từ trong ngoặc:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I'd rather (to go / go) by train.</li>
            <li>She'd rather you (don't call / didn't call) her after 10 PM.</li>
            <li>We'd rather (eat) ______ at home than (go) ______ to a restaurant.</li>
            <li>He'd rather his friends (hadn't made / didn't make) so much noise last night.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}