import Link from "next/link";
import { ArrowRight, Bot, Cpu, Database, Workflow } from "lucide-react";

export default function AIPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI & Agents</h1>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">
        Build production-ready AI workflows with native LLM integration, RAG pipelines, and multi-agent orchestration.
      </p>

      <div className="mt-12 grid gap-6">
        <AICard
          href="/docs/ai/llm-providers"
          icon={Cpu}
          title="LLM Providers"
          description="Connect to OpenAI, Anthropic, Google, Azure, and 8 more providers with unified configuration."
        />
        <AICard
          href="/docs/ai/vector-databases"
          icon={Database}
          title="Vector Databases"
          description="Build RAG pipelines with pgvector, Pinecone, or MongoDB Atlas for semantic search."
        />
        <AICard
          href="/docs/ai/agent-orchestration"
          icon={Workflow}
          title="Agent Orchestration"
          description="Implement ReAct agents, tool calling, and multi-agent coordination patterns."
        />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Quick Example</h2>
        <p className="mt-2 text-muted-foreground">
          A simple workflow that generates text using an LLM:
        </p>
        <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-card p-4">
          <code className="text-sm text-foreground whitespace-pre">{`{
  "name": "llm_text_generation",
  "tasks": [
    {
      "name": "generate_text",
      "taskReferenceName": "llm_generate",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4",
        "messages": [
          {
            "role": "user",
            "content": "\${workflow.input.prompt}"
          }
        ]
      }
    }
  ]
}`}</code>
        </pre>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">AI Task Types</h2>
        <p className="mt-2 text-muted-foreground">
          Conductor provides specialized task types for AI workloads:
        </p>
        <div className="mt-6 space-y-3">
          <TaskType
            name="LLM_TEXT_COMPLETE"
            description="Generate text completions from any supported LLM provider"
          />
          <TaskType
            name="LLM_CHAT_COMPLETE"
            description="Multi-turn chat completions with conversation history"
          />
          <TaskType
            name="LLM_GENERATE_EMBEDDINGS"
            description="Generate vector embeddings for text content"
          />
          <TaskType
            name="LLM_INDEX_TEXT"
            description="Index text into a vector database for RAG"
          />
          <TaskType
            name="LLM_SEARCH_INDEX"
            description="Semantic search across indexed content"
          />
          <TaskType
            name="LLM_GET_DOCUMENT"
            description="Retrieve documents by ID from vector stores"
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Supported Providers</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            "OpenAI",
            "Anthropic",
            "Google Vertex AI",
            "Azure OpenAI",
            "AWS Bedrock",
            "Cohere",
            "Hugging Face",
            "Mistral AI",
            "Groq",
            "Together AI",
            "Ollama",
            "LMStudio",
          ].map((provider) => (
            <div
              key={provider}
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-center"
            >
              {provider}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AICard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

function TaskType({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-border p-4">
      <code className="shrink-0 rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
        {name}
      </code>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
