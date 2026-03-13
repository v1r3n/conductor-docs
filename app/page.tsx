import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  GitBranch,
  Database,
  Bot,
  Terminal,
  BookOpen,
  Github,
} from "lucide-react";

export default function Home() {
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
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
              <Link href="/docs/quickstart" className="text-muted-foreground hover:text-foreground transition-colors">
                Quickstart
              </Link>
              <Link href="/docs/ai" className="text-muted-foreground hover:text-foreground transition-colors">
                AI & Agents
              </Link>
              <Link href="/docs/api" className="text-muted-foreground hover:text-foreground transition-colors">
                API Reference
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
            <Link
              href="/docs/quickstart"
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm">
              <span className="text-primary">Open Source</span>
              <span className="text-muted-foreground">Durable Execution Engine</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build Workflows That{" "}
              <span className="text-primary">Never Fail</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Conductor is a durable execution engine for distributed systems. Build resilient workflows 
              with automatic failure recovery, infinite scalability, and native AI agent orchestration.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/quickstart"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 text-sm font-medium hover:bg-muted transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Read the Docs
              </Link>
            </div>
          </div>

          {/* Terminal Preview */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground">terminal</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-muted-foreground"># Start Conductor in seconds</div>
                <div className="mt-2">
                  <span className="text-green-400">$</span>{" "}
                  <span className="text-foreground">docker run -p 8080:8080 conductoross/conductor:latest</span>
                </div>
                <div className="mt-4 text-muted-foreground"># Create your first workflow</div>
                <div className="mt-2">
                  <span className="text-green-400">$</span>{" "}
                  <span className="text-foreground">curl -X POST http://localhost:8080/api/workflow \</span>
                </div>
                <div className="pl-4 text-foreground">-H &quot;Content-Type: application/json&quot; \</div>
                <div className="pl-4 text-foreground">-d @workflow.json</div>
                <div className="mt-4 text-primary">{"{"} &quot;workflowId&quot;: &quot;abc123...&quot; {"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Conductor?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Purpose-built for distributed systems that demand reliability at scale.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Shield}
              title="Durable Execution"
              description="Workflows survive process crashes, network failures, and infrastructure outages. State is persisted at every step."
            />
            <FeatureCard
              icon={Zap}
              title="Infinite Scale"
              description="Horizontally scale to millions of concurrent workflow executions. No single point of failure."
            />
            <FeatureCard
              icon={Bot}
              title="AI Agent Orchestration"
              description="Native support for LLM integrations, tool calling, and multi-agent coordination with built-in observability."
            />
            <FeatureCard
              icon={GitBranch}
              title="Complex Control Flow"
              description="Fork/join parallelism, dynamic tasks, sub-workflows, and conditional branching out of the box."
            />
            <FeatureCard
              icon={Database}
              title="Flexible Storage"
              description="PostgreSQL, MySQL, Redis, or Elasticsearch. Choose the backend that fits your infrastructure."
            />
            <FeatureCard
              icon={Cpu}
              title="Language Agnostic"
              description="SDKs for Java, Python, Go, C#, JavaScript, and Clojure. Workers can run anywhere."
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Built For
            </h2>
            <p className="mt-4 text-muted-foreground">
              From microservices to AI agents, Conductor powers mission-critical workflows.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <UseCaseCard
              title="Microservices Orchestration"
              description="Coordinate distributed services with saga patterns, compensating transactions, and automatic retries."
              tags={["Saga Pattern", "Distributed Transactions", "Service Mesh"]}
            />
            <UseCaseCard
              title="AI Agent Workflows"
              description="Build ReAct agents, tool-calling loops, and multi-agent systems with built-in LLM integration."
              tags={["LLM Integration", "Tool Calling", "RAG Pipelines"]}
            />
            <UseCaseCard
              title="Data Pipelines"
              description="ETL workflows with fan-out parallelism, checkpointing, and exactly-once processing semantics."
              tags={["ETL", "Fan-out", "Checkpointing"]}
            />
            <UseCaseCard
              title="Order & Payment Processing"
              description="Handle complex business transactions with human-in-the-loop approvals and SLA tracking."
              tags={["Transactions", "Human Tasks", "SLA Management"]}
            />
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Your Language, Your Way
            </h2>
            <p className="mt-4 text-muted-foreground">
              First-class SDKs for all major languages. Write workers in the language you know best.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {["Java", "Python", "Go", "C#", "JavaScript", "Clojure"].map((lang) => (
              <div
                key={lang}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-medium"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to build resilient systems?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Get started with Conductor in under 5 minutes. No credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/quickstart"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Terminal className="h-4 w-4" />
                Start Building
              </Link>
              <a
                href="https://github.com/conductor-oss/conductor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 text-sm font-medium hover:bg-muted transition-colors"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              Conductor OSS
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground transition-colors">
                Documentation
              </Link>
              <a
                href="https://github.com/conductor-oss/conductor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <Link href="/docs/contributing" className="hover:text-foreground transition-colors">
                Contributing
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function UseCaseCard({
  title,
  description,
  tags,
}: {
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
