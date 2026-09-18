import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: -100, y: -100 });
  const lag  = useRef({ x: -100, y: -100 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const tick = () => {
      d.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      lag.current.x += (pos.current.x - lag.current.x) * 0.1;
      lag.current.y += (pos.current.y - lag.current.y) * 0.1;
      r.style.transform = `translate(${lag.current.x - 18}px, ${lag.current.y - 18}px)`;
      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = () => { r.style.width = "48px"; r.style.height = "48px"; r.style.borderColor = "rgba(183,255,50,0.55)"; };
    const onLeave = () => { r.style.width = "36px"; r.style.height = "36px"; r.style.borderColor = "rgba(183,255,50,0.25)"; };
    const els = document.querySelectorAll("a, button, [role='tab']");
    els.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      els.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%", willChange: "transform" }}
        aria-hidden="true"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(183,255,50,0.25)", willChange: "transform", transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease" }}
        aria-hidden="true"
      />
    </>
  );
}
