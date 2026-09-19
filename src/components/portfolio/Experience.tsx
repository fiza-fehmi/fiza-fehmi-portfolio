import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { num:"01", period:"2026 — Present", title:"MERN Stack Developer Intern",        org:"AI TechSpine LLC · Remote",   desc:"Building and maintaining web applications with React, Node.js, Express and MongoDB. Implementing JWT auth, authorization and REST APIs.",     skills:["React","Node.js","Express","MongoDB","JWT"] },
  { num:"02", period:"2024 — 2026",    title:"Graphic Design & Brand Marketing",   org:"Freelance",                   desc:"Designing visual identities, digital experiences and marketing materials. Bridging design thinking with frontend development.",             skills:["Figma","Brand Identity","UI/UX","Marketing"] },
  { num:"03", period:"2022 — Present", title:"BS Computer Science",                org:"University · Pakistan",       desc:"Building a foundation in software engineering, web development, data structures and computer science fundamentals.",                     skills:["Algorithms","Data Structures","OOP","Web Dev"] },
];

function useLineProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fn = () => {
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(100, ((window.innerHeight - r.top) / r.height) * 115 - 8));
      setPct(p);
    };
    window.addEventListener("scroll", fn, { passive:true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [ref]);
  return pct;
}

function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); ob.disconnect(); } }, { threshold:0.15 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, [ref]);
  return seen;
}

function Item({ item, index, linePct }: { item:typeof ITEMS[number]; index:number; linePct:number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const seen = useOnScreen(ref as React.RefObject<HTMLElement>);
  const [hovered, setHovered] = useState(false);
  const nodeVisible = linePct > (index / ITEMS.length) * 100 - 8;

  return (
    <div ref={ref}
      style={{
        position:"relative", paddingLeft:"3rem", paddingTop:"2.5rem", paddingBottom:"2.5rem",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        background: hovered ? "rgba(162,89,255,0.03)" : "transparent",
        borderLeft: hovered ? "2px solid rgba(162,89,255,0.2)" : "2px solid transparent",
        opacity: seen ? 1 : 0,
        transform: seen ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.6s ease ${index*100}ms, transform 0.6s ease ${index*100}ms, background 0.3s, border-color 0.3s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* node dot */}
      <div aria-hidden="true" style={{
        position:"absolute", left:-6, top:42,
        width:12, height:12, borderRadius:"50%", background:"#A259FF",
        opacity: nodeVisible ? 1 : 0,
        transform: nodeVisible ? hovered?"scale(1.7)":"scale(1)" : "scale(0)",
        transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered ? "0 0 18px 5px rgba(162,89,255,0.6)" : "0 0 8px 2px rgba(162,89,255,0.4)",
      }} />

      <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"180px 1fr" }} className="md:grid-cols-[180px_1fr]">
        <div>
          <p style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing: hovered?"0.22em":"0.15em", textTransform:"uppercase", color:"#A259FF", opacity:0.85, transition:"letter-spacing 0.3s" }}>{item.num}</p>
          <p style={{ fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginTop:4 }}>{item.period}</p>
        </div>
        <div>
          <h3 style={{ fontFamily:"Sora,sans-serif", fontWeight:700, fontSize:"clamp(1.1rem,2vw,1.35rem)", color: hovered?"white":"rgba(255,255,255,0.9)", transition:"color 0.2s", margin:"0 0 4px" }}>{item.title}</h3>
          <p style={{ fontSize:"0.65rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"0.75rem" }}>{item.org}</p>
          <p style={{ fontSize:"0.88rem", lineHeight:1.75, color: hovered?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.35)", transition:"color 0.3s" }}>{item.desc}</p>
          {/* skills on hover */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, overflow:"hidden", maxHeight: hovered?"60px":0, opacity: hovered?1:0, marginTop: hovered?"1rem":0, transition:"max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s" }}>
            {item.skills.map((s,i)=>(
              <span key={s} style={{ borderRadius:999, border:"1px solid rgba(162,89,255,0.25)", background:"rgba(162,89,255,0.08)", padding:"3px 12px", fontFamily:"JetBrains Mono,monospace", fontSize:"0.68rem", color:"rgba(162,89,255,0.8)", opacity:hovered?1:0, transform:hovered?"none":"translateY(6px)", transition:`opacity 0.3s ease ${i*45}ms, transform 0.3s ease ${i*45}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const linePct = useLineProgress(timelineRef);
  const seen = useOnScreen(sectionRef);

  return (
    <section id="experience" ref={sectionRef} style={{ padding:"8rem 3rem", borderTop:"1px solid rgba(255,255,255,0.05)", position:"relative", overflow:"hidden" }}>
      <div aria-hidden="true" style={{ position:"absolute", left:"-8%", bottom:"5%", width:380, height:380, borderRadius:"50%", background:"rgba(162,89,255,0.07)", filter:"blur(110px)", pointerEvents:"none", animation:"driftFloat 24s ease-in-out infinite 8s" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"4rem", opacity:seen?1:0, transition:"opacity 0.6s ease" }}>
          <p style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#A259FF", marginBottom:"1rem" }}>03 — Experience</p>
          <h2 style={{ fontFamily:"Sora,sans-serif", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.02em", margin:0 }}>
            {["WHERE I'VE","BEEN."].map((line,i)=>(
              <div key={line} style={{ overflow:"hidden" }}>
                <span style={{ display:"inline-block", fontSize:"clamp(2.5rem,5.5vw,5rem)", color:"white", animation:seen?`slideReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${100+i*120}ms both`:"none" }}>{line}</span>
              </div>
            ))}
          </h2>
        </div>

        <div style={{ position:"relative" }} ref={timelineRef}>
          {/* ghost line */}
          <div aria-hidden="true" style={{ position:"absolute", left:0, top:0, width:1, height:"100%", background:"rgba(255,255,255,0.04)" }} />
          {/* growing line */}
          <div aria-hidden="true" style={{ position:"absolute", left:0, top:0, width:1, height:`${linePct}%`, background:"linear-gradient(to bottom,#A259FF,rgba(162,89,255,0.1))", transition:"height 0.1s linear", boxShadow:"0 0 8px rgba(162,89,255,0.4)" }} />
          {/* traveling dot */}
          {linePct > 2 && linePct < 99 && (
            <div aria-hidden="true" style={{ position:"absolute", left:-4, width:9, height:9, borderRadius:"50%", background:"#A259FF", top:`${linePct}%`, boxShadow:"0 0 14px 4px rgba(162,89,255,0.7)", transition:"top 0.1s linear", pointerEvents:"none" }} />
          )}
          {ITEMS.map((item,i) => <Item key={item.num} item={item} index={i} linePct={linePct} />)}
        </div>
      </div>
    </section>
  );
}
