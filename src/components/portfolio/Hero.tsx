import { useEffect, useRef, useState } from "react";

const BADGES = ["React", "Node.js", "MongoDB", "Express", "TypeScript"];

/* tiny particle canvas */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const ps = Array.from({ length: 55 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.2+0.3,
      dx: (Math.random()-0.5)*0.2,
      dy: -(Math.random()*0.28+0.07),
      a: Math.random()*0.18+0.04,
    }));
    const tick = () => {
      ctx.clearRect(0,0,W,H);
      for (const p of ps) {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(162,89,255,${p.a})`; ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if (p.y<-4){p.y=H+4;p.x=Math.random()*W;}
        if (p.x<0) p.x=W; if (p.x>W) p.x=0;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />;
}

/* typewriter */
function Typer({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(c => c+1), 65);
    return () => clearTimeout(t);
  }, [n, text]);
  return (
    <>
      {text.slice(0,n)}
      {n < text.length && (
        <span aria-hidden="true" style={{ display:"inline-block", width:2, height:"0.85em", background:"#A259FF", marginLeft:2, verticalAlign:"text-bottom", animation:"blink 0.8s step-end infinite" }} />
      )}
    </>
  );
}

export function Hero() {
  return (
    <section id="home" style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", overflow:"hidden", padding:"6rem 3rem 3rem" }} aria-label="Hero">

      {/* bg orbs */}
      <div aria-hidden="true" style={{ position:"absolute", right:"-5%", top:"8%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(162,89,255,0.15) 0%,transparent 70%)", filter:"blur(100px)", pointerEvents:"none", animation:"driftFloat 18s ease-in-out infinite" }} />
      <div aria-hidden="true" style={{ position:"absolute", left:"-8%", bottom:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(108,63,197,0.1) 0%,transparent 70%)", filter:"blur(100px)", pointerEvents:"none", animation:"driftFloat 22s ease-in-out infinite 6s" }} />

      <Particles />

      {/* floating badges — desktop only */}
      <div aria-hidden="true" className="hidden lg:flex" style={{ position:"absolute", right:32, top:"50%", transform:"translateY(-50%)", flexDirection:"column", gap:12 }}>
        {BADGES.map((b,i) => (
          <div key={b} style={{
            padding:"6px 16px", borderRadius:999, border:"1px solid rgba(255,255,255,0.07)",
            background:"rgba(255,255,255,0.025)", fontFamily:"JetBrains Mono,monospace",
            fontSize:"0.68rem", color:"rgba(255,255,255,0.3)",
            animation: `floatY ${4+i*0.4}s ease-in-out infinite ${i*0.5}s`,
          }}>{b}</div>
        ))}
      </div>

      {/* content */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1100, width:"100%" }}>

        {/* availability */}
        <div style={{ marginBottom:"2rem", animation:"fadeUp 0.6s ease 0.1s both" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, border:"1px solid rgba(162,89,255,0.25)", background:"rgba(162,89,255,0.07)" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#A259FF", animation:"pulseGlow 2s ease-in-out infinite", boxShadow:"0 0 8px rgba(162,89,255,0.6)" }} />
            <span style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#A259FF" }}>Available for Freelance</span>
          </span>
        </div>

        {/* greeting */}
        <p style={{ fontSize:"clamp(1rem,2vw,1.2rem)", color:"rgba(255,255,255,0.45)", marginBottom:"0.75rem", fontFamily:"Inter,sans-serif", animation:"fadeUp 0.6s ease 0.2s both" }}>
          Hi, I'm <strong style={{ color:"white" }}><Typer text="Fiza Fehmi" /></strong> —
        </p>

        {/* headline — each line slides up from overflow:hidden */}
        <h1 style={{ fontFamily:"Sora,sans-serif", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.02em", margin:"0 0 2.5rem" }}>
          {[
            { text:"I BUILD",       delay:"0.3s",  accent:false },
            { text:"DIGITAL",       delay:"0.43s", accent:false },
            { text:"EXPERIENCES.",  delay:"0.56s", accent:true  },
          ].map(({ text, delay, accent }) => (
            <div key={text} style={{ overflow:"hidden" }}>
              <span style={{
                display:"inline-block",
                fontSize:"clamp(2.8rem,9vw,7.5rem)",
                color: accent ? "#A259FF" : "white",
                textShadow: accent ? "0 0 40px rgba(162,89,255,0.35)" : "none",
                animation: `slideReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${delay} both`,
              }}>{text}</span>
            </div>
          ))}
        </h1>

        {/* sub text */}
        <p style={{ maxWidth:420, fontSize:"clamp(0.875rem,1.4vw,1rem)", lineHeight:1.8, color:"rgba(255,255,255,0.4)", fontFamily:"Inter,sans-serif", animation:"fadeUp 0.8s ease 1.0s both" }}>
          Full-stack web developer building modern, responsive websites and applications that are simple, useful and memorable.
        </p>

        {/* accent line */}
        <div style={{ marginTop:"2rem", height:1, borderRadius:999, background:"linear-gradient(90deg,#A259FF,rgba(162,89,255,0.05))", animation:"drawLine 1s ease 1.3s both" }} aria-hidden="true" />

        {/* scroll hint */}
        <div style={{ marginTop:"3rem", display:"flex", alignItems:"center", gap:8, animation:"fadeIn 0.8s ease 1.8s both", opacity:0.4 }}>
          <span style={{ fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"white", fontFamily:"Inter,sans-serif" }}>Scroll to explore</span>
          <span style={{ color:"white", display:"inline-block", animation:"arrowBounce 2s ease-in-out infinite" }}>↓</span>
        </div>
      </div>
    </section>
  );
}
