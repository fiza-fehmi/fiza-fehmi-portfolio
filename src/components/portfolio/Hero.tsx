import { useEffect, useRef, useState } from "react";

const WORDS = [
  { text: "I BUILD",      accent: false },
  { text: "DIGITAL",      accent: false },
  { text: "EXPERIENCES.", accent: true  },
];
const BADGES = ["React", "Node.js", "MongoDB", "Express", "TypeScript"];
const NAME = "Fiza Fehmi";

function Orbs() {
  return (
    <>
      <div style={{ position:"absolute", right:"-5%", top:"10%", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,#A259FF 0%,transparent 70%)", filter:"blur(130px)", pointerEvents:"none", opacity:0.08, animation:"driftFloat 18s ease-in-out infinite" }} aria-hidden="true" />
      <div style={{ position:"absolute", left:"-8%", bottom:"15%", width:450, height:450, borderRadius:"50%", background:"radial-gradient(circle,#6C3FC5 0%,transparent 70%)", filter:"blur(130px)", pointerEvents:"none", opacity:0.06, animation:"driftFloat 22s ease-in-out infinite 6s" }} aria-hidden="true" />
    </>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.3+0.3, dx: (Math.random()-0.5)*0.2, dy:-(Math.random()*0.3+0.08),
      alpha: Math.random()*0.2+0.04,
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0,0,W,H);
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(162,89,255,${p.alpha})`; ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if (p.y<-4){p.y=H+4;p.x=Math.random()*W;}
        if (p.x<0) p.x=W; if (p.x>W) p.x=0;
      }
      raf=requestAnimationFrame(draw);
    }
    draw();
    return ()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none" }} aria-hidden="true" />;
}

function TypewriterName() {
  const [count, setCount] = useState(0);
  useEffect(()=>{
    if (count>=NAME.length) return;
    const t=setTimeout(()=>setCount(c=>c+1),65);
    return ()=>clearTimeout(t);
  },[count]);
  return (
    <span style={{color:"white",fontWeight:700}}>
      {NAME.slice(0,count)}
      {count<NAME.length && <span style={{display:"inline-block",width:2,height:"0.85em",background:"#A259FF",marginLeft:2,verticalAlign:"text-bottom",animation:"blink 0.8s step-end infinite"}} aria-hidden="true"/>}
    </span>
  );
}

export function Hero() {
  return (
    <>
      <style>{`
        .hero-badge   { animation: fadeUp 0.6s ease 0.1s both; }
        .hero-greet   { animation: fadeUp 0.6s ease 0.2s both; }
        .hero-word-0  { animation: slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .hero-word-1  { animation: slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) 0.43s both; }
        .hero-word-2  { animation: slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) 0.56s both; }
        .hero-sub     { animation: fadeUp 0.8s ease 1.1s both; }
        .hero-line    { animation: drawLine 1s ease 1.3s both; }
        .hero-scroll  { animation: fadeIn 0.8s ease 1.8s both; }
        .hero-badge-0 { animation: fadeUp 0.5s ease 0.9s both; }
        .hero-badge-1 { animation: fadeUp 0.5s ease 0.98s both; }
        .hero-badge-2 { animation: fadeUp 0.5s ease 1.06s both; }
        .hero-badge-3 { animation: fadeUp 0.5s ease 1.14s both; }
        .hero-badge-4 { animation: fadeUp 0.5s ease 1.22s both; }
        @keyframes drawLine { from{width:0} to{width:280px} }
      `}</style>

      <section id="home" style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", overflow:"hidden", padding:"0 2rem" }} aria-label="Hero">
        <Orbs />
        <ParticleCanvas />

        {/* Floating badges */}
        <div style={{ position:"absolute", right:24, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:12 }} className="hidden lg:flex">
          {BADGES.map((b,i)=>(
            <div key={b} className={`hero-badge-${i}`} style={{
              borderRadius:999, border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.03)",
              padding:"6px 16px", fontSize:"0.7rem", fontFamily:"JetBrains Mono,monospace", color:"rgba(255,255,255,0.3)",
              animation:`floatY ${4+i*0.5}s ease-in-out infinite ${i*0.6}s`,
              transition:"all 0.2s ease",
            }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(162,89,255,0.4)";el.style.color="#A259FF";}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.08)";el.style.color="rgba(255,255,255,0.3)";}}
            >{b}</div>
          ))}
        </div>

        <div style={{ position:"relative", zIndex:1, maxWidth:1200, width:"100%" }}>

          {/* Badge */}
          <div className="hero-badge" style={{ marginBottom:"2.5rem" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:8, borderRadius:999, border:"1px solid rgba(162,89,255,0.2)", background:"rgba(162,89,255,0.06)", padding:"6px 16px" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#A259FF", boxShadow:"0 0 8px 2px rgba(162,89,255,0.5)", animation:"pulseGlow 2s ease-in-out infinite" }} />
              <span style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#A259FF" }}>Available for Freelance Projects</span>
            </span>
          </div>

          {/* Greeting */}
          <div className="hero-greet" style={{ marginBottom:"0.75rem" }}>
            <p style={{ fontSize:"clamp(1rem,2vw,1.25rem)", color:"rgba(255,255,255,0.4)", fontWeight:400, fontFamily:"Inter,sans-serif" }}>
              Hi, I'm <TypewriterName /> —
            </p>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:"Sora,sans-serif", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.02em", margin:0 }} aria-label="I build digital experiences">
            {WORDS.map((word,i)=>(
              <div key={word.text} style={{ overflow:"hidden" }}>
                <span className={`hero-word-${i}`} style={{
                  display:"inline-block",
                  fontSize:"clamp(3rem,9vw,8rem)",
                  color: word.accent ? "#A259FF" : "white",
                  filter: word.accent ? "drop-shadow(0 0 30px rgba(162,89,255,0.4))" : "none",
                }}>
                  {word.text}
                </span>
              </div>
            ))}
          </h1>

          {/* Sub */}
          <p className="hero-sub" style={{ marginTop:"2.5rem", maxWidth:420, fontSize:"clamp(0.875rem,1.5vw,1rem)", lineHeight:1.75, color:"rgba(255,255,255,0.35)", fontFamily:"Inter,sans-serif" }}>
            Full-stack web developer building modern, responsive websites and web applications that are simple, useful and memorable.
          </p>

          {/* Line */}
          <div className="hero-line" style={{ marginTop:"2rem", height:1, borderRadius:999, background:"linear-gradient(90deg,#A259FF 0%,rgba(162,89,255,0.1) 60%,transparent 100%)" }} aria-hidden="true" />

          {/* Scroll */}
          <div className="hero-scroll" style={{ marginTop:"3rem", display:"flex", alignItems:"center", gap:10, opacity:0.35 }}>
            <span style={{ fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"white", fontFamily:"Inter,sans-serif" }}>Scroll to explore</span>
            <span style={{ color:"white", animation:"arrowBounce 2s ease-in-out infinite", display:"inline-block" }}>↓</span>
          </div>
        </div>
      </section>
    </>
  );
}
