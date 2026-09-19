import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: -200, y: -200 });
  const lag  = useRef({ x: -200, y: -200 });
  const raf  = useRef<number>(0);
  const active = useRef(false);

  useEffect(() => {
    /* only on pointer-fine (mouse) devices */
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    /* show cursor elements */
    d.style.display = "block";
    r.style.display = "block";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      /* dot snaps instantly */
      d.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      /* ring lerps */
      lag.current.x += (pos.current.x - lag.current.x) * 0.12;
      lag.current.y += (pos.current.y - lag.current.y) * 0.12;
      r.style.transform = `translate(${lag.current.x - 18}px, ${lag.current.y - 18}px)`;

      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      active.current = true;
      r.style.width  = "44px";
      r.style.height = "44px";
      r.style.borderColor = "rgba(162,89,255,0.55)";
    };
    const onLeave = () => {
      active.current = false;
      r.style.width  = "36px";
      r.style.height = "36px";
      r.style.borderColor = "rgba(162,89,255,0.25)";
    };

    const interactives = document.querySelectorAll("a, button, [role='tab']");
    interactives.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      interactives.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      {/* dot */}
      <div ref={dot} aria-hidden="true" style={{
        display: "none",
        position: "fixed", left: 0, top: 0, zIndex: 9999,
        width: 8, height: 8, borderRadius: "50%", background: "#A259FF",
        pointerEvents: "none", willChange: "transform",
        boxShadow: "0 0 6px rgba(162,89,255,0.7)",
      }} />
      {/* ring */}
      <div ref={ring} aria-hidden="true" style={{
        display: "none",
        position: "fixed", left: 0, top: 0, zIndex: 9998,
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(162,89,255,0.25)",
        pointerEvents: "none", willChange: "transform",
        transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
      }} />
    </>
  );
}
