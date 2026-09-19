import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [
  {
    num:"01", title:"Decoristic",       category:"Frontend / Furniture",
    desc:"Modern, responsive furniture and home décor website with a clean, user-friendly UI.",
    tech:["HTML","CSS","Responsive Design"],
    color:"#C8A97E", bg:"linear-gradient(135deg,#1a1208,#2e2010)",
    live:"https://decoristic-website.vercel.app", github:"https://github.com/fiza-fehmi/decoristic-website",
  },
  {
    num:"02", title:"Feane Fast Food",  category:"Frontend / Restaurant",
    desc:"Responsive fast food restaurant website with menus, offers and online ordering features.",
    tech:["HTML","CSS","JavaScript"],
    color:"#FF6B35", bg:"linear-gradient(135deg,#1a0800,#2e1200)",
    live:"https://feane-fast-food-website.vercel.app", github:"https://github.com/fiza-fehmi/feane-fast-food-website",
  },
  {
    num:"03", title:"Ecommerce Store",  category:"Frontend / E-commerce",
    desc:"Modern e-commerce store with product listings, cart functionality and clean shopping UX.",
    tech:["React.js","Vite","JavaScript"],
    color:"#E91E8C", bg:"linear-gradient(135deg,#1a0010,#2e0020)",
    live:"https://ecommerce-store-1hqv.vercel.app", github:"https://github.com/fiza-fehmi/Ecommerce-Store",
  },
  {
    num:"04", title:"Property Hub",     category:"Frontend / Real Estate",
    desc:"Responsive real estate website showcasing Apartments, Villas, Commercial Spaces and Plots.",
    tech:["HTML","CSS","JavaScript"],
    color:"#2196F3", bg:"linear-gradient(135deg,#000d1a,#001830)",
    live:"https://fiza-fehmi.github.io/Property_Hub/", github:"https://github.com/fiza-fehmi/Property_Hub",
  },
  {
    num:"05", title:"Postage",          category:"Full-Stack / Social",
    desc:"Full-stack social platform with JWT auth, REST APIs, posts, feed and image uploads.",
    tech:["React.js","Node.js","Express.js","MongoDB","JWT","Multer"],
    color:"#5865F2", bg:"linear-gradient(135deg,#0a0a1a,#0d0e2e)",
    live:null, github:"https://github.com/fiza-fehmi",
  },
  {
    num:"06", title:"Coffee Shop",      category:"Frontend / Lifestyle",
    desc:"Modern, responsive coffee shop website with warm aesthetics and a clean menu showcase.",
    tech:["HTML","CSS"],
    color:"#8B5E3C", bg:"linear-gradient(135deg,#120a04,#241408)",
    live:"https://fiza-fehmi.github.io/coffees-website/", github:"https://github.com/fiza-fehmi/coffees-website",
  },
] as const;

type Project = typeof PROJECTS[number];

function MockBrowser({ p, show }: { p: Project; show: boolean }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-0.5)*10;
    const y = ((e.clientY-r.top)/r.height-0.5)*-8;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.01)`;
  };
  const onLeave = () => { if (tiltRef.current) tiltRef.current.style.transform = "none"; };

  return (
    <div ref={tiltRef} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ width:"100%", borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)", background:p.bg, opacity:show?1:0, transform:show?"none":"scale(0.96) translateY(12px)", transition:"all 0.45s ease", willChange:"transform" }}
      aria-label={`${p.title} preview`} role="img"
    >
      {/* browser bar */}
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 14px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ width:10,height:10,borderRadius:"50%",background:"rgba(255,80,80,0.6)" }}/>
        <div style={{ width:10,height:10,borderRadius:"50%",background:"rgba(255,190,0,0.6)" }}/>
        <div style={{ width:10,height:10,borderRadius:"50%",background:"rgba(0,200,80,0.6)" }}/>
        <div style={{ flex:1,marginLeft:8,background:"rgba(255,255,255,0.04)",borderRadius:999,padding:"3px 10px",fontFamily:"JetBrains Mono,monospace",fontSize:"0.62rem",color:"rgba(255,255,255,0.2)",textAlign:"center" }}>
          {p.live ? p.live.replace("https://","") : `${p.title.toLowerCase().replace(/\s/g,"-")}.dev`}
        </div>
      </div>
      {/* mock content */}
      <div style={{ position:"relative", height:280, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
        <div aria-hidden="true" style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:240, height:240, borderRadius:"50%", background:p.color, filter:"blur(80px)", opacity:0.2, animation:"pulseGlow 3s ease-in-out infinite" }} />
        </div>
        <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:280 }}>
          <div style={{ height:24, borderRadius:8, width:"60%", margin:"0 auto 12px", background:`${p.color}22`, overflow:"hidden" }}>
            <div style={{ height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", backgroundSize:"400px 100%", animation:"shimmer 2s linear infinite" }} />
          </div>
          {[100,85,70].map((w,i)=>(
            <div key={i} style={{ height:9, borderRadius:999, marginBottom:8, width:`${w}%`, background:"rgba(255,255,255,0.05)", overflow:"hidden" }}>
              <div style={{ height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)", backgroundSize:"400px 100%", animation:`shimmer ${2+i*0.3}s linear infinite ${i*0.15}s` }} />
            </div>
          ))}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:16 }}>
            {[0,1,2].map(i=>(
              <div key={i} style={{ height:52, borderRadius:10, background:`${p.color}${i===0?"22":"0e"}`, overflow:"hidden", position:"relative" }}>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)", backgroundSize:"400px 100%", animation:`shimmer ${2+i*0.4}s linear infinite ${i*0.2}s` }} />
              </div>
            ))}
          </div>
        </div>
        <span aria-hidden="true" style={{ position:"absolute", bottom:12, right:16, fontFamily:"Sora,sans-serif", fontWeight:900, fontSize:"4.5rem", color:p.color, opacity:0.05, lineHeight:1, userSelect:"none" }}>{p.num}</span>
      </div>
    </div>
  );
}

export function ProjectShowcase() {
  const [idx,      setIdx]      = useState(0);
  const [show,     setShow]     = useState(true);
  const [dir,      setDir]      = useState<1|-1>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const accumRef   = useRef(0);
  const lockRef    = useRef(false);
  const STEP = 130;

  const goTo = useCallback((next: number) => {
    if (lockRef.current || next===idx) return;
    lockRef.current=true;
    setDir(next>idx?1:-1);
    setShow(false);
    setTimeout(()=>{ setIdx(next); setShow(true); lockRef.current=false; },350);
  },[idx]);

  useEffect(()=>{
    const fn=(e:WheelEvent)=>{
      const el=sectionRef.current; if(!el) return;
      const r=el.getBoundingClientRect();
      if(r.top > window.innerHeight*0.6 || r.bottom < window.innerHeight*0.4) return;
      accumRef.current+=e.deltaY;
      if(accumRef.current>STEP){accumRef.current=0;goTo(Math.min(idx+1,PROJECTS.length-1));}
      else if(accumRef.current<-STEP){accumRef.current=0;goTo(Math.max(idx-1,0));}
    };
    window.addEventListener("wheel",fn,{passive:true});
    return ()=>window.removeEventListener("wheel",fn);
  },[idx,goTo]);

  const p = PROJECTS[idx];

  return (
    <section id="projects" ref={sectionRef} style={{ padding:"8rem 3rem", borderTop:"1px solid rgba(255,255,255,0.05)", position:"relative" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem" }}>
          <div>
            <p style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#A259FF", marginBottom:"1rem" }}>02 — Selected Work</p>
            <h2 style={{ fontFamily:"Sora,sans-serif", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.02em", margin:0 }}>
              {["THINGS I'VE","BUILT."].map((line,i)=>(
                <div key={line}><span style={{ display:"block", fontSize:"clamp(2.5rem,6vw,5rem)", color:"white" }}>{line}</span></div>
              ))}
            </h2>
          </div>
          {/* counter + nav */}
          <div style={{ textAlign:"right" }} className="hidden md:block">
            <div style={{ fontFamily:"Sora,sans-serif", fontWeight:900, fontSize:"3.5rem", color:"white", lineHeight:1 }}>
              {String(idx+1).padStart(2,"0")}<span style={{ fontSize:"1.2rem", color:"rgba(255,255,255,0.2)" }}>/{String(PROJECTS.length).padStart(2,"0")}</span>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:12, justifyContent:"flex-end" }}>
              {[{fn:()=>goTo(Math.max(idx-1,0)),dis:idx===0,Icon:ChevronLeft},{fn:()=>goTo(Math.min(idx+1,PROJECTS.length-1)),dis:idx===PROJECTS.length-1,Icon:ChevronRight}].map(({fn,dis,Icon},i)=>(
                <button key={i} onClick={fn} disabled={dis} aria-label={i===0?"Previous":"Next"}
                  style={{ width:36,height:36,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",background:"none",cursor:dis?"default":"pointer",color:dis?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.5)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s" }}
                  onMouseEnter={e=>{if(!dis){const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(162,89,255,0.5)";el.style.color="#A259FF";}}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.1)";el.style.color=dis?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.5)";}}
                ><Icon size={16}/></button>
              ))}
            </div>
          </div>
        </div>

        {/* showcase */}
        <div style={{ display:"grid", gap:"4rem", gridTemplateColumns:"1fr 1.4fr", alignItems:"center" }} className="grid-cols-1 md:grid-cols-[1fr_1.4fr]">

          {/* info panel */}
          <div style={{ opacity:show?1:0, transform:show?"none":`translateX(${dir*-16}px)`, transition:"all 0.4s ease" }}>
            <p style={{ fontFamily:"Sora,sans-serif", fontWeight:900, fontSize:"clamp(5rem,10vw,8rem)", color:"rgba(255,255,255,0.04)", lineHeight:1, margin:0, userSelect:"none" }} aria-hidden="true">{p.num}</p>
            <div style={{ marginTop:"-0.5rem" }}>
              <p style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:8 }}>{p.category}</p>
              <h3 style={{ fontFamily:"Sora,sans-serif", fontWeight:900, fontSize:"clamp(2rem,4vw,3.2rem)", lineHeight:1, color:"white", margin:"0 0 0.5rem" }}>{p.title}</h3>
              {/* color underline */}
              <div style={{ height:2, borderRadius:999, background:`linear-gradient(90deg,${p.color},transparent)`, width:show?"130px":0, transition:"width 0.5s ease 0.2s" }} aria-hidden="true"/>
              <p style={{ fontSize:"0.9rem", lineHeight:1.75, color:"rgba(255,255,255,0.45)", margin:"1rem 0 1.5rem" }}>{p.desc}</p>
              {/* tech */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {p.tech.map((t,i)=>(
                  <span key={t} style={{ borderRadius:999, border:"1px solid rgba(255,255,255,0.07)", padding:"4px 12px", fontFamily:"JetBrains Mono,monospace", fontSize:"0.68rem", color:"rgba(255,255,255,0.35)", opacity:show?1:0, transition:`opacity 0.3s ease ${200+i*50}ms`, cursor:"default" }}>{t}</span>
                ))}
              </div>
              {/* buttons */}
              <div style={{ display:"flex", gap:12, marginTop:"1.75rem", flexWrap:"wrap" }}>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    style={{ display:"inline-flex", alignItems:"center", gap:6, borderRadius:999, padding:"9px 18px", background:p.color, color:"#050505", textDecoration:"none", fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.25s" }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.opacity="0.85"}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.opacity="1"}
                  >Live Site <ArrowUpRight size={13}/></a>
                )}
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:6, borderRadius:999, padding:"9px 18px", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.25s", background:"transparent" }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(162,89,255,0.4)";el.style.color="#A259FF";}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.12)";el.style.color="rgba(255,255,255,0.5)";}}
                >GitHub <ArrowUpRight size={13}/></a>
              </div>
            </div>
          </div>

          {/* browser mock */}
          <MockBrowser p={p} show={show} />
        </div>

        {/* progress + dots */}
        <div style={{ marginTop:"2.5rem" }}>
          <div style={{ display:"flex", gap:6, marginBottom:10 }}>
            {PROJECTS.map((_,i)=>(
              <div key={i} style={{ flex:1, height:1.5, borderRadius:999, overflow:"hidden", background:"rgba(255,255,255,0.08)" }}>
                <div style={{ height:"100%", background: i<=idx?"#A259FF":"transparent", width: i<=idx?"100%":"0%", transition:"width 0.5s ease, background 0.3s" }} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", gap:8 }} role="tablist">
              {PROJECTS.map((pr,i)=>(
                <button key={pr.num} role="tab" aria-selected={i===idx} aria-label={pr.title} onClick={()=>goTo(i)}
                  style={{ height:6, borderRadius:999, border:"none", cursor:"pointer", transition:"all 0.35s ease", width: i===idx?"2rem":"0.4rem", background: i===idx?"#A259FF":"rgba(255,255,255,0.15)", padding:0 }}
                />
              ))}
            </div>
            <span style={{ fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)" }}>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
