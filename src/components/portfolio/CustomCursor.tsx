import { useEffect, useRef } from "react";

/**
 * Subtle custom cursor — only shown on pointer devices.
 * A small dot that follows with a slight spring delay.
 * Disappears on touch and respects reduced-motion preference.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only activate on pointer-fine devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      // Dot: instant
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      // Ring: lerp toward cursor
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;

      raf.current = requestAnimationFrame(tick);
    };

    // Hover state: expand ring on interactive elements
    const onEnter = () => ringEl.classList.add("cursor-hover");
    const onLeave = () => ringEl.classList.remove("cursor-hover");
    const interactives = document.querySelectorAll("a, button, [role='tab']");
    for (const el of interactives) {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    }

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      for (const el of interactives) {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#B8FF2C] hidden md:block"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-[#B8FF2C]/30 hidden md:block transition-[width,height,border-color] duration-200"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      />
      <style>{`
        .cursor-hover.cursor-ring {
          width: 48px;
          height: 48px;
          border-color: rgba(184,255,44,0.5);
        }
        @media (hover: none) {
          .cursor-ring, [data-dot] { display: none !important; }
        }
      `}</style>
    </>
  );
}
