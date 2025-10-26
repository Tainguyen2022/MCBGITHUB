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

export default function CoreAdverbPosition() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📍 <span className="underline decoration-4 decoration-amber-400">VỊ TRÍ TRẠNG TỪ</span> — <i>Adverb Position</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Tìm hiểu các vị trí phổ biến của trạng từ (đầu, giữa, cuối câu) và quy tắc trật tự <b>Manner-Place-Time</b> khi có nhiều trạng từ.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Đầu câu" formula="Adverb, S + V..." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Giữa câu" formula="S + (aux) + Adv + V" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Cuối câu" formula="S + V + O + Adv" colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Trật tự M-P-T" formula="Manner-Place-Time" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#positions">3 Vị trí chính của Trạng từ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#order">Trật tự Trạng từ (MPT Rule)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#frequency">Vị trí Trạng từ Tần suất</a></li>
            <li><a className="text-rose-700 hover:underline" href="#inversion">Trạng từ Nhấn mạnh & Đảo ngữ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="positions" title="3 Vị trí chính của Trạng từ" emoji="🗺️">
        <p>
            Trạng từ có thể đứng ở ba vị trí chính trong câu: đầu câu, giữa câu, và cuối câu.
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><b>Đầu câu (Initial Position):</b> Thường dùng để nhấn mạnh hoặc làm từ nối. Phải có dấu phẩy sau trạng từ.
                <br/><i>e.g., <b>Yesterday,</b> I went to the library. / <b>Fortunately,</b> he wasn't injured.</i>
            </li>
            <li><b>Giữa câu (Mid Position):</b> Vị trí phức tạp, thường dành cho trạng từ tần suất (often, always), mức độ (almost, nearly), và nhấn mạnh (just, even).
                <ul className="list-circle pl-5">
                    <li>Trước động từ thường: <i>He <b>often</b> plays tennis.</i></li>
                    <li>Sau động từ 'to be': <i>She is <b>always</b> late.</i></li>
                    <li>Sau trợ động từ đầu tiên: <i>I have <b>never</b> been to Japan.</i></li>
                </ul>
            </li>
            <li><b>Cuối câu (Final Position):</b> Vị trí phổ biến nhất, đặc biệt cho trạng từ chỉ cách thức, nơi chốn và thời gian.
                 <br/><i>e.g., He drives <b>carefully</b>. / They are waiting <b>outside</b>. / We arrived <b>this morning</b>.</i>
            </li>
        </ol>
      </Section>

      <Section id="order" title="Trật tự Trạng từ (MPT Rule)" emoji="🚦">
        <p>
            Khi có nhiều hơn một trạng từ ở cuối câu, chúng thường tuân theo trật tự: <b>Manner (Cách thức) - Place (Nơi chốn) - Time (Thời gian)</b>.
        </p>
         <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <p className="font-bold text-blue-700">Công thức: S + V (+ O) + Manner + Place + Time</p>
        </div>
        <p className="mt-2"><i>e.g., She sang <b>beautifully</b> (M) <b>at the concert</b> (P) <b>last night</b> (T).</i></p>
        <p>Nếu có động từ di chuyển (go, come, leave,...), trật tự thường là: <b>Place - Manner - Time</b>.</p>
        <p><i>e.g., He went <b>to the library</b> (P) <b>quietly</b> (M) <b>this morning</b> (T).</i></p>
      </Section>
      
      <Section id="frequency" title="Vị trí Trạng từ Tần suất" emoji="🔁">
        <p>Trạng từ chỉ tần suất (always, often, sometimes, never,...) thường đứng ở vị trí giữa câu (mid-position), như đã đề cập ở trên.</p>
        <ul className="list-disc pl-6">
            <li><i>I <b>always</b> drink coffee in the morning.</i></li>
            <li><i>She is <b>never</b> late.</i></li>
            <li><i>Have you <b>ever</b> visited Paris?</i></li>
        </ul>
      </Section>
      
      <Section id="inversion" title="Trạng từ Nhấn mạnh & Đảo ngữ" emoji="✨">
        <p>
            <b>Trạng từ nhấn mạnh (Focusing adverbs)</b> như <i>only, even, just, also</i> thường đứng ngay trước từ mà nó muốn nhấn mạnh. Thay đổi vị trí của chúng có thể thay đổi ý nghĩa của cả câu.
        </p>
         <ul className="list-disc pl-6">
            <li><i><b>Only</b> I saw him.</i> (Chỉ mình tôi thấy anh ta).</li>
            <li><i>I saw <b>only</b> him.</i> (Tôi chỉ thấy mình anh ta).</li>
        </ul>
        <p className="mt-2">
            Khi các trạng từ phủ định hoặc giới hạn (never, rarely, seldom, not only, little) được đặt ở đầu câu để nhấn mạnh, ta phải <b>đảo ngữ</b>.
        </p>
        <p><i>e.g., <b>Rarely have I seen</b> such a beautiful sunset.</i></p>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Đặt trạng từ giữa động từ và tân ngữ trực tiếp.
             <br/>❌ <i className="line-through">She speaks fluently English.</i> → ✅ She speaks English <b>fluently</b>.
          </li>
          <li>Sai trật tự M-P-T.
             <br/>❌ <i className="line-through">I studied yesterday hard at the library.</i>
             <br/>✅ <i>I studied <b>hard</b> (M) <b>at the library</b> (P) <b>yesterday</b> (T).</i>
          </li>
          <li>Đặt sai vị trí trạng từ tần suất. (❌ <i className="line-through">I drink always coffee.</i>)</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>He works efficiently in his office every day.</b> — Anh ấy làm việc hiệu quả (M) tại văn phòng (P) mỗi ngày (T).</li>
          <li><b>Suddenly, it started to rain heavily.</b> — Bất thình lình, trời bắt đầu mưa to. (Đầu câu & cuối câu)</li>
          <li><b>I have never seen such a thing before.</b> — Tôi chưa bao giờ thấy một điều như vậy trước đây. (Giữa câu)</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Sắp xếp lại các trạng từ trong ngoặc theo đúng trật tự:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>He goes (always / to the gym / on Mondays).
            <br/>→ He ____________________________________________</li>
            <li>The team played (last week / brilliantly / in the final match).
            <br/>→ The team played ____________________________________________</li>
            <li>She arrived (at the airport / early / this morning).
            <br/>→ She arrived ____________________________________________</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}