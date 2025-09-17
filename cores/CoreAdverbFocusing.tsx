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

export default function CoreAdverbFocusing() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎯 <span className="underline decoration-4 decoration-amber-400">TRẠNG TỪ NHẤN MẠNH</span> — <i>Focusing Adverbs</i>
        </h1>
        <p className="mt-2 text-gray-700">
          Các trạng từ như <b>only, even, just, also</b> được dùng để thu hút sự chú ý vào một phần cụ thể của câu, và vị trí của chúng có thể thay đổi hoàn toàn ý nghĩa.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Nhấn mạnh S" formula="Only she knows." colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Nhấn mạnh O" formula="She knows only him." colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Nhấn mạnh V" formula="She only knows..." colors="from-indigo-500 via-purple-500 to-pink-500"/>
          <FormulaChip label="Đảo ngữ" formula="Only then did I understand." colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#purpose">Mục đích & Vị trí</a></li>
            <li><a className="text-rose-700 hover:underline" href="#common">Các trạng từ phổ biến</a></li>
            <li><a className="text-rose-700 hover:underline" href="#meaning">Thay đổi ý nghĩa theo Vị trí</a></li>
            <li><a className="text-rose-700 hover:underline" href="#inversion">Đảo ngữ với "Only"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="purpose" title="Mục đích & Vị trí" emoji="📍">
        <p>
            <b>Trạng từ nhấn mạnh (Focusing Adverbs)</b> có chức năng chỉ ra phần thông tin quan trọng nhất trong câu. Vị trí của chúng rất linh hoạt nhưng lại cực kỳ quan trọng.
        </p>
        <p className="font-bold">Quy tắc vàng: Trạng từ nhấn mạnh thường đứng ngay TRƯỚC từ hoặc cụm từ mà nó bổ nghĩa.</p>
      </Section>

      <Section id="common" title="Các trạng từ phổ biến" emoji="📚">
        <ul className="list-disc pl-6 space-y-2">
            <li><b>Only / Just:</b> Giới hạn, chỉ một đối tượng/hành động duy nhất.
                <br/><i>e.g., <b>Only</b> John passed the exam.</i> (Chỉ mình John đỗ).
            </li>
             <li><b>Even:</b> Nhấn mạnh một điều bất ngờ, không mong đợi.
                <br/><i>e.g., <b>Even</b> the teacher didn't know the answer.</i> (Ngay cả giáo viên cũng không biết).
            </li>
             <li><b>Also / Too:</b> Bổ sung, thêm vào. "Also" thường đứng giữa câu, "too" thường đứng cuối câu.
                <br/><i>e.g., She can <b>also</b> speak French. / She can speak French, <b>too</b>.</i>
            </li>
        </ul>
      </Section>

      <Section id="meaning" title="Thay đổi ý nghĩa theo Vị trí" emoji="↔️">
        <p>Đây là điểm cốt lõi. Hãy xem vị trí của "only" thay đổi ý nghĩa của câu "I love you on Sundays" như thế nào:</p>
        <div className="space-y-3 mt-2">
            <div className="rounded-xl p-3 bg-gray-50 border">
                <p><b>Only</b> I love you on Sundays.</p>
                <p className="text-sm text-gray-600">(Chỉ có tôi yêu bạn vào Chủ nhật, không ai khác.)</p>
            </div>
             <div className="rounded-xl p-3 bg-gray-50 border">
                <p>I <b>only</b> love you on Sundays.</p>
                <p className="text-sm text-gray-600">(Tôi chỉ yêu bạn vào Chủ nhật, chứ không làm gì khác.)</p>
            </div>
             <div className="rounded-xl p-3 bg-gray-50 border">
                <p>I love <b>only</b> you on Sundays.</p>
                <p className="text-sm text-gray-600">(Vào Chủ nhật, tôi chỉ yêu mình bạn, không yêu ai khác.)</p>
            </div>
             <div className="rounded-xl p-3 bg-gray-50 border">
                <p>I love you <b>only</b> on Sundays.</p>
                <p className="text-sm text-gray-600">(Tôi chỉ yêu bạn vào Chủ nhật, các ngày khác thì không.)</p>
            </div>
        </div>
      </Section>
      
      <Section id="inversion" title="Đảo ngữ với 'Only'" emoji="🔄">
        <p>
            Khi một cụm từ bắt đầu bằng <b>Only</b> (ví dụ: Only then, Only after, Only when, Only by...) được đặt ở đầu câu để nhấn mạnh, mệnh đề chính phải được <b>đảo ngữ</b>.
        </p>
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
            <p className="font-bold text-purple-700">Công thức: Only + [cụm trạng từ] + Trợ động từ + S + V</p>
        </div>
        <ul className="list-disc pl-6 mt-2">
            <li><i><b>Only then did I realize</b> my mistake.</i> (Chỉ đến lúc đó tôi mới nhận ra sai lầm của mình.)</li>
            <li><i><b>Only after he apologized could we be</b> friends again.</i> (Chỉ sau khi anh ấy xin lỗi chúng tôi mới có thể làm bạn lại.)</li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Đặt trạng từ nhấn mạnh sai vị trí, làm người nghe/đọc hiểu sai ý.</li>
          <li>Quên đảo ngữ khi đưa cụm "Only..." lên đầu câu.</li>
          <li>Nhầm lẫn vị trí của "also" (giữa câu) và "too" (thường ở cuối câu).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Even a child can understand this.</b> — Ngay cả một đứa trẻ cũng có thể hiểu điều này.</li>
          <li><b>I just want to ask one question.</b> — Tôi chỉ muốn hỏi một câu thôi.</li>
          <li><b>He can play the guitar and he also sings.</b> — Anh ấy có thể chơi guitar và anh ấy cũng hát nữa.</li>
          <li><b>Only when you grow up will you understand.</b> — Chỉ khi bạn lớn lên bạn mới hiểu được.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Viết lại câu, đặt trạng từ trong ngoặc vào vị trí phù hợp để tạo ra ý nghĩa được gợi ý:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I read two books last week. (only) <span className="text-gray-600">— Ý nghĩa: không đọc nhiều hơn hai cuốn.</span>
            <br/>→ ____________________________________________</li>
            <li>She can speak French and Spanish. (also)
            <br/>→ ____________________________________________</li>
            <li>I understood the problem after the teacher explained it again. (Only after...) — <span className="text-gray-600">Dùng đảo ngữ.</span>
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