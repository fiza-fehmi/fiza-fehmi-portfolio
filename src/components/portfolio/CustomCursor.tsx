import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: -200, y: -200 });
  const lag  = useRef({ x: -200, y: -200 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    /* Only activate on mouse devices */
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Make visible */
    d.style.opacity = "1";
    r.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      d.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      lag.current.x += (pos.current.x - lag.current.x) * 0.12;
      lag.current.y += (pos.current.y - lag.current.y) * 0.12;
      r.style.transform = `translate(${lag.current.x - 18}px, ${lag.current.y - 18}px)`;
      raf.current = requestAnimationFrame(tick);
    };

    const expand = () => { r.style.width="44px"; r.style.height="44px"; r.style.borderColor="rgba(162,89,255,0.6)"; r.style.background="rgba(162,89,255,0.06)"; };
    const shrink = () => { r.style.width="36px"; r.style.height="36px"; r.style.borderColor="rgba(162,89,255,0.25)"; r.style.background="transparent"; };

    const els = document.querySelectorAll("a, button, [role='tab']");
    els.forEach(el => { el.addEventListener("mouseenter", expand); el.addEventListener("mouseleave", shrink); });

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      els.forEach(el => { el.removeEventListener("mouseenter", expand); el.removeEventListener("mouseleave", shrink); });
    };
  }, []);

  return (
    <>
      {/* dot */}
      <div ref={dot} aria-hidden="true" style={{
        position:"fixed", left:0, top:0, zIndex:9999,
        width:8, height:8, borderRadius:"50%",
        background:"#A259FF",
        boxShadow:"0 0 8px rgba(162,89,255,0.8)",
        pointerEvents:"none", willChange:"transform",
        opacity:0, transition:"opacity 0.3s",
      }} />
      {/* ring */}
      <div ref={ring} aria-hidden="true" style={{
        position:"fixed", left:0, top:0, zIndex:9998,
        width:36, height:36, borderRadius:"50%",
        border:"1px solid rgba(162,89,255,0.25)",
        pointerEvents:"none", willChange:"transform",
        opacity:0,
        transition:"width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.3s, background 0.2s",
      }} />
    </>
  );
}
