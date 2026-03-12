# LLM Providers

Conductor integrates with 12 LLM providers for chat, embeddings, image generation, audio synthesis, and video generation.

## Configuration

Each provider requires API credentials configured as environment variables:

| Provider | Environment Variable |
|----------|---------------------|
| OpenAI | `OPENAI_API_KEY` |
| Anthropic | `ANTHROPIC_API_KEY` |
| Google Gemini | `GEMINI_API_KEY` |
| Azure OpenAI | `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT` |
| AWS Bedrock | AWS credentials (IAM role or keys) |
| Mistral AI | `MISTRAL_API_KEY` |
| Cohere | `COHERE_API_KEY` |
| Grok | `GROK_API_KEY` |
| Perplexity | `PERPLEXITY_API_KEY` |
| HuggingFace | `HUGGINGFACE_API_KEY` |
| Ollama | `OLLAMA_BASE_URL` (default: `http://localhost:11434`) |
| Stability AI | `STABILITY_API_KEY` |

## Provider Reference

### OpenAI

Full-featured provider supporting chat, embeddings, images, audio, and video.

**Chat Models:**
- `gpt-4o` - Most capable, multimodal
- `gpt-4o-mini` - Faster, cost-effective
- `gpt-4-turbo` - Previous generation flagship

**Embedding Models:**
- `text-embedding-3-small` - 1536 dimensions, cost-effective
- `text-embedding-3-large` - 3072 dimensions, highest quality

**Image Models:**
- `dall-e-3` - High quality image generation
- `dall-e-2` - Faster, lower cost

**Audio Models:**
- `tts-1` - Standard text-to-speech
- `tts-1-hd` - High definition audio

**Video Models:**
- `sora-2` - Video generation (4, 8, or 12 seconds)

**Example:**

```json
{
  "type": "LLM_CHAT_COMPLETE",
  "inputParameters": {
    "llmProvider": "openai",
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "message": "You are a helpful assistant."},
      {"role": "user", "message": "${workflow.input.question}"}
    ],
    "temperature": 0.7,
    "maxTokens": 1000
  }
}
```

---

### Anthropic

Claude models with industry-leading context windows and safety features.

**Models:**
- `claude-4-sonnet` - Latest generation
- `claude-3-5-sonnet-20241022` - Excellent reasoning
- `claude-3-opus-20240229` - Most capable Claude 3
- `claude-3-sonnet-20240229` - Balanced performance
- `claude-3-haiku-20240307` - Fastest, most affordable

**Example:**

```json
{
  "type": "LLM_CHAT_COMPLETE",
  "inputParameters": {
    "llmProvider": "anthropic",
    "model": "claude-3-5-sonnet-20241022",
    "messages": [
      {"role": "user", "message": "Analyze this document: ${workflow.input.doc}"}
    ],
    "maxTokens": 4096
  }
}
```

---

### Google Gemini

Multimodal models with native image understanding and video generation.

**Chat Models:**
- `gemini-2.0-flash` - Latest, fastest
- `gemini-1.5-pro` - Best for complex tasks
- `gemini-1.5-flash` - Fast and efficient

**Embedding Models:**
- `text-embedding-004` - Latest embedding model

**Video Models:**
- `veo-3.0` - Latest video generation with audio
- `veo-2.0-generate-001` - Video generation

**Example:**

```json
{
  "type": "LLM_CHAT_COMPLETE",
  "inputParameters": {
    "llmProvider": "google_gemini",
    "model": "gemini-2.0-flash",
    "messages": [
      {"role": "user", "message": "Summarize: ${workflow.input.text}"}
    ]
  }
}
```

---

### Azure OpenAI

Enterprise OpenAI deployment with Azure security and compliance.

**Configuration:**
Requires deployment names matching your Azure OpenAI resource.

```properties
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
```

**Example:**

```json
{
  "type": "LLM_CHAT_COMPLETE",
  "inputParameters": {
    "llmProvider": "azure_openai",
    "model": "your-gpt4-deployment-name",
    "messages": [
      {"role": "user", "message": "${workflow.input.prompt}"}
    ]
  }
}
```

---

### AWS Bedrock

Access Claude, Llama, Titan, and more through AWS.

**Models:**
- `anthropic.claude-3-sonnet-20240229-v1:0`
- `anthropic.claude-3-haiku-20240307-v1:0`
- `meta.llama3-70b-instruct-v1:0`
- `amazon.titan-text-express-v1`

**Embedding Models:**
- `amazon.titan-embed-text-v2:0`

**Configuration:**
Uses AWS credentials from environment or IAM role.

```json
{
  "type": "LLM_CHAT_COMPLETE",
  "inputParameters": {
    "llmProvider": "aws_bedrock",
    "model": "anthropic.claude-3-sonnet-20240229-v1:0",
    "messages": [
      {"role": "user", "message": "${workflow.input.prompt}"}
    ]
  }
}
```

---

### Mistral AI

European AI with strong multilingual capabilities.

**Models:**
- `mistral-large-latest` - Most capable
- `mistral-medium-latest` - Balanced
- `mistral-small-latest` - Fast and efficient
- `mixtral-8x7b-instruct` - Open weights mixture of experts

**Embedding Models:**
- `mistral-embed`

---

### Cohere

Specialized in enterprise search and RAG applications.

**Models:**
- `command-r-plus` - Most capable
- `command-r` - Balanced
- `command` - Fast

**Embedding Models:**
- `embed-english-v3.0` - English optimized
- `embed-multilingual-v3.0` - 100+ languages

---

### Ollama (Local)

Run open-source models locally for development and privacy-sensitive workloads.

**Configuration:**

```properties
OLLAMA_BASE_URL=http://localhost:11434
```

**Popular Models:**
- `llama3.2` - Meta's latest
- `mistral` - 7B parameter model
- `phi3` - Microsoft's efficient model
- `nomic-embed-text` - Local embeddings

**Example:**

```json
{
  "type": "LLM_CHAT_COMPLETE",
  "inputParameters": {
    "llmProvider": "ollama",
    "model": "llama3.2",
    "messages": [
      {"role": "user", "message": "${workflow.input.prompt}"}
    ]
  }
}
```

---

## Task Types

### LLM_CHAT_COMPLETE

Multi-turn conversational AI.

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `llmProvider` | String | Yes | Provider identifier |
| `model` | String | Yes | Model name |
| `messages` | Array | Yes | Conversation history |
| `temperature` | Number | No | Randomness (0.0-2.0) |
| `maxTokens` | Integer | No | Response length limit |
| `topP` | Number | No | Nucleus sampling |
| `stopSequences` | Array | No | Stop generation triggers |
| `tools` | Array | No | Function definitions |

**Output:**

| Field | Type | Description |
|-------|------|-------------|
| `result` | String | Generated response |
| `finishReason` | String | `STOP`, `TOOL_CALLS`, or `LENGTH` |
| `tokenUsed` | Integer | Total tokens |
| `toolCalls` | Array | Function calls (if applicable) |

### LLM_TEXT_COMPLETE

Single prompt completion.

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `llmProvider` | String | Yes | Provider identifier |
| `model` | String | Yes | Model name |
| `prompt` | String | Yes | Input prompt |
| `temperature` | Number | No | Randomness |
| `maxTokens` | Integer | No | Response limit |

### LLM_GENERATE_EMBEDDINGS

Convert text to vectors.

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `llmProvider` | String | Yes | Provider identifier |
| `model` | String | Yes | Embedding model |
| `text` | String | Yes | Text to embed |

**Output:** `result` - Array of numbers (embedding vector)

### GENERATE_IMAGE

Create images from text.

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `llmProvider` | String | Yes | Provider identifier |
| `model` | String | Yes | Image model |
| `prompt` | String | Yes | Image description |
| `width` | Integer | No | Width in pixels |
| `height` | Integer | No | Height in pixels |
| `n` | Integer | No | Number of images |
| `style` | String | No | Style preset |

### GENERATE_AUDIO

Text-to-speech synthesis.

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `llmProvider` | String | Yes | Provider identifier |
| `model` | String | Yes | TTS model |
| `text` | String | Yes | Text to speak |
| `voice` | String | No | Voice selection |

### GENERATE_VIDEO

Async video generation.

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `llmProvider` | String | Yes | Provider identifier |
| `model` | String | Yes | Video model |
| `prompt` | String | Yes | Video description |
| `duration` | Integer | No | Length in seconds |
| `size` | String | No | Dimensions |
| `inputImage` | String | No | Image-to-video input |

---

## Best Practices

### Model Selection

- **Latency-sensitive**: Use smaller models (`gpt-4o-mini`, `claude-3-haiku`)
- **Complex reasoning**: Use larger models (`gpt-4o`, `claude-3-opus`)
- **Cost-conscious**: Start small, upgrade as needed

### Token Management

- Set appropriate `maxTokens` to control costs
- Monitor `tokenUsed` in outputs for billing
- Use embeddings for large document processing

### Error Handling

- Configure retries for transient failures
- Use fallback providers for critical paths
- Monitor rate limits per provider
