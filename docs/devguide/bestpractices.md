# Best Practices

This guide covers production-ready patterns for building reliable, scalable workflows with Conductor.

## Durable Execution Fundamentals

### Design for Failure
Conductor provides durable execution guarantees, but your workflows should still be designed with failure in mind:

- **Assume any task can fail** - Network issues, service outages, and resource limits happen in production
- **Keep tasks focused** - Each task should do one thing well, making failures easier to isolate and retry
- **Use checkpoints** - For long-running workflows, break work into smaller tasks that checkpoint progress

### Idempotency
Workers should be idempotent whenever possible. This means executing the same task multiple times with the same input produces the same result without side effects.

```python
# Good: Idempotent operation
def process_payment(task):
    order_id = task.input_data['order_id']
    
    # Check if already processed (idempotency key)
    if payment_already_exists(order_id):
        return existing_payment_result(order_id)
    
    # Process new payment
    return create_payment(order_id)
```

Common idempotency patterns:

- **Idempotency keys** - Use unique identifiers to detect duplicate requests
- **Conditional writes** - Only update if the current state matches expected state
- **Upserts** - Insert or update based on existence

## Error Handling

### Retry Strategies
Configure appropriate retry behavior in your task definitions:

```json
{
  "name": "call_external_api",
  "retryCount": 3,
  "retryLogic": "EXPONENTIAL_BACKOFF",
  "retryDelaySeconds": 5,
  "backoffScaleFactor": 2
}
```

**Retry logic options:**

| Strategy | Use Case |
|----------|----------|
| `FIXED` | Consistent delays between retries |
| `EXPONENTIAL_BACKOFF` | External APIs with rate limits |
| `LINEAR_BACKOFF` | Gradually increasing delays |

### Timeout Configuration
Always configure timeouts to prevent stuck workflows:

- **`responseTimeoutSeconds`** - Time allowed for a worker to respond after picking up a task. Should be greater than 0.
- **`timeoutSeconds`** - Maximum time for overall task execution including retries. Should be >= `responseTimeoutSeconds`.

```json
{
  "name": "process_data",
  "responseTimeoutSeconds": 300,
  "timeoutSeconds": 1800,
  "timeoutPolicy": "RETRY"
}
```

### Failure Workflows
Configure a failure workflow to handle errors gracefully:

```json
{
  "name": "order_processing",
  "failureWorkflow": "order_failure_handler",
  "tasks": [...]
}
```

The failure workflow receives:

- `workflowId` - ID of the failed workflow
- `reason` - Failure reason
- `failureStatus` - Final status of the failed workflow

## Payload Management

### Keep Payloads Small
Conductor is an orchestration engine, not a data store. Follow these guidelines:

- **Input/output payloads** - Keep under 100KB per task
- **Workflow variables** - Use for coordination data, not bulk data transfer
- **Large data** - Store in external systems (S3, databases) and pass references

```json
{
  "name": "process_large_file",
  "inputParameters": {
    "fileLocation": "${workflow.input.s3_path}",
    "metadata": "${workflow.input.file_metadata}"
  }
}
```

### External Payload Storage
For larger payloads, configure external payload storage:

```properties
conductor.external-payload-storage.type=s3
conductor.external-payload-storage.s3.bucket-name=conductor-payloads
```

## Worker Implementation

### Polling Best Practices
Configure polling intervals based on workload:

```java
TaskRunnerConfigurer configurer = new TaskRunnerConfigurer.Builder(taskClient, workers)
    .withThreadCount(10)
    .withPollInterval(100, TimeUnit.MILLISECONDS)
    .build();
```

**Guidelines:**

- Higher polling frequency (50-100ms) for latency-sensitive tasks
- Lower frequency (500ms-1s) for batch processing
- Adjust thread count based on task throughput requirements

### Graceful Shutdown
Implement proper shutdown handling to avoid task abandonment:

```java
@PreDestroy
public void shutdown() {
    taskRunnerConfigurer.shutdown();
}
```

### Progress Updates
For long-running tasks, report progress to prevent timeouts:

```python
def long_running_task(task):
    for i, item in enumerate(items):
        process(item)
        
        # Update progress periodically
        task.update_task(
            status='IN_PROGRESS',
            output_data={'progress': f'{i}/{len(items)}'},
            callback_after_seconds=30
        )
    
    return {'status': 'COMPLETED', 'output': results}
```

## Workflow Design

### Task Granularity
Find the right balance for task size:

**Too fine-grained:**
- High orchestration overhead
- Increased network calls
- Harder to reason about

**Too coarse-grained:**
- Difficult to retry specific operations
- Less visibility into progress
- Harder to reuse

**Good practice:** Each task should represent a logical unit of work that you'd want to retry independently.

### Parallel Execution
Use fork/join for independent operations:

```json
{
  "type": "FORK_JOIN",
  "forkTasks": [
    [{"name": "validate_inventory", "taskReferenceName": "inventory"}],
    [{"name": "validate_payment", "taskReferenceName": "payment"}],
    [{"name": "validate_shipping", "taskReferenceName": "shipping"}]
  ]
}
```

### Sub-Workflows
Break complex workflows into reusable sub-workflows:

- **Encapsulation** - Hide implementation details
- **Reusability** - Share common patterns across workflows
- **Testing** - Test sub-workflows independently

```json
{
  "type": "SUB_WORKFLOW",
  "subWorkflowParam": {
    "name": "payment_processing",
    "version": 1
  }
}
```

## Scaling

### Worker Scaling
Scale workers based on queue depth:

1. Monitor task queue sizes via metrics
2. Scale workers horizontally when queues grow
3. Use container orchestration (Kubernetes) for auto-scaling

### Isolation Groups
Use isolation groups to dedicate capacity for critical workflows:

```json
{
  "name": "critical_task",
  "isolationGroupId": "high-priority"
}
```

### Rate Limiting
Control throughput with rate limits:

```json
{
  "name": "external_api_call",
  "rateLimitPerFrequency": 100,
  "rateLimitFrequencyInSeconds": 60
}
```

## Observability

### Logging
Include correlation IDs in worker logs:

```python
def my_worker(task):
    logger.info(f"Processing task", extra={
        'workflow_id': task.workflow_instance_id,
        'task_id': task.task_id,
        'task_ref': task.reference_task_name
    })
```

### Metrics
Monitor key metrics:

- **Task queue depth** - Indicates worker capacity needs
- **Task completion rate** - Overall throughput
- **Task failure rate** - Quality indicator
- **Task latency** - Performance tracking

### Debugging
Use Conductor UI to:

- View execution timeline
- Inspect task inputs/outputs
- Trace workflow path
- Retry failed tasks

## Security

### Input Validation
Always validate task inputs:

```python
def process_order(task):
    order_id = task.input_data.get('order_id')
    
    if not order_id or not isinstance(order_id, str):
        raise ValueError("Invalid order_id")
    
    # Sanitize and validate further...
```

### Secrets Management
Never store secrets in workflow definitions:

- Use environment variables for credentials
- Reference secrets from external vaults
- Use Conductor's secrets integration if available

```json
{
  "inputParameters": {
    "api_key": "${workflow.secrets.external_api_key}"
  }
}
```
