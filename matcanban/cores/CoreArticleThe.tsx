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

export default function CoreArticleThe() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        🎯 <span className="underline decoration-4 decoration-amber-400">MẠO TỪ XÁC ĐỊNH: THE</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Dùng trước một danh từ (số ít, số nhiều, đếm được, không đếm được) khi cả người nói và người nghe đều biết rõ đối tượng đang được đề cập là ai/cái gì.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Đã nhắc đến" formula="a book → the book" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Duy nhất" formula="the sun, the moon" colors="from-emerald-500 via-lime-500 to-amber-500"/>
           <FormulaChip label="So sánh nhất" formula="the best, the tallest" colors="from-indigo-500 via-purple-500 to-pink-500"/>
            <FormulaChip label="Địa danh" formula="the USA, the Nile" colors="from-rose-500 via-red-500 to-orange-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#use">Khi nào dùng "The"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#specific-cases">Các trường hợp cụ thể</a></li>
            <li><a className="text-rose-700 hover:underline" href="#geography">Dùng với Địa danh</a></li>
            <li><a className="text-rose-700 hover:underline" href="#when-not-to-use">Khi nào KHÔNG dùng "The"</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#examples">Ví dụ (EN–VI)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>

      <Section id="use" title="Khi nào dùng 'The'" emoji="✅">
        <p>
            Quy tắc cốt lõi là dùng <b>"the"</b> khi đối tượng là <b>xác định</b>. Điều này có nghĩa là người nghe/đọc biết chính xác bạn đang nói về cái gì.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Đã được nhắc đến trước đó:</b> <i>I have <b>a</b> cat. <b>The</b> cat is black.</i></li>
            <li><b>Đối tượng là duy nhất:</b> <i><b>The</b> sun is very hot today. <b>The</b> internet has changed the world.</i></li>
            <li><b>Người nghe và người nói đều ngầm hiểu:</b> <i>Can you open <b>the</b> door, please?</i> (cả hai đều biết là cái cửa nào). <i>The cat is in <b>the</b> garden.</i> (khu vườn của nhà chúng ta).</li>
             <li><b>Được làm cho xác định bởi một cụm từ hoặc mệnh đề theo sau:</b> <i><b>The</b> cat <b>on the chair</b> is sleeping.</i></li>
        </ul>
      </Section>

      <Section id="specific-cases" title="Các trường hợp cụ thể khác" emoji="📌">
        <ul className="list-disc pl-6 space-y-2">
            <li><b>So sánh nhất:</b> <i>He is <b>the tallest</b> boy in the class.</i></li>
            <li><b>Số thứ tự:</b> <i>This is <b>the first</b> time I've seen this movie.</i></li>
            <li><b>Nhạc cụ (khi nói về việc chơi nhạc cụ đó):</b> <i>She plays <b>the piano</b> very well.</i></li>
            <li><b>Tên các tờ báo:</b> <i>I read it in <b>The New York Times</b>.</i></li>
            <li><b>Các nhóm người (dưới dạng tính từ):</b> <i>We should help <b>the poor</b> and <b>the homeless</b>.</i></li>
             <li><b>Tên quốc tịch (chỉ toàn bộ dân tộc):</b> <i><b>The French</b> are famous for their cuisine.</i></li>
        </ul>
      </Section>

       <Section id="geography" title="Dùng với Địa danh" emoji="🌍">
        <p>Đây là phần có nhiều quy tắc cần ghi nhớ:</p>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                <p className="font-bold text-green-700">CÓ DÙNG "THE"</p>
                <ul className="list-disc pl-5 mt-1">
                    <li><b>Sông, biển, đại dương:</b> the Nile, the Red Sea, the Pacific Ocean</li>
                    <li><b>Sa mạc:</b> the Sahara, the Gobi</li>
                    <li><b>Dãy núi (số nhiều):</b> the Alps, the Himalayas</li>
                    <li><b>Quần đảo (số nhiều):</b> the Philippines, the Maldives</li>
                     <li><b>Tên quốc gia có chứa từ "Republic", "Kingdom", "States" hoặc ở dạng số nhiều:</b> the USA, the UK, the Netherlands</li>
                </ul>
            </div>
            <div className="rounded-xl p-4 bg-red-50 border border-red-200">
                <p className="font-bold text-red-700">KHÔNG DÙNG "THE"</p>
                <ul className="list-disc pl-5 mt-1">
                     <li><b>Châu lục:</b> Asia, Europe</li>
                     <li><b>Hầu hết các quốc gia:</b> Vietnam, Japan, France</li>
                     <li><b>Thành phố, tiểu bang:</b> Hanoi, California</li>
                     <li><b>Đường phố:</b> Le Duan Street</li>
                     <li><b>Hồ (đơn lẻ):</b> Lake Superior</li>
                     <li><b>Núi (đơn lẻ):</b> Mount Everest</li>
                </ul>
            </div>
        </div>
      </Section>

      <Section id="when-not-to-use" title="Khi nào KHÔNG dùng 'The' (Mạo từ Zero)" emoji="🚫">
        <ul className="list-disc pl-6">
            <li><b>Nói về danh từ chung chung, không xác định (số nhiều hoặc không đếm được):</b>
                <br/><i>e.g., I like <b>music</b>. / <b>Dogs</b> are friendly animals.</i> (So sánh: <i><b>The</b> music they played last night was great.</i>)
            </li>
            <li><b>Các bữa ăn:</b> <i>We have <b>breakfast</b> at 7 a.m.</i></li>
            <li><b>Các môn thể thao, trò chơi:</b> <i>He plays <b>football</b>.</i></li>
            <li><b>Các ngôn ngữ:</b> <i>She speaks <b>English</b> fluently.</i></li>
        </ul>
      </Section>
      
      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-decimal pl-6">
          <li>Dùng "the" với các danh từ chung chung. (❌ <i className="line-through">I love the dogs.</i>)</li>
          <li>Quên "the" trước các danh từ duy nhất hoặc so sánh nhất.</li>
          <li>Sai quy tắc với tên địa danh, đặc biệt là tên quốc gia.</li>
        </ol>
      </Section>

      <Section id="examples" title="Ví dụ (EN–VI)" emoji="📝">
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>The dog that is chasing the cat is big.</b> — Con chó mà đang đuổi theo con mèo thì to.</li>
          <li><b>Can you turn off the light? It's too bright.</b> — Bạn có thể tắt đèn được không? Sáng quá.</li>
          <li><b>Life in the 21st century is very different.</b> — Cuộc sống ở thế kỷ 21 rất khác biệt.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền 'a', 'an', 'the' hoặc không điền gì (∅) vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>I saw ______ interesting film yesterday. ______ film was about ______ space travel.</li>
            <li>She is ______ best student in ______ class.</li>
            <li>We visited ______ Lake Geneva and then climbed ______ Alps.</li>
            <li>I don't like ______ coffee, but ______ coffee you made this morning was delicious.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}