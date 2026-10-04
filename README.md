<p align="center">
  <img src="https://raw.githubusercontent.com/karnel-termuxOFC/karnel-termux/main/assets/images/karnel-logo.png" alt="Karnel Termux Logo" width="400">
</p>

<p align="center">
  <strong>Official documentation site for Karnel Termux.</strong>
</p>

<p align="center">
  <a href="https://karneltermux.vercel.app">
    <img src="https://img.shields.io/badge/Site-karneltermux.vercel.app-0078D4?style=for-the-badge" alt="Site">
  </a>
  <a href="https://github.com/karnel-termuxOFC/karnel-termux">
    <img src="https://img.shields.io/badge/CLI%20Repo-karnel--termux-0078D4?style=for-the-badge" alt="CLI">
  </a>
  <a href="https://github.com/karnel-termuxOFC/karnel-termux-site">
    <img src="https://img.shields.io/badge/license-MIT-0078D4?style=for-the-badge" alt="License">
  </a>
</p>

---

**Karnel Termux** is a modular development environment for Termux on Android.

This site hosts the official documentation for the Karnel Termux CLI.

Created by **Israel Marques**.

---

## Features

- **Documentation** for all CLI commands and modules, including Robin OSINT
- **AI tools page** — Browse and install 46 agents, gateways, and developer utilities
- **CLI-synchronized catalog** — Install flags and counts are generated from the Karnel CLI registries
- **Interactive guides** — Doctor checks, PostgreSQL, voice commands, and more
- **Responsive** — Works on mobile and desktop
- **Dark theme** — Easy on the eyes

## Pages

| Page            | Route                  | Description                                                   |
| --------------- | ---------------------- | ------------------------------------------------------------- |
| Home            | `/`                    | Landing page with installation and feature overview           |
| Termux          | `/termux`              | Termux-specific tools                                         |
| Termux API      | `/termux/api`          | Termux:API integration                                        |
| Karnel Docs     | `/karnel`              | CLI command and module documentation                          |
| AI Tools        | `/karnel/ai`           | AI agents, gateways, and developer utilities                  |
| Karnel OSINT    | `/karnel/osint`        | Robin, Tor, privacy model, and lifecycle                      |
| Code Editor     | `/karnel/editor`       | code-server (VS Code in browser)                              |
| Deploy          | `/karnel/deploy`       | Deployment guides for Vercel, Railway, and Netlify            |
| Supabase        | `/karnel/supabase`     | Supabase CLI compatibility guidance for Android/Termux        |
| Doctor          | `/karnel/doctor`       | Termux diagnostics and project code analysis                  |
| Show Docs       | `/karnel/show`         | Tool documentation viewer                                     |
| Linux           | `/karnel/linux`        | Linux-specific tools                                          |
| Brain           | `/karnel/brain`        | Second brain memory system docs                               |
| Voice           | `/karnel/voice`        | Voice command agent                                           |
| PG              | `/karnel/pg`           | PostgreSQL manager                                            |
| Init            | `/karnel/init`         | Project templates                                             |
| Env             | `/karnel/env`          | Environment variable management                               |
| Karnel Lang     | `/karnel/lang`         | Languages (Node.js, Python, Go, Rust, C/C++, PHP, Perl)       |
| Karnel DB       | `/karnel/db`           | Database module (PostgreSQL, MariaDB, SQLite, MongoDB, Redis) |
| Karnel Dev      | `/karnel/dev`          | Development tools                                             |
| Karnel Npm      | `/karnel/npm`          | Global npm packages                                           |
| Karnel Shell    | `/karnel/shell`        | ZSH + Oh My Zsh                                               |
| Karnel UI       | `/karnel/ui`           | Font, cursor, extra-keys, and banner                          |
| Karnel Auto     | `/karnel/auto`         | n8n automation                                                |
| Karnel Games    | `/karnel/games`        | Terminal games                                                |
| Karnel Network  | `/karnel/network`      | Network tools                                                 |
| Karnel Utils    | `/karnel/utils`        | Utility scripts                                               |
| Karnel Cleanup  | `/karnel/cleanup`      | Cache, log, and temporary-file cleanup                        |
| Karnel Backup   | `/karnel/backup`       | Archive and restore scope, including limitations              |
| Karnel Plugin   | `/karnel/plugin`       | Plugin manager (enable/disable/config) and development guide  |
| Karnel Security | `/karnel/security`     | Security tools                                                |
| IA (AI Manager) | `/karnel/ia`           | AI agent sessions, install tools, show launchers              |
| Search          | `/karnel/search`       | Unified search across tools and Brain memories                |
| Status          | `/karnel/status`       | System health dashboard (disk, RAM, services)                 |
| Stats           | `/karnel/stats`        | System overview: versions, modules, disk, tool counts         |
| Update          | `/karnel/update`       | Update modules or the framework                               |
| Upgrade         | `/karnel/upgrade`      | Full framework upgrade with cleanup                           |
| List            | `/karnel/list`         | List tools by category with install status                    |
| Start           | `/karnel/start`        | Start services (code-server, Robin)                           |
| Supabase CLI    | `/karnel/supabase-cmd` | Supabase CLI wrapper with Termux safety checks                |
| Changelog       | `/karnel/changelog`    | Release history and version notes                             |
| Terms           | `/terms`               | Terms of service                                              |
| Not Found       | `/404`                 | Explicit not-found page                                       |

---

## Tech Stack

| Technology   | Purpose              |
| ------------ | -------------------- |
| React 19     | UI framework         |
| Vite         | Build tool           |
| TypeScript   | Type safety          |
| Tailwind CSS | Styling              |
| wouter       | Client-side routing  |
| Lucide React | Icons                |
| Vercel       | Hosting & deployment |

---

## Run Locally

The supported development runtime is Node.js 24 with pnpm 10.15.1, as pinned by
`package.json` and `pnpm-lock.yaml`.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser.

### Build

```bash
pnpm build
pnpm preview
```

### Synchronize The Catalog

The catalog in `client/src/data/catalog.ts` is generated from the pinned CLI
revision declared in `scripts/generate-catalog.mjs`. Do not edit it by hand.
To refresh it from that published CLI revision (this is the only catalog command
that accesses the network):

```bash
npm run catalog:refresh
```

To generate from a local CLI checkout before it is published:

```bash
KARNEL_REPO_DIR=/path/to/karnel-termux npm run catalog:refresh
```

Verify that the generated file has not drifted from a local CLI checkout without
writing files:

```bash
KARNEL_REPO_DIR=/path/to/karnel-termux npm run catalog:check
```

After generating, run the full verification suite:

```bash
pnpm format:check
pnpm check
```

The site reads only public CLI metadata. Never place GitHub, npm, Vercel, Puter,
or other service tokens in source files, generated catalog data, or documentation.

### Framework Updates

The site documents the CLI behavior: `karnel update karnel` uses the official
curl installer first, then falls back to a local Git checkout and package-manager
installs. Keep this description synchronized with `karnel/cli/commands/update.sh`.

---

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable components
│   ├── data/           # Synchronized tool catalog
│   ├── hooks/          # Navigation and viewport hooks
│   ├── lib/            # Routes, contracts, and utilities
│   ├── pages/          # Page components
│   └── index.css       # Global styles
├── index.html
package.json            # Scripts and dependencies
pnpm-lock.yaml          # Reproducible dependency graph
tsconfig.json           # TypeScript configuration
vercel.json             # Production deployment settings
vite.config.ts          # Vite and build configuration
```

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b my-feature`
3. Make your changes
4. Run: `pnpm format:check && pnpm check`
5. Push and open a PR

---

## License

MIT © Israel Marques

---

<p align="center">
  <a href="https://karneltermux.vercel.app">
    <img src="https://img.shields.io/badge/Visit%20Site-0078D4?style=for-the-badge" alt="Site">
  </a>
  <a href="https://github.com/karnel-termuxOFC/karnel-termux">
    <img src="https://img.shields.io/badge/Karnel%20Termux-181717?style=for-the-badge&logo=github" alt="CLI">
  </a>

</p>
