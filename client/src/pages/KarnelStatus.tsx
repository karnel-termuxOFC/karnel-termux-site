import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelStatus() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Status</h1>
          <p className="text-lg text-muted-foreground mb-8">
            System health dashboard showing disk, RAM, services, and
            connectivity.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Check system status</h3>
            <CodeBlock code="karnel status" language="bash" title="terminal" />
            <p className="text-sm text-muted-foreground mt-2">
              Runs a full diagnostic scan of your Termux environment.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">What it checks</h3>
            <CodeBlock
              code={`Disk free        Available space in $HOME
RAM              Total and available memory (warns if < 200MB free)
Uptime           System uptime in days/hours/minutes
PostgreSQL       pg_ctl exists and pg_isready responds
code-server      Process running check
omni-route       Process running check
Robin (OSINT)    Managed process and HTTP health check
Internet         Ping 8.8.8.8 for connectivity
Karnel version   Current $KARNEL_VERSION
Last update      Days since last version check`}
              language="text"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">No arguments needed</h3>
            <p className="text-muted-foreground">
              <code>karnel status</code> takes no arguments. It scans everything
              in a single pass and outputs a formatted dashboard. Use it to
              quickly verify your environment is healthy.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
