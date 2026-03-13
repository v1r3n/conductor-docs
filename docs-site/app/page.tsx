import { Sidebar } from "@/components/sidebar";
import { 
  Zap, 
  Shield, 
  Scaling, 
  Bot, 
  ArrowRight, 
  Terminal,
  Globe,
  Clock,
  Workflow
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Durable Execution",
    description: "Automatic state persistence, retries, and recovery. Your workflows survive crashes, restarts, and infrastructure failures.",
  },
  {
    icon: <Scaling className="h-6 w-6" />,
    title: "Infinite Scale",
    description: "Battle-tested at Netflix handling millions of workflows. Scale horizontally with zero code changes.",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Agent Orchestration",
    description: "Native support for LLM providers, vector databases, and tool calling. Build reliable AI agents with built-in observability.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Language Agnostic",
    description: "First-class SDKs for Java, Python, Go, JavaScript, C#, and Clojure. Use what your team knows.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Travel Debugging",
    description: "Replay any workflow execution step-by-step. Debug production issues with full execution history.",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Visual Workflow Builder",
    description: "Design workflows visually or code-first. Real-time execution visualization and monitoring.",
  },
];

const useCases = [
  { 
    title: "Microservices", 
    description: "Coordinate complex service interactions with automatic compensation and rollback." 
  },
  { 
    title: "AI/ML Pipelines", 
    description: "Orchestrate LLM chains, RAG workflows, and multi-agent systems with reliability." 
  },
  { 
    title: "Data Processing", 
    description: "Build ETL pipelines that handle failures gracefully at any scale." 
  },
  { 
    title: "Order Management", 
    description: "Long-running business processes with human-in-the-loop approvals." 
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="ml-64 flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 px-8 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          
          <div className="relative mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
              <Zap size={14} />
              Open Source Workflow Engine
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white">
              Durable Execution for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Distributed Systems
              </span>
            </h1>
            
            <p className="mb-8 max-w-2xl text-xl text-zinc-400">
              Build resilient workflows that survive failures. Orchestrate microservices, 
              AI agents, and long-running processes with confidence at any scale.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/docs/quickstart"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://github.com/conductor-oss/conductor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
            </div>
            
            {/* Quick terminal preview */}
            <div className="mt-12 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-sm text-zinc-500">Terminal</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="text-zinc-500"># Start Conductor with Docker</div>
                <div className="mt-1 text-green-400">
                  $ docker run -p 8080:8080 conductoross/conductor:latest
                </div>
                <div className="mt-3 text-zinc-500"># Or install via Homebrew</div>
                <div className="mt-1 text-green-400">
                  $ brew install conductor-oss/conductor/conductor
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-zinc-800 px-8 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Built for Production
              </h2>
              <p className="text-lg text-zinc-400">
                Everything you need to build and operate reliable distributed systems
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3 text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="border-b border-zinc-800 px-8 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Use Cases
              </h2>
              <p className="text-lg text-zinc-400">
                From startups to Netflix-scale, Conductor powers critical workflows
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <h3 className="mb-1 font-semibold text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SDKs */}
        <section className="border-b border-zinc-800 px-8 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">
                SDKs for Every Stack
              </h2>
              <p className="text-lg text-zinc-400">
                First-class support for popular languages with idiomatic APIs
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
              {["Java", "Python", "Go", "JavaScript", "C#", "Clojure"].map((lang) => (
                <div
                  key={lang}
                  className="flex flex-col items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-center transition-colors hover:border-zinc-700"
                >
                  <span className="font-medium text-zinc-300">{lang}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Build?
            </h2>
            <p className="mb-8 text-lg text-zinc-400">
              Get started with Conductor in minutes. Open source, forever free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs/quickstart"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Read the Docs
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://github.com/conductor-oss/conductor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 px-8 py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between text-sm text-zinc-500">
            <span>Conductor OSS - Apache 2.0 License</span>
            <div className="flex gap-6">
              <a href="https://github.com/conductor-oss/conductor" className="hover:text-zinc-300">
                GitHub
              </a>
              <a href="https://orkes.io/content/community" className="hover:text-zinc-300">
                Community
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
