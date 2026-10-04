import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelUpgrade() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Upgrade</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Full upgrade of the Karnel-Termux framework with post-upgrade
            cleanup.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Upgrade Karnel</h3>
            <CodeBlock code="karnel upgrade" language="bash" title="terminal" />
            <p className="text-sm text-muted-foreground mt-2">
              Convenience shortcut that runs <code>karnel update karnel</code>,
              fixes the <code>$PREFIX/bin/karnel</code> symlink, re-sources the
              environment, and runs cleanup.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">
              What happens during upgrade
            </h3>
            <CodeBlock
              code={`1. Downloads latest release via curl (SHA256 verified)
2. Falls back to git pull / npm if curl fails
3. Fixes $PREFIX/bin/karnel symlink
4. Re-sources shell environment
5. Runs cleanup routine`}
              language="text"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">
              vs. karnel update karnel
            </h3>
            <p className="text-muted-foreground">
              <code>karnel upgrade</code> does everything{" "}
              <code>karnel update karnel</code> does, plus fixes the symlink and
              runs cleanup. Use <code>upgrade</code> for a complete refresh.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
