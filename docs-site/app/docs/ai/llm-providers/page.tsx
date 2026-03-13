export default function LLMProvidersPage() {
  const providers = [
    { name: "OpenAI", models: "GPT-4o, GPT-4, GPT-3.5", envVar: "OPENAI_API_KEY" },
    { name: "Anthropic", models: "Claude 3.5, Claude 3", envVar: "ANTHROPIC_API_KEY" },
    { name: "Google Vertex AI", models: "Gemini Pro, PaLM 2", envVar: "VERTEX_AI_CREDENTIALS" },
    { name: "Azure OpenAI", models: "GPT-4, GPT-3.5", envVar: "AZURE_OPENAI_KEY" },
    { name: "AWS Bedrock", models: "Claude, Titan, Llama", envVar: "AWS_CREDENTIALS" },
    { name: "Groq", models: "Llama, Mixtral", envVar: "GROQ_API_KEY" },
    { name: "Mistral AI", models: "Mistral Large, Medium", envVar: "MISTRAL_API_KEY" },
    { name: "Cohere", models: "Command, Embed", envVar: "COHERE_API_KEY" },
    { name: "HuggingFace", models: "Various open models", envVar: "HF_API_KEY" },
    { name: "Ollama", models: "Local models", envVar: "OLLAMA_BASE_URL" },
  ];

  return (
    <article className="prose">
      <h1>LLM Providers</h1>
      
      <p>
        Conductor supports 12+ LLM providers out of the box. Configure your 
        preferred provider and start building AI workflows immediately.
      </p>

      <h2>Supported Providers</h2>

      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Models</th>
            <th>Environment Variable</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.models}</td>
              <td><code>{p.envVar}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Configuration</h2>

      <p>
        Configure providers via environment variables or the Conductor 
        configuration file:
      </p>

      <pre><code>{`# conductor.properties
conductor.llm.openai.api_key=\${OPENAI_API_KEY}
conductor.llm.anthropic.api_key=\${ANTHROPIC_API_KEY}
conductor.llm.vertex.project_id=my-project
conductor.llm.vertex.location=us-central1`}</code></pre>

      <h2>OpenAI</h2>

      <p>The most commonly used provider. Supports chat completions and embeddings.</p>

      <h3>Configuration</h3>

      <pre><code>{`# Environment variable
export OPENAI_API_KEY=sk-...

# Or in conductor.properties
conductor.llm.openai.api_key=sk-...
conductor.llm.openai.organization=org-...  # Optional`}</code></pre>

      <h3>Usage Example</h3>

      <pre><code>{`{
  "name": "openai_chat",
  "type": "LLM_TEXT_COMPLETE",
  "inputParameters": {
    "llmProvider": "openai",
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "\${workflow.input.question}"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 1000
  }
}`}</code></pre>

      <h2>Anthropic (Claude)</h2>

      <p>
        Known for strong reasoning capabilities and large context windows.
      </p>

      <h3>Configuration</h3>

      <pre><code>{`export ANTHROPIC_API_KEY=sk-ant-...`}</code></pre>

      <h3>Usage Example</h3>

      <pre><code>{`{
  "name": "claude_chat",
  "type": "LLM_TEXT_COMPLETE",
  "inputParameters": {
    "llmProvider": "anthropic",
    "model": "claude-3-5-sonnet-20241022",
    "messages": [
      {
        "role": "user",
        "content": "Analyze this document: \${workflow.input.document}"
      }
    ],
    "max_tokens": 4096
  }
}`}</code></pre>

      <h2>Google Vertex AI</h2>

      <p>
        Enterprise-grade AI from Google Cloud. Requires service account authentication.
      </p>

      <h3>Configuration</h3>

      <pre><code>{`# Set up service account
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Or in conductor.properties
conductor.llm.vertex.project_id=my-gcp-project
conductor.llm.vertex.location=us-central1`}</code></pre>

      <h3>Usage Example</h3>

      <pre><code>{`{
  "name": "gemini_chat",
  "type": "LLM_TEXT_COMPLETE",
  "inputParameters": {
    "llmProvider": "vertex_ai",
    "model": "gemini-1.5-pro",
    "messages": [
      {
        "role": "user",
        "content": "\${workflow.input.prompt}"
      }
    ]
  }
}`}</code></pre>

      <h2>AWS Bedrock</h2>

      <p>
        Access multiple models through AWS infrastructure. Uses IAM authentication.
      </p>

      <h3>Configuration</h3>

      <pre><code>{`# AWS credentials (standard AWS SDK authentication)
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_REGION=us-east-1

# Or use IAM roles in EC2/ECS/EKS`}</code></pre>

      <h3>Usage Example</h3>

      <pre><code>{`{
  "name": "bedrock_claude",
  "type": "LLM_TEXT_COMPLETE",
  "inputParameters": {
    "llmProvider": "aws_bedrock",
    "model": "anthropic.claude-3-sonnet-20240229-v1:0",
    "messages": [
      {
        "role": "user",
        "content": "\${workflow.input.prompt}"
      }
    ]
  }
}`}</code></pre>

      <h2>Embeddings</h2>

      <p>
        Generate vector embeddings for RAG workflows:
      </p>

      <pre><code>{`{
  "name": "generate_embedding",
  "type": "LLM_GENERATE_EMBEDDINGS",
  "inputParameters": {
    "llmProvider": "openai",
    "model": "text-embedding-3-small",
    "text": "\${workflow.input.document}"
  }
}`}</code></pre>

      <h2>Provider Fallback</h2>

      <p>
        Configure fallback providers for reliability:
      </p>

      <pre><code>{`{
  "name": "llm_with_fallback",
  "type": "LLM_TEXT_COMPLETE",
  "inputParameters": {
    "llmProvider": "openai",
    "model": "gpt-4o",
    "fallback": {
      "llmProvider": "anthropic",
      "model": "claude-3-5-sonnet-20241022"
    },
    "messages": [/* ... */]
  }
}`}</code></pre>

      <h2>Rate Limiting</h2>

      <p>
        Configure rate limits to stay within provider quotas:
      </p>

      <pre><code>{`# conductor.properties
conductor.llm.openai.rate_limit.requests_per_minute=500
conductor.llm.openai.rate_limit.tokens_per_minute=100000`}</code></pre>
    </article>
  );
}
