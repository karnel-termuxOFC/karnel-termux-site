import { AnimatedSection } from "@/components/AnimatedSection";
import CodeBlock from "@/components/CodeBlock";

const releases = [
  {
    version: "4.17.44",
    date: "2026-10-04",
    title: "Banner portability + list coverage audit",
    changes: [
      "Banner renders identically in bash and zsh (associative colour tables, real version from package.json, valid UTF-8 logo at the exact terminal width)",
      "karnel list: deploy and voice expose install flags and status, the TUI counts installers live, dialog menus show the whole list",
      "KeelCode and Supercode CLI capture npm's exit status instead of a dead rc",
      "New regression tests: list coverage (17 targets, 166 tools) and banner (bash + zsh)",
      "Removed dead proot templates, orphan assets and stale site version references",
    ],
  },
  {
    version: "4.17.43",
    date: "2026-09-19",
    title: "New stats command + dead code cleanup",
    changes: [
      "Add karnel stats — system overview with versions, modules, disk usage, tool counts",
      "Remove dead code: install_ui wrapper, show_all in ia_sessions",
      "333 scripts checked, 0 failures",
    ],
  },
  {
    version: "4.17.42",
    date: "2026-09-19",
    title: "Critical bug fixes from codebase audit",
    changes: [
      "Fix $module vs $target in reinstall.sh (security/deploy full reinstall was broken)",
      "Route games through module layer for consistent UX and error handling",
      "Add user feedback to security module (separator/box/log for all lifecycle ops)",
      "Fix hardcoded paths in ia.sh to respect KARNEL_DATA env var",
      "Change default LOG_FILE from install_ai.log to install.log",
      "Capture cleanup exit code in upgrade command",
    ],
  },
  {
    version: "4.17.41",
    date: "2026-09-16",
    title: "Fix missing log directory in refactored modules",
    changes: [
      "Restore mkdir -p for LOG_FILE in deploy, games, network, and utils modules",
      "Install/reinstall no longer fails when cache directory does not exist",
    ],
  },
  {
    version: "4.17.40",
    date: "2026-09-16",
    title: "Refactoring and DRY consolidation",
    changes: [
      "Collapse 14 pkg-only security tool installers from 44 to 17 lines each",
      "Collapse 4 module files (deploy, games, network, utils) from ~88 to ~40 lines",
      "Net -450 lines of duplicated boilerplate removed",
    ],
  },
  {
    version: "4.17.39",
    date: "2026-09-16",
    title: "Plugin enable/disable and per-plugin config",
    changes: [
      "Add karnel plugin enable/disable <name> subcommands",
      "Add karnel plugin config <name> [key] [value] for per-plugin settings",
      "Metadata tracks enabled state (default: true) and config object",
      "Disabled plugins are skipped during command dispatch",
      "karnel plugin list shows [disabled] tag for disabled plugins",
    ],
  },
  {
    version: "4.17.38",
    date: "2026-09-16",
    title: "Installer consistency across 142 installers",
    changes: [
      "Add uninstall return code check to 129 reinstall_* functions",
      "Add _fix_npm_shebang to 13 AI tools missing Termux shebang repair",
      "Site translated from Portuguese to English (7 pages)",
      "Catalog descriptions for all 46 AI tools and 30 security tools",
    ],
  },
  {
    version: "4.17.37",
    date: "2026-09-15",
    title: "Critical installer bug fixes",
    changes: [
      "Fix LOG_FILE in 9 utils tools (install_dev.log -> install_utils.log)",
      "Fix uninstall in 14 security pkg tools (remove || true)",
      "Fix opencode uninstall sed mangling .bashrc",
      "Fix Doctor page broken links",
      "Fix duplicate karnel restore in docs",
    ],
  },
  {
    version: "4.17.36",
    date: "2026-09-15",
    title: "Managed installer lifecycle preservation",
    changes: [
      "Preserve Vercel/Netlify ownership markers after update",
      "Masscan/Metasploit pkg backend tracking",
      "PATH priority for $PREFIX/bin",
      "README and docs cleanup",
    ],
  },
  {
    version: "4.17.35",
    date: "2026-09-15",
    title: "Second lifecycle hardening",
    changes: [
      "n8n lifecycle management",
      "Git update integration",
      "Curl installer improvements",
      "Package backend tracking",
    ],
  },
  {
    version: "4.17.34",
    date: "2026-09-15",
    title: "Global --auto noninteractive mode",
    changes: [
      "Add --auto flag for noninteractive installs",
      "Automatic yes to all prompts",
    ],
  },
  {
    version: "4.17.33",
    date: "2026-09-15",
    title: "Release download hardening",
    changes: [
      "jq + python3 fallback for release downloads",
      "Fail-closed without checksum verification",
    ],
  },
  {
    version: "4.17.32",
    date: "2026-09-15",
    title: "GitHub release asset digest verification",
    changes: ["Verify release asset digests via assets[].digest"],
  },
  {
    version: "4.17.31",
    date: "2026-09-15",
    title: "README sync with AI catalog",
    changes: [
      "Sync README with current AI catalog (45 -> 46 tools)",
      "Add 10Router to documentation",
    ],
  },
  {
    version: "4.17.30",
    date: "2026-09-15",
    title: "10Router Termux shebang repair",
    changes: ["Repair 10Router Termux shebangs when binary exists"],
  },
];

export default function Changelog() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">Changelog</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Recent releases and their changes.
          </p>
        </AnimatedSection>

        {releases.map((release, i) => (
          <AnimatedSection key={release.version} delay={i * 50}>
            <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="font-bold font-mono text-lg">
                  v{release.version}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {release.date}
                </span>
              </div>
              <p className="text-muted-foreground mb-3">{release.title}</p>
              <ul className="list-disc list-inside space-y-1">
                {release.changes.map(change => (
                  <li key={change} className="text-sm text-muted-foreground">
                    {change}
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <CodeBlock
                  code={`karnel update karnel  # Upgrade to v${release.version}`}
                  language="bash"
                />
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
