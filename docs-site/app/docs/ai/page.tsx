import Link from "next/link";
import { Sparkles, Database, Bot, ArrowRight } from "lucide-react";

const aiFeatures = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "LLM Providers",
    description: "Native support for 12+ providers including OpenAI, Anthropic, Google Vertex, Azure, AWS Bedrock, and more.",
    href: "/docs/ai/llm-providers",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Vector Databases",
    description: "Built-in integrations with pgvector, Pinecone, and MongoDB Atlas for RAG workflows.",
    href: "/docs/ai/vector-databases",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Agent Orchestration",
    description: "Coordinate multi-agent systems with tool calling, MCP support, and human-in-the-loop patterns.",
    href: "/docs/ai/agent-orchestration",
  },
];

export default function AIPage() {
  return (
    <article className="prose">
      <h1>AI & Agent Orchestration</h1>
      
      <p>
        Conductor provides first-class support for building AI-powered applications. 
        From simple LLM calls to complex multi-agent systems, Conductor's durable 
        execution model ensures your AI workflows are <strong>reliable</strong>, 
        <strong>observable</strong>, and <strong>production-ready</strong>.
      </p>

      <div className="not-prose my-8 grid gap-4">
        {aiFeatures.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
          >
            <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
              {feature.icon}
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-white group-hover:text-blue-400">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </div>
            <ArrowRight className="mt-1 h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
          </Link>
        ))}
      </div>

      <h2>Why Conductor for AI?</h2>

      <p>
        LLM calls are inherently unreliable—rate limits, timeouts, and API failures 
        are common. Traditional retry logic is insufficient when you need to maintain 
        conversation state across failures or coordinate multiple agents.
      </p>

      <p>Conductor solves this with:</p>

      <ul>
        <li><strong>Automatic retries with backoff</strong> - Handle rate limits gracefully</li>
        <li><strong>State persistence</strong> - Resume multi-turn conversations after failures</li>
        <li><strong>Cost tracking</strong> - Monitor token usage across workflows</li>
        <li><strong>Execution history</strong> - Debug prompts and responses</li>
        <li><strong>Parallel execution</strong> - Run multiple LLM calls concurrently</li>
      </ul>

      <h2>Quick Example</h2>

      <p>Here's a simple RAG workflow that retrieves context and generates a response:</p>

      <pre><code>{`{
  "name": "rag_workflow",
  "tasks": [
    {
      "name": "embed_query",
      "type": "LLM_TEXT_EMBED",
      "inputParameters": {
        "model": "text-embedding-3-small",
        "text": "\${workflow.input.question}"
      }
    },
    {
      "name": "search_vectors",
      "type": "LLM_INDEX_SEARCH",
      "inputParameters": {
        "index": "knowledge_base",
        "embedding": "\${embed_query.output.embedding}",
        "topK": 5
      }
    },
    {
      "name": "generate_response",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "Answer based on the context: \${search_vectors.output.results}"
          },
          {
            "role": "user", 
            "content": "\${workflow.input.question}"
          }
        ]
      }
    }
  ]
}`}</code></pre>

      <h2>Supported AI Task Types</h2>

      <table>
        <thead>
          <tr>
            <th>Task Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>LLM_TEXT_COMPLETE</code></td>
            <td>Text generation with chat models</td>
          </tr>
          <tr>
            <td><code>LLM_GENERATE_EMBEDDINGS</code></td>
            <td>Generate vector embeddings</td>
          </tr>
          <tr>
            <td><code>LLM_INDEX_SEARCH</code></td>
            <td>Search vector databases</td>
          </tr>
          <tr>
            <td><code>LLM_INDEX_UPSERT</code></td>
            <td>Add/update vectors in index</td>
          </tr>
          <tr>
            <td><code>LLM_CHAT_COMPLETE</code></td>
            <td>Multi-turn conversations</td>
          </tr>
          <tr>
            <td><code>LLM_GET_DOCUMENT</code></td>
            <td>Retrieve documents by ID</td>
          </tr>
        </tbody>
      </table>

      <h2>Getting Started</h2>

      <ol>
        <li>Configure your LLM provider credentials</li>
        <li>Set up a vector database (optional, for RAG)</li>
        <li>Create your AI workflow definition</li>
        <li>Start the workflow via API or SDK</li>
      </ol>

      <p>
        See the individual guides for detailed setup instructions and examples.
      </p>
    </article>
  );
}
