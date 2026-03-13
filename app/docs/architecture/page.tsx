import { Server, Database, Workflow, Cpu, ArrowRight, ArrowDown } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">Architecture</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Learn how Conductor works under the hood and its core components.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-bold">System Overview</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Conductor uses a server-worker architecture where the Conductor server manages workflow state 
            and task scheduling, while workers execute the actual business logic.
          </p>

          {/* Architecture Diagram */}
          <div className="mt-8 rounded-xl border border-border bg-card p-8">
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-lg border border-border bg-secondary px-6 py-3 text-center">
                <div className="text-xs text-muted-foreground">Your Application</div>
                <div className="mt-1 font-medium">API Client</div>
              </div>
              
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
              
              <div className="flex items-center gap-4">
                <div className="rounded-lg border-2 border-primary bg-primary/10 px-6 py-4 text-center">
                  <Server className="mx-auto h-6 w-6 text-primary" />
                  <div className="mt-2 font-semibold">Conductor Server</div>
                  <div className="mt-1 text-xs text-muted-foreground">Orchestration Engine</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="rounded-lg border border-border bg-secondary px-4 py-3 text-center">
                  <Database className="mx-auto h-5 w-5 text-muted-foreground" />
                  <div className="mt-1 text-sm font-medium">Database</div>
                </div>
                <div className="rounded-lg border border-border bg-secondary px-4 py-3 text-center">
                  <Workflow className="mx-auto h-5 w-5 text-muted-foreground" />
                  <div className="mt-1 text-sm font-medium">Task Queue</div>
                </div>
              </div>
              
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
              
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border border-border bg-secondary px-4 py-3 text-center">
                    <Cpu className="mx-auto h-5 w-5 text-muted-foreground" />
                    <div className="mt-1 text-sm font-medium">Worker {i}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Core Components</h2>
          
          <div className="mt-6 space-y-6">
            <ComponentCard
              icon={Server}
              title="Conductor Server"
              description="The central orchestration engine that manages workflow definitions, executes workflows, schedules tasks, and maintains state. Exposes REST and gRPC APIs for clients and workers."
            />
            <ComponentCard
              icon={Database}
              title="Persistence Layer"
              description="Stores workflow definitions, execution state, and task data. Supports PostgreSQL, MySQL, Redis, and Elasticsearch backends."
            />
            <ComponentCard
              icon={Workflow}
              title="Task Queue"
              description="Manages pending tasks for workers. Supports multiple queue implementations for different scaling needs."
            />
            <ComponentCard
              icon={Cpu}
              title="Workers"
              description="External processes that poll for tasks, execute business logic, and report results back to the server. Can be written in any language with an SDK."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Execution Flow</h2>
          <p className="mt-4 text-muted-foreground">
            How a workflow execution progresses through the system:
          </p>
          
          <div className="mt-6 space-y-4">
            <Step number={1} title="Workflow Start">
              Application starts a workflow via API. Conductor creates an execution record and returns a workflow ID.
            </Step>
            <Step number={2} title="Task Scheduling">
              Conductor evaluates the workflow definition and schedules the first task(s) to the task queue.
            </Step>
            <Step number={3} title="Worker Polling">
              Workers poll the server for tasks matching their task type. Conductor assigns pending tasks to available workers.
            </Step>
            <Step number={4} title="Task Execution">
              Worker executes the task logic and reports the result (completed/failed) back to Conductor.
            </Step>
            <Step number={5} title="State Update">
              Conductor updates the workflow state and schedules the next task(s) based on the workflow definition.
            </Step>
            <Step number={6} title="Workflow Completion">
              When all tasks complete (or a terminal state is reached), the workflow is marked as completed.
            </Step>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Scaling</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Conductor is designed for horizontal scalability. Both the server and workers can be scaled independently.
          </p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Server Scaling</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Run multiple server instances behind a load balancer. State is stored in the database, not in memory.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Worker Scaling</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Scale workers based on task queue depth. Each worker type can scale independently.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ComponentCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
