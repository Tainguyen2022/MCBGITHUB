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

export default function CoreModalObligation() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ⚖️ <span className="underline decoration-4 decoration-amber-400">MODALS: NGHĨA VỤ & SỰ CẦN THIẾT</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng <b>must, have to, should</b> để diễn tả nghĩa vụ, sự cần thiết, sự cấm đoán và lời khuyên.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Nghĩa vụ mạnh" formula="S + must/have to + V" colors="from-red-500 via-rose-500 to-pink-600"/>
          <FormulaChip label="Cấm đoán" formula="S + mustn't + V" colors="from-slate-600 via-gray-700 to-black"/>
          <FormulaChip label="Không cần thiết" formula="S + don't have to + V" colors="from-sky-500 via-cyan-500 to-teal-500"/>
          <FormulaChip label="Lời khuyên" formula="S + should + V" colors="from-emerald-500 via-lime-500 to-amber-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Công dụng & Mức độ</a></li>
            <li><a className="text-rose-700 hover:underline" href="#must-have-to">'Must' vs. 'Have to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#negation">Phủ định: 'Mustn't' vs. 'Don't have to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#advice">Lời khuyên: 'Should' / 'Ought to'</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Công dụng & Mức độ" emoji="🎯">
        <p>Các modal verbs này diễn tả các mức độ nghĩa vụ khác nhau:</p>
        <ul className="list-disc pl-6">
            <li><b>must / have to:</b> Nghĩa vụ mạnh, bắt buộc phải làm.</li>
            <li><b>should / ought to:</b> Lời khuyên, đề nghị. Điều nên làm.</li>
            <li><b>mustn't:</b> Cấm đoán. Bắt buộc không được làm.</li>
            <li><b>don't have to:</b> Không cần thiết phải làm.</li>
        </ul>
      </Section>

      <Section id="must-have-to" title="'Must' vs. 'Have to'" emoji="🧐">
        <p>Cả hai đều diễn tả nghĩa vụ mạnh, nhưng có sự khác biệt tinh tế:</p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700">Must (Nghĩa vụ nội tại / Quy định trang trọng)</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><b>Ý kiến cá nhân người nói:</b> <i>I <b>must</b> finish this report today.</i> (Tôi tự thấy mình phải làm).</li>
                    <li><b>Quy định, luật lệ dạng văn bản:</b> <i>All visitors <b>must</b> sign in.</i></li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
                <p className="font-bold text-purple-700">Have to (Nghĩa vụ ngoại tại)</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><b>Quy định từ bên ngoài (luật pháp, sếp...):</b> <i>I <b>have to</b> wear a uniform at work.</i> (Công ty yêu cầu).</li>
                     <li>Linh hoạt hơn 'must', có thể chia ở các thì: <i>I <b>had to</b> work late yesterday. / I <b>will have to</b> get up early tomorrow.</i></li>
                </ul>
            </div>
        </div>
      </Section>

      <Section id="negation" title="Phủ định: 'Mustn't' vs. 'Don't have to'" emoji="🚫">
        <p>Đây là điểm khác biệt lớn và quan trọng nhất cần nhớ:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li><b>Mustn't (must not) = Cấm đoán (Prohibition)</b>. Nghĩa là "không được phép làm".
                <br/><i>e.g., You <b>mustn't</b> smoke in this room. (It is forbidden).</i>
            </li>
            <li><b>Don't have to = Không cần thiết (Lack of Necessity)</b>. Nghĩa là "bạn không cần phải làm, nhưng nếu làm cũng không sao".
                 <br/><i>e.g., You <b>don't have to</b> work tomorrow. It's a holiday. (It is not necessary).</i>
            </li>
        </ul>
      </Section>
      
      <Section id="advice" title="Lời khuyên: 'Should' / 'Ought to'" emoji="💡">
        <p>Dùng để đưa ra lời khuyên, đề xuất hoặc nói về điều đúng đắn nên làm. 'Ought to' trang trọng hơn một chút.</p>
        <ul className="list-disc pl-6">
            <li><i>The cat <b>should</b> see a vet.</i></li>
            <li><i>He <b>shouldn't</b> stay up so late.</i></li>
            <li><i>We <b>ought to</b> apologize.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li><b>Nhầm lẫn 'mustn't' và 'don't have to'.</b> Đây là lỗi sai phổ biến và nghiêm trọng nhất.</li>
          <li>Dùng 'must' ở thì quá khứ hoặc tương lai. (❌ <i className="line-through">I musted... / I will must...</i> → Dùng `had to` / `will have to`).</li>
          <li>Quên chia 'have to' theo chủ ngữ. (❌ <i className="line-through">He have to...</i> → `He has to...`).</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>You must finish your homework before you go out.</b> — Bạn phải làm xong bài tập về nhà trước khi đi chơi.</li>
          <li><b>The cat has to eat its food now.</b> — Con mèo phải ăn thức ăn của nó bây giờ.</li>
          <li><b>You mustn't feed the animals at the zoo.</b> — Bạn không được cho động vật trong sở thú ăn.</li>
          <li><b>You don't have to wash the dishes; I'll do it.</b> — Bạn không cần phải rửa bát; tôi sẽ làm.</li>
          <li><b>The dog should get more exercise. It looks tired.</b> — Con chó nên được tập thể dục nhiều hơn. Trông nó mệt mỏi quá.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Chọn đáp án đúng:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>You ______ enter this area. It's restricted. (mustn't / don't have to)</li>
            <li>Tomorrow is a holiday, so we ______ go to school. (mustn't / don't have to)</li>
            <li>I ______ work late last night to finish the project. (must / had to)</li>
            <li>It's a great film. You ______ see it! (should / have to)</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}