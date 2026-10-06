import { useLocation, Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { DOCUMENTATION_NAV, ROUTES } from "@/lib/routes";
import SearchModal from "@/components/SearchModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const sidebar = sidebarRef.current;
    const focusable = sidebar?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSidebarOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (sidebar?.contains(document.activeElement)) {
        previousFocus?.focus();
      }
    };
  }, [sidebarOpen]);

  const scrollToSupport = () => {
    if (location !== ROUTES.home) {
      navigate(ROUTES.home);
      setTimeout(() => {
        const el = document.getElementById("support-project");
        if (!el) {
          const observer = new MutationObserver(() => {
            const target = document.getElementById("support-project");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
              observer.disconnect();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      document
        .getElementById("support-project")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [{ label: "Get Started", href: ROUTES.home }];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Skip to content
      </a>
      {/* Sidebar - responsive width */}
      <nav
        ref={sidebarRef}
        id="mobile-navigation"
        aria-label="Main navigation"
        className={`fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 visible"
            : "-translate-x-full invisible lg:visible"
        } w-full sm:w-72 lg:w-64 xl:w-72 max-w-[85vw]`}
      >
        <div className="flex flex-col h-full p-4 sm:p-6">
          {/* Logo */}
          <Link
            href={ROUTES.home}
            className="flex items-center gap-3 mb-8 hover:opacity-90 transition-all duration-300 group"
          >
            <img
              src="/karnel-logo.png"
              alt="Karnel Termux"
              className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-lg font-mono text-foreground group-hover:text-accent transition-colors">
                KARNEL
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-accent/70 transition-colors">
                TERMUX
              </p>
            </div>
          </Link>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex w-full items-center gap-3 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground mb-4 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search tools...</span>
            <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 text-xs sm:inline-block">
              ⌘K
            </kbd>
          </button>

          {/* Navigation */}
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-2">
            {/* Core Items (always visible) */}
            {navItems.map(item => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href || "/"}
                  className={`block px-4 py-2.5 rounded-md transition-all duration-200 font-mono text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-l-2 border-accent shadow-sm shadow-accent/20"
                      : "text-sidebar-foreground hover:bg-sidebar-primary/15 hover:text-accent/80"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="my-4 h-px bg-sidebar-border/30" />

            {DOCUMENTATION_NAV.map(item => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href || "/"}
                  className={`block px-4 py-2 rounded-md transition-all duration-200 font-mono text-xs font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-l border-accent shadow-sm shadow-accent/20"
                      : "text-sidebar-foreground hover:bg-sidebar-primary/15 hover:text-accent/80"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {/* Keep the footer visible while the documentation list scrolls. */}
          <div className="shrink-0 pt-6 border-t border-sidebar-border/50 space-y-3">
            <button
              onClick={() => {
                scrollToSupport();
                setSidebarOpen(false);
              }}
              className="block w-full text-center px-4 py-2 bg-accent/20 text-accent rounded-lg font-mono text-sm font-medium hover:bg-accent/30 transition-colors"
            >
              Support Project
            </button>
            <p className="text-xs text-muted-foreground font-mono">
              <span className="text-accent">v4.18.0</span> • Android + Termux
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Built for developers
            </p>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - always visible on mobile, hidden on lg+ */}
        <header className="sticky top-0 z-30 bg-card border-b border-border lg:hidden">
          <div className="flex items-center justify-between p-4">
            <Link href={ROUTES.home} className="flex items-center gap-2">
              <img
                alt="Karnel Termux"
                className="w-9 h-9 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                src="/karnel-logo.png"
              />
              <span className="font-bold font-mono text-sm">KARNEL</span>
            </Link>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                type="button"
                aria-label="Search tools"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 size-11"
              >
                <Search size={20} className="text-foreground" />
              </button>
              <button
                ref={menuButtonRef}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                type="button"
                aria-label={
                  sidebarOpen ? "Close navigation" : "Open navigation"
                }
                aria-expanded={sidebarOpen}
                aria-controls="mobile-navigation"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 size-11"
              >
                {sidebarOpen ? (
                  <X size={20} className="text-foreground" />
                ) : (
                  <Menu size={20} className="text-foreground" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-auto min-h-0"
        >
          <div className="max-w-6xl mx-auto w-full py-8">{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border p-6 text-center text-sm text-muted-foreground">
          <p>
            Karnel Termux — Built by{" "}
            <a
              href="https://github.com/karnel-termuxOFC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-semibold"
            >
              israel marques
            </a>
          </p>
          <p className="mt-2 text-xs">
            <a
              href="mailto:israelmarques1024@gmail.com"
              className="text-accent/70 hover:text-accent transition-colors"
            >
              israelmarques1024@gmail.com
            </a>
          </p>
          <p className="mt-3">
            <a
              href="https://karneltermux.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Documentação
            </a>
            {" · "}
            <a
              href="https://github.com/karnel-termuxOFC/karnel-termux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Karnel Mobile Repo
            </a>
            {" · "}

            <a
              href="https://github.com/karnel-termuxOFC/karnel-termux/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              MIT License
            </a>
            {" · "}
            <Link href="/terms" className="text-accent hover:underline">
              Terms
            </Link>
          </p>
        </footer>
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </div>
  );
}
