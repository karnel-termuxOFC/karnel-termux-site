import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelSearch() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Search</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Unified keyword search across all Karnel tools and Brain memory
            files.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">
              Search tools and memory
            </h3>
            <CodeBlock
              code="karnel search <query>"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Searches tool IDs, tool names, and the content of Brain memory
              files. Results from both sources are displayed together.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Examples</h3>
            <CodeBlock
              code={`karnel search postgres       # Find PostgreSQL-related tools and notes
karnel search "docker"      # Search for Docker references
karnel search nmap          # Find Nmap in tools and brain`}
              language="bash"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">How it works</h3>
            <p className="text-muted-foreground">
              The search queries two sources in parallel: the tool registry (all
              installed and available tools) and your Second Brain markdown
              files. Searches are case-insensitive and match partial strings.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
