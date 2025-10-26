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

export default function CorePrepositionsOfPlace() {
  return (
    <div className="font-[Inter,ui-sans-serif]">
      {/* HERO */}
      <div className="rounded-3xl p-6 md:p-8 border border-black/10 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        📍 <span className="underline decoration-4 decoration-amber-400">GIỚI TỪ CHỈ NƠI CHỐN & PHƯƠNG HƯỚNG</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Học cách sử dụng <b>in, on, at</b> cho vị trí và các giới từ khác như <b>to, into, across</b> để chỉ sự di chuyển.
        </p>

        {/* FORMULA CHIPS */}
        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <FormulaChip label="Không gian kín" formula="in a box, in a country" colors="from-sky-500 via-blue-500 to-indigo-600"/>
          <FormulaChip label="Bề mặt" formula="on the table, on the wall" colors="from-emerald-500 via-lime-500 to-amber-500"/>
          <FormulaChip label="Điểm cụ thể" formula="at the door, at the bus stop" colors="from-red-500 via-rose-500 to-pink-600"/>
          <FormulaChip label="Phương hướng" formula="go to the store" colors="from-indigo-500 via-purple-500 to-pink-500"/>
        </div>

        {/* TOC */}
        <nav className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-50 to-rose-50 border border-rose-200 p-4">
          <div className="font-extrabold text-rose-600 uppercase tracking-wide text-sm mb-2">📑 MỤC LỤC</div>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-inside">
            <li><a className="text-rose-700 hover:underline" href="#pyramid">Kim tự tháp Nơi chốn: IN > ON > AT</a></li>
            <li><a className="text-rose-700 hover:underline" href="#at">Cách dùng "AT" (Điểm)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#on">Cách dùng "ON" (Bề mặt)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#in">Cách dùng "IN" (Không gian)</a></li>
            <li><a className="text-rose-700 hover:underline" href="#movement">Giới từ chỉ Phương hướng</a></li>
            <li><a className="text-rose-700 hover:underline" href="#other">Các giới từ Vị trí khác</a></li>
            <li><a className="text-rose-700 hover:underline" href="#pitfalls">Lỗi thường gặp</a></li>
            <li><a className="text-rose-700 hover:underline" href="#drill">Bài tập nhanh</a></li>
          </ol>
        </nav>
      </div>
      
      <Section id="pyramid" title="Kim tự tháp Nơi chốn: IN > ON > AT" emoji="🔺">
        <p>
            Tương tự như giới từ chỉ thời gian, chúng ta có thể hình dung một kim tự tháp từ tổng quát đến cụ thể.
        </p>
         <div className="mt-3 p-4 bg-gray-50 border rounded-lg text-center font-mono">
            <div className="p-2 bg-indigo-100 border border-indigo-300 rounded-lg"><b>IN</b> (Country, City, Neighborhood)</div>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-indigo-300 mx-auto"></div>
            <div className="p-2 bg-green-100 border border-green-300 rounded-lg mt-1"><b>ON</b> (Street, Avenue, Floor)</div>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-green-300 mx-auto"></div>
             <div className="p-2 bg-red-100 border border-red-300 rounded-lg mt-1"><b>AT</b> (Address, Specific Location)</div>
        </div>
      </Section>

      <Section id="at" title="Cách dùng 'AT' (Điểm cụ thể)" emoji="📍">
        <p>
            <b>AT</b> được dùng cho những vị trí được xem như một điểm (point).
        </p>
        <ul className="list-disc pl-6">
            <li><b>Địa chỉ cụ thể:</b> at 25 Oxford Street</li>
            <li><b>Địa điểm cụ thể:</b> at the bus stop, at the door, at the airport</li>
            <li><b>Sự kiện, nơi chốn chung:</b> at home, at work, at school, at a party</li>
            <li><b>Vị trí trên/dưới/cuối:</b> at the top of the page, at the bottom of the stairs, at the end of the street</li>
        </ul>
      </Section>
      
      <Section id="on" title="Cách dùng 'ON' (Bề mặt)" emoji="🏞️">
        <p>
            <b>ON</b> được dùng cho các bề mặt (surfaces) hoặc các đường thẳng (lines).
        </p>
        <ul className="list-disc pl-6">
            <li><b>Bề mặt:</b> on the table, on the wall, on the floor, on the ceiling</li>
            <li><b>Đường phố, con đường:</b> on Le Duan Street, on the coast, on the river</li>
            <li><b>Tầng của tòa nhà:</b> on the fifth floor</li>
            <li><b>Phương tiện công cộng:</b> on a bus, on a train, on a plane</li>
            <li><b>Phương tiện truyền thông:</b> on the radio, on television (TV), on the internet</li>
        </ul>
      </Section>
      
      <Section id="in" title="Cách dùng 'IN' (Không gian kín)" emoji="📦">
        <p>
            <b>IN</b> được dùng cho các không gian kín (enclosed spaces) hoặc các khu vực địa lý lớn.
        </p>
        <ul className="list-disc pl-6">
            <li><b>Không gian 3 chiều:</b> in a box, in a room, in a building</li>
            <li><b>Phương tiện cá nhân:</b> in a car, in a taxi</li>
            <li><b>Khu vực địa lý lớn:</b> in a city, in a country, in the world (e.g., in Hanoi, in Vietnam)</li>
            <li><b>Văn bản in:</b> in a book, in a newspaper, in a picture</li>
        </ul>
      </Section>
      
      <Section id="movement" title="Giới từ chỉ Phương hướng (Movement)" emoji="➡️">
        <p>
            Các giới từ này mô tả sự di chuyển từ nơi này đến nơi khác.
        </p>
        <ul className="list-disc pl-6">
            <li><b>to:</b> chỉ hướng đến một nơi cụ thể. <i>(e.g., We went <b>to</b> Paris.)</i></li>
            <li><b>into:</b> di chuyển vào bên trong một không gian. <i>(e.g., He walked <b>into</b> the room.)</i></li>
            <li><b>onto:</b> di chuyển lên trên một bề mặt. <i>(e.g., The cat jumped <b>onto</b> the roof.)</i></li>
            <li><b>across:</b> di chuyển từ bên này sang bên kia. <i>(e.g., She swam <b>across</b> the lake.)</i></li>
            <li><b>through:</b> di chuyển xuyên qua. <i>(e.g., They drove <b>through</b> the tunnel.)</i></li>
        </ul>
      </Section>

       <Section id="other" title="Các giới từ Vị trí khác" emoji="🗺️">
        <ul className="list-disc pl-6">
            <li><b>above/below:</b> cao hơn/thấp hơn (không chạm). <i>The plane is flying <b>above</b> the clouds.</i></li>
            <li><b>over/under:</b> ngay trên/ngay dưới (có thể chạm). <i>The bridge is <b>over</b> the river.</i></li>
            <li><b>next to / beside:</b> ngay cạnh. <i>The bank is <b>next to</b> the supermarket.</i></li>
            <li><b>between:</b> ở giữa hai đối tượng. <i>She sat <b>between</b> her two brothers.</i></li>
            <li><b>among:</b> ở giữa một nhóm (từ 3 trở lên). <i>He is popular <b>among</b> his friends.</i></li>
        </ul>
      </Section>

      <Section id="pitfalls" title="Lỗi thường gặp" emoji="⚠️">
        <ol className="list-disc pl-6">
          <li>Nhầm lẫn <b>arrive in</b> (thành phố, quốc gia) và <b>arrive at</b> (tòa nhà, địa điểm cụ thể).</li>
          <li>Dùng sai <b>in a car</b> và <b>on a bus</b>. Mẹo nhớ: "in" cho không gian nhỏ bạn không thể đứng thẳng, "on" cho không gian lớn hơn.</li>
          <li>Nhầm <b>into</b> (chuyển động) với <b>in</b> (vị trí). <i>He is <b>in</b> the room</i> vs. <i>He walks <b>into</b> the room</i>.</li>
        </ol>
      </Section>

      <Section id="drill" title="Bài tập nhanh (Quick Drill)" emoji="🎮">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold">Điền giới từ đúng (at, on, in, to, into) vào chỗ trống:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>The keys are ______ the table ______ the living room.</li>
            <li>I will meet you ______ the cinema ______ 7 p.m.</li>
            <li>She got ______ the car and drove away.</li>
            <li>He lives ______ a small apartment ______ the third floor.</li>
            <li>They are flying ______ New York tomorrow.</li>
          </ol>
        </div>
      </Section>

      <div className="mt-10 text-right">
        <a href="#top" className="text-sm text-blue-600 hover:underline">⬆️ Về đầu trang</a>
      </div>
    </div>
  );
}