import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/CodeBlock";
import { AnimatedSection } from "@/components/AnimatedSection";

const keybindings = [
  {
    category: "General",
    bindings: [
      { key: ";", mode: "Normal", desc: "Enter command mode" },
      { key: "jk", mode: "Insert", desc: "Exit insert mode" },
      { key: "<Space>", mode: "Normal", desc: "Leader key" },
      { key: "K", mode: "Normal", desc: "Hover documentation (LSP)" },
      { key: "gd", mode: "Normal", desc: "Go to definition (LSP)" },
    ],
  },
  {
    category: "Line Movement",
    bindings: [
      { key: "<A-j>", mode: "Normal/Insert", desc: "Move line down" },
      { key: "<A-k>", mode: "Normal/Insert", desc: "Move line up" },
      {
        key: "<A-S-j>",
        mode: "Normal/Insert",
        desc: "Duplicate line down",
      },
      {
        key: "<A-S-k>",
        mode: "Normal/Insert",
        desc: "Duplicate line up",
      },
    ],
  },
  {
    category: "Window Navigation",
    bindings: [
      {
        key: "<S-h>",
        mode: "Normal",
        desc: "Go to left split / Previous buffer",
      },
      {
        key: "<S-l>",
        mode: "Normal",
        desc: "Go to right split / Next buffer",
      },
      { key: "<S-j>", mode: "Normal", desc: "Go to split below" },
      { key: "<S-k>", mode: "Normal", desc: "Go to split above" },
      { key: "<leader>sv", mode: "Normal", desc: "Split vertically" },
      { key: "<leader>sh", mode: "Normal", desc: "Split horizontally" },
      {
        key: "<leader>sm",
        mode: "Normal",
        desc: "Maximize/minimize split",
      },
    ],
  },
  {
    category: "Search & Navigation",
    bindings: [
      { key: "<leader>ff", mode: "Normal", desc: "Find files" },
      {
        key: "<leader>fg",
        mode: "Normal",
        desc: "Live grep (search text)",
      },
      { key: "<leader>fb", mode: "Normal", desc: "Search buffers" },
      { key: "<leader>fh", mode: "Normal", desc: "Search help tags" },
      {
        key: "<leader>fo",
        mode: "Normal",
        desc: "Search old files (recent)",
      },
      { key: "<leader>fm", mode: "Normal", desc: "Search marks" },
    ],
  },
  {
    category: "Git",
    bindings: [
      { key: "<leader>gs", mode: "Normal", desc: "Git status" },
      { key: "<leader>gb", mode: "Normal", desc: "Git blame line" },
      { key: "<leader>gd", mode: "Normal", desc: "Git diff" },
      { key: "<leader>gl", mode: "Normal", desc: "Git log" },
      { key: "<leader>gc", mode: "Normal", desc: "Git commit" },
    ],
  },
  {
    category: "AI & LSP",
    bindings: [
      { key: "<leader>ca", mode: "Normal", desc: "Code action (LSP)" },
      { key: "<leader>rn", mode: "Normal", desc: "Rename symbol (LSP)" },
      {
        key: "<leader>wa",
        mode: "Normal",
        desc: "Add workspace folder (LSP)",
      },
      {
        key: "<leader>wr",
        mode: "Normal",
        desc: "Remove workspace folder (LSP)",
      },
      {
        key: "<leader>wl",
        mode: "Normal",
        desc: "List workspace folders (LSP)",
      },
      {
        key: "<leader>cc",
        mode: "Normal",
        desc: "Toggle GitHub Copilot extension chat",
      },
      { key: "<leader>cq", mode: "Normal", desc: "Quick AI question" },
    ],
  },
];

const languages = [
  {
    lang: "JavaScript/TypeScript",
    lsp: "TypeScript",
    formatter: "Prettier extension",
    features: "Autocomplete, diagnostics, inlay hints",
  },
  {
    lang: "Python",
    lsp: "Python",
    formatter: "Python Formatter",
    features: "Autocomplete, diagnostics",
  },
  {
    lang: "Go",
    lsp: "Go",
    formatter: "gofmt/goimports",
    features: "Autocomplete, diagnostics",
  },
  {
    lang: "Rust",
    lsp: "rust_analyzer",
    formatter: "rustfmt",
    features: "Autocomplete, diagnostics",
  },
  {
    lang: "Lua",
    lsp: "lua-language-server",
    formatter: "Lua Formatter",
    features: "Autocomplete, diagnostics",
  },
  {
    lang: "Bash",
    lsp: "bashls",
    formatter: "shfmt",
    features: "Shell formatting",
  },
  {
    lang: "HTML",
    lsp: "html-lsp",
    formatter: "Prettier extension",
    features: "Auto-tags, autocomplete",
  },
  {
    lang: "CSS/Tailwind",
    lsp: "cssls",
    formatter: "Prettier extension",
    features: "Autocomplete, Tailwind support",
  },
];

const configPaths = [
  {
    path: "$HOME/.config/code-server/",
    purpose: "Main configuration directory",
  },
  {
    path: "config.yaml",
    purpose: "Server settings (port, auth, etc.)",
  },
  {
    path: "$HOME/.local/share/code-server/",
    purpose: "Data and installed extensions",
  },
  {
    path: "$HOME/.local/share/code-server/extensions/",
    purpose: "Installed VS Code extensions",
  },
];

const troubleshooting = [
  {
    title: "Extension not working",
    desc: "Check if the extension is installed and enabled in the extensions panel (Ctrl+Shift+X).",
    fix: "# Reinstall the extension via the panel or CLI:\ncode-server --install-extension <ext-id>",
  },
  {
    title: "Errors after update",
    desc: "Some updates may break compatibility. Clear the cache and reinstall.",
    fix: "rm -rf ~/.local/share/code-server/cachedExtensionVSIXs/\nkarnel reinstall editor",
  },
  {
    title: "Performance issues",
    desc: "Disable heavy extensions or reduce to only needed language extensions.",
    fix: "# In config.yaml or settings.json, disable unnecessary extensions",
  },
  {
    title: "GitHub Copilot not working",
    desc: "Make sure you are authenticated with GitHub in the Copilot extension.",
    fix: "# Open code-server and log in via the GitHub Copilot extension",
  },
  {
    title: "Reinstall from scratch",
    desc: "Backup your config, remove the code-server directory and reinstall.",
    fix: `mv ~/.config/code-server ~/.config/code-server.bak\nkarnel reinstall editor`,
  },
];

const features = [
  {
    title: "VS Code in the browser",
    desc: "code-server serves VS Code locally on 127.0.0.1:8080 by default.",
  },
  {
    title: "Extensions under your control",
    desc: "Install extensions and language servers as project needs require.",
  },
  {
    title: "Configuration preserved",
    desc: "The installer creates initial configuration only when it doesn't exist yet.",
  },
  {
    title: "Neovim optional",
    desc: "Neovim and NvChad are separate components of the editor module.",
  },
  {
    title: "Protected access",
    desc: "Default configuration uses password authentication and listens on loopback only.",
  },
  {
    title: "Configurable port",
    desc: "Start the service on default port 8080 or specify a port between 1024 and 65535.",
  },
];

export default function CodeEditor() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold font-mono mb-4">code-server</h1>
          <p className="text-lg text-muted-foreground mb-8">
            VS Code in the browser for Termux. Karnel installs the server and a
            secure local configuration; extensions, AI assistants, language
            servers, and formatters are chosen by you.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-hover bg-card border border-accent/50 rounded-lg p-6 mb-12">
            <h3 className="font-bold font-mono mb-4">Quick Install</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The module contains code-server, Neovim, and NvChad. Install only
              the component you want or all at once:
            </p>
            <div className="space-y-2">
              <CodeBlock
                code={`karnel install editor                    # Install all`}
                language="bash"
                title="terminal"
              />
              <CodeBlock
                code={`karnel install editor --code-server       # VS Code in the browser`}
                language="bash"
              />
              <CodeBlock
                code={`karnel install editor --neovim            # Modern modal editor`}
                language="bash"
              />
              <CodeBlock
                code={`karnel install editor --nvchad            # Full Neovim configuration`}
                language="bash"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h2 className="text-2xl font-bold font-mono mb-6">Features</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={300 + i * 60}>
              <div className="card-hover bg-background border border-border rounded p-4">
                <h3 className="font-bold font-mono mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={650}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            Keyboard Shortcuts
          </h2>
          <p className="text-muted-foreground mb-6">
            These shortcuts belong to the optional NvChad configuration, not
            code-server. They are available only after installing NvChad.
          </p>
        </AnimatedSection>

        <Tabs defaultValue="General" className="mb-12">
          <TabsList className="w-full justify-start overflow-x-auto [&>button]:flex-none [&>button]:shrink-0">
            {keybindings.map(cat => (
              <TabsTrigger key={cat.category} value={cat.category}>
                {cat.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {keybindings.map(cat => (
            <TabsContent key={cat.category} value={cat.category}>
              <AnimatedSection delay={750}>
                <div className="card-hover bg-card border border-border rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[36rem] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left py-3 px-4 font-mono">Key</th>
                        <th className="text-left py-3 px-4 font-mono">Mode</th>
                        <th className="text-left py-3 px-4 font-mono">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.bindings.map((binding, i) => (
                        <tr
                          key={i}
                          className="border-b border-border hover:bg-accent/5"
                        >
                          <td className="py-3 px-4 font-mono text-accent">
                            {binding.key}
                          </td>
                          <td className="py-3 px-4 font-mono text-sm">
                            {binding.mode}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {binding.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedSection>
            </TabsContent>
          ))}
        </Tabs>

        <AnimatedSection delay={750}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            Language Support
          </h2>
          <p className="text-muted-foreground mb-6">
            These are common VS Code extension choices. Karnel does not install
            or configure language servers and formatters automatically.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={800}>
          <div className="card-hover bg-card border border-border rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-3 px-4 font-mono">Language</th>
                    <th className="text-left py-3 px-4 font-mono">LSP</th>
                    <th className="text-left py-3 px-4 font-mono">Formatter</th>
                    <th className="text-left py-3 px-4 font-mono">Features</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((lang, i) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-accent/5"
                    >
                      <td className="py-3 px-4 font-mono">{lang.lang}</td>
                      <td className="py-3 px-4 font-mono text-accent text-xs">
                        {lang.lsp}
                      </td>
                      <td className="py-3 px-4 text-sm">{lang.formatter}</td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {lang.features}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={850}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            Installation Options
          </h2>
        </AnimatedSection>

        {[
          {
            title: "Full Installation",
            desc: "Installs code-server, Neovim, and the Karnel-managed NvChad configuration.",
            code: "karnel install editor",
          },
          {
            title: "Individual Components",
            desc: "Install only the editor component you need.",
            code: "karnel install editor --code-server\nkarnel install editor --neovim\nkarnel install editor --nvchad\nkarnel start editor            # Start code-server on port 8080",
          },
          {
            title: "VS Code Extensions",
            desc: "After code-server is installed, install extensions with its CLI or the extensions panel:",
            code: "# Via CLI (recommended for mobile):\ncode-server --install-extension ms-python.python\ncode-server --install-extension esbenp.prettier-vscode\n\n# Or via panel: Ctrl+Shift+X",
          },
        ].map((item, i) => (
          <AnimatedSection key={i} delay={900 + i * 80}>
            <div className="card-hover bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="font-bold font-mono mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.desc}</p>
              <CodeBlock code={item.code} language="bash" title="terminal" />
            </div>
          </AnimatedSection>
        ))}

        <AnimatedSection delay={1100}>
          <h2 className="text-2xl font-bold font-mono mb-6">Configuration</h2>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-6">
            <p className="text-muted-foreground mb-4">
              code-server uses{" "}
              <code className="text-accent">
                ~/.config/code-server/config.yaml
              </code>{" "}
              for configuration. Extension settings are in{" "}
              <code className="text-accent">~/.local/share/code-server/</code>.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1150}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            Configuration Paths
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={1200}>
          <div className="card-hover bg-card border border-border rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-3 px-4 font-mono">Path</th>
                    <th className="text-left py-3 px-4 font-mono">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {configPaths.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-accent text-xs">
                        {item.path}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1250}>
          <h2 className="text-2xl font-bold font-mono mb-6">Troubleshooting</h2>
        </AnimatedSection>

        <div className="space-y-6 mb-12">
          {troubleshooting.map((item, i) => (
            <AnimatedSection key={i} delay={1300 + i * 80}>
              <div className="card-hover bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold font-mono text-accent mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <CodeBlock code={item.fix} language="bash" title="fix" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={1700}>
          <h2 className="text-2xl font-bold font-mono mb-6">
            Configuration Structure
          </h2>
          <CodeBlock
            code={`~/.config/code-server/
└── config.yaml                    # Server settings

~/.local/share/code-server/
├── extensions/                    # Installed VS Code extensions
├── cachedExtensionVSIXs/         # Extension cache
└── workspaceStorage/             # Per-workspace data`}
            language="bash"
            title="code-server structure"
          />
        </AnimatedSection>

        <AnimatedSection delay={1800}>
          <h2 className="text-2xl font-bold font-mono mb-6">Neovim</h2>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-6">
            <p className="text-muted-foreground mb-4">
              Neovim is a modern Vim-based text editor with LSP support,
              treesitter, and Lua extensions. Installed via pkg.
            </p>
            <CodeBlock
              code={`karnel install editor --neovim`}
              language="bash"
              title="terminal"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1900}>
          <h2 className="text-2xl font-bold font-mono mb-6">NvChad</h2>
          <div className="card-hover bg-card border border-border rounded-lg p-6 mb-6">
            <p className="text-muted-foreground mb-4">
              NvChad is a complete Neovim configuration with beautiful theme,
              pre-configured LSP, automatic formatting, smart keybindings, and
              AI support. Maintained separately at
              <code className="text-accent mx-1">nvchad-termux</code>.
            </p>
            <CodeBlock
              code={`karnel install editor --nvchad`}
              language="bash"
              title="terminal"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
