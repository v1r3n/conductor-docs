"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Zap,
  Layers,
  Code,
  Bot,
  Database,
  Settings,
  HelpCircle,
  Cpu,
  GitBranch,
} from "lucide-react";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: BookOpen },
      { title: "Why Conductor", href: "/docs/why", icon: Zap },
      { title: "Quickstart", href: "/docs/quickstart", icon: Code },
      { title: "Architecture", href: "/docs/architecture", icon: Layers },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Workflows", href: "/docs/concepts/workflows", icon: GitBranch },
      { title: "Tasks", href: "/docs/concepts/tasks", icon: Cpu },
      { title: "Workers", href: "/docs/concepts/workers", icon: Settings },
    ],
  },
  {
    title: "AI & Agents",
    items: [
      { title: "Overview", href: "/docs/ai", icon: Bot },
      { title: "LLM Providers", href: "/docs/ai/llm-providers", icon: Cpu },
      { title: "Vector Databases", href: "/docs/ai/vector-databases", icon: Database },
      { title: "Agent Orchestration", href: "/docs/ai/agent-orchestration", icon: Bot },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Best Practices", href: "/docs/best-practices", icon: BookOpen },
      { title: "FAQ", href: "/docs/faq", icon: HelpCircle },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-background py-8 pr-4">
      <nav className="space-y-8">
        {navigation.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
