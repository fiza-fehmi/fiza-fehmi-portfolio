import { useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { useInView } from "../../hooks/useInView";

/* ── morphing orb ────────────────────────────────────────────── */
function MorphOrb() {
  return (
    <div className="pointer-events-none absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }} aria-hidden="true">
      <div style={{
        width: 600, height: 600,
        background: "radial-gradient(circle at 40% 40%, rgba(162,89,255,0.12) 0%, rgba(108,63,197,0.05) 50%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        animation: "morphOrb 9s ease-in-out infinite",
      }} />
      <style>{`@keyframes morphOrb { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:scale(1)} 25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:scale(1.05)} 50%{border-radius:50% 60% 30% 60%/30% 40% 60% 50%;transform:scale(0.97)} 75%{border-radius:60% 30% 60% 40%/70% 50% 40% 60%;transform:scale(1.03)} }`}</style>
    </div>
  );
}

/* ── field component ─────────────────────────────────────────── */
function Field({ id, name, label, type="text", placeholder, required, rows, triggered, delay, value, onChange }: {
  id: string; name: string; label: string; type?: string; placeholder: string;
  required?: boolean; rows?: number; triggered: boolean; delay: number;
  value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  return (
    <div style={{ opacity: triggered ? 1 : 0, transform: triggered ? "translateY(0)" : "translateY(18px)", transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: 8, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: focused ? "#A259FF" : "rgba(255,255,255,0.25)", transition: "color 0.2s ease" }}>
        {label}
      </label>
      <div style={{ borderRadius: 14, border: `1px solid ${focused ? "rgba(162,89,255,0.5)" : filled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`, background: "rgba(255,255,255,0.025)", boxShadow: focused ? "0 0 0 3px rgba(162,89,255,0.1)" : "none", transition: "all 0.2s ease" }}>
        {rows ? (
          <textarea id={id} name={name} required={required} rows={rows} value={value} placeholder={placeholder}
            style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "12px 16px", fontSize: "0.88rem", color: "white", resize: "none", fontFamily: "Inter, sans-serif" }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={e => onChange(e.target.value)}
          />
        ) : (
          <input id={id} name={name} type={type} required={required} value={value} placeholder={placeholder}
            style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "0 16px", height: 44, fontSize: "0.88rem", color: "white", fontFamily: "Inter, sans-serif" }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={e => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

/* ── success overlay ─────────────────────────────────────────── */
function SuccessOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(5,5,5,0.85)", backdropFilter: "blur(12px)",
      animation: "fadeIn 0.3s ease forwards",
    }}>
      <div style={{ textAlign: "center", animation: "slideReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", border: "2px solid #A259FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 0 40px rgba(162,89,255,0.5)", animation: "glowPulseAccent 1.5s ease-in-out infinite" }}>
          <CheckCircle size={36} color="#A259FF" />
        </div>
        <p style={{ marginTop: "1.5rem", fontFamily: "Sora, sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "white" }}>Opening email client…</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.88rem", color: "rgba(255,255,255,0.4)" }}>Your message is ready to send</p>
      </div>
    </div>
  );
}

export function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body    = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:fzafehmi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="relative divider overflow-hidden" style={{ padding: "8rem 2rem" }} aria-label="Contact">
      <MorphOrb />
      <SuccessOverlay show={sent} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Label */}
        <div style={{ marginBottom: "2.5rem", opacity: 1, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A259FF" }}>04 — Contact</span>
        </div>

        {/* Giant headline */}
        <div style={{ marginBottom: "4rem" }}>
          {["LET'S BUILD", "SOMETHING"].map((line, i) => (
            <div key={line} style={{ overflow: "hidden" }}>
              <span className="font-display font-black" style={{
                display: "inline-block",
                fontSize: "clamp(3rem,8vw,7rem)",
                lineHeight: 0.9,
                color: "white",
                letterSpacing: "-0.02em",
                animation: inView ? `slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
                animationDelay: `${i * 130}ms`,
                opacity: inView ? undefined : 0,
              }}>
                {line}
              </span>
            </div>
          ))}
          <div style={{ overflow: "hidden" }}>
            <span className="font-display font-black v-glow-text" style={{
              display: "inline-block",
              fontSize: "clamp(3rem,8vw,7rem)",
              lineHeight: 0.9,
              color: "#A259FF",
              letterSpacing: "-0.02em",
              animation: inView ? `slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
              animationDelay: "260ms",
              opacity: inView ? undefined : 0,
            }}>
              GOOD.
            </span>
          </div>
          <p style={{ marginTop: "1.5rem", maxWidth: 440, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.35)", opacity: 1, transform: inView ? "none" : "translateY(12px)", transition: "all 0.7s ease 0.5s" }}>
            Have an idea, project or opportunity? Let's turn it into something useful.
          </p>
        </div>

        {/* Two col */}
        <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-20">

          {/* Left info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", opacity: 1, transform: inView ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.1s" }}>
            {/* Email */}
            <a href="mailto:fzafehmi@gmail.com"
              style={{ display: "flex", alignItems: "flex-start", gap: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem", background: "rgba(255,255,255,0.01)", textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(162,89,255,0.3)"; el.style.background = "rgba(162,89,255,0.05)"; el.style.boxShadow = "0 0 28px -10px rgba(162,89,255,0.3)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "rgba(255,255,255,0.01)"; el.style.boxShadow = "none"; }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}><Mail size={16} /></span>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Email</p>
                <p style={{ marginTop: 4, fontSize: "0.88rem", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>fzafehmi@gmail.com</p>
              </div>
            </a>

            {/* Location */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem", background: "rgba(255,255,255,0.01)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(162,89,255,0.2)"; el.style.background = "rgba(162,89,255,0.03)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "rgba(255,255,255,0.01)"; }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}><MapPin size={16} /></span>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Location</p>
                <p style={{ marginTop: 4, fontSize: "0.88rem", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>Bahawalpur, Pakistan</p>
              </div>
            </div>

            {/* CTA */}
            <a href="mailto:fzafehmi@gmail.com"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 999, padding: "14px 28px", background: "#A259FF", color: "#050505", textDecoration: "none", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", boxShadow: "0 0 36px -8px rgba(162,89,255,0.55)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.04)"; el.style.boxShadow = "0 0 56px -8px rgba(162,89,255,0.7)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "0 0 36px -8px rgba(162,89,255,0.55)"; }}
            >
              Get In Touch ↗
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate aria-label="Contact form" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="c-name"  name="name"  label="Your Name" placeholder="Fiza Fehmi"       required value={form.name}    onChange={set("name")}    triggered={inView} delay={300} />
              <Field id="c-email" name="email" label="Email"     placeholder="you@example.com"  required type="email" value={form.email} onChange={set("email")} triggered={inView} delay={420} />
            </div>
            <Field id="c-msg" name="message" label="Message" placeholder="Tell me about your project or idea…" required rows={5} value={form.message} onChange={set("message")} triggered={inView} delay={540} />

            <div style={{ opacity: 1, transform: inView ? "none" : "translateY(16px)", transition: "all 0.5s ease 660ms" }}>
              <button type="submit"
                style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 999, border: "1px solid rgba(162,89,255,0.35)", padding: "14px 28px", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A259FF", background: "transparent", cursor: "pointer", transition: "all 0.25s ease" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#A259FF"; el.style.color = "#050505"; el.style.borderColor = "#A259FF"; el.style.boxShadow = "0 0 24px rgba(162,89,255,0.4)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#A259FF"; el.style.borderColor = "rgba(162,89,255,0.35)"; el.style.boxShadow = "none"; }}
              >
                <Send size={15} />
                Send Message ↗
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
