import { CheckCircle } from "lucide-react";

export default function WhyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">Why Conductor</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Understand durable execution and why it&apos;s essential for building reliable distributed systems.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-bold">The Problem with Distributed Systems</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Building reliable distributed systems is hard. Networks fail, processes crash, and databases become unavailable. 
            Traditional approaches require you to handle these failures manually with complex retry logic, state management, 
            and compensation mechanisms scattered throughout your codebase.
          </p>
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Common challenges:</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-red-400">x</span>
                Partial failures leave systems in inconsistent states
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">x</span>
                Retry logic becomes complex and error-prone
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">x</span>
                State management is scattered across services
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">x</span>
                Debugging distributed workflows is nearly impossible
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Durable Execution</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Durable execution is a programming model where your code&apos;s state is automatically persisted at every step. 
            If a process crashes, execution resumes exactly where it left off. No lost progress, no inconsistent state.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Automatic Persistence</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every task completion is durably stored. Failures never lose progress.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Transparent Retries</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Failed tasks are automatically retried with configurable backoff strategies.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Exactly-Once Semantics</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Idempotency keys ensure tasks execute exactly once, even after retries.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Full Observability</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete execution history with inputs, outputs, and timing for every task.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Why Conductor?</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Conductor is the open-source durable execution engine built for scale. Unlike alternatives, 
            Conductor provides a declarative workflow model that separates orchestration logic from business logic.
          </p>
          <div className="mt-6 space-y-4">
            <Benefit
              title="Declarative Workflows"
              description="Define workflows as JSON or code. The orchestration logic is separate from your workers."
            />
            <Benefit
              title="Language Agnostic"
              description="Workers can be written in any language. Mix Java, Python, Go, and more in the same workflow."
            />
            <Benefit
              title="Battle-Tested at Scale"
              description="Originally built at Netflix, Conductor powers millions of workflow executions daily."
            />
            <Benefit
              title="Rich Task Library"
              description="Built-in HTTP, Lambda, AI, and control flow tasks. Extend with custom workers."
            />
            <Benefit
              title="Flexible Deployment"
              description="Run on-prem or in the cloud. Choose your database backend."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">When to Use Conductor</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Conductor excels at orchestrating complex, long-running processes that span multiple services.
          </p>
          <div className="mt-6 grid gap-4">
            <UseCase
              title="Microservices Orchestration"
              examples={["Order processing", "Payment workflows", "User onboarding"]}
            />
            <UseCase
              title="AI & Agent Workflows"
              examples={["LLM pipelines", "RAG applications", "Multi-agent systems"]}
            />
            <UseCase
              title="Data Engineering"
              examples={["ETL pipelines", "Batch processing", "Data migrations"]}
            />
            <UseCase
              title="Business Process Automation"
              examples={["Approval workflows", "Document processing", "Compliance checks"]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Benefit({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function UseCase({ title, examples }: { title: string; examples: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((example) => (
          <span
            key={example}
            className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}
