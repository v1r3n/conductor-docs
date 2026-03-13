"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  Cpu, 
  Workflow, 
  Server, 
  Code, 
  Sparkles,
  ChevronRight,
  Bot,
  Database,
  Blocks
} from "lucide-react";

type NavItem = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  items?: { title: string; href: string }[];
};

const navigation: NavItem[] = [
  { title: "Home", href: "/", icon: <Home size={18} /> },
  {
    title: "Getting Started",
    icon: <BookOpen size={18} />,
    items: [
      { title: "Why Conductor", href: "/docs/why" },
      { title: "Quick Start", href: "/docs/quickstart" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Core Concepts",
    icon: <Cpu size={18} />,
    items: [
      { title: "Workflows", href: "/docs/concepts/workflows" },
      { title: "Tasks", href: "/docs/concepts/tasks" },
      { title: "Workers", href: "/docs/concepts/workers" },
    ],
  },
  {
    title: "Architecture",
    icon: <Server size={18} />,
    items: [
      { title: "Overview", href: "/docs/architecture" },
      { title: "Durable Execution", href: "/docs/architecture/durable-execution" },
    ],
  },
  {
    title: "AI & Agents",
    icon: <Sparkles size={18} />,
    items: [
      { title: "Overview", href: "/docs/ai" },
      { title: "LLM Providers", href: "/docs/ai/llm-providers" },
      { title: "Vector Databases", href: "/docs/ai/vector-databases" },
      { title: "Agent Orchestration", href: "/docs/ai/agent-orchestration" },
    ],
  },
  {
    title: "SDKs",
    icon: <Code size={18} />,
    items: [
      { title: "Java", href: "/docs/sdks/java" },
      { title: "Python", href: "/docs/sdks/python" },
      { title: "Go", href: "/docs/sdks/go" },
      { title: "JavaScript", href: "/docs/sdks/javascript" },
      { title: "C#", href: "/docs/sdks/csharp" },
      { title: "Clojure", href: "/docs/sdks/clojure" },
    ],
  },
  {
    title: "Best Practices",
    icon: <Workflow size={18} />,
    href: "/docs/best-practices",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-zinc-800 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Blocks size={18} className="text-white" />
          </div>
          <div>
            <span className="font-semibold text-white">Conductor</span>
            <span className="ml-1 text-xs text-zinc-500">OSS</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-blue-600/10 text-blue-400"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ) : (
                  <div className="mb-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-300">
                      {item.icon}
                      {item.title}
                    </div>
                    {item.items && (
                      <ul className="ml-7 space-y-1 border-l border-zinc-800 pl-3">
                        {item.items.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                                pathname === subItem.href
                                  ? "text-blue-400"
                                  : "text-zinc-500 hover:text-zinc-300"
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4">
          <a
            href="https://github.com/conductor-oss/conductor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}
