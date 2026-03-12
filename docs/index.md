---
hide:
  - navigation
  - toc
---

<div class="home">
<div class="hero">
  <div class="row justify-content-center align-items-center">
    <div class="col-6">
      <div class="eyebrow">Open Source Durable Execution Engine</div>
      <div class="heading">
        Build Resilient Distributed Systems
      </div>
      <div class="caption">
        Conductor is a battle-tested runtime for orchestrating workflows, microservices, and AI agents at scale. 
        Your code survives failures, restarts, and deployments automatically.
      </div>
      <div class="hero-buttons">
        <a type="button" class="btn btn-primary" href="devguide/concepts/index.html">Get Started</a>
        <a type="button" class="btn btn-secondary" href="https://github.com/conductor-oss/conductor">View on GitHub</a>
      </div>
    </div>
    <div class="col-6">
      <div class="code-preview">
        <div class="code-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="filename">workflow.json</span>
        </div>
        <pre><code class="language-json">{
  "name": "order_fulfillment",
  "version": 1,
  "tasks": [
    {
      "name": "validate_order",
      "taskReferenceName": "validate",
      "type": "SIMPLE"
    },
    {
      "name": "process_payment",
      "taskReferenceName": "payment",
      "type": "SIMPLE"
    },
    {
      "name": "ship_order",
      "taskReferenceName": "ship",
      "type": "SIMPLE"
    }
  ]
}</code></pre>
      </div>
    </div>
  </div>
</div>

<div class="features">
  <div class="section-header">
    <h2>Why Conductor?</h2>
    <p>Production-grade primitives for building reliable systems</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-4">
      <div class="feature-card">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <h3>Durable Execution</h3>
        <p>Workflows automatically persist state and resume from failures. No more lost work from crashes, restarts, or deployments.</p>
      </div>
    </div>
    <div class="col-4">
      <div class="feature-card">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
        </div>
        <h3>Distributed by Design</h3>
        <p>Horizontally scalable architecture handles millions of concurrent workflow executions across your infrastructure.</p>
      </div>
    </div>
    <div class="col-4">
      <div class="feature-card">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
        <h3>Agent Orchestration</h3>
        <p>Native support for 12+ LLM providers with built-in tool calling, RAG pipelines, and autonomous agent workflows.</p>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-4">
      <div class="feature-card">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </div>
        <h3>Language Agnostic</h3>
        <p>Write workers in Java, Python, Go, C#, JavaScript, or Clojure. Mix languages within the same workflow.</p>
      </div>
    </div>
    <div class="col-4">
      <div class="feature-card">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <h3>Full Observability</h3>
        <p>Complete execution history, real-time debugging, and operational controls. Pause, resume, restart, or retry any workflow.</p>
      </div>
    </div>
    <div class="col-4">
      <div class="feature-card">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </div>
        <h3>Battle-Tested</h3>
        <p>Production-proven at Netflix scale. Trusted by organizations running millions of workflows daily.</p>
      </div>
    </div>
  </div>
</div>

<div class="use-cases">
  <div class="section-header">
    <h2>Built for Modern Architectures</h2>
    <p>From microservices to AI agents, Conductor handles your most complex workflows</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-4">
      <div class="use-case-card">
        <h3>Microservice Orchestration</h3>
        <p>Coordinate distributed services with automatic retries, timeouts, and compensation logic. Handle failures gracefully without custom plumbing.</p>
        <a href="devguide/concepts/workflows.html">Learn more</a>
      </div>
    </div>
    <div class="col-4">
      <div class="use-case-card">
        <h3>AI Agent Pipelines</h3>
        <p>Build autonomous agents with LLM integration, tool calling, and RAG. Orchestrate complex AI workflows with human-in-the-loop controls.</p>
        <a href="ai/index.html">Learn more</a>
      </div>
    </div>
    <div class="col-4">
      <div class="use-case-card">
        <h3>Data Processing</h3>
        <p>Run ETL pipelines, data transformations, and batch processing with parallel execution, dynamic scaling, and checkpoint recovery.</p>
        <a href="devguide/how-tos/Workflows/creating-workflows.html">Learn more</a>
      </div>
    </div>
  </div>
</div>

<div class="quickstart">
  <div class="section-header">
    <h2>Get Running in Minutes</h2>
    <p>Start a local Conductor server with Docker</p>
  </div>
  <div class="quickstart-content">
    <div class="code-block">
      <div class="code-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="filename">Terminal</span>
      </div>
      <pre><code class="language-bash"># Clone the repository
git clone https://github.com/conductor-oss/conductor.git

# Start with Docker Compose
cd conductor/docker
docker-compose up -d

# Open the UI at http://localhost:5000</code></pre>
    </div>
    <div class="quickstart-links">
      <a href="devguide/running/docker.html" class="quickstart-link">
        <span class="link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        </span>
        Docker Installation
      </a>
      <a href="devguide/running/source.html" class="quickstart-link">
        <span class="link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </span>
        Build from Source
      </a>
      <a href="devguide/labs/first-workflow.html" class="quickstart-link">
        <span class="link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </span>
        First Workflow Tutorial
      </a>
    </div>
  </div>
</div>

<div class="sdks">
  <div class="section-header">
    <h2>SDKs for Every Language</h2>
    <p>Write workers in your language of choice</p>
  </div>
  <div class="sdk-grid">
    <a href="documentation/clientsdks/java-sdk.html" class="sdk-card">
      <img src="home/icons/java.svg" alt="Java" class="sdk-icon" onerror="this.style.display='none'">
      <span>Java</span>
    </a>
    <a href="documentation/clientsdks/python-sdk.html" class="sdk-card">
      <img src="home/icons/python.svg" alt="Python" class="sdk-icon" onerror="this.style.display='none'">
      <span>Python</span>
    </a>
    <a href="documentation/clientsdks/go-sdk.html" class="sdk-card">
      <img src="home/icons/go.svg" alt="Go" class="sdk-icon" onerror="this.style.display='none'">
      <span>Go</span>
    </a>
    <a href="documentation/clientsdks/csharp-sdk.html" class="sdk-card">
      <img src="home/icons/csharp.svg" alt="C#" class="sdk-icon" onerror="this.style.display='none'">
      <span>C#</span>
    </a>
    <a href="documentation/clientsdks/js-sdk.html" class="sdk-card">
      <img src="home/icons/js.svg" alt="JavaScript" class="sdk-icon" onerror="this.style.display='none'">
      <span>JavaScript</span>
    </a>
    <a href="documentation/clientsdks/clojure-sdk.html" class="sdk-card">
      <img src="home/icons/clojure.svg" alt="Clojure" class="sdk-icon" onerror="this.style.display='none'">
      <span>Clojure</span>
    </a>
  </div>
</div>

<div class="cta">
  <div class="cta-content">
    <h2>Ready to build resilient systems?</h2>
    <p>Join the community of developers using Conductor for durable execution at scale.</p>
    <div class="cta-buttons">
      <a href="devguide/concepts/index.html" class="btn btn-primary">Read the Docs</a>
      <a href="https://github.com/conductor-oss/conductor" class="btn btn-secondary">Star on GitHub</a>
    </div>
  </div>
</div>
</div>
