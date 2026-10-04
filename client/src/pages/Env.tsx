import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Env() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">
            karnel env — Environment Variable Manager
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Manage API keys and environment variables securely. Never hardcode
            secrets in your projects again.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-card border border-accent/50 rounded-lg p-6 mb-12">
            <h3 className="font-bold font-mono mb-4">Usage</h3>
            <CodeBlock
              code={`karnel env                      # Shows help
karnel env list                 # Lists saved variables
karnel env ls                   # Alias for list
karnel env set                  # Set a variable interactively
karnel env unset                # Remove a variable interactively`}
              language="bash"
              title="terminal"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h2 className="text-2xl font-bold font-mono mb-6">Examples</h2>
        </AnimatedSection>

        <div className="space-y-6 mb-12">
          {[
            {
              code: "karnel env set",
              desc: "Prompts for the variable name and value without displaying the secret.",
            },
            {
              code: "karnel env list",
              desc: "Lists the names of configured variables.",
            },
            {
              code: "karnel env unset",
              desc: "Prompts which variable should be removed.",
            },
          ].map((ex, i) => (
            <AnimatedSection key={i} delay={300 + i * 80}>
              <div className="card-hover bg-card border border-border rounded-lg p-6">
                <CodeBlock code={ex.code} language="bash" title="terminal" />
                <p className="text-sm text-muted-foreground mt-3">{ex.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <h2 className="text-2xl font-bold font-mono mb-6">Security</h2>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              Variables are written as exports in the active shell file,{" "}
              <code className="text-accent">~/.zshrc</code> or{" "}
              <code className="text-accent">~/.bashrc</code>. No data is sent
              outside the device.
            </p>
            <p className="text-muted-foreground">
              Open a new shell or run{" "}
              <code className="text-accent">source</code> on the corresponding
              file to load changes in the current session.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
