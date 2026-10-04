import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function KarnelUpdate() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Update</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Update individual Karnel modules or the entire framework.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Update Karnel itself</h3>
            <CodeBlock
              code="karnel update karnel"
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Tries multiple methods in order: official curl installer (with
              SHA256 verification), git pull, npm update, npm install, and pnpm.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Update a module</h3>
            <CodeBlock
              code={`karnel update ai           Update AI tools
karnel update db           Update databases
karnel update lang         Update language packages
karnel update editor       Update Neovim configuration
karnel update npm          Update global npm modules
karnel update shell        Update ZSH plugins
karnel update deploy       Update deploy CLIs
karnel update security     Update security tools`}
              language="bash"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h3 className="font-bold font-mono mb-4">Update specific tools</h3>
            <CodeBlock
              code={`karnel update ai --ollama --qwen-code
karnel update db --postgresql --sqlite
karnel update security --nmap --hydra`}
              language="bash"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Pass <code>--&lt;tool-name&gt;</code> flags to update specific
              tools within a module.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">Available targets</h3>
            <CodeBlock
              code={`karnel, lang, db, ai, editor, dev, npm, shell,
ui, auto, network, utils, games, deploy,
supabase, voice, osint, security, plugin`}
              language="text"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
