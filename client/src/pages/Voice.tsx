import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "wouter";

const agents = [
  { name: "kilo", cmd: 'kilo --prompt "..."' },
  { name: "opencode", cmd: 'opencode run "..."' },
  { name: "claude-code", cmd: 'claude -p "..."' },
  { name: "codex", cmd: 'codex "..."' },
  { name: "gemini-cli", cmd: 'gemini -p "..."' },
  { name: "hermes-agent", cmd: 'hermes chat -q "..."' },
  { name: "kimi-code", cmd: 'kimi -p "..."' },
  { name: "mimocode", cmd: 'mimo run "..."' },
  { name: "mistral-vibe", cmd: 'vibe --prompt "..."' },
  { name: "openclaude", cmd: 'openclaude --bg "..."' },
  { name: "pi", cmd: 'pi -p "..."' },
  { name: "qwen-code", cmd: 'qwen -p "..."' },
  { name: "crush", cmd: 'crush "..."' },
  { name: "kiro", cmd: 'kiro-cli "..."' },
  { name: "text", cmd: "stdout (no agent)" },
];

const steps = [
  {
    num: "1",
    title: "Capture",
    desc: "Speak the prompt into the microphone. Android transcribes with speech-to-text.",
  },
  {
    num: "2",
    title: "Review",
    desc: "Transcribed text opens in $EDITOR (nano by default) for review and adjustments.",
  },
  {
    num: "3",
    title: "Clipboard",
    desc: "Reviewed prompt is copied to clipboard automatically.",
  },
  {
    num: "4",
    title: "Dispatch",
    desc: "AI agent runs with the prompt — hands-free.",
  },
];

export default function Voice() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">
            karnel voice — Speech-to-Agent
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Capture audio from the microphone, review in your configured editor,
            copy to clipboard, and fire any AI agent with the transcribed
            prompt. All in one command.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-12">
            <h3 className="font-bold font-mono mb-4">Basic Usage</h3>
            <CodeBlock
              code={`karnel voice                     # Shows help
karnel voice opencode             # Capture -> $EDITOR -> opencode run
karnel voice text                 # Capture -> $EDITOR -> stdout
karnel voice '!'                  # Shortcut for "text"
karnel voice claude-code --lang pt-BR  # Speak in English -> claude`}
              language="bash"
              title="terminal"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h2 className="text-2xl font-bold font-mono mb-6">Workflow</h2>
        </AnimatedSection>

        <div className="space-y-4 mb-12">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={300 + i * 80}>
              <div className="card-hover bg-card border border-border rounded-lg p-5 flex gap-5 items-start">
                <div className="relative flex shrink-0 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 border border-accent/30 font-bold text-accent font-mono text-sm">
                    {step.num}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold font-mono mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={600}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            14 Agents + Text Mode
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={650}>
          <div className="card-hover bg-card border border-border rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-mono text-accent">
                      Agent
                    </th>
                    <th className="text-left p-3 font-mono text-accent">
                      Command
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((a, i) => (
                    <tr
                      key={i}
                      className="border-b border-border/50 last:border-0 hover:bg-accent/5 transition-colors"
                    >
                      <td className="p-3 font-mono">{a.name}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs">
                        {a.cmd}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={700}>
          <h2 className="text-2xl font-bold font-mono mb-6">Options</h2>
        </AnimatedSection>

        <AnimatedSection delay={750}>
          <div className="card-hover bg-card border border-border rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-mono text-accent">
                      Flag
                    </th>
                    <th className="text-left p-3 font-mono text-accent">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="p-3 font-mono">--lang &lt;code&gt;</td>
                    <td className="p-3 text-muted-foreground">
                      Speech language: pt-BR, en-US, es
                    </td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="p-3 font-mono">--raw</td>
                    <td className="p-3 text-muted-foreground">
                      Skip editor review, use direct capture
                    </td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="p-3 font-mono">--no-clip</td>
                    <td className="p-3 text-muted-foreground">
                      Don't copy prompt to clipboard
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={800}>
          <h2 className="text-2xl font-bold font-mono mb-6">Examples</h2>
        </AnimatedSection>

        <div className="space-y-6 mb-12">
          {[
            {
              title: "Voice Development",
              code: "karnel voice claude-code --lang en-US",
              desc: 'Say "Create a React component with a counter" and Claude generates the code.',
            },
            {
              title: "Code in Portuguese",
              code: "karnel voice opencode --lang pt-BR",
              desc: "Describe a feature in Portuguese and opencode implements it.",
            },
            {
              title: "Quick Notes",
              code: "karnel voice text --raw --no-clip >> ideias.txt",
              desc: "Transcribes directly to a file without editing or clipboard.",
            },
          ].map((ex, i) => (
            <AnimatedSection key={i} delay={900 + i * 80}>
              <div className="card-hover bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold font-mono mb-3">{ex.title}</h3>
                <CodeBlock code={ex.code} language="bash" title="terminal" />
                <p className="text-sm text-muted-foreground mt-3">{ex.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={1100}>
          <h2 className="text-2xl font-bold font-mono mb-6">Requirements</h2>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-12">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>{" "}
                <strong>Termux:API package:</strong>{" "}
                <code className="text-accent">pkg install termux-api</code>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>{" "}
                <strong>Termux:API app:</strong>{" "}
                <Link href="/termux/api" className="text-accent underline">
                  Download APK
                </Link>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>{" "}
                <strong>Microphone:</strong> allow in Android Settings &gt; Apps
                &gt; Termux &gt; Permissions
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>{" "}
                <strong>Agente de IA:</strong>{" "}
                <code className="text-accent">karnel install ai</code>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1200}>
          <h2 className="text-2xl font-bold font-mono mb-6">Troubleshooting</h2>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-bold font-mono text-foreground mb-1">
                  "No speech detected"
                </h3>
                <p>
                  Microphone permission not granted or Termux:API app not
                  installed.
                </p>
              </div>
              <div>
                <h3 className="font-bold font-mono text-foreground mb-1">
                  Captures in English even when speaking Portuguese
                </h3>
                <p>
                  Use <code className="text-accent">--lang pt-BR</code> to force
                  the language.
                </p>
              </div>
              <div>
                <h3 className="font-bold font-mono text-foreground mb-1">
                  Editor doesn't open
                </h3>
                <p>
                  Use <code className="text-accent">--raw</code> to skip editing
                  when there's no TTY.
                </p>
              </div>
              <div>
                <h3 className="font-bold font-mono text-foreground mb-1">
                  Bug fix history
                </h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>
                    Fixed: command{" "}
                    <code className="text-accent">termux-dialog speech</code> →{" "}
                    <code className="text-accent">termux-speech-to-text</code>
                  </li>
                  <li>Fixed: kilo agent missing from dispatch</li>
                  <li>
                    Fixed: boolean logic{" "}
                    <code className="text-accent">is_text</code> with string
                  </li>
                  <li>
                    Fixed: <code className="text-accent">cat | xargs</code>{" "}
                    removed (UUOC)
                  </li>
                  <li>
                    Added: options <code className="text-accent">--lang</code>,{" "}
                    <code className="text-accent">--raw</code>,{" "}
                    <code className="text-accent">--no-clip</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
