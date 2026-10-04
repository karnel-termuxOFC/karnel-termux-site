import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelStart() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Start</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Start Karnel-managed services and applications.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">
              Start code-server (VS Code)
            </h3>
            <CodeBlock
              code={`karnel start editor         # Starts on port 8080
karnel start editor 3000   # Starts on port 3000`}
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Launches code-server bound to <code>127.0.0.1:&lt;port&gt;</code>.
              Default port is 8080. Port must be between 1024-65535.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Start Robin (OSINT)</h3>
            <CodeBlock
              code="karnel start robin"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Launches the Robin OSINT tool with Tor on{" "}
              <code>127.0.0.1:8501</code>.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">Available targets</h3>
            <CodeBlock
              code={`editor [port]    Start code-server (VS Code in browser)
robin [args]      Start Robin OSINT tool (Tor + web UI)`}
              language="text"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
