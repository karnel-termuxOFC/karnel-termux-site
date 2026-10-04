import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelSupabase() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Supabase</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Supabase CLI wrapper with Termux-compatible safety checks and
            convenience commands.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">
              Environment diagnostics
            </h3>
            <CodeBlock
              code="karnel supabase doctor"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Checks CLI installation, project config, Docker availability,
              network reachability, and project linkage.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">
              Generate TypeScript types
            </h3>
            <CodeBlock
              code="karnel supabase types"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Generates TypeScript types from the linked remote Supabase
              database.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Database migrations</h3>
            <CodeBlock
              code={`karnel supabase migrate up      # Run pending migrations
karnel supabase migrate down    # Rollback last migration`}
              language="bash"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">All subcommands</h3>
            <CodeBlock
              code={`karnel supabase doctor          Check environment
karnel supabase types            Generate TypeScript types
karnel supabase migrate <args>   Run database migrations
karnel supabase link <args>      Link to remote project
karnel supabase status           Check remote connection
karnel supabase install          Install/update Supabase CLI
karnel supabase uninstall        Remove Supabase CLI
karnel supabase remote           Guide for local Supabase stack`}
              language="bash"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
