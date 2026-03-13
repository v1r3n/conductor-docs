import Link from "next/link";
import { Zap, Github } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              Conductor
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/docs" className="text-foreground font-medium">
                Docs
              </Link>
              <Link href="/docs/quickstart" className="text-muted-foreground hover:text-foreground transition-colors">
                Quickstart
              </Link>
              <Link href="/docs/ai" className="text-muted-foreground hover:text-foreground transition-colors">
                AI & Agents
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/conductor-oss/conductor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="flex-1 px-8 py-12">{children}</main>
      </div>
    </div>
  );
}
