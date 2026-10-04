import { AnimatedSection } from "@/components/AnimatedSection";
import CodeBlock from "@/components/CodeBlock";
import { CATALOG_COUNTS } from "@/data/catalog";

const termuxGroups = [
  {
    title: "System and hardware",
    desc: "Android, Termux, CPU, RAM, disk, locale, battery, GPU, USB and external storage.",
  },
  {
    title: "Storage and permissions",
    desc: "Shared storage, Karnel directories, write access, data integrity and storage I/O.",
  },
  {
    title: "Packages and runtimes",
    desc: "dpkg/APT, mirrors, Node.js, npm, Python, pip, venv, Go, Rust, Clang and Make.",
  },
  {
    title: "Services",
    desc: "PostgreSQL, proot/glibc, OpenSSH server, Termux:API and background processes.",
  },
  {
    title: "Karnel and AI",
    desc: `Framework version, CLI link, banner, shell integration and all ${CATALOG_COUNTS.ai} AI registry commands.`,
  },
  {
    title: "Shell health",
    desc: "Zsh configuration, plugins, caches, invalid shebangs, broken links and shell history privacy.",
  },
  {
    title: "Identity and access",
    desc: "Git identity, SSH keys, API keys and relevant configuration availability.",
  },
  {
    title: "Network",
    desc: "DNS, HTTPS, GitHub connectivity, mirrors and latency.",
  },
];

const modes = [
  {
    mode: "Quick",
    flag: "--quick / -q",
    definitions: 64,
    tools: 56,
    coverage: "Syntax, format, lint, lint+format, type checks and tests",
  },
  {
    mode: "Standard",
    flag: "--standard / -s",
    definitions: 74,
    tools: 66,
    coverage:
      "Quick + security, dependencies, coverage, dead code and complexity",
  },
  {
    mode: "Deep",
    flag: "--deep / -d",
    definitions: 76,
    tools: 68,
    coverage: "Every registered category, including docs and build checks",
  },
];

const ecosystemGroups = [
  {
    source: "package.json, tsconfig.json",
    labels: "JavaScript, TypeScript",
    frameworks:
      "Next.js, Nuxt, Vite, Angular, React, Vue, Svelte, Astro, Express, Fastify, NestJS, Hono",
  },
  {
    source: "Python manifests and *.py",
    labels: "Python",
    frameworks: "Django, FastAPI, Flask, pytest, tox, Poetry",
  },
  {
    source: "go.mod, Cargo.toml, Gemfile, composer.json",
    labels: "Go, Rust, Ruby, PHP",
    frameworks: "-",
  },
  {
    source: "pubspec.yaml, CMakeLists.txt, Makefile",
    labels: "Dart, C/C++",
    frameworks: "Flutter, CMake",
  },
  {
    source: "Maven, Gradle and .NET project files",
    labels: "Java, Kotlin, C#",
    frameworks: "Maven, Gradle, .NET",
  },
  {
    source: "Docker, Terraform and Ansible files",
    labels: "Docker, Terraform, Ansible",
    frameworks: "-",
  },
  {
    source: "mix.exs, Cabal, Lua, Swift, Julia, Zig and Nix files",
    labels: "Elixir, Haskell, Lua, Swift, Julia, Zig, Nix",
    frameworks: "-",
  },
  {
    source: ".github/workflows, shell and SQL files",
    labels: "GitHub Actions, Shell, SQL",
    frameworks: "-",
  },
];

const toolGroups = [
  [
    "JavaScript",
    "ESLint, Prettier, npm audit, Vitest, Jest, markdownlint-cli2",
  ],
  ["TypeScript", "TypeScript compiler, Biome, ESLint, Prettier"],
  [
    "Python",
    "AST syntax parsing, Ruff, Pyright, mypy, Bandit, pip-audit, pytest, pytest-cov, Vulture, Radon",
  ],
  ["Shell", "Bash, Zsh, ShellCheck, shfmt, checkmake"],
  ["Go", "gofmt, go vet, Staticcheck, govulncheck, go test"],
  ["Rust", "cargo check/test/audit, rustfmt, Clippy"],
  ["C/C++", "Clang syntax, clang-format, clang-tidy"],
  ["JVM and .NET", "javac, Detekt, ktlint; C# receives cross-language checks"],
  [
    "Web and infrastructure",
    "Hadolint, Docker Compose, Terraform, TFLint, actionlint, ansible-lint",
  ],
  [
    "Other languages",
    "SQLFluff, PHPStan, PHPUnit, RuboCop, Dart, Mix, SwiftLint, HLint, Selene, StyLua, Statix, Julia, Zig",
  ],
  ["Cross-language", "yamllint, jq, xmllint, Trivy, Semgrep"],
];

const reliabilityItems = [
  "Persistent arrays survive function-scoped imports through explicit global declarations.",
  "Registry commands containing shell pipelines are parsed without corrupting fields.",
  "Language checks run from their manifest directory, global checks run from the selected root, and both preserve exit status.",
  "File placeholders use shell-safe path quoting and are skipped when no compatible file exists.",
  "Cross-language checks run once per project instead of once per detected ecosystem.",
  "npx uses --no-install, so diagnostics never download a missing package automatically.",
  "JSON mode emits a standalone document; optional fix progress goes to stderr.",
  "Termux information and battery probes have timeouts and cannot block a full run.",
  "GitHub Actions, scoped Angular/NestJS packages and all Python manifest variants are detected.",
];

export default function Doctor() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <p className="text-sm font-mono text-accent mb-3">CLI reference</p>
          <h1 className="text-4xl font-bold font-mono mb-4">karnel doctor</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Diagnose the Termux environment, analyze a project with 76 code
            checks, or validate Robin without spending LLM credits. Doctor
            exposes three operational subcommands:{" "}
            <code className="text-accent">termux</code>,{" "}
            <code className="text-accent">code</code>, and{" "}
            <code className="text-accent">robin</code>.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-8">
            <h2 className="font-bold font-mono mb-4">Command surface</h2>
            <CodeBlock
              code={`karnel doctor termux [--quick] [--fix]
karnel doctor code [options] [directory]
karnel doctor robin [--network]`}
              language="bash"
              title="terminal"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Running <code className="text-accent">karnel doctor</code> without
              a subcommand defaults to{" "}
              <code className="text-accent">termux</code>.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <nav
            aria-label="On this page"
            className="bg-card border border-border rounded-lg p-5 mb-12"
          >
            <p className="font-mono font-bold mb-3">On this page</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a className="text-accent hover:underline" href="#termux">
                Termux diagnostics
              </a>
              <a className="text-accent hover:underline" href="#code">
                Code analysis
              </a>
              <a className="text-accent hover:underline" href="#robin">
                Robin diagnostics
              </a>
              <a className="text-accent hover:underline" href="#tools">
                Tool registry
              </a>
              <a className="text-accent hover:underline" href="#output">
                Output and reports
              </a>
              <a className="text-accent hover:underline" href="#reliability">
                Reliability audit
              </a>
            </div>
          </nav>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div id="termux" className="scroll-mt-24">
            <h2 className="text-2xl font-bold font-mono mb-4">
              Termux diagnostics
            </h2>
            <p className="text-muted-foreground mb-6">
              More than 30 sections inspect Android resources, package health,
              runtimes, services, Karnel, shell configuration, processes,
              storage and networking.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-8">
            <CodeBlock
              code={`karnel doctor termux
karnel doctor termux --quick
karnel doctor termux --fix`}
              language="bash"
              title="terminal"
            />
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-mono">Option</th>
                    <th className="text-left py-3 font-mono">Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4 font-mono text-accent">
                      --quick, -q
                    </td>
                    <td className="py-3 text-muted-foreground">
                      Runs essential system, storage, critical-tool and package
                      checks, then skips extended runtime, AI, shell, process,
                      I/O and network sections.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-accent">
                      --fix, -f
                    </td>
                    <td className="py-3 text-muted-foreground">
                      Applies queued callbacks without the group confirmation.
                      Each correction still reports success or failure.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {termuxGroups.map(group => (
              <article
                key={group.title}
                className="card-hover bg-card border border-border rounded-lg p-5"
              >
                <h3 className="font-mono font-bold mb-2">{group.title}</h3>
                <p className="text-sm text-muted-foreground">{group.desc}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={350}>
          <div id="robin" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold font-mono mb-4">
              Robin diagnostics
            </h2>
            <p className="text-muted-foreground mb-6">
              Robin mode verifies the exact upstream source pin, Python and
              native imports, Tor SOCKS listener, Streamlit health endpoint,
              private configuration permissions, and persistent investigation
              storage. It never calls an LLM.
            </p>
            <div className="card-hover bg-card border border-border rounded-lg p-6">
              <CodeBlock
                code={`karnel doctor robin
karnel doctor robin --network`}
                language="bash"
                title="terminal"
              />
              <p className="text-sm text-muted-foreground mt-4">
                <code className="text-accent">--network</code> adds one bounded
                HTTPS request through Tor. Without it, all checks remain local.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div id="code" className="scroll-mt-24">
            <h2 className="text-2xl font-bold font-mono mb-4">Code analysis</h2>
            <p className="text-muted-foreground mb-6">
              The code doctor scans four directory levels, prunes common
              generated and vendor folders, detects subprojects, and runs only
              checks relevant to the discovered ecosystems.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={450}>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-8">
            <CodeBlock
              code={`karnel doctor code
karnel doctor code --standard /path/to/project
karnel doctor code --deep --json /path/to/project
karnel doctor code --fix /path/to/project`}
              language="bash"
              title="terminal"
            />
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-mono">Mode</th>
                    <th className="text-left py-3 pr-4 font-mono">
                      Definitions
                    </th>
                    <th className="text-left py-3 pr-4 font-mono">Tools</th>
                    <th className="text-left py-3 font-mono">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {modes.map(mode => (
                    <tr
                      key={mode.mode}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <span className="block font-mono font-medium">
                          {mode.mode}
                        </span>
                        <span className="text-xs text-accent">{mode.flag}</span>
                      </td>
                      <td className="py-3 pr-4 font-mono">
                        {mode.definitions}
                      </td>
                      <td className="py-3 pr-4 font-mono">{mode.tools}</td>
                      <td className="py-3 text-muted-foreground">
                        {mode.coverage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Counts describe the complete registry. A project runs only rows
              for detected ecosystems plus the cross-language rows once.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={450}>
          <h3 className="text-xl font-bold font-mono mb-4">
            25 detected ecosystem labels
          </h3>
          <div className="card-hover bg-card border border-border rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-3 px-4 font-mono">Source</th>
                    <th className="text-left py-3 px-4 font-mono">Labels</th>
                    <th className="text-left py-3 px-4 font-mono">Metadata</th>
                  </tr>
                </thead>
                <tbody>
                  {ecosystemGroups.map(group => (
                    <tr
                      key={group.source}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 px-4 font-mono text-xs">
                        {group.source}
                      </td>
                      <td className="py-3 px-4">{group.labels}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {group.frameworks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div id="tools" className="scroll-mt-24">
            <h2 className="text-2xl font-bold font-mono mb-4">Tool registry</h2>
            <p className="text-muted-foreground mb-6">
              The registry contains 76 definitions across 68 distinct displayed
              tool labels. C# currently receives cross-language checks only.
            </p>
          </div>
          <div className="card-hover bg-card border border-border rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-3 px-4 font-mono">Ecosystem</th>
                    <th className="text-left py-3 px-4 font-mono">Checks</th>
                  </tr>
                </thead>
                <tbody>
                  {toolGroups.map(([ecosystem, tools]) => (
                    <tr
                      key={ecosystem}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 px-4 font-mono font-medium">
                        {ecosystem}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {tools}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={550}>
          <h2 className="text-2xl font-bold font-mono mb-4">Fix modes</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="card-hover bg-card border border-border rounded-lg p-5">
              <h3 className="font-mono font-bold mb-2">--fix / --safe-fix</h3>
              <p className="text-sm text-muted-foreground">
                Applies only fixes explicitly classified as safe and only for
                actual findings. File-based fixes retain their sample path.
              </p>
            </div>
            <div className="card-hover bg-card border border-border rounded-lg p-5">
              <h3 className="font-mono font-bold mb-2">--aggressive-fix</h3>
              <p className="text-sm text-muted-foreground">
                Also allows available fixes without a safe classification.
                Review version-control changes immediately after execution.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div id="output" className="scroll-mt-24">
            <h2 className="text-2xl font-bold font-mono mb-4">
              Output and reports
            </h2>
          </div>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-6">
            <h3 className="font-mono font-bold mb-4">Standalone JSON</h3>
            <CodeBlock
              code={`{
  "directory": "/path/to/project",
  "results": [
    {
      "severity": "ok",
      "language": "Shell",
      "tool": "bash",
      "category": "syntax",
      "count": 0,
      "detail": ""
    }
  ]
}`}
              language="json"
              title="karnel doctor code --json"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Nonzero command status and timeout are errors, including silent
              failures. Empty successful output is OK; other output is
              classified by severity keywords.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="card-hover bg-card border border-border rounded-lg p-5">
              <h3 className="font-mono font-bold mb-3">Termux report</h3>
              <code className="text-xs text-accent break-all">
                $KARNEL_DATA/doctor_reports/doctor_report_latest.md
              </code>
              <p className="text-sm text-muted-foreground mt-3">
                Replaced on each run and generated after auto-fixes.
              </p>
            </div>
            <div className="card-hover bg-card border border-border rounded-lg p-5">
              <h3 className="font-mono font-bold mb-3">Code text report</h3>
              <code className="text-xs text-accent break-all">
                $KARNEL_DATA/doctor_code_reports/doctor_code_YYYYMMDD_HHMMSS.txt
              </code>
              <p className="text-sm text-muted-foreground mt-3">
                Timestamped and created in terminal text mode.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={650}>
          <div id="reliability" className="scroll-mt-24">
            <h2 className="text-2xl font-bold font-mono mb-4">
              2026-07-16 reliability audit
            </h2>
            <p className="text-muted-foreground mb-6">
              The Doctor implementation and documentation were reviewed
              together. The current behavior is covered by smoke tests and
              ShellCheck.
            </p>
          </div>
          <div className="card-hover bg-card border border-accent/40 rounded-lg p-6 mb-8">
            <ul className="space-y-3 text-sm text-muted-foreground">
              {reliabilityItems.map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-accent" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={700}>
          <div className="card-hover bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold font-mono mb-3">
              Source documentation
            </h2>
            <p className="text-muted-foreground mb-4">
              The repository reference contains the complete implementation map,
              detector table, report details, regression coverage and change
              record.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                className="text-accent hover:underline"
                href="https://karneltermux.vercel.app/docs"
                target="_blank"
                rel="noreferrer"
              >
                Documentation
              </a>
              <a
                className="text-accent hover:underline"
                href="https://github.com/karnel-termuxOFC/karnel-termux/releases"
                target="_blank"
                rel="noreferrer"
              >
                Release notes
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
