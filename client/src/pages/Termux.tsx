import { Check, X, Lock, Zap, Shield, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CATALOG_COUNTS } from "@/data/catalog";

const features = [
  {
    icon: <Lock size={28} />,
    title: "Secure",
    desc: "Isolated Linux environment with built-in security features",
  },
  {
    icon: <Zap size={28} />,
    title: "Fast",
    desc: "Lightweight terminal that works perfectly on any Android",
  },
  {
    icon: <Shield size={28} />,
    title: "Powerful",
    desc: "Access to a full Linux shell with package manager",
  },
  {
    icon: <Wrench size={28} />,
    title: "Flexible",
    desc: "Install Python, Node.js, Git and thousands of other packages",
  },
];

const comparisons = [
  { feature: "One-command setup", termux: false },
  { feature: "Module system & CLI framework", termux: false },
  {
    feature: `${CATALOG_COUNTS.ai} pre-configured AI agents`,
    termux: false,
  },
  { feature: "code-server (VS Code in browser)", termux: false },
  { feature: "ZSH + plugins + persistent memory", termux: false },
  { feature: "Direct deploy (Vercel, Railway, Netlify)", termux: false },
  { feature: "Built-in voice assistant", termux: false },
  { feature: "Managed PostgreSQL (karnel pg)", termux: false },
  { feature: "Automatic diagnostics (karnel doctor)", termux: false },
  { feature: "Secrets management (karnel env)", termux: false },
  { feature: "Multi-language (Python, Node, Go, Rust)", termux: false },
  { feature: "Git + GitHub CLI pre-configured", termux: false },
  { feature: "Centralized update mechanism", termux: false },
  { feature: "Second brain (karnel brain)", termux: false },
  { feature: "Project initialization (karnel init)", termux: false },
  { feature: "Environment configured in seconds", termux: false },
  { feature: "Environment variable management", termux: false },
  { feature: "Interactive documentation (karnel show)", termux: false },
];

export default function Termux() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Termux</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Termux is a Linux terminal emulator for Android that provides a
            secure and lightweight environment to run command-line programs. It
            transforms your Android device into a powerful development
            workstation.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex gap-4 mb-12">
            <a
              href="https://github.com/termux/termux-app/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95"
            >
              Download Termux
            </a>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={200 + i * 80}>
              <div className="card-hover bg-card border border-border rounded-lg p-6">
                <div className="text-3xl mb-3 text-accent">{f.icon}</div>
                <h3 className="font-bold font-mono mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <h2 className="text-2xl font-bold font-mono mb-6">Why Use Karnel?</h2>
          <p className="text-muted-foreground mb-6">
            While Termux works great out of the box, Karnel enhances your
            experience with automation and advanced tools.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={550}>
          <div className="card-hover overflow-hidden rounded-xl border border-border mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-mono font-bold">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 font-mono font-bold">
                      Termux Only
                    </th>
                    <th className="text-center py-3 px-4 font-mono font-bold">
                      Karnel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-sm">
                        {row.feature}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.termux ? (
                          <>
                            <Check
                              size={18}
                              aria-hidden="true"
                              className="mx-auto text-emerald-500"
                            />
                            <span className="sr-only">Available</span>
                          </>
                        ) : (
                          <>
                            <X
                              size={18}
                              aria-hidden="true"
                              className="mx-auto text-destructive"
                            />
                            <span className="sr-only">Not available</span>
                          </>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Check
                          size={18}
                          aria-hidden="true"
                          className="mx-auto text-emerald-500"
                        />
                        <span className="sr-only">Available</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="card-hover bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold font-mono mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Download Termux first, then install Karnel to unlock the full
              potential of your Android development environment.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://github.com/termux/termux-app/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Download Termux
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
