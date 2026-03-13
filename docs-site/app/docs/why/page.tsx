export default function WhyPage() {
  return (
    <article className="prose">
      <h1>Why Conductor?</h1>
      
      <p>
        Building distributed systems is hard. Network failures, service crashes, 
        and infrastructure issues are not exceptions—they are the norm. Conductor 
        provides a <strong>durable execution</strong> model that fundamentally changes 
        how you handle these challenges.
      </p>

      <h2>The Problem with Traditional Approaches</h2>
      
      <p>
        Consider a typical e-commerce order flow: payment processing, inventory 
        reservation, shipping, and notification. In a traditional microservices 
        architecture, you might implement this with:
      </p>

      <ul>
        <li><strong>Direct service calls</strong> - Fragile, no automatic recovery</li>
        <li><strong>Message queues</strong> - Complex error handling, lost messages</li>
        <li><strong>Sagas</strong> - Manual compensation logic, hard to debug</li>
      </ul>

      <p>
        Each approach requires you to handle failures explicitly, leading to 
        boilerplate code, inconsistent error handling, and difficult debugging.
      </p>

      <h2>The Conductor Approach: Durable Execution</h2>

      <p>
        With Conductor, you define your workflow as a series of steps. The engine 
        handles everything else:
      </p>

      <ul>
        <li><strong>Automatic state persistence</strong> - Every step is checkpointed</li>
        <li><strong>Transparent retries</strong> - Failed tasks retry automatically</li>
        <li><strong>Crash recovery</strong> - Workflows resume exactly where they left off</li>
        <li><strong>Full observability</strong> - Complete execution history for debugging</li>
      </ul>

      <pre><code>{`{
  "name": "order_workflow",
  "tasks": [
    { "name": "process_payment", "type": "SIMPLE" },
    { "name": "reserve_inventory", "type": "SIMPLE" },
    { "name": "schedule_shipping", "type": "SIMPLE" },
    { "name": "send_notification", "type": "SIMPLE" }
  ]
}`}</code></pre>

      <p>
        If the shipping service crashes after payment succeeds, Conductor 
        automatically retries <code>schedule_shipping</code> when the service 
        recovers. No manual intervention, no lost state.
      </p>

      <h2>Battle-Tested at Scale</h2>

      <p>
        Conductor was born at Netflix, where it orchestrates millions of workflows 
        daily across content encoding, personalization, and infrastructure automation. 
        This heritage means:
      </p>

      <ul>
        <li><strong>Proven scalability</strong> - Handles Netflix-scale traffic</li>
        <li><strong>Production hardened</strong> - Years of real-world battle testing</li>
        <li><strong>Active community</strong> - Thousands of production deployments worldwide</li>
      </ul>

      <h2>Beyond Simple Workflows</h2>

      <p>
        Conductor supports sophisticated patterns out of the box:
      </p>

      <ul>
        <li><strong>Parallel execution</strong> - Fan-out work across multiple workers</li>
        <li><strong>Dynamic workflows</strong> - Branch based on runtime conditions</li>
        <li><strong>Sub-workflows</strong> - Compose complex flows from reusable pieces</li>
        <li><strong>Human tasks</strong> - Wait for external approvals</li>
        <li><strong>Event-driven</strong> - React to external events and signals</li>
        <li><strong>AI/Agent orchestration</strong> - Coordinate LLM calls and tool usage</li>
      </ul>

      <h2>Developer Experience</h2>

      <p>
        We believe in meeting developers where they are:
      </p>

      <ul>
        <li><strong>Language agnostic</strong> - SDKs for Java, Python, Go, JavaScript, C#, Clojure</li>
        <li><strong>Visual builder</strong> - Design workflows in the UI or code-first</li>
        <li><strong>Time-travel debugging</strong> - Replay any execution step-by-step</li>
        <li><strong>Flexible deployment</strong> - Docker, Kubernetes, or managed cloud</li>
      </ul>

      <h2>Open Source, Forever</h2>

      <p>
        Conductor OSS is Apache 2.0 licensed. Use it for free, forever. 
        No vendor lock-in, no surprise licensing changes.
      </p>
    </article>
  );
}
