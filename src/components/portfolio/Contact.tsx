import { useRef, useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import { useInView } from "../../hooks/useInView";

export function Contact() {
  const { ref, inView } = useInView();
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:fzafehmi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls =
    "w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[#A259FF]/40 focus:bg-white/5";

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 divider overflow-hidden"
      aria-label="Contact"
    >
      {/* Ambient orb */}
      <div
        className="hero-orb pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        style={{ background: "#A259FF" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section label */}
        <div
          className={`mb-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="label-accent">04 — Contact</span>
        </div>

        {/* Giant CTA headline */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-display font-black leading-[0.9] tracking-tight">
            <span className="block text-[clamp(3rem,8vw,7rem)] text-white">
              Let's build
            </span>
            <span className="block text-[clamp(3rem,8vw,7rem)] text-white">
              something{" "}
              <span className="text-[#A259FF] v-glow-text">good.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/35">
            Have an idea, project or opportunity? Let's turn it into something
            useful.
          </p>
        </div>

        {/* Two-col layout: info + form */}
        <div
          className={`grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left — contact info */}
          <div className="space-y-8">
            <a
              href="mailto:fzafehmi@gmail.com"
              className="group flex items-start gap-4 text-white/40 transition-colors duration-300 hover:text-white"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 group-hover:border-[#A259FF]/30 group-hover:text-[#A259FF] transition-all duration-300">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="label text-white/25">Email</p>
                <p className="mt-1 text-sm font-medium">fzafehmi@gmail.com</p>
              </div>
            </a>

            <div className="flex items-start gap-4 text-white/40">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="label text-white/25">Location</p>
                <p className="mt-1 text-sm font-medium">Bahawalpur, Pakistan</p>
              </div>
            </div>

            {/* Big email CTA */}
            <div className="pt-4">
              <a
                href="mailto:fzafehmi@gmail.com"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[#A259FF] px-7 text-sm font-bold text-black transition-all duration-300 hover:scale-105 v-glow"
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label="Contact form"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="label mb-2 block text-white/25">
                  Name
                </label>
                <input
                  id="cf-name"
                  name="name"
                  required
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="cf-email" className="label mb-2 block text-white/25">
                  Email
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label htmlFor="cf-message" className="label mb-2 block text-white/25">
                Message
              </label>
              <textarea
                id="cf-message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project or role…"
                className={`${inputCls} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="group flex h-12 items-center gap-2.5 rounded-full border border-white/10 px-7 text-sm font-bold text-white transition-all duration-300 hover:border-[#A259FF]/50 hover:text-[#A259FF]"
            >
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              {sent ? "Opening email client…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
