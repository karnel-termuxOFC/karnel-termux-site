import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Zap,
  Code2,
  Cpu,
  Terminal,
  Brain,
  Rocket,
  Stethoscope,
  Eye,
  Mic,
  Database,
  Puzzle,
  Shield,
  Star,
  ScanSearch,
  Wrench,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import SupportProject from "@/components/SupportProject";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useInView } from "@/hooks/useInView";
import { CATALOG_COUNTS } from "@/data/catalog";
import { ROUTES } from "@/lib/routes";

const iconColors = [
  "text-red-400",
  "text-purple-400",
  "text-orange-400",
  "text-sky-400",
  "text-emerald-400",
  "text-pink-400",
  "text-amber-400",
  "text-indigo-400",
];

const stats = [
  { label: "AI Tools", value: CATALOG_COUNTS.ai },
  { label: "Languages", value: CATALOG_COUNTS.lang },
  { label: "Databases", value: CATALOG_COUNTS.db },
  { label: "Dev Tools", value: CATALOG_COUNTS.dev },
  { label: "Security Tools", value: CATALOG_COUNTS.security },
  { label: "Deploy CLIs", value: CATALOG_COUNTS.deploy },
  {
    label: "Total Packages",
    value:
      CATALOG_COUNTS.ai +
      CATALOG_COUNTS.dev +
      CATALOG_COUNTS.lang +
      CATALOG_COUNTS.db +
      CATALOG_COUNTS.editor +
      CATALOG_COUNTS.npm +
      CATALOG_COUNTS.shell +
      CATALOG_COUNTS.ui +
      CATALOG_COUNTS.games +
      CATALOG_COUNTS.deploy +
      CATALOG_COUNTS.network +
      CATALOG_COUNTS.utils +
      CATALOG_COUNTS.osint +
      CATALOG_COUNTS.auto +
      CATALOG_COUNTS.security,
    suffix: "+",
  },
];

const installOptions = [
  {
    name: "verified release",
    code: `curl -fLO https://github.com/karnel-termuxOFC/karnel-termux/releases/download/v4.17.44/karnel-termux-install.sh
curl -fLO https://github.com/karnel-termuxOFC/karnel-termux/releases/download/v4.17.44/karnel-termux-install.sh.sha256
sha256sum -c karnel-termux-install.sh.sha256
bash karnel-termux-install.sh --ref v4.17.44 --commit 993646aa095b290adc04835c38c98a56ff05c212`,
  },
  { name: "npm", code: "npm install -g karnel-termux" },
  { name: "pnpm", code: "pnpm add -g karnel-termux" },
];

const features = [
  {
    href: ROUTES.karnel,
    icon: <Zap size={22} />,
    title: "Modular Architecture",
    desc: "Install only what you need. No tool conflicts.",
  },
  {
    href: ROUTES.ai,
    icon: <Code2 size={22} />,
    title: `${CATALOG_COUNTS.ai} AI Tools`,
    desc: "Claude, Gemini, OpenCode, Ollama and more. Pre-configured.",
  },
  {
    href: ROUTES.osint,
    icon: <ScanSearch size={22} />,
    title: "Robin OSINT",
    desc: "Lawful dark-web research through Tor with a verified local UI.",
  },
  {
    href: ROUTES.dev,
    icon: <Wrench size={22} />,
    title: `${CATALOG_COUNTS.dev} Dev Tools`,
    desc: "A synchronized toolbox for building, inspecting, and shipping from Termux.",
  },
  {
    href: ROUTES.editor,
    icon: <Terminal size={22} />,
    title: "VS Code Editor",
    desc: "code-server provides VS Code in the browser for Termux.",
  },
  {
    href: ROUTES.linux,
    icon: <Cpu size={22} />,
    title: "Linux Stack",
    desc: "PostgreSQL, MongoDB, Node.js, Python, Go, Rust. Everything you need.",
  },
  {
    href: ROUTES.brain,
    icon: <Brain size={22} />,
    title: "Second Brain",
    desc: "Local memory with keyword/tag search, AI questions, and an idea graph.",
  },
  {
    href: ROUTES.deploy,
    icon: <Rocket size={22} />,
    title: "Direct Deploy",
    desc: "Vercel, Railway, Netlify, Supabase. Deploy from your phone.",
  },
  {
    href: ROUTES.doctor,
    icon: <Stethoscope size={22} />,
    title: "karnel doctor",
    desc: "Diagnose Termux, project code, and Robin from one command.",
  },
  {
    href: ROUTES.show,
    icon: <Eye size={22} />,
    title: "karnel show",
    desc: "View tool documentation that ships with a README without leaving terminal.",
  },
  {
    href: ROUTES.voice,
    icon: <Mic size={22} />,
    title: "karnel voice",
    desc: "Talk to your AI agents. Hands-free coding.",
  },
  {
    href: ROUTES.pg,
    icon: <Database size={22} />,
    title: "karnel pg",
    desc: "Manage PostgreSQL: init, start, stop, shell — one command.",
  },
  {
    href: ROUTES.init,
    icon: <Puzzle size={22} />,
    title: "karnel init",
    desc: "Configure and detect existing Next.js, Express and other projects.",
  },
  {
    href: ROUTES.env,
    icon: <Shield size={22} />,
    title: "karnel env",
    desc: "Manage API keys securely. Never hardcode secrets.",
  },
  {
    href: ROUTES.security,
    icon: <Shield size={22} />,
    title: `Security (${CATALOG_COUNTS.security} tools)`,
    desc: "Nmap, Hydra, SQLMap, Metasploit, Burp, Zap and more.",
  },
  {
    href: ROUTES.plugin,
    icon: <Puzzle size={22} />,
    title: "Plugin System",
    desc: "Extend Karnel with community plugins from GitHub.",
  },
  {
    href: ROUTES.backup,
    icon: <Database size={22} />,
    title: "Backup & Restore",
    desc: "Save configs, packages, tools. Snapshots + cloud sync.",
  },
  {
    href: ROUTES.supabase,
    icon: <Database size={22} />,
    title: "Supabase CLI",
    desc: "PostgreSQL migrations, Edge Functions, types, secrets, branches.",
  },
];

const faqs = [
  {
    q: "Is it free?",
    a: "Yes! Karnel Termux is 100% free and open source (MIT).",
  },
  {
    q: "Requires root?",
    a: "No. Karnel Termux works on any Android with Termux, no root needed.",
  },
  {
    q: "Works on any Android?",
    a: "Yes, Android 11+ recommended. Devices with 4GB+ RAM have better performance.",
  },
  {
    q: "Is Karnel Termux open source?",
    a: "Yes! Karnel Termux is open source. In the future I plan to add ads similar to freebuff, but for now it's supported only through Pix donations.",
  },
  {
    q: "Need internet?",
    a: "Only for installing and updating packages. After installation, most tools work fully offline. Internet is also required if you use AI agents (API calls) or clone remote repositories.",
  },
  {
    q: "Can I use it without Linux knowledge?",
    a: "Yes! Karnel Termux is designed to be simple. Portuguese commands and integrated assistant.",
  },
];

const steps = [
  {
    step: "1",
    title: "Install Termux",
    desc: "Install Termux from GitHub or F-Droid.",
  },
  {
    step: "2",
    title: "Run Installer",
    desc: "Paste the install command and let Karnel configure everything.",
  },
  {
    step: "3",
    title: "Choose Your Tools",
    desc: "Use 'karnel install' to add AI agents, databases, editors and more.",
  },
  {
    step: "4",
    title: "Start Coding",
    desc: "Open code-server, connect to database and build real projects.",
  },
];

function AnimatedStat({
  label,
  value,
  suffix = "",
  delay = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ threshold: 0, once: true });
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(undefined);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(value);
      return;
    }

    const duration = 2000;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value, delay]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-card/50 p-4 text-center transition-all duration-500 hover:border-accent/30 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
    >
      <div className="text-2xl sm:text-3xl font-bold font-mono text-gradient">
        {count}
        {suffix}
      </div>
      <div className="text-xs mt-1 font-medium text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const [installTab, setInstallTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden px-4 py-24">
        <div className="absolute inset-0 bg-[url(/karnel-bg.jpg)] bg-cover bg-center bg-no-repeat opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-cyan-500/5" />
        <div
          className="absolute inset-0 opacity-30 animate-gradient"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.22 15 / 0.1), oklch(0.32 0.18 280 / 0.1), oklch(0.62 0.22 15 / 0.1))",
            backgroundSize: "200% 200%",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-8 animate-float">
              <Zap size={14} />
              Open Source — MIT
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              Your Dev Environment
              <br />
              <span className="text-gradient inline-block animate-gradient">
                In One Command
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={200}>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your Android into a complete development station.
              Install{" "}
              <span className="text-accent font-semibold">
                {CATALOG_COUNTS.ai} AI tools
              </span>
              ,{" "}
              <span className="text-accent font-semibold">
                {CATALOG_COUNTS.lang} languages
              </span>
              , <span className="text-accent font-semibold">5 databases</span>,{" "}
              <span className="text-accent font-semibold">
                {CATALOG_COUNTS.dev} tools
              </span>{" "}
              and{" "}
              <span className="text-accent font-semibold">
                {CATALOG_COUNTS.deploy} deploy CLIs
              </span>{" "}
              — in seconds.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={300}>
            <div className="flex gap-4 justify-center mb-16 flex-wrap">
              <Link
                href={ROUTES.termux}
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href={ROUTES.karnel}
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-105 active:scale-95"
              >
                Explore Docs
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={400}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {stats.map((stat, i) => (
                <AnimatedStat key={stat.label} {...stat} delay={i * 80} />
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pb-8 text-muted-foreground animate-float">
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
      </section>

      <SupportProject />

      {/* Installation */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Install In <span className="text-gradient">One Line</span>
            </h2>
            <p className="text-muted-foreground">
              Requires Termux. The npm and pnpm options also require Node.js.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div
              className="flex justify-center gap-1 mb-6"
              role="group"
              aria-label="Installation method"
            >
              {installOptions.map((opt, i) => (
                <button
                  key={opt.name}
                  onClick={() => setInstallTab(i)}
                  type="button"
                  aria-pressed={installTab === i}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    installTab === i
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>

            <div
              className="animate-fade-in"
              role="region"
              aria-label={`${installOptions[installTab].name} installation command`}
              key={installTab}
            >
              <CodeBlock
                code={installOptions[installTab].code}
                language="bash"
                title={`${installOptions[installTab].name} install`}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-center text-muted-foreground text-sm mt-6">
              Install Termux first, then choose the method available in your
              environment.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Why Developers Choose{" "}
              <span className="text-gradient">Karnel Termux</span>
            </h2>
            <p className="text-muted-foreground">
              Built by developers, for developers coding anywhere.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <AnimatedSection key={i} delay={i * 60} animation="fade-in-up">
                <Link
                  href={feature.href}
                  className="card-hover group block rounded-xl border border-border bg-card/30 p-6"
                >
                  <div
                    className={`mb-3 ${iconColors[i % iconColors.length]} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold font-mono mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground">
              Get your questions answered about Karnel Termux.
            </p>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div
                  className={`rounded-xl border bg-card/50 transition-all duration-300 ${
                    openFaq === i
                      ? "border-accent/30 shadow-lg shadow-accent/5"
                      : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-sm"
                  >
                    <span>{faq.q}</span>
                    <ArrowRight
                      size={14}
                      className={`shrink-0 text-accent transition-transform duration-300 ${
                        openFaq === i ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={500}>
            <div className="text-center mt-12">
              <a
                href="https://github.com/karnel-termuxOFC/karnel-termux"
                target="_blank"
                rel="noopener noreferrer"
                className="star-btn inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base"
              >
                <Star size={20} />
                Star on GitHub
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Quick <span className="text-gradient">Start</span>
            </h2>
            <p className="text-muted-foreground">
              Get coding on your phone in under 5 minutes.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {steps.map((item, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="group flex gap-5 sm:gap-8 items-start rounded-xl border border-border bg-card/30 p-5 transition-all duration-300 hover:border-accent/20 hover:bg-card/50">
                  <div className="relative flex shrink-0 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-md transition-all duration-300 group-hover:blur-lg group-hover:bg-accent/30" />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 border border-accent/30 font-bold text-accent font-mono text-sm">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="text-base font-bold font-mono mb-1 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:flex flex-col items-center self-stretch pt-5">
                      <div className="h-full w-[1px] bg-gradient-to-b from-accent/20 to-transparent" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-card/50 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="scale-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-6">
              <Zap size={14} />
              Start building today
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Ready to Code on Your <span className="text-gradient">Phone</span>
              ?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-muted-foreground mb-10 text-lg">
              Join thousands of developers building real apps with Karnel
              Termux.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/termux"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95 animate-pulse-glow"
              >
                Get Started Now
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href="https://github.com/karnel-termuxOFC/karnel-termux"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-105 active:scale-95"
              >
                View on GitHub
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
