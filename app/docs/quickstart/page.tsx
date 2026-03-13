export default function QuickstartPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">Quickstart</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Get Conductor running and create your first workflow in under 5 minutes.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-bold">1. Start Conductor</h2>
          <p className="mt-2 text-muted-foreground">
            The fastest way to start Conductor is with Docker:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="text-sm">
              docker run -p 8080:8080 conductoross/conductor:latest
            </code>
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            Conductor will be available at{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">http://localhost:8080</code>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Define a Workflow</h2>
          <p className="mt-2 text-muted-foreground">
            Create a simple workflow that fetches data from an API:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="text-sm text-foreground whitespace-pre">{`{
  "name": "fetch_user_workflow",
  "version": 1,
  "tasks": [
    {
      "name": "fetch_user",
      "taskReferenceName": "fetch_user_ref",
      "type": "HTTP",
      "inputParameters": {
        "http_request": {
          "uri": "https://jsonplaceholder.typicode.com/users/1",
          "method": "GET"
        }
      }
    }
  ]
}`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Register the Workflow</h2>
          <p className="mt-2 text-muted-foreground">
            Register your workflow definition with Conductor:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="text-sm">{`curl -X POST http://localhost:8080/api/metadata/workflow \\
  -H "Content-Type: application/json" \\
  -d @workflow.json`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Execute the Workflow</h2>
          <p className="mt-2 text-muted-foreground">
            Start a new workflow execution:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="text-sm">{`curl -X POST http://localhost:8080/api/workflow/fetch_user_workflow \\
  -H "Content-Type: application/json"`}</code>
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            This returns a workflow execution ID that you can use to track progress.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Monitor Execution</h2>
          <p className="mt-2 text-muted-foreground">
            Check the status of your workflow:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <code className="text-sm">{`curl http://localhost:8080/api/workflow/{workflowId}`}</code>
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            Or open the Conductor UI at{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">http://localhost:8080</code> to see your 
            workflow executions visually.
          </p>
        </section>

        <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="font-semibold text-primary">Next Steps</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Learn about <a href="/docs/concepts/workflows" className="text-primary hover:underline">workflow concepts</a></li>
            <li>Explore <a href="/docs/concepts/tasks" className="text-primary hover:underline">different task types</a></li>
            <li>Build <a href="/docs/ai" className="text-primary hover:underline">AI-powered workflows</a></li>
            <li>Read the <a href="/docs/best-practices" className="text-primary hover:underline">production best practices</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
