# AI & Agent Orchestration

Conductor provides native AI capabilities for building intelligent workflows, autonomous agents, and RAG pipelines. The AI module integrates with 12+ LLM providers and 3 vector databases through simple task configurations.

## Why Conductor for AI?

Building production AI systems requires more than just LLM calls. You need:

- **Durable execution** - Long-running agent loops that survive failures
- **Observability** - Full visibility into every LLM call, token usage, and decision
- **Orchestration** - Coordinate multiple models, tools, and human approvals
- **Scale** - Handle thousands of concurrent AI workflows

Conductor provides all of this out of the box.

## Capabilities

### LLM Integration

| Capability | Description |
|------------|-------------|
| **Chat Completion** | Multi-turn conversations with GPT-4, Claude, Gemini, and more |
| **Text Completion** | Single-prompt completions for generation tasks |
| **Embeddings** | Generate vector embeddings for semantic search |
| **Image Generation** | Create images with DALL-E, Stable Diffusion, Imagen |
| **Audio Synthesis** | Text-to-speech with multiple voice options |
| **Video Generation** | Generate videos with Sora, Veo (async support) |

### Vector Operations

| Capability | Description |
|------------|-------------|
| **Index Text** | Store documents with auto-generated embeddings |
| **Semantic Search** | Find similar content using natural language queries |
| **Store Embeddings** | Store pre-computed vectors for custom pipelines |
| **Retrieve Embeddings** | Fetch stored vectors by document ID |

### Tool Calling & MCP

| Capability | Description |
|------------|-------------|
| **Tool Definitions** | Define functions that LLMs can invoke |
| **MCP Integration** | Connect to Model Context Protocol servers |
| **Agent Loops** | Build autonomous agents with tool use |

## Quick Example

Here's a simple RAG workflow that indexes documents and answers questions:

```json
{
  "name": "rag_qa_workflow",
  "tasks": [
    {
      "name": "index_document",
      "taskReferenceName": "index",
      "type": "LLM_INDEX_TEXT",
      "inputParameters": {
        "vectorDB": "pinecone",
        "namespace": "docs",
        "index": "knowledge-base",
        "embeddingModelProvider": "openai",
        "embeddingModel": "text-embedding-3-small",
        "text": "${workflow.input.document}",
        "docId": "${workflow.input.doc_id}"
      }
    },
    {
      "name": "search_context",
      "taskReferenceName": "search",
      "type": "LLM_SEARCH_INDEX",
      "inputParameters": {
        "vectorDB": "pinecone",
        "namespace": "docs",
        "index": "knowledge-base",
        "embeddingModelProvider": "openai",
        "embeddingModel": "text-embedding-3-small",
        "query": "${workflow.input.question}",
        "llmMaxResults": 5
      }
    },
    {
      "name": "generate_answer",
      "taskReferenceName": "answer",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "message": "Answer questions based on the provided context. If the context doesn't contain relevant information, say so."
          },
          {
            "role": "user",
            "message": "Context:\n${search.output.result}\n\nQuestion: ${workflow.input.question}"
          }
        ]
      }
    }
  ],
  "outputParameters": {
    "answer": "${answer.output.result}",
    "sources": "${search.output.result}"
  }
}
```

## Supported Providers

### LLM Providers

| Provider | Chat | Embeddings | Image | Audio | Video |
|----------|:----:|:----------:|:-----:|:-----:|:-----:|
| **OpenAI** | Yes | Yes | Yes | Yes | Yes |
| **Anthropic** | Yes | - | - | - | - |
| **Google Gemini** | Yes | Yes | Yes | - | Yes |
| **Azure OpenAI** | Yes | Yes | Yes | - | - |
| **AWS Bedrock** | Yes | Yes | - | - | - |
| **Mistral AI** | Yes | Yes | - | - | - |
| **Cohere** | Yes | Yes | - | - | - |
| **Grok** | Yes | - | - | - | - |
| **Perplexity** | Yes | - | - | - | - |
| **HuggingFace** | Yes | - | - | - | - |
| **Ollama** | Yes | Yes | - | - | - |
| **Stability AI** | - | - | Yes | - | - |

### Vector Databases

| Provider | Description |
|----------|-------------|
| **PostgreSQL (pgvector)** | Self-hosted with vector extension |
| **Pinecone** | Managed vector database |
| **MongoDB Atlas** | MongoDB with vector search |

## Getting Started

1. **Configure providers** - Set API keys as environment variables
2. **Define AI tasks** - Add LLM or vector tasks to your workflow
3. **Run workflows** - Execute via API or UI

See [LLM Providers](llm-providers.md) for detailed provider configuration.

## AI Task Reference

| Task Type | Description | Use Case |
|-----------|-------------|----------|
| `LLM_CHAT_COMPLETE` | Multi-turn chat | Conversations, agents |
| `LLM_TEXT_COMPLETE` | Single completion | Generation, summarization |
| `LLM_GENERATE_EMBEDDINGS` | Create embeddings | Search prep, clustering |
| `GENERATE_IMAGE` | Image generation | Creative content |
| `GENERATE_AUDIO` | Text-to-speech | Voice synthesis |
| `GENERATE_VIDEO` | Video generation | Dynamic content |
| `LLM_INDEX_TEXT` | Index with embeddings | RAG ingestion |
| `LLM_SEARCH_INDEX` | Semantic search | RAG retrieval |
| `LLM_STORE_EMBEDDINGS` | Store vectors | Custom pipelines |
| `LLM_SEARCH_EMBEDDINGS` | Search by vector | Custom search |
| `LIST_MCP_TOOLS` | List MCP tools | Tool discovery |
| `CALL_MCP_TOOL` | Execute MCP tool | Tool invocation |
| `GENERATE_PDF` | Markdown to PDF | Document generation |

## Next Steps

- [LLM Providers](llm-providers.md) - Configure and use LLM providers
- [Vector Databases](vector-databases.md) - Set up vector storage
- [Agent Orchestration](agent-orchestration.md) - Build autonomous agents
