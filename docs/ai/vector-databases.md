# Vector Databases

Conductor supports three vector database providers for storing and searching embeddings: PostgreSQL with pgvector, Pinecone, and MongoDB Atlas.

## Supported Providers

| Provider | Type | Best For |
|----------|------|----------|
| **PostgreSQL (pgvector)** | Self-hosted | Control, cost-efficiency |
| **Pinecone** | Managed | Scale, simplicity |
| **MongoDB Atlas** | Managed | Existing MongoDB users |

## Configuration

Vector databases are configured in `application.properties` with named instances:

```properties
# PostgreSQL with pgvector
conductor.ai.vectordb.pgvector.instances.mydb.url=jdbc:postgresql://localhost:5432/vectors
conductor.ai.vectordb.pgvector.instances.mydb.user=postgres
conductor.ai.vectordb.pgvector.instances.mydb.password=${PGVECTOR_PASSWORD}

# Pinecone
conductor.ai.vectordb.pinecone.instances.pinecone.apiKey=${PINECONE_API_KEY}
conductor.ai.vectordb.pinecone.instances.pinecone.environment=us-east-1

# MongoDB Atlas
conductor.ai.vectordb.mongodb.instances.atlas.connectionString=${MONGODB_URI}
```

The instance name (e.g., `mydb`, `pinecone`, `atlas`) is used as the `vectorDB` parameter in tasks.

## Vector Tasks

### LLM_INDEX_TEXT

Store text with auto-generated embeddings.

```json
{
  "type": "LLM_INDEX_TEXT",
  "inputParameters": {
    "vectorDB": "pinecone",
    "namespace": "documents",
    "index": "knowledge-base",
    "embeddingModelProvider": "openai",
    "embeddingModel": "text-embedding-3-small",
    "text": "${workflow.input.content}",
    "docId": "${workflow.input.doc_id}",
    "metadata": {
      "source": "${workflow.input.source}",
      "timestamp": "${workflow.input.timestamp}"
    }
  }
}
```

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `vectorDB` | String | Yes | Configured instance name |
| `namespace` | String | Yes | Logical grouping |
| `index` | String | Yes | Index/collection name |
| `embeddingModelProvider` | String | Yes | Provider for embeddings |
| `embeddingModel` | String | Yes | Embedding model |
| `text` | String | Yes | Text to index |
| `docId` | String | No | Document ID (auto-generated if omitted) |
| `metadata` | Object | No | Additional searchable metadata |

### LLM_SEARCH_INDEX

Semantic search using natural language.

```json
{
  "type": "LLM_SEARCH_INDEX",
  "inputParameters": {
    "vectorDB": "pinecone",
    "namespace": "documents",
    "index": "knowledge-base",
    "embeddingModelProvider": "openai",
    "embeddingModel": "text-embedding-3-small",
    "query": "${workflow.input.question}",
    "llmMaxResults": 10
  }
}
```

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `vectorDB` | String | Yes | Configured instance name |
| `namespace` | String | Yes | Namespace to search |
| `index` | String | Yes | Index name |
| `embeddingModelProvider` | String | Yes | Provider for query embedding |
| `embeddingModel` | String | Yes | Must match indexing model |
| `query` | String | Yes | Search query text |
| `llmMaxResults` | Integer | No | Max results (default: 10) |

**Output:**

```json
{
  "result": [
    {
      "docId": "doc-123",
      "text": "Original indexed text...",
      "score": 0.89,
      "metadata": {"source": "manual.pdf"}
    }
  ]
}
```

### LLM_STORE_EMBEDDINGS

Store pre-computed embeddings (for custom pipelines).

```json
{
  "type": "LLM_STORE_EMBEDDINGS",
  "inputParameters": {
    "vectorDB": "pinecone",
    "namespace": "custom",
    "index": "my-index",
    "embeddings": "${previous_task.output.vector}",
    "docId": "custom-doc-1",
    "metadata": {"type": "custom"}
  }
}
```

### LLM_SEARCH_EMBEDDINGS

Search using pre-computed query embeddings.

```json
{
  "type": "LLM_SEARCH_EMBEDDINGS",
  "inputParameters": {
    "vectorDB": "pinecone",
    "namespace": "custom",
    "index": "my-index",
    "embeddings": "${query_embedding.output.result}",
    "llmMaxResults": 5
  }
}
```

### LLM_GET_EMBEDDINGS

Retrieve stored embeddings by document ID.

```json
{
  "type": "LLM_GET_EMBEDDINGS",
  "inputParameters": {
    "vectorDB": "pinecone",
    "namespace": "documents",
    "index": "knowledge-base",
    "docId": "${workflow.input.doc_id}"
  }
}
```

## Provider Setup

### PostgreSQL (pgvector)

1. Install the pgvector extension:

```sql
CREATE EXTENSION vector;
```

2. Configure connection:

```properties
conductor.ai.vectordb.pgvector.instances.mydb.url=jdbc:postgresql://localhost:5432/conductor
conductor.ai.vectordb.pgvector.instances.mydb.user=conductor
conductor.ai.vectordb.pgvector.instances.mydb.password=${DB_PASSWORD}
conductor.ai.vectordb.pgvector.instances.mydb.dimensions=1536
```

Conductor auto-creates tables as needed with the configured dimensions.

### Pinecone

1. Create an index in the Pinecone console matching your embedding dimensions
2. Configure:

```properties
conductor.ai.vectordb.pinecone.instances.pinecone.apiKey=${PINECONE_API_KEY}
conductor.ai.vectordb.pinecone.instances.pinecone.environment=us-east-1
```

### MongoDB Atlas

1. Enable Vector Search on your Atlas cluster
2. Create a vector search index on your collection
3. Configure:

```properties
conductor.ai.vectordb.mongodb.instances.atlas.connectionString=mongodb+srv://user:pass@cluster.mongodb.net/
conductor.ai.vectordb.mongodb.instances.atlas.database=conductor
```

## RAG Pattern

A complete Retrieval-Augmented Generation workflow:

```json
{
  "name": "rag_qa",
  "tasks": [
    {
      "name": "search_knowledge",
      "taskReferenceName": "search",
      "type": "LLM_SEARCH_INDEX",
      "inputParameters": {
        "vectorDB": "pinecone",
        "namespace": "docs",
        "index": "knowledge",
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
            "message": "Answer based on the context. Cite sources. Say 'I don't know' if context lacks information."
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

## Best Practices

### Embedding Consistency

Always use the same embedding model for indexing and searching:

```json
// Indexing
"embeddingModel": "text-embedding-3-small"

// Searching - must match!
"embeddingModel": "text-embedding-3-small"
```

### Chunking Strategy

For large documents, chunk before indexing:

- **Paragraphs**: Natural semantic boundaries
- **Fixed size**: 500-1000 tokens with overlap
- **Semantic**: Use LLM to identify logical sections

### Metadata Usage

Include searchable metadata for filtering:

```json
"metadata": {
  "source": "user-manual.pdf",
  "section": "troubleshooting",
  "updated": "2024-01-15",
  "language": "en"
}
```

### Namespace Organization

Use namespaces to isolate data:

- Per-tenant in multi-tenant apps
- Per-environment (dev, staging, prod)
- Per-document-type (manuals, FAQs, articles)
