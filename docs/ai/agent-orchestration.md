# Agent Orchestration

Build autonomous AI agents that can reason, use tools, and execute complex multi-step tasks with Conductor's durable execution guarantees.

## What is an AI Agent?

An AI agent is a system that:

1. **Observes** - Receives input and retrieves context
2. **Reasons** - Uses an LLM to decide what to do
3. **Acts** - Executes tools or generates output
4. **Learns** - Incorporates results into next iteration

Conductor provides the orchestration layer to build agents that are:

- **Durable** - Agent state survives failures and restarts
- **Observable** - Full visibility into every decision and action
- **Controllable** - Pause, resume, or intervene at any step
- **Scalable** - Run thousands of concurrent agent instances

## Tool Calling

LLMs can invoke functions (tools) to interact with external systems.

### Defining Tools

Define tools in the `LLM_CHAT_COMPLETE` task:

```json
{
  "type": "LLM_CHAT_COMPLETE",
  "inputParameters": {
    "llmProvider": "openai",
    "model": "gpt-4o",
    "messages": [
      {"role": "user", "message": "What's the weather in San Francisco?"}
    ],
    "tools": [
      {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City name"
            },
            "units": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    ]
  }
}
```

### Handling Tool Calls

When the LLM decides to use a tool, the output includes:

```json
{
  "finishReason": "TOOL_CALLS",
  "toolCalls": [
    {
      "id": "call_abc123",
      "name": "get_weather",
      "arguments": "{\"location\": \"San Francisco\", \"units\": \"fahrenheit\"}"
    }
  ]
}
```

Use a `SWITCH` task to route to the appropriate handler:

```json
{
  "type": "SWITCH",
  "expression": "${llm.output.toolCalls[0].name}",
  "decisionCases": {
    "get_weather": [
      {
        "name": "fetch_weather",
        "type": "HTTP",
        "inputParameters": {
          "http_request": {
            "uri": "https://api.weather.com/v1/current",
            "method": "GET"
          }
        }
      }
    ],
    "search_docs": [
      {
        "name": "search",
        "type": "LLM_SEARCH_INDEX",
        "inputParameters": {
          "vectorDB": "pinecone",
          "query": "${llm.output.toolCalls[0].arguments.query}"
        }
      }
    ]
  }
}
```

## MCP Integration

The Model Context Protocol (MCP) standardizes how LLMs interact with external tools and data sources.

### LIST_MCP_TOOLS

Discover available tools from an MCP server:

```json
{
  "type": "LIST_MCP_TOOLS",
  "inputParameters": {
    "mcpServerUrl": "https://mcp.example.com",
    "mcpServerApiKey": "${workflow.secrets.mcp_key}"
  }
}
```

**Output:**

```json
{
  "tools": [
    {
      "name": "create_issue",
      "description": "Create a GitHub issue",
      "parameters": {...}
    },
    {
      "name": "search_code",
      "description": "Search code repositories",
      "parameters": {...}
    }
  ]
}
```

### CALL_MCP_TOOL

Execute a tool on an MCP server:

```json
{
  "type": "CALL_MCP_TOOL",
  "inputParameters": {
    "mcpServerUrl": "https://mcp.example.com",
    "mcpServerApiKey": "${workflow.secrets.mcp_key}",
    "toolName": "create_issue",
    "arguments": {
      "repo": "conductor-oss/conductor",
      "title": "${workflow.input.issue_title}",
      "body": "${workflow.input.issue_body}"
    }
  }
}
```

## Agent Patterns

### ReAct Agent

Reasoning and Acting in an iterative loop:

```json
{
  "name": "react_agent",
  "tasks": [
    {
      "name": "agent_loop",
      "taskReferenceName": "loop",
      "type": "DO_WHILE",
      "loopCondition": "${reason.output.finishReason != 'STOP'}",
      "loopOver": [
        {
          "name": "reason",
          "taskReferenceName": "reason",
          "type": "LLM_CHAT_COMPLETE",
          "inputParameters": {
            "llmProvider": "openai",
            "model": "gpt-4o",
            "messages": "${workflow.variables.conversation}",
            "tools": "${workflow.input.available_tools}"
          }
        },
        {
          "name": "check_action",
          "type": "SWITCH",
          "expression": "${reason.output.finishReason}",
          "decisionCases": {
            "TOOL_CALLS": [
              {
                "name": "execute_tool",
                "type": "SUB_WORKFLOW",
                "subWorkflowParam": {
                  "name": "tool_executor"
                },
                "inputParameters": {
                  "toolCall": "${reason.output.toolCalls[0]}"
                }
              },
              {
                "name": "update_conversation",
                "type": "SET_VARIABLE",
                "inputParameters": {
                  "conversation": "${workflow.variables.conversation + tool_result}"
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

### Multi-Agent Orchestration

Coordinate multiple specialized agents:

```json
{
  "name": "multi_agent_workflow",
  "tasks": [
    {
      "name": "router",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "system",
            "message": "Route this request to: 'research', 'code', or 'writing'"
          },
          {"role": "user", "message": "${workflow.input.task}"}
        ]
      }
    },
    {
      "name": "dispatch",
      "type": "SWITCH",
      "expression": "${router.output.result}",
      "decisionCases": {
        "research": [
          {"type": "SUB_WORKFLOW", "subWorkflowParam": {"name": "research_agent"}}
        ],
        "code": [
          {"type": "SUB_WORKFLOW", "subWorkflowParam": {"name": "coding_agent"}}
        ],
        "writing": [
          {"type": "SUB_WORKFLOW", "subWorkflowParam": {"name": "writing_agent"}}
        ]
      }
    }
  ]
}
```

### Human-in-the-Loop

Add approval steps for sensitive actions:

```json
{
  "name": "agent_with_approval",
  "tasks": [
    {
      "name": "plan_action",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {"role": "user", "message": "Plan how to: ${workflow.input.task}"}
        ]
      }
    },
    {
      "name": "human_approval",
      "type": "HUMAN",
      "inputParameters": {
        "assignee": "${workflow.input.approver}",
        "title": "Approve Agent Action",
        "description": "The agent wants to:\n${plan_action.output.result}"
      }
    },
    {
      "name": "execute_plan",
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {"name": "action_executor"},
      "inputParameters": {
        "plan": "${plan_action.output.result}"
      }
    }
  ]
}
```

## Agentic RAG

Combine retrieval with agent reasoning:

```json
{
  "name": "agentic_rag",
  "tasks": [
    {
      "name": "analyze_query",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "message": "Analyze this query. Output JSON with: search_queries (array), needs_clarification (boolean)"
          },
          {"role": "user", "message": "${workflow.input.question}"}
        ]
      }
    },
    {
      "name": "parallel_search",
      "type": "FORK_JOIN",
      "forkTasks": "${analyze_query.output.search_queries}",
      "dynamicForkTasksParam": "search_queries",
      "dynamicForkTasksInputParamName": "query"
    },
    {
      "name": "synthesize",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "message": "Synthesize an answer from multiple search results. Cite sources."
          },
          {
            "role": "user",
            "message": "Question: ${workflow.input.question}\n\nResults: ${parallel_search.output}"
          }
        ]
      }
    }
  ]
}
```

## Best Practices

### State Management

Use workflow variables to maintain conversation history:

```json
{
  "type": "SET_VARIABLE",
  "inputParameters": {
    "conversation": "${workflow.variables.conversation.concat([new_message])}"
  }
}
```

### Error Recovery

Wrap tool calls in error handling:

```json
{
  "name": "safe_tool_call",
  "type": "SUB_WORKFLOW",
  "subWorkflowParam": {"name": "tool_executor"},
  "optional": true,
  "onFailure": "CONTINUE"
}
```

### Token Limits

Summarize long conversations to stay within context limits:

```json
{
  "type": "SWITCH",
  "expression": "${workflow.variables.conversation.length > 50}",
  "decisionCases": {
    "true": [
      {
        "type": "LLM_CHAT_COMPLETE",
        "inputParameters": {
          "messages": [
            {"role": "system", "message": "Summarize this conversation"},
            {"role": "user", "message": "${workflow.variables.conversation}"}
          ]
        }
      }
    ]
  }
}
```

### Observability

Log agent decisions for debugging:

- Use task outputs to capture reasoning
- Store tool call history in workflow variables
- Enable workflow status listeners for real-time monitoring

### Cost Control

- Use smaller models for routing (`gpt-4o-mini`)
- Cache frequent searches
- Set max iterations on agent loops
- Monitor token usage across workflows
