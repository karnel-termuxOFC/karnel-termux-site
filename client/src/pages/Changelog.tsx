import { AnimatedSection } from "@/components/AnimatedSection";
import CodeBlock from "@/components/CodeBlock";

const releases = [
  {
    version: "4.18.2",
    date: "2026-10-07",
    title: "Wrappers that survive a login shell",
    changes: [
      'Every wrapper unsets LD_PRELOAD before it execs glibc: login(1) exports the bionic termux-exec shim, which ld.so rejects with "libc.so: invalid ELF header", while tier 3\'s own shim left every bionic child failing with "libc.so.6 not found"',
      "Wrappers written by older Karnels are detected by compat_wrapper_is_current() and rewritten in place before compat_escalate probes them",
      "An orphaned .karnel-real left by freebuff's own in-place re-extraction no longer blocks adaptation: identical bytes are dropped and a different copy is parked as .karnel-real.stale",
      "Four new test cases, each proven to fail without the fix; 23 cases run in 8 seconds",
    ],
  },
  {
    version: "4.18.1",
    date: "2026-10-07",
    title: "The compat ladder reaches every installer",
    changes: [
      "compat_adapt_installed() now escalates, so tiers 3 (glibc userland) and 4 (proot FHS root) are reachable from all 16 categories, not only from freebuff",
      "Wrappers already on disk are re-probed, so a tool that stops starting at its current tier climbs on the next install or update",
      "Native binaries, scripts and plain files return before any probe, so the ladder costs nothing for the hundreds of entries a Termux prefix already carries",
      "Three new test cases, each proven to fail without the fix; 20 cases run in 7 seconds",
    ],
  },
  {
    version: "4.18.0",
    date: "2026-10-06",
    title: "Three-tier Android compatibility layer",
    changes: [
      "compat_adapt wraps, probes and climbs to the cheapest tier that starts the tool: the glibc loader alone, the glibc userland on PATH, or proot over a synthetic FHS root built from the sysroot already installed",
      "The proot tier downloads nothing, so glibc-only binaries no longer force a full proot-distro install of Ubuntu",
      "A tier that cannot be reached is refused before the wrapper is written, and every step unwraps back to the parked original",
      "Shebang repair edits the target of a symlink instead of replacing the link, so fixing npm no longer breaks it again",
      "npm, npx, kc, kcode, keel, snyk, httptmuxd, gdbus-codegen, glib-genmarshal and glib-mkenums now execute on Android (no /usr/bin/env)",
      "karnel doctor checks whether each interpreter path exists, fixes through the compatibility layer and reports an Android Compatibility Layer section",
      "tests/android-compat.sh covers classification, wrapping, re-tiering, escalation, fallback, the FHS root and shebang repair (17 cases)",
    ],
  },
  {
    version: "4.17.45",
    date: "2026-10-05",
    title: "npm runs on real Termux hosts",
    changes: [
      "Every npm call goes through karnel_npm(), which runs npm through node when its #!/usr/bin/env node shebang cannot be executed and retries with --force only on EBADPLATFORM",
      "wpscan and wafw00f read their recorded backend correctly, so update and uninstall no longer fail every time",
      "KeelCode validates the linux-arm64 release it actually downloads instead of the base package digest",
      "Cline, Command Code, Copilot Termux and Walkie repair the shebang on the success branch, leaving installed binaries runnable",
      "Stub detection no longer flags real CLIs (supercode, python-config) as offline placeholders",
      "The test harness now surfaces intermediate failures, exposing a Turbopack contract that always failed on CI",
    ],
  },
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
