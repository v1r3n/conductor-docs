export default function ArchitecturePage() {
  return (
    <article className="prose">
      <h1>Architecture Overview</h1>
      
      <p>
        Conductor is designed as a distributed, horizontally scalable workflow 
        orchestration engine. Understanding its architecture helps you deploy, 
        operate, and optimize Conductor for your use case.
      </p>

      <h2>Core Components</h2>

      <h3>Conductor Server</h3>
      <p>
        The central orchestration engine that manages workflow state, schedules 
        tasks, and coordinates workers. Key responsibilities:
      </p>
      <ul>
        <li>Workflow execution and state management</li>
        <li>Task scheduling and queue management</li>
        <li>API endpoints for workflow operations</li>
        <li>Event handling and webhooks</li>
      </ul>

      <h3>Workers</h3>
      <p>
        Stateless processes that execute individual tasks. Workers poll the 
        Conductor server for work, execute the task, and report results back.
      </p>
      <ul>
        <li>Language-agnostic (any language with HTTP/gRPC support)</li>
        <li>Horizontally scalable</li>
        <li>Can be deployed anywhere (Kubernetes, VMs, serverless)</li>
      </ul>

      <h3>Persistence Layer</h3>
      <p>
        Stores workflow definitions, execution state, and task queues. Supported backends:
      </p>
      <ul>
        <li><strong>PostgreSQL</strong> - Recommended for production</li>
        <li><strong>MySQL</strong> - Alternative RDBMS option</li>
        <li><strong>Redis</strong> - For queues and caching</li>
        <li><strong>Elasticsearch/OpenSearch</strong> - For workflow indexing and search</li>
      </ul>

      <h2>How Execution Works</h2>

      <ol>
        <li>
          <strong>Workflow Start</strong> - Client submits a workflow execution 
          request to the Conductor server via REST API or SDK.
        </li>
        <li>
          <strong>Task Scheduling</strong> - Conductor evaluates the workflow 
          definition and schedules the first task(s) to the appropriate queue(s).
        </li>
        <li>
          <strong>Task Pickup</strong> - Workers poll their designated queues 
          and pick up tasks for execution.
        </li>
        <li>
          <strong>Task Execution</strong> - Worker executes the task logic and 
          returns the result (success, failure, or in-progress) to Conductor.
        </li>
        <li>
          <strong>State Update</strong> - Conductor persists the task result 
          and schedules subsequent tasks based on the workflow definition.
        </li>
        <li>
          <strong>Completion</strong> - When all tasks complete (or the workflow 
          fails), Conductor marks the workflow as complete and stores the final output.
        </li>
      </ol>

      <h2>Durable Execution Model</h2>

      <p>
        Conductor's durable execution model is what makes workflows resilient:
      </p>

      <h3>State Persistence</h3>
      <p>
        Every task completion is durably stored before proceeding. If the 
        Conductor server crashes:
      </p>
      <ul>
        <li>Completed tasks are not re-executed</li>
        <li>In-progress tasks resume from their last checkpoint</li>
        <li>The workflow continues exactly where it left off</li>
      </ul>

      <h3>At-Least-Once Delivery</h3>
      <p>
        Tasks are guaranteed to be delivered at least once. This means workers 
        must be <strong>idempotent</strong> - executing the same task multiple 
        times should produce the same result.
      </p>

      <h3>Automatic Retries</h3>
      <p>
        Failed tasks are automatically retried based on configuration:
      </p>
      <pre><code>{`{
  "retryCount": 3,
  "retryLogic": "EXPONENTIAL_BACKOFF",
  "retryDelaySeconds": 1
}`}</code></pre>

      <h2>Scalability</h2>

      <h3>Horizontal Scaling</h3>
      <ul>
        <li>
          <strong>Conductor Servers</strong> - Deploy multiple instances behind 
          a load balancer. All instances share the same persistence layer.
        </li>
        <li>
          <strong>Workers</strong> - Add more worker instances to increase task 
          processing capacity. Workers are stateless.
        </li>
      </ul>

      <h3>Task Queues</h3>
      <p>
        Each task type has its own queue. This allows you to:
      </p>
      <ul>
        <li>Scale workers independently per task type</li>
        <li>Prioritize certain task types over others</li>
        <li>Isolate failures to specific task types</li>
      </ul>

      <h2>High Availability</h2>

      <p>For production deployments:</p>

      <ul>
        <li>
          <strong>Multiple Conductor servers</strong> - At least 3 instances 
          for fault tolerance
        </li>
        <li>
          <strong>Database replication</strong> - PostgreSQL with read replicas 
          for high availability
        </li>
        <li>
          <strong>Redis cluster</strong> - For queue durability and performance
        </li>
        <li>
          <strong>Cross-region deployment</strong> - For disaster recovery
        </li>
      </ul>

      <h2>Security</h2>

      <h3>Authentication</h3>
      <p>Conductor supports multiple authentication methods:</p>
      <ul>
        <li>API keys</li>
        <li>OAuth 2.0 / OIDC</li>
        <li>Custom authentication plugins</li>
      </ul>

      <h3>Authorization</h3>
      <p>
        Role-based access control (RBAC) for workflows, tasks, and 
        administrative operations.
      </p>

      <h3>Encryption</h3>
      <ul>
        <li>TLS for all network communication</li>
        <li>Encryption at rest for sensitive data</li>
        <li>Secret management integration (Vault, AWS Secrets Manager)</li>
      </ul>

      <h2>Deployment Options</h2>

      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Docker Compose</td>
            <td>Development, small deployments</td>
          </tr>
          <tr>
            <td>Kubernetes (Helm)</td>
            <td>Production, auto-scaling</td>
          </tr>
          <tr>
            <td>Managed (Orkes)</td>
            <td>Zero-ops, enterprise features</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
