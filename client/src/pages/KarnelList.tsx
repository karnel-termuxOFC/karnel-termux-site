import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelList() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">List</h1>
          <p className="text-lg text-muted-foreground mb-8">
            List all available tools and packages in a category with install
            status.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">List a category</h3>
            <CodeBlock
              code="karnel list <category>"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Shows each item's name, install flag, and whether it is currently
              installed.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Examples</h3>
            <CodeBlock
              code={`karnel list ai             List all 40+ AI tools
karnel list db             List databases (PostgreSQL, MariaDB, SQLite...)
karnel list lang           List languages (Node, Python, Rust, Go...)
karnel list security       List security tools (Nmap, Hydra, SQLMap...)
karnel list dev            List dev tools (GitHub CLI, Bat, Fzf, Tmux...)
karnel list ai db          List multiple categories at once`}
              language="bash"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">Available categories</h3>
            <CodeBlock
              code={`lang, db, ai, editor, dev, npm, shell, ui,
auto, deploy, games, network, utils, voice,
osint, security, plugin`}
              language="text"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
