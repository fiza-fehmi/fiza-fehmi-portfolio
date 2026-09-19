import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); ob.disconnect(); } }, { threshold:0.08 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, [ref]);
  return seen;
}

function Field({ id, name, label, type="text", placeholder, required, rows, delay }: {
  id:string; name:string; label:string; type?:string; placeholder:string;
  required?:boolean; rows?:number; delay:number;
}) {
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled]  = useState(false);
  const border = focused ? "rgba(162,89,255,0.5)" : filled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)";
  const shadow = focused ? "0 0 0 3px rgba(162,89,255,0.1)" : "none";
  const base   = { width:"100%", background:"transparent", border:"none", outline:"none", fontFamily:"Inter,sans-serif", fontSize:"0.9rem", color:"white" } as const;

  return (
    <div style={{ animation:`fadeUp 0.5s ease ${delay}ms both` }}>
      <label htmlFor={id} style={{ display:"block", marginBottom:8, fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color: focused ? "#A259FF" : "rgba(255,255,255,0.3)", transition:"color 0.2s" }}>{label}</label>
      <div style={{ borderRadius:12, border:`1px solid ${border}`, background:"rgba(255,255,255,0.025)", boxShadow:shadow, transition:"all 0.2s" }}>
        {rows
          ? <textarea id={id} name={name} required={required} rows={rows} placeholder={placeholder} style={{ ...base, padding:"12px 16px", resize:"none", display:"block" }} onFocus={()=>setFocused(true)} onBlur={e=>{setFocused(false);setFilled(e.target.value.length>0);}} />
          : <input    id={id} name={name} type={type} required={required} placeholder={placeholder} style={{ ...base, padding:"0 16px", height:44, display:"block" }} onFocus={()=>setFocused(true)} onBlur={e=>{setFocused(false);setFilled(e.target.value.length>0);}} />
        }
      </div>
    </div>
  );
}

export function Contact() {
  const ref  = useRef<HTMLElement>(null);
  const seen = useOnScreen(ref);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name    = String(d.get("name")||"");
    const email   = String(d.get("email")||"");
    const message = String(d.get("message")||"");
    const sub  = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:fzafehmi@gmail.com?subject=${sub}&body=${body}`;
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(()=>setSent(false),5000);
  };

  return (
    <section id="contact" ref={ref} style={{ padding:"8rem 3rem", borderTop:"1px solid rgba(255,255,255,0.05)", position:"relative", overflow:"hidden" }}>
      {/* morphing orb */}
      <div aria-hidden="true" style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:600, height:600, background:"radial-gradient(circle at 40% 40%,rgba(162,89,255,0.1) 0%,transparent 65%)", filter:"blur(60px)", borderRadius:"60% 40% 30% 70% / 60% 30% 70% 40%", pointerEvents:"none", animation:"morphOrb 9s ease-in-out infinite" }}>
        <style>{`@keyframes morphOrb{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/30% 40% 60% 50%}75%{border-radius:60% 30% 60% 40%/70% 50% 40% 60%}}`}</style>
      </div>

      {/* success overlay */}
      {sent && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(5,5,5,0.88)", backdropFilter:"blur(12px)", animation:"fadeIn 0.3s ease both" }}>
          <div style={{ textAlign:"center", animation:"fadeUp 0.5s ease both" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", border:"2px solid #A259FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", boxShadow:"0 0 40px rgba(162,89,255,0.5)" }}>
              <CheckCircle size={36} color="#A259FF" />
            </div>
            <p style={{ marginTop:"1.5rem", fontFamily:"Sora,sans-serif", fontSize:"1.4rem", fontWeight:800, color:"white" }}>Opening email client…</p>
            <p style={{ marginTop:"0.5rem", fontSize:"0.88rem", color:"rgba(255,255,255,0.4)" }}>Your message is ready to send</p>
          </div>
        </div>
      )}

      <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
        <p style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#A259FF", marginBottom:"2.5rem", opacity:seen?1:0, transition:"opacity 0.5s" }}>04 — Contact</p>

        {/* headline */}
        <div style={{ marginBottom:"4rem" }}>
          {["LET'S BUILD","SOMETHING"].map((line,i)=>(
            <div key={line} style={{ overflow:"hidden" }}>
              <span style={{ display:"inline-block", fontFamily:"Sora,sans-serif", fontWeight:900, fontSize:"clamp(3rem,8vw,7rem)", lineHeight:0.9, letterSpacing:"-0.02em", color:"white", animation:seen?`slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) ${i*130}ms both`:"none" }}>{line}</span>
            </div>
          ))}
          <div style={{ overflow:"hidden" }}>
            <span style={{ display:"inline-block", fontFamily:"Sora,sans-serif", fontWeight:900, fontSize:"clamp(3rem,8vw,7rem)", lineHeight:0.9, letterSpacing:"-0.02em", color:"#A259FF", textShadow:"0 0 40px rgba(162,89,255,0.35)", animation:seen?`slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) 260ms both`:"none" }}>GOOD.</span>
          </div>
          <p style={{ marginTop:"1.5rem", maxWidth:440, fontSize:"0.95rem", lineHeight:1.8, color:"rgba(255,255,255,0.4)", opacity:seen?1:0, transition:"opacity 0.7s ease 0.5s" }}>Have an idea, project or opportunity? Let's turn it into something useful.</p>
        </div>

        <div style={{ display:"grid", gap:"3rem", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", alignItems:"start" }}>

          {/* info */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem", animation:seen?"fadeUp 0.7s ease 0.1s both":"none" }}>
            <a href="mailto:fzafehmi@gmail.com"
              style={{ display:"flex", alignItems:"flex-start", gap:14, borderRadius:14, border:"1px solid rgba(255,255,255,0.06)", padding:"1.1rem", background:"rgba(255,255,255,0.01)", textDecoration:"none", transition:"all 0.3s" }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(162,89,255,0.3)";el.style.background="rgba(162,89,255,0.05)";el.style.boxShadow="0 0 24px rgba(162,89,255,0.15)";}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.06)";el.style.background="rgba(255,255,255,0.01)";el.style.boxShadow="none";}}
            >
              <span style={{ display:"flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:10,border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",flexShrink:0 }}><Mail size={15}/></span>
              <div><p style={{ fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:4 }}>Email</p><p style={{ fontSize:"0.88rem",fontWeight:500,color:"rgba(255,255,255,0.6)" }}>fzafehmi@gmail.com</p></div>
            </a>

            <div style={{ display:"flex", alignItems:"flex-start", gap:14, borderRadius:14, border:"1px solid rgba(255,255,255,0.06)", padding:"1.1rem", background:"rgba(255,255,255,0.01)" }}>
              <span style={{ display:"flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:10,border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",flexShrink:0 }}><MapPin size={15}/></span>
              <div><p style={{ fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:4 }}>Location</p><p style={{ fontSize:"0.88rem",fontWeight:500,color:"rgba(255,255,255,0.5)" }}>Bahawalpur, Pakistan</p></div>
            </div>

            <a href="mailto:fzafehmi@gmail.com"
              style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,borderRadius:999,padding:"13px 24px",background:"#A259FF",color:"#050505",textDecoration:"none",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",boxShadow:"0 0 32px rgba(162,89,255,0.45)",transition:"all 0.3s" }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1.04)";el.style.boxShadow="0 0 50px rgba(162,89,255,0.65)";}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="none";el.style.boxShadow="0 0 32px rgba(162,89,255,0.45)";}}
            >Get In Touch ↗</a>
          </div>

          {/* form */}
          <form onSubmit={onSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"1fr 1fr" }}>
              <Field id="fn" name="name"    label="Your Name" placeholder="Fiza Fehmi"      required delay={seen?300:9999} />
              <Field id="fe" name="email"   label="Email"     placeholder="you@example.com" required type="email" delay={seen?420:9999} />
            </div>
            <Field id="fm" name="message" label="Message" placeholder="Tell me about your project or idea…" required rows={5} delay={seen?540:9999} />
            <div style={{ animation:seen?`fadeUp 0.5s ease 660ms both`:"none" }}>
              <button type="submit"
                style={{ display:"flex",alignItems:"center",gap:10,borderRadius:999,border:"1px solid rgba(162,89,255,0.4)",padding:"13px 24px",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A259FF",background:"transparent",cursor:"pointer",transition:"all 0.25s" }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="#A259FF";el.style.color="#050505";el.style.boxShadow="0 0 20px rgba(162,89,255,0.4)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.color="#A259FF";el.style.boxShadow="none";}}
              ><Send size={14}/> Send Message ↗</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
