import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { useInView } from "../../hooks/useInView";

type FieldProps = {
  id: string; name: string; label: string;
  type?: string; placeholder: string; required?: boolean;
  rows?: number; value: string;
  onChange: (v: string) => void;
  error?: string;
};

function Field({ id, name, label, type = "text", placeholder, required, rows, value, onChange, error }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const base = "w-full bg-transparent text-sm outline-none transition-all duration-200 placeholder:text-white/20";
  const borderColor = error ? "#ff4d4d" : focused ? "var(--accent)" : "rgba(255,255,255,0.08)";

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
        style={{ color: focused ? "var(--accent)" : "rgba(255,255,255,0.3)" }}
      >
        {label}{required && <span style={{ color: "var(--accent)" }}> *</span>}
      </label>
      <div
        className="rounded-xl px-4 transition-all duration-200"
        style={{
          border: `1px solid ${borderColor}`,
          background: "rgba(255,255,255,0.025)",
          boxShadow: focused ? `0 0 0 3px rgba(183,255,50,0.08)` : "none",
        }}
      >
        {rows ? (
          <textarea
            id={id} name={name} required={required} rows={rows}
            value={value} placeholder={placeholder}
            className={`${base} resize-none py-3`}
            style={{ color: "var(--fg)" }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={e => onChange(e.target.value)}
          />
        ) : (
          <input
            id={id} name={name} type={type} required={required}
            value={value} placeholder={placeholder}
            className={`${base} h-11`}
            style={{ color: "var(--fg)" }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={e => onChange(e.target.value)}
          />
        )}
      </div>
      {error && <p className="mt-1 text-[11px]" style={{ color: "#ff4d4d" }}>{error}</p>}
    </div>
  );
}

export function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(form.subject || `Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:fzafehmi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="section divider relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(183,255,50,0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "pulseGlow 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="container-xl relative z-10">

        {/* Header */}
        <div
          className="mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}
        >
          <span className="eyebrow">05 — Contact</span>
          <h2
            className="mt-4 font-display font-black leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
          >
            LET'S BUILD<br />
            SOMETHING<br />
            <span style={{ color: "var(--accent)", textShadow: "0 0 60px rgba(183,255,50,0.25)" }}>GOOD.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: "var(--fg2)" }}>
            Have a project in mind? Let's turn the idea into a polished digital experience.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">

          {/* Left — contact info */}
          <div
            className="space-y-8"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.1s" }}
          >
            <div>
              <p className="eyebrow mb-3">Email</p>
              <a
                href="mailto:fzafehmi@gmail.com"
                className="group flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--fg2)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--fg2)"}
              >
                fzafehmi@gmail.com
                <span className="opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "var(--accent)" }}>↗</span>
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Location</p>
              <p className="text-sm" style={{ color: "var(--fg2)" }}>Bahawalpur, Pakistan</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Availability</p>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 6px 2px rgba(183,255,50,0.4)", animation: "pulseGlow 2s ease-in-out infinite" }} />
                <p className="text-sm" style={{ color: "var(--fg2)" }}>Open to freelance & full-time</p>
              </div>
            </div>

            {/* Big CTA */}
            <a
              href="mailto:fzafehmi@gmail.com"
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-[12px] font-bold tracking-[0.14em] uppercase transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "#050505",
                boxShadow: "0 0 40px -10px rgba(183,255,50,0.5)",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px -8px rgba(183,255,50,0.7)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px -10px rgba(183,255,50,0.5)"}
            >
              Get in Touch
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
            aria-label="Contact form"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.2s" }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="c-name"    name="name"    label="Your Name" placeholder="Fiza Fehmi"          required value={form.name}    onChange={set("name")}    error={errors.name} />
              <Field id="c-email"   name="email"   label="Email"     placeholder="you@example.com"      required type="email" value={form.email} onChange={set("email")} error={errors.email} />
            </div>
            <Field id="c-subject" name="subject" label="Subject / Project" placeholder="What's this about?" value={form.subject} onChange={set("subject")} />
            <Field id="c-message" name="message" label="Message" placeholder="Tell me about your project or idea…" required rows={5} value={form.message} onChange={set("message")} error={errors.message} />

            <button
              ref={btnRef}
              type="submit"
              className="group flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{ borderColor: "rgba(183,255,50,0.3)", color: "var(--accent)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "#050505";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(183,255,50,0.3)";
              }}
            >
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              {sent ? "Opening email client…" : "Send Message ↗"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
