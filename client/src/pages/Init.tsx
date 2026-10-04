import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

const templates = [
  { name: "next", desc: "Next.js with webpack, TypeScript, Tailwind CSS" },
  { name: "react", desc: "React + Vite with modern structure" },
  { name: "nest", desc: "NestJS with TypeORM and authentication" },
  {
    name: "express",
    desc: "Express API with TypeScript + TypeORM + migrations",
  },
  { name: "python", desc: "FastAPI with SQLModel or SQLAlchemy" },
  { name: "go", desc: "Gin/Fiber API with Docker support" },
  { name: "rust", desc: "Axum/Actix Web with SQLx" },
];

export default function Init() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">
            karnel init — Project Initialization
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Configure existing projects with dependencies, folder structure, and
            predefined tools. Start coding in seconds.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-12">
            <h3 className="font-bold font-mono mb-4">Usage</h3>
            <CodeBlock
              code={`karnel init                     # Detects project type and configures
karnel init <template>          # Configures with specific template`}
              language="bash"
              title="terminal"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            Available Templates
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {templates.map((tpl, i) => (
            <AnimatedSection key={i} delay={300 + i * 60}>
              <div className="card-hover bg-card border border-border rounded-lg p-5">
                <span className="font-mono text-accent font-bold text-lg">
                  {tpl.name}
                </span>
                <p className="text-sm text-muted-foreground mt-2">{tpl.desc}</p>
                <div className="mt-3">
                  <CodeBlock code={`karnel init ${tpl.name}`} language="bash" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={700}>
          <h2 className="text-2xl font-bold font-mono mb-6">Example</h2>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <CodeBlock
              code={`cd my-next-project && karnel init next`}
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-3">
              Configures an existing Next.js project with TypeScript and
              Tailwind.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
