import Link from "next/link";
import { ArrowRight, BookOpen, Code, Bot, Layers } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        Conductor is a durable execution engine for building resilient, distributed applications. 
        Learn how to orchestrate workflows, build AI agents, and scale to millions of executions.
      </p>

      <div className="mt-12 grid gap-6">
        <QuickLink
          href="/docs/quickstart"
          icon={Code}
          title="Quickstart"
          description="Get Conductor running and create your first workflow in under 5 minutes."
        />
        <QuickLink
          href="/docs/why"
          icon={BookOpen}
          title="Why Conductor"
          description="Understand durable execution and why it matters for distributed systems."
        />
        <QuickLink
          href="/docs/architecture"
          icon={Layers}
          title="Architecture"
          description="Learn how Conductor works under the hood and its core components."
        />
        <QuickLink
          href="/docs/ai"
          icon={Bot}
          title="AI & Agent Orchestration"
          description="Build LLM-powered workflows, RAG pipelines, and multi-agent systems."
        />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Core Concepts</h2>
        <p className="mt-2 text-muted-foreground">
          Master the fundamentals of workflow orchestration.
        </p>

        <div className="mt-6 space-y-4">
          <ConceptCard
            title="Workflows"
            description="Define the sequence and dependencies of tasks. Workflows are the blueprint for your business processes."
            href="/docs/concepts/workflows"
          />
          <ConceptCard
            title="Tasks"
            description="The individual units of work in a workflow. Tasks can be system tasks or custom worker tasks."
            href="/docs/concepts/tasks"
          />
          <ConceptCard
            title="Workers"
            description="External processes that execute custom task logic. Workers poll Conductor for work and report results."
            href="/docs/concepts/workers"
          />
        </div>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-card/80"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

function ConceptCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
