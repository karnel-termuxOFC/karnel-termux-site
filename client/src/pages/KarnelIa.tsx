import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelIa() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">
            IA (AI Agent Manager)
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Centralized hub for managing all AI agent sessions across the Karnel
            ecosystem.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">List AI sessions</h3>
            <CodeBlock
              code="karnel ia sessions"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Lists all conversation sessions from every installed AI tool
              (OpenCode, Claude, Gemini, Ollama, Codex, Hermes, Kimi, and 20+
              more).
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Install an AI tool</h3>
            <CodeBlock
              code="karnel ia install <tool>"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Installs a specific AI tool by delegating to{" "}
              <code>karnel install ai --&lt;tool&gt;</code>.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Show AI launchers</h3>
            <CodeBlock
              code="karnel ia routes"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Displays a table of all known AI CLI binaries, their install path,
              and whether they are installed or missing.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">All subcommands</h3>
            <CodeBlock
              code={`karnel ia sessions          List all AI conversation sessions
karnel ia install <tool>   Install an AI tool
karnel ia routes           Show installed/missing AI CLI launchers
karnel ia launchers        Alias for routes`}
              language="bash"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
