import { useEffect, useRef, useState } from "react";

const TECH = ["React","Node.js","Express","MongoDB","Mongoose","JWT","Tailwind CSS","JavaScript","REST APIs","Git"];

function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); ob.disconnect(); } }, { threshold: 0.1 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, [ref]);
  return seen;
}

function Counter({ to, suffix="" }: { to:number; suffix?:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const [pop, setPop] = useState(false);
  const seen = useOnScreen(ref as React.RefObject<HTMLElement>);
  useEffect(() => {
    if (!seen) return;
    let n=0; const step=Math.ceil(to/38);
    const id = setInterval(() => {
      n+=step; if(n>=to){setV(to);clearInterval(id);setPop(true);setTimeout(()=>setPop(false),400);}
      else setV(n);
    },28);
    return ()=>clearInterval(id);
  },[seen,to]);
  return <span ref={ref} style={{ display:"inline-block", animation: pop?"scalePop 0.4s ease":undefined }}>{v}{suffix}</span>;
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const seen = useOnScreen(ref);

  return (
    <section id="about" ref={ref} style={{ padding:"8rem 3rem", borderTop:"1px solid rgba(255,255,255,0.05)", position:"relative", overflow:"hidden" }}>
      {/* bg orb */}
      <div aria-hidden="true" style={{ position:"absolute", right:"-10%", top:"30%", width:500, height:500, borderRadius:"50%", background:"rgba(162,89,255,0.08)", filter:"blur(120px)", pointerEvents:"none", animation:"driftFloat 20s ease-in-out infinite" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* label */}
        <p style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#A259FF", marginBottom:"4rem", opacity: seen?1:0, transition:"opacity 0.5s ease", }}>01 — About Me</p>

        <div style={{ display:"grid", gap:"4rem", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", alignItems:"start" }}>

          {/* Left headline */}
          <div style={{ opacity: seen?1:0, transform: seen?"none":"translateX(-20px)", transition:"all 0.7s ease" }}>
            <h2 style={{ fontFamily:"Sora,sans-serif", fontWeight:900, lineHeight:0.92, letterSpacing:"-0.02em", margin:"0 0 2rem" }}>
              {["I BUILD","WEBSITES","THAT FEEL","ALIVE."].map((w,i) => (
                <div key={w} style={{ overflow:"hidden" }}>
                  <span style={{
                    display:"inline-block",
                    fontSize:"clamp(2.5rem,5.5vw,5rem)",
                    color: w==="ALIVE." ? "#A259FF" : "white",
                    textShadow: w==="ALIVE." ? "0 0 30px rgba(162,89,255,0.4)" : "none",
                    animation: seen ? `slideReveal 0.65s cubic-bezier(0.16,1,0.3,1) ${i*100}ms both` : "none",
                  }}>{w}</span>
                </div>
              ))}
            </h2>
            {/* accent line */}
            <div style={{ height:1, background:"linear-gradient(90deg,#A259FF,transparent)", width: seen?"200px":0, transition:"width 1s ease 0.5s" }} aria-hidden="true" />
          </div>

          {/* Right bio */}
          <div style={{ opacity: seen?1:0, transform: seen?"none":"translateX(20px)", transition:"all 0.7s ease 0.15s" }}>
            <p style={{ fontSize:"clamp(0.95rem,1.5vw,1.05rem)", lineHeight:1.8, color:"rgba(255,255,255,0.55)", marginBottom:"1.2rem" }}>
              I'm a full-stack web developer who enjoys turning ideas into clean, interactive and useful digital products.
            </p>
            <p style={{ fontSize:"0.9rem", lineHeight:1.8, color:"rgba(255,255,255,0.35)" }}>
              I work with React, Node.js, Express, MongoDB and modern JavaScript to build responsive interfaces and secure, scalable APIs.
            </p>

            {/* marquee */}
            <div style={{ position:"relative", marginTop:"2.5rem", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:0, top:0, height:"100%", width:48, background:"linear-gradient(to right,#050505,transparent)", zIndex:1, pointerEvents:"none" }} />
              <div style={{ position:"absolute", right:0, top:0, height:"100%", width:48, background:"linear-gradient(to left,#050505,transparent)", zIndex:1, pointerEvents:"none" }} />
              <div style={{ display:"flex", gap:10, width:"max-content", animation: seen?"marqueeScroll 18s linear infinite":"none" }}>
                {[...TECH,...TECH].map((t,i) => (
                  <span key={i} style={{ flexShrink:0, borderRadius:999, border:"1px solid rgba(255,255,255,0.07)", padding:"5px 14px", fontFamily:"JetBrains Mono,monospace", fontSize:"0.68rem", color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap", cursor:"default", transition:"all 0.2s" }}
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(162,89,255,0.4)";el.style.color="#A259FF";}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.07)";el.style.color="rgba(255,255,255,0.35)";}}
                  >{t}</span>
                ))}
              </div>
            </div>

            {/* stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem", marginTop:"2.5rem" }}>
              {[{v:5,s:"+",l:"Projects"},{v:1,s:"+",l:"Year Exp."},{v:99,s:"%",l:"Coffee"}].map(({v,s,l},i)=>(
                <div key={l}
                  style={{ borderRadius:14, border:"1px solid rgba(255,255,255,0.06)", padding:"1.25rem", background:"rgba(255,255,255,0.02)", transition:"all 0.3s ease", cursor:"default", opacity:seen?1:0, transitionDelay:`${400+i*120}ms` }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(162,89,255,0.3)";el.style.background="rgba(162,89,255,0.06)";el.style.transform="translateY(-5px)";el.style.boxShadow="0 0 24px rgba(162,89,255,0.2)";}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.06)";el.style.background="rgba(255,255,255,0.02)";el.style.transform="none";el.style.boxShadow="none";}}
                >
                  <p style={{ fontFamily:"Sora,sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.5rem)", fontWeight:900, color: l==="Coffee"?"#A259FF":"white", margin:0 }}><Counter to={v} suffix={s}/></p>
                  <p style={{ fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginTop:6 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
