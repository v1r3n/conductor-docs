import { CheckCircle, AlertTriangle } from "lucide-react";

export default function BestPracticesPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">Best Practices</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Production-ready patterns for building reliable workflows with Conductor.
      </p>

      <div className="mt-12 space-y-16">
        <section>
          <h2 className="text-2xl font-bold">Idempotency</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Design your tasks to be idempotent - executing the same task multiple times should produce the same result. 
            This is critical for reliability since Conductor may retry failed tasks.
          </p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DoCard>
              <DoItem>Use idempotency keys for external API calls</DoItem>
              <DoItem>Check if operation already completed before executing</DoItem>
              <DoItem>Use database transactions with unique constraints</DoItem>
            </DoCard>
            <DontCard>
              <DontItem>Assume a task will only run once</DontItem>
              <DontItem>Generate random IDs within tasks</DontItem>
              <DontItem>Rely on external state without verification</DontItem>
            </DontCard>
          </div>

          <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="text-sm text-foreground whitespace-pre">{`// Good: Use idempotency key from workflow
async function processPayment(taskInput) {
  const idempotencyKey = taskInput.workflowId + "_" + taskInput.taskId;
  
  // Check if already processed
  const existing = await db.payments.findByKey(idempotencyKey);
  if (existing) return existing;
  
  // Process and store with key
  return await paymentProvider.charge({
    amount: taskInput.amount,
    idempotencyKey
  });
}`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Error Handling</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Proper error handling ensures workflows can recover from failures and provides visibility into issues.
          </p>
          
          <div className="mt-6 space-y-4">
            <Practice
              title="Distinguish Retryable vs Non-Retryable Errors"
              description="Network timeouts should be retried; validation errors should not. Use appropriate error types."
            />
            <Practice
              title="Include Context in Error Messages"
              description="Add relevant IDs, timestamps, and state to error messages for debugging."
            />
            <Practice
              title="Use Compensating Transactions"
              description="For saga patterns, implement rollback tasks that undo partial changes on failure."
            />
          </div>

          <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="text-sm text-foreground whitespace-pre">{`// Configure retry behavior per task
{
  "name": "call_external_api",
  "retryCount": 3,
  "retryLogic": "EXPONENTIAL_BACKOFF",
  "retryDelaySeconds": 5,
  "timeoutSeconds": 30,
  "responseTimeoutSeconds": 25
}`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Task Design</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Well-designed tasks are the foundation of maintainable workflows.
          </p>
          
          <div className="mt-6 space-y-4">
            <Practice
              title="Keep Tasks Focused"
              description="Each task should do one thing well. Split complex operations into multiple tasks."
            />
            <Practice
              title="Minimize Task Duration"
              description="Long-running tasks increase failure risk. Break into checkpointed steps when possible."
            />
            <Practice
              title="Use Meaningful Names"
              description="Task names should describe what they do: 'validate_order' not 'task_1'."
            />
            <Practice
              title="Version Your Task Definitions"
              description="Use versioning to safely update task behavior without breaking running workflows."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Worker Implementation</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Workers are the workhorses of your system. Build them for reliability and observability.
          </p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DoCard>
              <DoItem>Use connection pooling for databases</DoItem>
              <DoItem>Implement graceful shutdown</DoItem>
              <DoItem>Log task inputs and outputs</DoItem>
              <DoItem>Monitor worker health metrics</DoItem>
            </DoCard>
            <DontCard>
              <DontItem>Store state in worker memory</DontItem>
              <DontItem>Catch and swallow exceptions</DontItem>
              <DontItem>Block the polling thread</DontItem>
              <DontItem>Hardcode configuration</DontItem>
            </DontCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Scaling</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Design for horizontal scalability from the start.
          </p>
          
          <div className="mt-6 space-y-4">
            <Practice
              title="Scale Workers by Task Type"
              description="Different task types have different resource needs. Scale each worker pool independently."
            />
            <Practice
              title="Use Task Queues Effectively"
              description="Configure queue capacities and poll intervals based on expected throughput."
            />
            <Practice
              title="Monitor Queue Depths"
              description="Alert when task queues grow beyond expected levels - it indicates capacity issues."
            />
            <Practice
              title="Partition by Domain"
              description="For very high scale, run separate Conductor clusters for different domains."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Observability</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            You can&apos;t fix what you can&apos;t see. Invest in monitoring and logging.
          </p>
          
          <div className="mt-6 space-y-4">
            <Practice
              title="Correlate Logs with Workflow IDs"
              description="Include workflowId and taskId in all log messages for traceability."
            />
            <Practice
              title="Track Key Metrics"
              description="Monitor workflow completion rates, task durations, retry rates, and queue depths."
            />
            <Practice
              title="Set Up Alerts"
              description="Alert on failed workflows, stuck tasks, and unusual patterns."
            />
            <Practice
              title="Use Distributed Tracing"
              description="Propagate trace context through workflows for end-to-end visibility."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Practice({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function DoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
      <div className="flex items-center gap-2 text-green-400">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm font-semibold">Do</span>
      </div>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function DontCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
      <div className="flex items-center gap-2 text-red-400">
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm font-semibold">Don&apos;t</span>
      </div>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function DoItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-green-400" />
      {children}
    </li>
  );
}

function DontItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <span className="mt-0.5 text-red-400">x</span>
      {children}
    </li>
  );
}
