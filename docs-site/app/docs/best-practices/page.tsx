export default function BestPracticesPage() {
  return (
    <article className="prose">
      <h1>Best Practices</h1>
      
      <p>
        This guide covers patterns and practices for building reliable, 
        maintainable workflows with Conductor. Following these guidelines 
        will help you avoid common pitfalls and build production-ready systems.
      </p>

      <h2>Idempotency</h2>

      <p>
        <strong>Workers must be idempotent.</strong> Due to retries and network 
        issues, the same task may be delivered multiple times. Your workers 
        should produce the same result regardless of how many times they're called 
        with the same input.
      </p>

      <h3>Strategies for Idempotency</h3>

      <ul>
        <li>
          <strong>Idempotency keys</strong> - Use unique identifiers (order ID, 
          transaction ID) to detect and skip duplicate processing
        </li>
        <li>
          <strong>Database constraints</strong> - Use unique constraints to 
          prevent duplicate records
        </li>
        <li>
          <strong>Conditional operations</strong> - Use conditional updates 
          (e.g., "only if status = pending")
        </li>
      </ul>

      <pre><code>{`// Example: Idempotent payment processing
async function processPayment(task) {
  const { orderId, amount } = task.inputData;
  
  // Check if already processed
  const existing = await db.payments.findByOrderId(orderId);
  if (existing) {
    return { status: 'already_processed', paymentId: existing.id };
  }
  
  // Process with idempotency key
  const payment = await paymentGateway.charge({
    idempotencyKey: \`order-\${orderId}\`,
    amount
  });
  
  return { status: 'success', paymentId: payment.id };
}`}</code></pre>

      <h2>Error Handling</h2>

      <p>
        Not all errors should be treated the same. Understanding error types 
        helps you configure appropriate retry behavior.
      </p>

      <h3>Transient vs Permanent Failures</h3>

      <ul>
        <li>
          <strong>Transient failures</strong> - Network timeouts, rate limits, 
          temporary service unavailability. These should be retried.
        </li>
        <li>
          <strong>Permanent failures</strong> - Invalid input, business rule 
          violations, authentication errors. These should fail immediately.
        </li>
      </ul>

      <pre><code>{`// Mark permanent failures to avoid unnecessary retries
async function validateOrder(task) {
  const { items } = task.inputData;
  
  if (!items || items.length === 0) {
    // Permanent failure - don't retry
    return {
      status: 'FAILED_WITH_TERMINAL_ERROR',
      reasonForIncompletion: 'Order must have at least one item'
    };
  }
  
  // Continue processing...
}`}</code></pre>

      <h2>Retry Configuration</h2>

      <p>
        Configure retries based on the nature of your tasks and downstream 
        services.
      </p>

      <h3>Recommended Settings</h3>

      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Retry Count</th>
            <th>Retry Logic</th>
            <th>Backoff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HTTP APIs</td>
            <td>3-5</td>
            <td>EXPONENTIAL_BACKOFF</td>
            <td>1s, 2s, 4s, 8s</td>
          </tr>
          <tr>
            <td>Database operations</td>
            <td>2-3</td>
            <td>FIXED</td>
            <td>500ms</td>
          </tr>
          <tr>
            <td>LLM calls</td>
            <td>3-5</td>
            <td>EXPONENTIAL_BACKOFF</td>
            <td>2s, 4s, 8s, 16s</td>
          </tr>
          <tr>
            <td>Critical payments</td>
            <td>5-10</td>
            <td>EXPONENTIAL_BACKOFF</td>
            <td>1s to 60s max</td>
          </tr>
        </tbody>
      </table>

      <h2>Worker Implementation</h2>

      <h3>Keep Workers Stateless</h3>

      <p>
        Workers should not maintain state between task executions. All 
        necessary data should come from the task input or be fetched from 
        external stores.
      </p>

      <h3>Use Timeouts</h3>

      <p>
        Always configure appropriate timeouts:
      </p>

      <ul>
        <li><code>responseTimeoutSeconds</code> - How long Conductor waits for a response</li>
        <li><code>pollTimeoutSeconds</code> - How long workers wait when polling</li>
        <li><code>timeoutSeconds</code> - Overall task execution timeout</li>
      </ul>

      <h3>Batch Processing</h3>

      <p>
        For high-throughput scenarios, configure workers to poll for multiple 
        tasks at once:
      </p>

      <pre><code>{`TaskRunnerConfigurer configurer = new TaskRunnerConfigurer.Builder()
    .withThreadCount(10)
    .withBatchSize(5)  // Poll for 5 tasks at a time
    .build();`}</code></pre>

      <h2>Workflow Design</h2>

      <h3>Keep Workflows Focused</h3>

      <p>
        Design workflows for single responsibilities. Complex processes should 
        be broken into sub-workflows that can be reused and tested independently.
      </p>

      <h3>Use Sub-Workflows</h3>

      <pre><code>{`{
  "name": "order_fulfillment",
  "tasks": [
    {
      "name": "payment_workflow",
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {
        "name": "process_payment",
        "version": 1
      }
    },
    {
      "name": "shipping_workflow", 
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {
        "name": "ship_order",
        "version": 1
      }
    }
  ]
}`}</code></pre>

      <h3>Version Your Workflows</h3>

      <p>
        Always version workflows and task definitions. This allows you to make 
        changes without affecting running executions.
      </p>

      <h2>Observability</h2>

      <h3>Structured Logging</h3>

      <p>
        Include correlation IDs in all logs to trace requests across services:
      </p>

      <pre><code>{`logger.info("Processing task", {
  workflowId: task.workflowInstanceId,
  taskId: task.taskId,
  taskType: task.taskType,
  input: task.inputData
});`}</code></pre>

      <h3>Metrics to Monitor</h3>

      <ul>
        <li><strong>Task queue depth</strong> - Indicates worker capacity needs</li>
        <li><strong>Task execution time</strong> - Identify slow tasks</li>
        <li><strong>Failure rate by task type</strong> - Catch issues early</li>
        <li><strong>Workflow completion time</strong> - Track SLAs</li>
      </ul>

      <h2>Scaling Guidelines</h2>

      <h3>Horizontal Scaling</h3>

      <ul>
        <li>
          <strong>Workers</strong> - Add more worker instances to handle increased 
          task volume. Workers are stateless and scale horizontally.
        </li>
        <li>
          <strong>Conductor servers</strong> - Scale based on API request volume 
          and workflow execution rate.
        </li>
      </ul>

      <h3>Database Considerations</h3>

      <ul>
        <li>Use read replicas for high-volume search/query operations</li>
        <li>Configure connection pooling appropriately</li>
        <li>Consider archiving completed workflows to maintain performance</li>
      </ul>
    </article>
  );
}
