import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { format } from "prettier";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KARNEL_REF = "993646aa095b290adc04835c38c98a56ff05c212"; // v4.17.44
const GITHUB_RAW = `https://raw.githubusercontent.com/israelmarques1024-dotcom/karnel-termux/${KARNEL_REF}`;
const LOCAL_KARNEL_ROOT = process.env.KARNEL_REPO_DIR;
const CHECK = process.argv.includes("--check");
const ALLOW_NETWORK_CHECK =
  process.env.KARNEL_ALLOW_NETWORK_CATALOG_CHECK === "1";

async function fetchText(url) {
  if (LOCAL_KARNEL_ROOT && url.startsWith(`${GITHUB_RAW}/`)) {
    const relative = url.slice(`${GITHUB_RAW}/`.length);
    return readFileSync(join(LOCAL_KARNEL_ROOT, relative), "utf8");
  }
  if (CHECK && !ALLOW_NETWORK_CHECK) {
    throw new Error(
      "Catalog check requires KARNEL_REPO_DIR; refusing network access."
    );
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

function parseArray(text, varName) {
  const re = new RegExp(`${varName}=\\(([^)]+)\\)`, "s");
  const m = text.match(re);
  if (!m) throw new Error(`Missing ${varName} registry`);
  const body = m[1];
  if (body.replace(/"([^"\\]|\\.)*"/g, "").trim()) {
    throw new Error(`Malformed ${varName} registry`);
  }
  const items = [];
  const qre = /"([^"]+)"/g;
  let qm;
  while ((qm = qre.exec(body)) !== null) {
    const val = qm[1].trim();
    if (val && !val.startsWith("#") && !val.startsWith("/")) items.push(val);
  }
  if (!items.length) throw new Error(`${varName} registry is empty`);
  return items;
}

function toDisplayName(name) {
  if (name.toLowerCase() === "supabase") return "Supabase CLI";
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/^Npm\b/i, "NPM")
    .replace(/^Ncurses\b/i, "Ncurses")
    .replace(/\bCli\b/i, "CLI")
    .replace(/\bOsint\b/i, "OSINT");
}

function toFlag(name) {
  return name.startsWith("--") ? name : `--${name}`;
}

async function fetchRegistry(name, file, parser = null) {
  const text = await fetchText(`${GITHUB_RAW}/karnel/tools/${file}/all.sh`);
  const items = parser ? parser(text) : parseArray(text, name);
  if (!items.length) throw new Error(`${name} registry is empty`);
  return items;
}

function parseAIRegistry(text) {
  const items = parseArray(text, "AI_TOOLS_REGISTRY");
  const entries = [];
  for (const item of items) {
    const parts = item.split(":");
    if (parts.length !== 3 || parts.some(part => !part.trim())) {
      throw new Error(`Malformed AI registry entry: ${item}`);
    }
    const [id, name, binary] = parts;
    entries.push({ id, name, binary, flag: `--${id}` });
  }
  return entries;
}

function lookupDescriptions(category) {
  const descs = {
    ai: {
      "10router": "Multi-agent orchestrator for parallel AI tasks",
      "qwen-code": "Alibaba coding assistant with multilingual support",
      "gemini-cli": "Google Gemini AI assistant",
      "claude-code": "Anthropic Claude coding agent",
      "mistral-vibe": "Mistral AI coding assistant",
      "openclaude": "Self-hosted Claude-compatible agent",
      "openclaw": "Lightweight Claude-compatible CLI",
      "ollama": "Run open-source LLMs locally",
      "codex": "OpenAI Codex coding agent",
      "opencode": "Terminal-native AI coding assistant",
      "mimocode": "Xiaomi MiMo coding agent",
      "engram": "Persistent memory for AI sessions",
      "codegraph": "AI code analysis and graph visualization",
      "pi": "Minimalist AI coding agent",
      "antigravity-cli": "Agentic coding assistant",
      "minimax-cli": "Minimax AI coding agent",
      "gentle-ai": "AI pair programmer with guardrails",
      "gga": "Google Gemini agent for coding",
      "hermes-agent": "NousResearch Hermes agent",
      "kimi-code": "Moonshot Kimi coding assistant",
      "command-code": "Command-line AI coding agent",
      "codebuff": "AI pair programmer",
      "freebuff": "Free AI coding assistant",
      "kilocode-cli": "Hosted coding-agent CLI",
      "kiro": "AI-powered IDE agent",
      "crush": "Anthropic Crush coding agent",
      "cline": "VS Code AI extension CLI",
      "odysseus": "Autonomous AI coding agent",
      "kimchi-code": "Korean-focused AI coding assistant",
      "omni-route": "Multi-model AI routing proxy",
      "ctx7": "Documentation context provider for AI agents",
      "openspec": "AI-powered specification-driven development",
      "supercode-cli": "AI coding assistant with multi-model support",
      "puter": "Cloud desktop and AI agent platform",
      "keelcode": "Hosted coding-agent CLI",
      "copilot-termux": "GitHub Copilot for Termux",
      "qoder": "AI coding agent with codebase understanding",
      "ampcode": "Sourcegraph Amp AI coding agent",
      "cursor-cli": "Cursor AI editor CLI agent",
      "oh-my-pi": "AI agent framework for Raspberry Pi",
      "goose": "AI agent that executes code and commands",
      "droid": "Factory Droid autonomous coding agent",
      "cactus": "AI coding agent with codebase awareness",
      "cactus-needle": "Cactus agent remote execution layer",
      "walkie": "Voice-controlled AI coding agent",
      "hugging-face": "Hugging Face model hub CLI",
    },
    dev: {
      gh: "Manage GitHub from the terminal",
      wget: "Network downloader",
      curl: "HTTP client",
      lsd: "Modern ls with icons",
      bat: "Modern cat with syntax highlighting",
      proot: "Isolated Linux environment without root",
      ncurses: "Terminal utilities",
      tmate: "Terminal sharing",
      openssh: "Secure shell client and server",
      tmux: "Terminal multiplexer",
      cloudflared: "Cloudflare tunnel",
      translate: "Terminal translator",
      html2text: "Convert HTML to text",
      jq: "JSON processor",
      bc: "Precision calculator",
      tree: "Display directory trees",
      fzf: "Fuzzy finder",
      imagemagick: "Image manipulation",
      shfmt: "Shell formatter",
      make: "Build automation",
      udocker: "Rootless containers",
      snyk: "Security scanner",
    },
    lang: {
      bun: "Fast all-in-one JavaScript runtime",
      nodejs: "V8-based JavaScript runtime",
      python: "Versatile language for scripts and apps",
      perl: "Text processing and scripting",
      php: "Web server language",
      rust: "Systems programming with safety and performance",
      clang: "Native compilation with Clang/GCC",
      golang: "Compiled concurrent language",
    },
    db: {
      postgresql: "Advanced relational database",
      mariadb: "MySQL-compatible, robust",
      sqlite: "Embedded lightweight database",
      mongodb: "NoSQL document database",
      redis: "In-memory cache and message broker",
    },
    editor: {
      "code-server": "VS Code in browser",
      neovim: "Modern Vim-based editor",
      nvchad: "Neovim IDE configuration",
    },
    npm: {
      typescript: "JavaScript with types",
      nestjs: "Progressive Node.js framework",
      prettier: "Code formatter",
      "live-server": "Server with live reload",
      localtunnel: "Public tunnels for localhost",
      vercel: "Deploy to Vercel",
      markserv: "Markdown server",
      psqlformat: "SQL formatter",
      ncu: "Check package updates",
      ngrok: "Public tunnels for localhost",
      turbopack: "Extremely fast Rust bundler",
    },
    shell: {
      powerlevel10k: "Fastest and most beautiful ZSH theme",
      "zsh-defer": "Async plugin loading",
      "zsh-autosuggestions": "Fish-style autocomplete",
      "zsh-syntax-highlighting": "Syntax highlighting in commands",
      "history-substring": "Fish-style history search",
      "zsh-completions": "Extra completion definitions",
      "fzf-tab": "Fuzzy tab completion with fzf",
      "you-should-use": "Reminds you of existing aliases",
      "zsh-autopair": "Auto-close brackets and quotes",
      "better-npm": "Improved npm completion",
    },
    ui: {
      font: "Font with ligatures and icons",
      "extra-keys": "Additional keys on Termux keyboard",
      cursor: "Styled cursor with gradient",
      banner: "ASCII banner with metallic effect on startup",
    },
    auto: {
      n8n: "Workflow automation platform with visual flows",
    },
    deploy: {
      railway: "Full-stack with databases",
      netlify: "Static sites & edge functions",
      vercel: "Frontend deployment platform",
      supabase:
        "Supabase CLI for project workflows; its native binary is not supported on Android/Termux.",
    },
    network: {
      dark: "Tor crawler and scraper for OSINT research",
      "dedsec-network": "Multi-purpose network scanner, OSINT, and pentest",
    },
    utils: {
      httptmux: "Interactive API client",
      zork: "Classic text adventures",
      fconv: "Convert files between common formats",
      filecheck: "Inspect file integrity and metadata",
      websites: "Scaffold website projects",
      notes: "Manage notes from the terminal",
      treex: "Explore project trees interactively",
      passman: "Local password management",
      applaunch: "Launch installed applications",
      splash: "Customize the startup splash",
      qrcode: "Generate QR codes from URLs and text",
      superfile: "Terminal file manager",
    },
    security: {
      nmap: "Network discovery and port scanner",
      hydra: "Brute-force login cracker",
      nikto: "Web server vulnerability scanner",
      sqlmap: "SQL injection automation tool",
      gobuster: "Directory and DNS brute-force scanner",
      dirb: "Web content scanner",
      wpscan: "WordPress security scanner",
      john: "Password hash cracker",
      "aircrack-ng": "WiFi network auditing toolkit",
      metasploit: "Penetration testing framework",
      burpsuite: "Web application security testing",
      zap: "OWASP web application security scanner",
      enum4linux: "SMB/NetBIOS enumeration tool",
      smbclient: "SMB file sharing client",
      ffuf: "Fast web fuzzer",
      whatweb: "Web technology fingerprinter",
      wafw00f: "WAF detection tool",
      dnsrecon: "DNS enumeration and reconnaissance",
      theharvester: "Email and subdomain harvester",
      subfinder: "Subdomain discovery tool",
      amass: "Attack surface mapping tool",
      masscan: "Fast port scanner",
      netcat: "Network Swiss army knife",
      tcpdump: "Network packet analyzer",
      whois: "Domain ownership lookup",
      hashcat: "Advanced password recovery",
      binwalk: "Firmware analysis tool",
      foremost: "File recovery tool",
      steghide: "Steganography tool",
      exiftool: "Metadata reader and editor",
    },
    osint: {
      robin:
        "AI-assisted dark-web OSINT through Tor and a loopback-only Streamlit UI",
    },
    games: {
      buzz: "Quiz game with multiple categories",
      ctfgod: "Capture The Flag challenge solver",
      detective: "Mystery investigation game",
      "pet-friends": "Virtual pet simulator",
      tamagotchi: "Retro digital pet",
      arcade: "Classic arcade games in terminal",
    },
  };
  return descs[category] || {};
}

function generateCategory(name, items, descs) {
  if (!items.length) return `export const ${name} = [] as const;\n`;
  const entries = items.map(item => {
    let displayName, flag, bin;
    if (item.binary) {
      ({ name: displayName, binary: bin, flag } = item);
    } else {
      const toolName = typeof item === "string" ? item : item.name || item;
      displayName = toDisplayName(toolName);
      flag = toFlag(toolName);
      bin = toolName;
    }
    const desc =
      descs[bin] ||
      descs[flag.replace("--", "")] ||
      `${displayName} managed through the Karnel ${name.replace(/Tools$/, "").toLowerCase()} module.`;
    return `  { name: ${JSON.stringify(displayName)}, flag: ${JSON.stringify(flag)}, desc: ${JSON.stringify(desc)} },`;
  });
  return `export const ${name} = [\n${entries.join("\n")}\n] as const;\n`;
}

async function main() {
  const [
    aiTools,
    devTools,
    langTools,
    dbTools,
    editorTools,
    npmTools,
    shellTools,
    uiTools,
  ] = await Promise.all([
    fetchRegistry("AI_TOOLS_REGISTRY", "ai", parseAIRegistry),
    fetchRegistry("TOOLS_PACKAGES", "dev"),
    fetchRegistry("LANGUAGE_PACKAGES", "lang"),
    fetchRegistry("DB_TOOLS", "db"),
    fetchRegistry("EDITOR_COMPONENTS", "editor"),
    fetchRegistry("NODE_PACKAGES", "npm"),
    fetchRegistry("SHELL_PLUGINS", "shell"),
    fetchRegistry("UI_COMPONENTS", "ui"),
  ]);

  const autoTools = await fetchRegistry("AUTOMATION_TOOLS", "auto");
  const deployTools = await fetchRegistry("DEPLOY_TOOLS", "deploy");
  const networkTools = await fetchRegistry("NETWORK_TOOLS", "network");
  const utilsTools = await fetchRegistry("TOOLS_PACKAGES", "utils");
  const osintTools = await fetchRegistry("OSINT_TOOLS", "osint");
  const gamesTools = await fetchRegistry("TOOLS_PACKAGES", "games");
  const securityTools = await fetchRegistry("SECURITY_TOOLS", "security");

  let output = `// Auto-generated by scripts/generate-catalog.mjs
// DO NOT EDIT — source of truth is karnel-termux CLI registries.
// Run: node scripts/generate-catalog.mjs

${generateCategory("AI_TOOLS", aiTools, lookupDescriptions("ai"))}
${generateCategory("DEV_TOOLS", devTools, lookupDescriptions("dev"))}
${generateCategory("NETWORK_TOOLS", networkTools, lookupDescriptions("network"))}
${generateCategory("UTILS_TOOLS", utilsTools, lookupDescriptions("utils"))}
${generateCategory("OSINT_TOOLS", osintTools, lookupDescriptions("osint"))}
${generateCategory("LANG_TOOLS", langTools, lookupDescriptions("lang"))}
${generateCategory("DB_TOOLS", dbTools, lookupDescriptions("db"))}
${generateCategory("EDITOR_TOOLS", editorTools, lookupDescriptions("editor"))}
${generateCategory("AUTO_TOOLS", autoTools, lookupDescriptions("auto"))}
${generateCategory("DEPLOY_TOOLS", deployTools, lookupDescriptions("deploy"))}
${generateCategory("NPM_TOOLS", npmTools, lookupDescriptions("npm"))}
${generateCategory("SHELL_TOOLS", shellTools, lookupDescriptions("shell"))}
${generateCategory("UI_TOOLS", uiTools, lookupDescriptions("ui"))}
${generateCategory("GAMES_TOOLS", gamesTools, lookupDescriptions("games"))}
${generateCategory("SECURITY_TOOLS", securityTools, lookupDescriptions("security"))}

export const CATALOG_COUNTS = {
  ai: AI_TOOLS.length,
  dev: DEV_TOOLS.length,
  network: NETWORK_TOOLS.length,
  utils: UTILS_TOOLS.length,
  osint: OSINT_TOOLS.length,
  lang: LANG_TOOLS.length,
  db: DB_TOOLS.length,
  editor: EDITOR_TOOLS.length,
  auto: AUTO_TOOLS.length,
  deploy: DEPLOY_TOOLS.length,
  npm: NPM_TOOLS.length,
  shell: SHELL_TOOLS.length,
  ui: UI_TOOLS.length,
  games: GAMES_TOOLS.length,
  security: SECURITY_TOOLS.length,
} as const;
`;

  const outPath = join(__dirname, "..", "client", "src", "data", "catalog.ts");
  output = await format(output, { filepath: outPath });
  if (CHECK) {
    if (readFileSync(outPath, "utf8") !== output) {
      throw new Error(
        "Catalog drift detected. Regenerate with KARNEL_REPO_DIR=/path/to/karnel-termux node scripts/generate-catalog.mjs"
      );
    }
    console.log("Catalog matches CLI registries.");
    return;
  }
  writeFileSync(outPath, output, "utf-8");
  console.log(
    `Generated ${outPath} (${aiTools.length} AI, ${devTools.length} Dev, ${langTools.length} Lang, ${dbTools.length} DB, ${editorTools.length} Editor, ${npmTools.length} NPM, ${shellTools.length} Shell, ${uiTools.length} UI, ${autoTools.length} Auto, ${deployTools.length} Deploy, ${networkTools.length} Network, ${utilsTools.length} Utils, ${osintTools.length} OSINT, ${gamesTools.length} Games, ${securityTools.length} Security)`
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
