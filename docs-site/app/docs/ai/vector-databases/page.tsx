export default function VectorDatabasesPage() {
  return (
    <article className="prose">
      <h1>Vector Databases</h1>
      
      <p>
        Conductor integrates with popular vector databases for building RAG 
        (Retrieval-Augmented Generation) workflows. Store embeddings, search 
        for similar content, and enrich LLM context with relevant information.
      </p>

      <h2>Supported Databases</h2>

      <table>
        <thead>
          <tr>
            <th>Database</th>
            <th>Type</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>pgvector (PostgreSQL)</td>
            <td>Self-hosted / Managed</td>
            <td>Existing Postgres users, simplicity</td>
          </tr>
          <tr>
            <td>Pinecone</td>
            <td>Managed</td>
            <td>Scale, low-latency, serverless</td>
          </tr>
          <tr>
            <td>MongoDB Atlas</td>
            <td>Managed</td>
            <td>Existing MongoDB users, flexibility</td>
          </tr>
        </tbody>
      </table>

      <h2>pgvector (PostgreSQL)</h2>

      <p>
        Use your existing PostgreSQL database for vector storage. Great for 
        getting started and teams already using Postgres.
      </p>

      <h3>Configuration</h3>

      <pre><code>{`# conductor.properties
conductor.vectordb.type=pgvector
conductor.vectordb.pgvector.url=jdbc:postgresql://localhost:5432/conductor
conductor.vectordb.pgvector.username=conductor
conductor.vectordb.pgvector.password=\${POSTGRES_PASSWORD}`}</code></pre>

      <h3>Create an Index</h3>

      <pre><code>{`{
  "name": "create_index",
  "type": "LLM_INDEX_CREATE",
  "inputParameters": {
    "indexName": "knowledge_base",
    "dimensions": 1536,
    "metric": "cosine"
  }
}`}</code></pre>

      <h3>Index Documents</h3>

      <pre><code>{`{
  "name": "index_document",
  "type": "LLM_INDEX_UPSERT",
  "inputParameters": {
    "indexName": "knowledge_base",
    "documents": [
      {
        "id": "doc-1",
        "text": "\${workflow.input.content}",
        "embedding": "\${generate_embedding.output.embedding}",
        "metadata": {
          "source": "manual",
          "category": "\${workflow.input.category}"
        }
      }
    ]
  }
}`}</code></pre>

      <h3>Search</h3>

      <pre><code>{`{
  "name": "search_similar",
  "type": "LLM_INDEX_SEARCH",
  "inputParameters": {
    "indexName": "knowledge_base",
    "embedding": "\${query_embedding.output.embedding}",
    "topK": 5,
    "filter": {
      "category": { "$eq": "technical" }
    }
  }
}`}</code></pre>

      <h2>Pinecone</h2>

      <p>
        Fully managed vector database with excellent performance at scale. 
        Supports serverless and pod-based deployments.
      </p>

      <h3>Configuration</h3>

      <pre><code>{`# conductor.properties
conductor.vectordb.type=pinecone
conductor.vectordb.pinecone.api_key=\${PINECONE_API_KEY}
conductor.vectordb.pinecone.environment=us-east-1-aws`}</code></pre>

      <h3>Create an Index</h3>

      <pre><code>{`{
  "name": "create_pinecone_index",
  "type": "LLM_INDEX_CREATE",
  "inputParameters": {
    "indexName": "product-catalog",
    "dimensions": 1536,
    "metric": "cosine",
    "spec": {
      "serverless": {
        "cloud": "aws",
        "region": "us-east-1"
      }
    }
  }
}`}</code></pre>

      <h3>Upsert with Namespace</h3>

      <pre><code>{`{
  "name": "upsert_vectors",
  "type": "LLM_INDEX_UPSERT",
  "inputParameters": {
    "indexName": "product-catalog",
    "namespace": "electronics",
    "documents": [
      {
        "id": "prod-123",
        "embedding": "\${embedding.output.result}",
        "metadata": {
          "name": "Wireless Headphones",
          "price": 99.99,
          "category": "audio"
        }
      }
    ]
  }
}`}</code></pre>

      <h2>MongoDB Atlas Vector Search</h2>

      <p>
        Native vector search in MongoDB Atlas. Ideal for teams already using 
        MongoDB for their application data.
      </p>

      <h3>Configuration</h3>

      <pre><code>{`# conductor.properties
conductor.vectordb.type=mongodb
conductor.vectordb.mongodb.uri=mongodb+srv://user:pass@cluster.mongodb.net
conductor.vectordb.mongodb.database=conductor`}</code></pre>

      <h3>Create Search Index</h3>

      <pre><code>{`{
  "name": "create_atlas_index",
  "type": "LLM_INDEX_CREATE",
  "inputParameters": {
    "indexName": "documents",
    "dimensions": 1536,
    "similarity": "cosine",
    "collection": "embeddings"
  }
}`}</code></pre>

      <h2>Complete RAG Workflow</h2>

      <p>
        Here's a complete RAG workflow that retrieves context and generates 
        a response:
      </p>

      <pre><code>{`{
  "name": "rag_qa_workflow",
  "description": "Answer questions using RAG",
  "version": 1,
  "tasks": [
    {
      "name": "embed_question",
      "taskReferenceName": "embed_q",
      "type": "LLM_GENERATE_EMBEDDINGS",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "text-embedding-3-small",
        "text": "\${workflow.input.question}"
      }
    },
    {
      "name": "search_context",
      "taskReferenceName": "search",
      "type": "LLM_INDEX_SEARCH",
      "inputParameters": {
        "indexName": "knowledge_base",
        "embedding": "\${embed_q.output.embedding}",
        "topK": 5
      }
    },
    {
      "name": "generate_answer",
      "taskReferenceName": "answer",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "Answer the question based only on the provided context. If the context doesn't contain relevant information, say so.\\n\\nContext:\\n\${search.output.results[*].text}"
          },
          {
            "role": "user",
            "content": "\${workflow.input.question}"
          }
        ],
        "temperature": 0.3
      }
    }
  ],
  "outputParameters": {
    "answer": "\${answer.output.result}",
    "sources": "\${search.output.results[*].metadata.source}"
  }
}`}</code></pre>

      <h2>Best Practices</h2>

      <ul>
        <li>
          <strong>Chunk documents appropriately</strong> - 500-1000 tokens per 
          chunk works well for most use cases
        </li>
        <li>
          <strong>Store metadata</strong> - Include source, timestamps, and 
          categories for filtering
        </li>
        <li>
          <strong>Use namespaces</strong> - Separate different document 
          collections logically
        </li>
        <li>
          <strong>Rerank results</strong> - Consider a reranking step for 
          higher quality retrieval
        </li>
        <li>
          <strong>Monitor index size</strong> - Vector databases can grow 
          quickly with high-dimensional embeddings
        </li>
      </ul>
    </article>
  );
}
