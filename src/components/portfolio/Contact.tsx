import { useRef, useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import { useInView } from "../../hooks/useInView";

/* ── morphing background orb ────────────────────────────────── */
function MorphOrb() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <div
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle at 40% 40%, rgba(162,89,255,0.14) 0%, rgba(108,63,197,0.06) 50%, transparent 70%)",
          filter: "blur(60px)",
          animation: "morphOrb 8s ease-in-out infinite",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
      />
      <style>{`
        @keyframes morphOrb {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1); }
          25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.05); }
          50%       { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; transform: scale(0.97); }
          75%       { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
}

/* ── animated input field ────────────────────────────────────── */
function Field({
  id, name, label, type = "text", placeholder, required, rows, triggered, delay,
}: {
  id: string; name: string; label: string; type?: string;
  placeholder: string; required?: boolean; rows?: number;
  triggered: boolean; delay: number;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const base =
    "w-full rounded-xl border bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/15 outline-none transition-all duration-300";
  const borderCls = focused
    ? "border-[#A259FF]/50"
    : filled
    ? "border-white/15"
    : "border-white/6";
  const shadow = focused ? "0 0 0 3px rgba(162,89,255,0.12)" : "none";

  const sharedProps = {
    id, name, required,
    placeholder,
    className: `${base} ${borderCls} ${rows ? "py-3 resize-none" : "h-11"}`,
    style: { boxShadow: shadow },
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      setFilled(e.target.value.length > 0);
    },
  };

  return (
    <div
      className="transition-all duration-500"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <label
        htmlFor={id}
        className="label mb-2 block transition-colors duration-300"
        style={{ color: focused ? "#A259FF" : "rgba(255,255,255,0.25)" }}
      >
        {label}
      </label>
      {rows ? (
        <textarea rows={rows} {...(sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input type={type} {...(sharedProps as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
}

export function Contact() {
  const { ref, inView } = useInView();
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data    = new FormData(e.currentTarget);
    const name    = String(data.get("name") || "");
    const email   = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body    = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:fzafehmi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 divider overflow-hidden"
      aria-label="Contact"
    >
      <MorphOrb />

      <div className="relative mx-auto max-w-7xl z-10">

        {/* Label */}
        <div
          className="mb-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="label-accent">04 — Contact</span>
        </div>

        {/* Giant headline */}
        <div className="mb-16">
          {["Let's build", "something"].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <span
                className="block font-display font-black text-white text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight"
                style={{
                  display: "inline-block",
                  animation: inView
                    ? `slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards`
                    : "none",
                  animationDelay: `${i * 130}ms`,
                  opacity: inView ? undefined : 0,
                }}
              >
                {line}
              </span>
            </div>
          ))}
          {/* Last word highlighted */}
          <div className="overflow-hidden">
            <span
              className="block font-display font-black text-[#A259FF] v-glow-text text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight"
              style={{
                display: "inline-block",
                animation: inView
                  ? `slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards`
                  : "none",
                animationDelay: "260ms",
                opacity: inView ? undefined : 0,
              }}
            >
              good.
            </span>
          </div>

          <p
            className="mt-6 max-w-md text-[15px] leading-relaxed text-white/35 transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "500ms",
            }}
          >
            Have an idea, project or opportunity? Let's turn it into something useful.
          </p>
        </div>

        {/* Two-col */}
        <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">

          {/* Left — info */}
          <div className="space-y-6">
            {/* Email card */}
            <a
              href="mailto:fzafehmi@gmail.com"
              className="group flex items-start gap-4 rounded-2xl border border-white/6 p-5 transition-all duration-300 hover:border-[#A259FF]/30"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "400ms",
                background: "rgba(255,255,255,0.01)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(162,89,255,0.05)";
                e.currentTarget.style.boxShadow = "0 0 30px -10px rgba(162,89,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 text-white/40 transition-all duration-300 group-hover:border-[#A259FF]/40 group-hover:text-[#A259FF]">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="label text-white/25">Email</p>
                <p className="mt-1 text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
                  fzafehmi@gmail.com
                </p>
              </div>
            </a>

            {/* Location card */}
            <div
              className="flex items-start gap-4 rounded-2xl border border-white/6 p-5"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "520ms",
                background: "rgba(255,255,255,0.01)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 text-white/40">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="label text-white/25">Location</p>
                <p className="mt-1 text-sm font-medium text-white/50">Bahawalpur, Pakistan</p>
              </div>
            </div>

            {/* CTA button */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: "640ms",
              }}
            >
              <a
                href="mailto:fzafehmi@gmail.com"
                className="inline-flex h-12 items-center gap-2.5 rounded-full px-7 text-sm font-bold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #A259FF, #7B3FE4)",
                  boxShadow: "0 0 32px -8px rgba(162,89,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 48px -8px rgba(162,89,255,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 32px -8px rgba(162,89,255,0.5)";
                }}
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="cf-name"    name="name"    label="Name"    placeholder="Your name"        required triggered={inView} delay={450} />
              <Field id="cf-email"   name="email"   label="Email"   placeholder="you@example.com"  required type="email" triggered={inView} delay={550} />
            </div>
            <Field id="cf-message" name="message" label="Message" placeholder="Tell me about your project or role…" required rows={5} triggered={inView} delay={650} />

            <div
              className="transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "750ms",
              }}
            >
              <button
                type="submit"
                className="group flex h-12 items-center gap-2.5 rounded-full border px-7 text-sm font-bold transition-all duration-300"
                style={{
                  borderColor: btnHovered ? "rgba(162,89,255,0.5)" : "rgba(255,255,255,0.1)",
                  color: btnHovered ? "#A259FF" : "white",
                  boxShadow: btnHovered ? "0 0 24px -6px rgba(162,89,255,0.35)" : "none",
                }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                <Send
                  className="h-4 w-4 transition-transform duration-300"
                  style={{ transform: btnHovered ? "translateX(3px)" : "translateX(0)" }}
                />
                {sent ? "Opening email client…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
