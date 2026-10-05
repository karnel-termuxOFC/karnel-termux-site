import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelStats() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Stats</h1>
          <p className="text-lg text-muted-foreground mb-8">
            System overview showing versions, installed modules, disk usage, and
            tool counts across all 17 modules.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Show system stats</h3>
            <CodeBlock code="karnel stats" language="bash" title="terminal" />
            <p className="text-sm text-muted-foreground mt-2">
              Displays a comprehensive dashboard of your Karnel installation.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">What it shows</h3>
            <CodeBlock
              code={`Version          Karnel version, Node, npm, Python, Go, Rust
Installed        Status of all 17 modules (installed / not installed)
Disk Usage       Framework, data, cache, and config sizes
Tool Counts      Number of tools per module (166 total across 17 modules)`}
              language="text"
              title="output"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Example output</h3>
            <CodeBlock
              code={`  Version:       v4.17.45
  KARNEL_PATH:   ~/.local/share/karnel/karnel
  Shell:         bash
  Node:          v26.4.0
  npm:           12.0.2
  Python:        3.14.6
  Go:            go1.26.5
  Rust:          1.98.1

  ➜ Installed Modules

    ai           installed
    db           installed
    dev          installed
    lang         installed
    shell        installed
    editor       installed
    ui           installed
    ...

  Total: 7 installed, 10 not installed

  ➜ Disk Usage

  Framework:     13M
  Data:          3.4G
  Cache:         507K
  Config:        15K

  ➜ Tool Counts

    ai           46 tools
    db           5 tools
    dev          22 tools
    lang         8 tools
    security     30 tools
    utils        13 tools
    ...

  Total:         166 tools across 17 modules`}
              language="text"
              title="terminal"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6">
            <h3 className="font-bold font-mono mb-4">Related commands</h3>
            <CodeBlock
              code={`karnel status           # Quick health dashboard (disk, RAM, services)
karnel doctor termux    # Deep diagnostic scan (30+ sections)
karnel list <module>    # List tools in a specific module`}
              language="bash"
              title="terminal"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
