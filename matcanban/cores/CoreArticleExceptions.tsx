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

export default function CoreArticleExceptions() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        ✨ <span className="underline decoration-4 decoration-amber-400">MẠO TỪ: CÁC NGOẠI LỆ & TRƯỜNG HỢP ĐẶC BIỆT</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Tổng hợp các trường hợp sử dụng mạo từ đặc biệt và dễ gây nhầm lẫn, giúp bạn nắm vững những quy tắc nâng cao.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Mục đích chính" formula="go to school" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Mục đích khác" formula="go to the school" colors="from-emerald-500 via-lime-500 to-amber-500"/>
           <FormulaChip label="Bệnh thông thường" formula="a cold, a headache" colors="from-indigo-500 via-purple-500 to-pink-500"/>
            <FormulaChip label="Bệnh nói chung" formula="cancer, diabetes" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#institutions">Địa điểm công cộng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#illness">Bệnh tật</a></li>
            <li><a className="text-rose-700 hover:underline" href="#time">Cụm từ chỉ Thời gian</a></li>
            <li><a className="text-rose-700 hover:underline" href="#titles">Chức danh</a></li>
            <li><a className="text-rose-700 hover:underline" href="#man">"Man" với nghĩa "loài người"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="institutions" title="Địa điểm công cộng (school, prison, hospital...)" emoji="🏫">
        <p>
            Quy tắc ở đây phụ thuộc vào <b>mục đích</b> của hành động.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">KHÔNG DÙNG "THE" (Mạo từ Zero)</p>
                <p>Khi nói về việc đến/ở một nơi với <b>mục đích chính</b> của nơi đó.</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><b>go to school/university:</b> để học</li>
                    <li><b>be in hospital:</b> là bệnh nhân</li>
                    <li><b>be in prison:</b> là tù nhân</li>
                    <li><b>go to church:</b> để cầu nguyện</li>
                    <li><b>go to bed:</b> để ngủ</li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">CÓ DÙNG "THE"</p>
                <p>Khi nói về việc đến/ở một nơi như một <b>địa điểm cụ thể</b>, với mục đích khác.</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><b>go to the school:</b> để gặp giáo viên</li>
                    <li><b>be at the hospital:</b> để thăm bệnh nhân</li>
                    <li><b>visit the prison:</b> để tham quan</li>
                    <li><b>admire the church:</b> ngắm kiến trúc nhà thờ</li>
                    <li><b>sit on the bed:</b> ngồi trên giường (không phải ngủ)</li>
                </ul>
            </div>
        </div>
      </Section>

      <Section id="illness" title="Bệnh tật (Illnesses)" emoji="🤒">
        <p>Quy tắc dùng mạo từ với bệnh tật khá phức tạp.</p>
        <ul className="list-disc pl-6 space-y-1">
            <li><b>Dùng "a/an"</b> với các bệnh thông thường: <i><b>a</b> cold, <b>a</b> headache, <b>a</b> sore throat, <b>a</b> fever.</i></li>
            <li><b>Dùng "the"</b> với một số bệnh cụ thể: <i><b>the</b> flu, <b>the</b> measles, <b>the</b> mumps.</i></li>
            <li><b>Không dùng mạo từ (Zero Article)</b> với hầu hết các bệnh nghiêm trọng hoặc tên bệnh nói chung: <i>cancer, diabetes, heart disease, Alzheimer's disease.</i></li>
        </ul>
      </Section>

      <Section id="time" title="Cụm từ chỉ Thời gian" emoji="⏰">
        <p>Một số cụm từ chỉ thời gian có quy tắc cố định:</p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">CÓ DÙNG "THE"</p>
                <ul className="list-disc pl-5 mt-1">
                    <li>in <b>the</b> morning</li>
                    <li>in <b>the</b> afternoon</li>
                    <li>in <b>the</b> evening</li>
                    <li>during <b>the</b> day</li>
                     <li>in <b>the</b> past / in <b>the</b> future</li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">KHÔNG DÙNG "THE"</p>
                <ul className="list-disc pl-5 mt-1">
                     <li>at night</li>
                     <li>at noon / at midnight</li>
                     <li>all day / all night</li>
                     <li>by day / by night</li>
                     <li>last... / next... (last week, next month)</li>
                </ul>
            </div>
        </div>
      </Section>
      
      <Section id="titles" title="Chức danh (Titles)" emoji="👑">
         <ul className="list-disc pl-6">
            <li>Khi nói về một chức danh <b>duy nhất tại một thời điểm</b> trong một tổ chức, ta dùng "the".
                <br/><i>e.g., He was elected <b>the President</b> in 2020. / She is <b>the CEO</b> of the company.</i>
            </li>
            <li>Khi nói về một chức danh như một nghề nghiệp chung chung, ta dùng "a/an".
                 <br/><i>e.g., I want to be <b>a president</b> one day.</i>
            </li>
        </ul>
      </Section>
      
      <Section id="man" title="'Man' với nghĩa 'Loài người'" emoji="👨‍👩‍👧‍👦">
        <p>Khi "man" được dùng để chỉ loài người nói chung, ta không dùng mạo từ.</p>
         <ul className="list-disc pl-6">
            <li><i><b>Man</b> is the only animal that uses fire.</i></li>
            <li><i>This is a great leap for <b>man</b>.</i></li>
         </ul>
         <p className="mt-2 text-sm text-gray-600">Lưu ý: Cách dùng này khá trang trọng và cũ. Trong văn phong hiện đại, người ta thường dùng "humans" hoặc "human beings".</p>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền 'a', 'an', 'the' hoặc không điền gì (∅) vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>My son goes to ______ school by bus, but I have to go to ______ school tomorrow for a parent-teacher meeting.</li>
            <li>I usually wake up early in ______ morning, but I often work late at ______ night.</li>
            <li>I have ______ terrible headache. I think I might be getting ______ flu.</li>
            <li>She was ______ first woman to be elected ______ mayor of the city.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}