import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CATALOG_COUNTS } from "@/data/catalog";
import { ROUTES } from "@/lib/routes";
import { Link } from "wouter";

const modules = [
  {
    name: "Language Packages",
    desc: "Node, Python, Perl, PHP, Rust, C/C++, Go",
    cmd: "karnel install lang",
  },
  {
    name: "Databases",
    desc: "PostgreSQL, MariaDB, SQLite, MongoDB, Redis",
    cmd: "karnel install db",
  },
  {
    name: "AI Tools",
    desc: `${CATALOG_COUNTS.ai} AI tools (OpenCode, Claude, Gemini, Ollama, etc.)`,
    cmd: "karnel install ai",
  },
  {
    name: "Code Editor",
    desc: "code-server (VS Code in browser)",
    cmd: "karnel install editor",
  },
  {
    name: "Dev Tools",
    desc: `${CATALOG_COUNTS.dev} development tools`,
    cmd: "karnel install dev",
  },
  {
    name: "Games",
    desc: `${CATALOG_COUNTS.games} terminal games (Buzz, CTF God, Detective, etc.)`,
    cmd: "karnel install games",
  },
  {
    name: "Network Tools",
    desc: `${CATALOG_COUNTS.network} network tools (Dark Web OSINT, DedSec Network)`,
    cmd: "karnel install network",
  },
  {
    name: "Utility Scripts",
    desc: `${CATALOG_COUNTS.utils} utility scripts (fconv, notes, qrcode, zork, etc.)`,
    cmd: "karnel install utils",
  },
  {
    name: "OSINT Tools",
    desc: "Robin v2.8 — responsible dark-web OSINT through Tor",
    cmd: "karnel install osint",
  },
  {
    name: "Node.js Modules",
    desc: "Global npm packages (TypeScript, NestJS, Prettier)",
    cmd: "karnel install npm",
  },
  {
    name: "ZSH Shell",
    desc: `ZSH + Oh My Zsh + ${CATALOG_COUNTS.shell} plugins`,
    cmd: "karnel install shell",
  },
  {
    name: "Termux UI",
    desc: "Font, Cursor, Extra-keys, Banner",
    cmd: "karnel install ui",
  },
  {
    name: "Voice Command",
    desc: "Speech-to-agent via Termux:API",
    cmd: "karnel install voice",
  },
  {
    name: "Automation",
    desc: "n8n and automation tools",
    cmd: "karnel install auto",
  },
  {
    name: "Deploy CLIs",
    desc: "Vercel, Railway, Netlify, Supabase",
    cmd: "karnel install deploy",
  },
  {
    name: "Security Tools",
    desc: "Nmap, Hydra, Metasploit, SQLMap, Gobuster, and more",
    cmd: "karnel install security",
  },
  {
    name: "Plugin Manager",
    desc: "Enable/disable plugins, per-plugin config, approved and unsafe GitHub plugins",
    cmd: "karnel plugin search",
  },
  {
    name: "Supabase CLI",
    desc: "Types, migrations, functions, secrets, and remote project commands",
    cmd: "karnel supabase",
  },
];

const commands = [
  { cmd: "karnel --version", desc: "Show current version" },
  {
    cmd: "karnel --auto <command>",
    desc: "Run supported confirmations and selections without prompts",
  },
  {
    cmd: "karnel backup",
    desc: "Archive selected Termux configuration and package metadata",
  },
  { cmd: "karnel brain", desc: "Second brain — save and search memories" },
  { cmd: "karnel cleanup", desc: "Clean caches, logs, and temporary files" },
  {
    cmd: "karnel deploy",
    desc: "Deploy projects to Vercel, Railway, Netlify, or Supabase",
  },
  {
    cmd: "karnel doctor",
    desc: "Diagnose the Termux environment and project code",
  },
  { cmd: "karnel env", desc: "Manage environment variables" },
  { cmd: "karnel help", desc: "Show the CLI help screen" },
  { cmd: "karnel ia", desc: "Manage AI agents, sessions and routes" },
  { cmd: "karnel install", desc: "Install modules and packages" },
  { cmd: "karnel init", desc: "Initialize projects with templates" },
  { cmd: "karnel list", desc: "List available tools in modules" },
  { cmd: "karnel open", desc: "Open or print a documentation URL" },
  { cmd: "karnel search <query>", desc: "Search tools and Brain memories" },
  { cmd: "karnel start", desc: "Start services (editor, Robin)" },
  { cmd: "karnel status", desc: "System health dashboard" },
  { cmd: "karnel pg", desc: "PostgreSQL database manager" },
  { cmd: "karnel plugin", desc: "Manage plugins" },
  { cmd: "karnel reinstall", desc: "Uninstall and reinstall modules" },
  { cmd: "karnel restore", desc: "Restore Termux from a backup" },
  { cmd: "karnel restore --cloud", desc: "Restore via rclone" },
  {
    cmd: "karnel robin",
    desc: "Manage Robin OSINT, Tor, configuration, and local UI",
  },
  { cmd: "karnel show", desc: "Show documentation for any tool" },
  { cmd: "karnel supabase", desc: "Manage Supabase CLI workflows" },
  { cmd: "karnel uninstall", desc: "Remove installed modules" },
  { cmd: "karnel update", desc: "Update modules or the framework" },
  {
    cmd: "karnel upgrade",
    desc: "Upgrade the Karnel framework itself",
  },
  { cmd: "karnel voice", desc: "Speech-to-agent via microphone" },
  { cmd: "karnel backup --cloud", desc: "Backup + upload via rclone" },
];

const templates = [
  { name: "next", desc: "Next.js with webpack, TypeScript, Tailwind CSS" },
  { name: "react", desc: "React + Vite with modern structure" },
  { name: "nest", desc: "NestJS with TypeORM and authentication" },
  {
    name: "express",
    desc: "Express API with TypeScript + TypeORM + migrations",
  },
  { name: "python", desc: "FastAPI with SQLModel/SQLAlchemy" },
  { name: "go", desc: "Go with Gin or Fiber" },
  { name: "rust", desc: "Rust with Axum or Actix Web" },
];

export default function KarnelDocs() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">KARNEL TERMUX</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Modular development environment for Termux (Android). Automate
            installs, updates and configurations with simple commands.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-12">
            <h3 className="font-bold font-mono mb-4">Quick Install</h3>
            <div className="space-y-3">
              <CodeBlock
                code={`curl -fLO https://github.com/karnel-termuxOFC/karnel-termux/releases/download/v4.18.1/karnel-termux-install.sh
curl -fLO https://github.com/karnel-termuxOFC/karnel-termux/releases/download/v4.18.1/karnel-termux-install.sh.sha256
sha256sum -c karnel-termux-install.sh.sha256
bash karnel-termux-install.sh --ref v4.18.1`}
                language="bash"
                title="quick install"
              />
              <p className="text-center text-xs text-muted-foreground">or</p>
              <CodeBlock
                code={`npm install -g karnel-termux`}
                language="bash"
                title="npm install"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h2 className="text-2xl font-bold font-mono mb-6">Modules</h2>
          <p className="text-muted-foreground mb-8">
            Install a complete module or use its dedicated page to inspect
            included tools
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {modules.map((module, i) => (
            <AnimatedSection key={i} delay={300 + i * 60}>
              <div className="card-hover bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold font-mono mb-2">{module.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {module.desc}
                </p>
                <CodeBlock code={module.cmd} language="bash" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={900}>
          <h2 className="text-2xl font-bold font-mono mb-6">Main Commands</h2>
          <p className="text-muted-foreground mb-8">Command reference</p>
        </AnimatedSection>

        <AnimatedSection delay={950}>
          <div className="card-hover bg-card border border-border rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {commands.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-accent">
                        {item.cmd}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1000}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            Detailed Commands
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={1050}>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-12">
            <h3 className="font-bold font-mono mb-2">Non-interactive mode</h3>
            <p className="text-muted-foreground mb-4">
              Add <code className="text-accent">--auto</code> before or after a
              command to accept supported confirmations and recommended
              selections. Required values, legal opt-ins, and unsafe actions are
              never assumed.
            </p>
            <CodeBlock
              code={`karnel --auto install editor --code-server
karnel doctor termux --fix --auto
karnel --auto update karnel`}
              language="bash"
              title="terminal"
            />
          </div>
        </AnimatedSection>

        {[
          {
            title: "karnel backup",
            desc: "Archives selected Termux configuration, package selections, and Karnel tool metadata. It is not a full device snapshot and does not archive installed Karnel tool files. Optional upload uses the configured rclone remote.",
            code: `karnel backup                    # Local backup (configs + packages + tools)\nkarnel backup --cloud           # Backup + upload via rclone\nkarnel restore                  # Restore latest backup\nkarnel restore --cloud          # Restore via rclone`,
            extra: {
              label: "Backup includes:",
              code: "• Package selections (dpkg list)\n• Karnel tools manifest (not installed tool files)\n• Shell configs (.bashrc, .zshrc, .profile)\n• Termux settings (fonts, colors)\n• SSH public keys and config (private keys are not archived)\n• App configs (~/.config)\n• APT repositories",
            },
          },
          {
            title: "karnel reinstall",
            desc: "Reinstall specific modules or tools — uninstalls and installs from scratch.",
            code: `karnel reinstall                # Show help\nkarnel reinstall <target>       # Reinstall specific target\nkarnel reinstall <target> --tool1 --tool2  # Reinstall specific tools`,
            extra: {
              label: "Examples:",
              code: `karnel reinstall ai --opencode --ollama       # Reinstall only OpenCode and Ollama\nkarnel reinstall db --postgresql --sqlite     # Reinstall only PostgreSQL and SQLite\nkarnel reinstall dev --gh --fzf               # Reinstall only gh and fzf`,
            },
          },
          {
            title: "karnel voice",
            desc: "Capture voice from microphone, review in $EDITOR (nano by default), and trigger any AI agent. Supports 14 agents plus text mode, language selection, raw mode, and auto-clipboard.",
            code: `karnel voice                     # Show help\nkarnel voice opencode             # Capture → $EDITOR → opencode run\nkarnel voice text                 # Capture → $EDITOR → stdout\nkarnel voice '!'                  # Shortcut for "text"\nkarnel voice claude-code --lang en-US  # English → claude\nkarnel voice opencode --raw       # Direct capture, no editing`,
          },
          {
            title: "karnel open",
            desc: "Open an official documentation URL when Termux can handle it; otherwise print the URL in the terminal.",
            code: `karnel open                     # Show help\nkarnel open <target>            # Open or print a documentation URL\nkarnel open karnel              # Opens https://karneltermux.vercel.app/`,
            extra: { label: null, code: null },
          },
          {
            title: "karnel pg",
            desc: "PostgreSQL database manager.",
            code: `karnel pg                       # Show help\nkarnel pg start                 # Start server\nkarnel pg stop                  # Stop server\nkarnel pg restart               # Restart server\nkarnel pg status                # Check status\nkarnel pg init                  # Initialize database\nkarnel pg create <name>         # Create database\nkarnel pg drop <name>           # Drop database\nkarnel pg backup [name]         # Create a compressed backup\nkarnel pg restore [name] [file] # Restore a backup\nkarnel pg list-backups          # List available backups\nkarnel pg schedule              # Schedule automatic backups\nkarnel pg list                  # List databases\nkarnel pg shell                 # Open psql console`,
          },
          {
            title: "karnel init",
            desc: "Configure existing projects with dependencies, folder structure, and predefined tools.",
            code: `karnel init                     # Auto-detect project type and configure\nkarnel init <template>          # Configure with specific template`,
            hasTemplates: true,
          },
        ].map((section, i) => (
          <AnimatedSection key={i} delay={1100 + i * 100}>
            <div className="card-hover bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="font-bold font-mono text-accent mb-2">
                {section.title}
              </h3>
              <p className="text-muted-foreground mb-4">{section.desc}</p>
              <CodeBlock code={section.code} language="bash" title="terminal" />
              {section.extra && (
                <div className="mt-4">
                  {section.extra.label && (
                    <p className="text-sm text-muted-foreground">
                      {section.extra.label}
                    </p>
                  )}
                  {section.extra.code && (
                    <CodeBlock code={section.extra.code} language="bash" />
                  )}
                </div>
              )}
              {"hasTemplates" in section && section.hasTemplates && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Available templates:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {templates.map(tpl => (
                      <div
                        key={tpl.name}
                        className="bg-background border border-border rounded p-3"
                      >
                        <span className="font-mono text-accent font-bold">
                          {tpl.name}
                        </span>
                        <p className="text-muted-foreground mt-1">{tpl.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        ))}

        <AnimatedSection delay={1450}>
          <div className="card-hover bg-card border border-accent/40 rounded-xl p-8 mb-6">
            <p className="text-xs font-mono uppercase tracking-wider text-accent mb-3">
              New in v4.8.0
            </p>
            <h3 className="text-xl font-bold font-mono mb-2">Robin OSINT</h3>
            <p className="text-muted-foreground mb-6">
              Review the responsible-use model, verified installation, Tor
              boundary, provider privacy, persistent data locations, and
              complete command reference.
            </p>
            <Link
              href={ROUTES.osint}
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              View Robin Documentation
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1500}>
          <div className="card-hover bg-card border border-border rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold font-mono mb-2">
              Backup Documentation
            </h3>
            <p className="text-muted-foreground mb-6">
              Learn which configuration and metadata are archived and what a
              restore does not recreate.
            </p>
            <Link
              href={ROUTES.backup}
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              View Backup Documentation
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1600}>
          <div className="card-hover bg-card border border-border rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold font-mono mb-4">
              View Full Documentation
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore the full Karnel Termux repository on GitHub for detailed
              docs and examples.
            </p>
            <a
              href="https://github.com/karnel-termuxOFC/karnel-termux"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              View on GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
