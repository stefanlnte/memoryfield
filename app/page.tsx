
"use client";
import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const BRUSHES = ["/ink_splatter_1.png", "/ink_blot_1.png"];

function InkTrails({ trails }: any) {
  return (
    <>
      {trails.map((t: any) => (
        <motion.img
          key={t.id}
          src={BRUSHES[t.brush % BRUSHES.length]}
          initial={{ scale: 1.3, rotate: t.rot, opacity: 1 }}
          animate={{ scale: 0, rotate: t.rot + 120 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute pointer-events-none"
          style={{ left: t.x, top: t.y, width: t.size, height: t.size }}
        />
      ))}
    </>
  );
}

function OrbitingBackground({ mouseX, mouseY, trails }: any) {
  const items = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        type: i % 3 === 0 ? "square" : i % 3 === 1 ? "circle" : "tri",
        left: 2 + Math.random() * 96,
        top: 2 + Math.random() * 90,
        size: 5 + Math.random() * 12,
        rx: 12 + Math.random() * 28,
        ry: 12 + Math.random() * 28,
        rotate: Math.random() * 360,
        parallax: 0.3 + Math.random() * 1.1,
        duration: 7 + Math.random() * 14,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <InkTrails trails={trails} />
      {items.map((it: any) => {
        const px = useTransform(mouseX, (v: number) => v * it.parallax);
        const py = useTransform(mouseY, (v: number) => v * it.parallax);
        return (
          <motion.div key={it.id} className="absolute" style={{ left: `${it.left}%`, top: `${it.top}%`, x: px, y: py }}>
            <motion.div
              animate={{ x: [0, it.rx, 0, -it.rx, 0], y: [0, -it.ry, 0, it.ry, 0], rotate: [it.rotate, it.rotate + 360] }}
              transition={{ duration: it.duration, repeat: Infinity, ease: "linear" }}
            >
              {it.type === "square" && <div className="bg-black" style={{ width: it.size, height: it.size }} />}
              {it.type === "circle" && <div className="bg-black rounded-full" style={{ width: it.size, height: it.size }} />}
              {it.type === "tri" && (
                <div style={{ width: 0, height: 0, borderLeft: `${it.size / 2}px solid transparent`, borderRight: `${it.size / 2}px solid transparent`, borderBottom: `${it.size}px solid black` }} />
              )}
            </motion.div>
          </motion.div>
        );
      })}
      <svg viewBox="0 0 1000 800" className="absolute inset-0 w-full h-full">
        <path d="M 60 90 C 120 10, 220 140, 280 80 S 380 20, 440 90" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 680 120 Q 750 40, 820 110 T 920 90 Q 880 150, 860 180" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M 50 650 C 120 600, 180 720, 250 650 S 340 520, 410 580" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const [hover, setHover] = useState<string | null>(null);
  const [trails, setTrails] = useState<any[]>([]);
  const last = useRef({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
    const dist = Math.hypot(cx - last.current.x, cy - last.current.y);
    if (dist > 10) {
      const id = Math.random();
      const newTrail = { id, x: cx, y: cy, size: 8 + Math.random() * 18, rot: Math.random() * 360, brush: Math.floor(Math.random() * BRUSHES.length) };
      setTrails((prev) => [...prev.slice(-18), newTrail]);
      setTimeout(() => setTrails((prev) => prev.filter((t) => t.id !== id)), 700);
      last.current = { x: cx, y: cy };
    }
  };

  return (
    <section ref={ref} onMouseMove={onMouseMove} className="relative w-full min-h-screen bg-white text-black overflow-hidden flex items-center justify-center select-none cursor-crosshair">
      <OrbitingBackground mouseX={springX} mouseY={springY} trails={trails} />

      <div className="relative w-full max-w-[1100px] aspect-[1000/750] mx-4 z-10">
        <svg viewBox="0 0 1000 800" className="absolute inset-0 w-full h-full">
          <g className="cursor-pointer" onMouseEnter={() => setHover("narrative")} onMouseLeave={() => setHover(null)} onClick={() => router.push("/narrative")}>
            <rect x="70" y="45" width="190" height="190" transform={`rotate(${hover === "narrative" ? 12 : 9} 165 140) scale(${hover === "narrative" ? 1.06 : 1})`} fill="black" />
          </g>
          <g className="cursor-pointer" onMouseEnter={() => setHover("series")} onMouseLeave={() => setHover(null)} onClick={() => router.push("/series")}>
            <circle cx="380" cy="325" r={hover === "series" ? 152 : 145} fill="black" />
          </g>
          <g className="cursor-pointer" onMouseEnter={() => setHover("odds")} onMouseLeave={() => setHover(null)} onClick={() => router.push("/odds")}>
            <path d="M 205 435 L 30 570 L 205 705 Z" fill="black" transform={`rotate(-2 120 570) scale(${hover === "odds" ? 1.08 : 1})`} />
          </g>

          <line x1="262" y1="75" x2="282" y2="165" stroke="black" strokeWidth="4" strokeDasharray="6 8" strokeLinecap="round" />
          <line x1="75" y1="355" x2="125" y2="465" stroke="black" strokeWidth="4" strokeDasharray="6 8" strokeLinecap="round" />
          <line x1="215" y1="530" x2="255" y2="595" stroke="black" strokeWidth="4" strokeDasharray="6 8" strokeLinecap="round" />
          <line x1="210" y1="650" x2="495" y2="595" stroke="black" strokeWidth="7" />
          <line x1="215" y1="685" x2="710" y2="595" stroke="black" strokeWidth="1.5" strokeDasharray="12 8 2 8" />
          <path d="M 405 765 C 430 680, 580 590, 770 585 C 880 582, 965 615, 975 645 C 985 665, 970 685, 935 700 C 820 735, 620 785, 505 795 C 445 800, 405 785, 405 765 Z" fill="black" />
        </svg>

        <div className="absolute top-[6%] left-[29%] flex items-start leading-none cursor-pointer" onMouseEnter={() => setHover("narrative")} onMouseLeave={() => setHover(null)} onClick={() => router.push("/narrative")}>
          <span className="text-[52px] md:text-[64px] font-black tracking-tighter">N</span>
          <span className="text-[18px] md:text-[22px] font-black mt-[8px] ml-[2px]">ARATIVE</span>
        </div>
        <div className="absolute top-[48%] left-[49%] flex items-start leading-none cursor-pointer" onMouseEnter={() => setHover("series")} onMouseLeave={() => setHover(null)} onClick={() => router.push("/series")}>
          <span className="text-[46px] md:text-[58px] font-black tracking-tighter">S</span>
          <span className="text-[18px] md:text-[22px] font-black mt-[8px] ml-[1px]">ERIES</span>
        </div>
        <div className="absolute bottom-[14%] left-[22%] flex items-start leading-none cursor-pointer" onMouseEnter={() => setHover("odds")} onMouseLeave={() => setHover(null)} onClick={() => router.push("/odds")}>
          <span className="text-[46px] md:text-[58px] font-black tracking-tighter">O</span>
          <span className="text-[18px] md:text-[22px] font-black mt-[10px] ml-[1px]">DDS</span>
        </div>

        <div className="absolute bottom-[6%] right-[5%] w-[52%] md:w-[42%] text-white px-10 md:px-16 py-6 flex flex-col gap-1">
          <a href="#about" className="flex gap-3 items-center group">
            <span className="w-[5px] h-[22px] bg-white inline-block group-hover:h-[28px] transition-all" />
            <span className="text-[18px] md:text-[20px] lowercase group-hover:translate-x-1 transition-transform">about me</span>
          </a>
          <a href="#contact" className="text-[18px] md:text-[20px] lowercase ml-[17px] hover:translate-x-1 transition-transform">contact</a>
        </div>
      </div>
    </section>
  );
}
