export default function QuickstartPage() {
  return (
    <article className="prose">
      <h1>Quick Start</h1>
      
      <p>
        Get Conductor running in under 5 minutes. This guide will walk you 
        through starting the server, creating your first workflow, and 
        executing it.
      </p>

      <h2>1. Start Conductor</h2>

      <p>The fastest way to get started is with Docker:</p>

      <pre><code>{`docker run -d --name conductor \\
  -p 8080:8080 \\
  -p 5000:5000 \\
  conductoross/conductor-standalone:latest`}</code></pre>

      <p>
        This starts Conductor with an in-memory database (for production, 
        you'll want to configure PostgreSQL or another persistence layer).
      </p>

      <h3>Verify Installation</h3>

      <p>Open the Conductor UI at <code>http://localhost:5000</code></p>

      <h2>2. Create a Workflow</h2>

      <p>
        Let's create a simple workflow that fetches a random joke from an API. 
        Save this as <code>joke_workflow.json</code>:
      </p>

      <pre><code>{`{
  "name": "fetch_joke",
  "description": "Fetches a random joke from the internet",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "get_joke",
      "taskReferenceName": "fetch_joke_task",
      "type": "HTTP",
      "inputParameters": {
        "http_request": {
          "uri": "https://official-joke-api.appspot.com/random_joke",
          "method": "GET"
        }
      }
    }
  ],
  "outputParameters": {
    "setup": "\${fetch_joke_task.output.response.body.setup}",
    "punchline": "\${fetch_joke_task.output.response.body.punchline}"
  }
}`}</code></pre>

      <h3>Register the Workflow</h3>

      <pre><code>{`curl -X POST http://localhost:8080/api/metadata/workflow \\
  -H "Content-Type: application/json" \\
  -d @joke_workflow.json`}</code></pre>

      <h2>3. Execute the Workflow</h2>

      <pre><code>{`curl -X POST http://localhost:8080/api/workflow/fetch_joke \\
  -H "Content-Type: application/json" \\
  -d '{}'`}</code></pre>

      <p>
        This returns a workflow execution ID. You can check the status in 
        the UI or via the API:
      </p>

      <pre><code>{`curl http://localhost:8080/api/workflow/{workflowId}`}</code></pre>

      <h2>4. View Results</h2>

      <p>
        Navigate to <code>http://localhost:5000</code> and click on your 
        workflow execution to see:
      </p>

      <ul>
        <li>Visual workflow execution graph</li>
        <li>Input/output for each task</li>
        <li>Execution timeline</li>
        <li>Complete audit history</li>
      </ul>

      <h2>Next Steps</h2>

      <p>Now that you have Conductor running:</p>

      <ul>
        <li><strong>Learn the concepts</strong> - Understand workflows, tasks, and workers</li>
        <li><strong>Add custom workers</strong> - Execute your own code within workflows</li>
        <li><strong>Configure persistence</strong> - Set up PostgreSQL for production</li>
        <li><strong>Explore SDKs</strong> - Use your preferred programming language</li>
      </ul>

      <h2>Using an SDK</h2>

      <p>Here's the same workflow execution using the Python SDK:</p>

      <pre><code>{`from conductor.client.configuration.configuration import Configuration
from conductor.client.orkes_clients import OrkesClients

config = Configuration(server_api_url="http://localhost:8080/api")
clients = OrkesClients(config)
workflow_client = clients.get_workflow_client()

# Execute the workflow
workflow_id = workflow_client.start_workflow_by_name("fetch_joke", {})

# Get the result
workflow = workflow_client.get_workflow(workflow_id, include_tasks=True)
print(f"Setup: {workflow.output['setup']}")
print(f"Punchline: {workflow.output['punchline']}")`}</code></pre>

      <p>Install the SDK with:</p>

      <pre><code>{`pip install conductor-python`}</code></pre>
    </article>
  );
}
