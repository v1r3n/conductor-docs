# Why Conductor?

Conductor is a **durable execution engine** for building resilient distributed systems. It provides the orchestration layer that lets you write application code while Conductor handles the hard parts: state persistence, failure recovery, retries, and observability.

## The Problem

Building reliable distributed systems is hard. When you coordinate work across services, you face challenges like:

- **Partial failures** - What happens when step 3 of 5 fails?
- **State management** - Where is the execution state stored? What if the process crashes?
- **Visibility** - How do you know where a process is stuck?
- **Recovery** - Can you restart from where it failed, not from the beginning?

Traditional approaches—scattered try/catch blocks, manual state tracking, custom retry logic—become unmaintainable as systems grow.

## Durable Execution

Conductor solves this with **durable execution**: your workflow state is automatically persisted at every step. If anything fails—a task, a worker, even the Conductor server itself—execution resumes exactly where it left off.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Your Code          Conductor           Persistent State       │
│   ─────────          ─────────           ────────────────       │
│                                                                 │
│   Task A  ────────►  Execute  ────────►  State Saved ✓          │
│                                                                 │
│   Task B  ────────►  Execute  ────────►  State Saved ✓          │
│                                                                 │
│   Task C  ────────►  💥 Failure                                 │
│                                                                 │
│   [Server Restarts]                                             │
│                                                                 │
│   Task C  ────────►  Resume   ────────►  State Saved ✓          │
│                                                                 │
│   Task D  ────────►  Execute  ────────►  Complete ✓             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**What this means for you:**

- Write code as if failures don't exist
- Tasks that completed stay completed
- No manual checkpointing or state management
- Workflows survive crashes, restarts, and deployments

## Key Capabilities

### Distributed by Design

Conductor separates orchestration from execution:

- **Orchestrator** - Manages workflow state and task scheduling
- **Workers** - Execute task logic, can be written in any language
- **Queues** - Decouple scheduling from execution

This architecture scales horizontally to millions of concurrent workflows.

### Full Observability

Every execution is fully traceable:

- Complete history of every task's inputs, outputs, and timing
- Visual workflow diagrams with execution paths highlighted
- Real-time status for in-flight workflows
- Operational controls: pause, resume, restart, retry, terminate

### Language Agnostic

Write workers in the language best suited for each task:

- Java, Python, Go, C#, JavaScript, Clojure SDKs
- Mix languages within the same workflow
- Workers communicate via HTTP/gRPC—no language lock-in

### Built-in Reliability

Production-ready primitives out of the box:

- **Retries** with exponential backoff
- **Timeouts** at task and workflow levels
- **Rate limiting** per task type
- **Failure workflows** for error handling

## Orchestration vs. Choreography

Conductor uses centralized **orchestration**, not distributed **choreography**.

| Aspect | Orchestration (Conductor) | Choreography (Event-driven) |
|--------|--------------------------|----------------------------|
| **Process definition** | Explicit, visual workflow | Implicit in scattered code |
| **State visibility** | Centralized, queryable | Distributed, hard to trace |
| **Error handling** | Coordinated retries | Each service handles its own |
| **Progress tracking** | Built-in | Custom implementation needed |
| **Changing flows** | Update workflow definition | Update multiple services |

## When to Use Conductor

**Good fit:**

- Multi-service transactions (order processing, payments)
- Long-running processes (onboarding, approvals)
- AI/ML pipelines and agent orchestration
- Data processing workflows
- Anything that needs to survive failures

**Consider alternatives for:**

- Simple request/response APIs
- Real-time, sub-millisecond operations
- Purely event-driven architectures where order doesn't matter

## Getting Started

Ready to build durable systems?

1. [Run Conductor locally](../running/docker.md) with Docker
2. [Create your first workflow](../labs/first-workflow.md)
3. [Understand core concepts](index.md)
