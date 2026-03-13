export default function AgentOrchestrationPage() {
  return (
    <article className="prose">
      <h1>Agent Orchestration</h1>
      
      <p>
        Conductor provides powerful primitives for building AI agent systems—from 
        simple tool-calling patterns to complex multi-agent architectures. The 
        durable execution model ensures your agents are reliable even when 
        dealing with unreliable LLM APIs.
      </p>

      <h2>Why Orchestrate Agents with Conductor?</h2>

      <ul>
        <li><strong>Reliability</strong> - Automatic retries for failed LLM calls with exponential backoff</li>
        <li><strong>State management</strong> - Maintain conversation context across failures and restarts</li>
        <li><strong>Observability</strong> - Full execution history for debugging prompts and responses</li>
        <li><strong>Cost control</strong> - Track token usage, implement budgets and rate limits</li>
        <li><strong>Human-in-the-loop</strong> - Built-in support for approval workflows</li>
      </ul>

      <h2>Tool Calling Pattern</h2>

      <p>
        The most common agent pattern: an LLM decides which tools to call based 
        on user input, then synthesizes a response from tool outputs.
      </p>

      <pre><code>{`{
  "name": "tool_calling_agent",
  "tasks": [
    {
      "name": "analyze_intent",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "You are an assistant with access to tools. Analyze the user request and return a JSON object with 'tool' and 'parameters' fields."
          },
          {
            "role": "user",
            "content": "\${workflow.input.query}"
          }
        ],
        "response_format": { "type": "json_object" }
      }
    },
    {
      "name": "route_to_tool",
      "type": "SWITCH",
      "expression": "\${analyze_intent.output.result.tool}",
      "decisionCases": {
        "search": [
          {
            "name": "web_search",
            "type": "HTTP",
            "inputParameters": {
              "http_request": {
                "uri": "https://api.search.com/search",
                "method": "POST",
                "body": {
                  "query": "\${analyze_intent.output.result.parameters.query}"
                }
              }
            }
          }
        ],
        "calculator": [
          {
            "name": "calculate",
            "type": "INLINE",
            "inputParameters": {
              "expression": "\${analyze_intent.output.result.parameters.expression}",
              "evaluatorType": "javascript"
            }
          }
        ]
      },
      "defaultCase": [
        {
          "name": "no_tool_needed",
          "type": "INLINE",
          "inputParameters": {
            "result": "No tool needed"
          }
        }
      ]
    },
    {
      "name": "synthesize_response",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "Based on the tool output, provide a helpful response to the user."
          },
          {
            "role": "user",
            "content": "Query: \${workflow.input.query}\\nTool output: \${route_to_tool.output}"
          }
        ]
      }
    }
  ]
}`}</code></pre>

      <h2>ReAct Pattern (Reasoning + Acting)</h2>

      <p>
        The ReAct pattern allows agents to iteratively reason about a problem, 
        take actions, and observe results until a goal is achieved.
      </p>

      <pre><code>{`{
  "name": "react_agent",
  "tasks": [
    {
      "name": "reason_act_loop",
      "type": "DO_WHILE",
      "loopCondition": "\${reason_step.output.result.action != 'finish'}",
      "loopOver": [
        {
          "name": "reason_step",
          "type": "LLM_TEXT_COMPLETE",
          "inputParameters": {
            "model": "gpt-4o",
            "messages": [
              {
                "role": "system",
                "content": "You are a ReAct agent. Given the goal and observations, output JSON with 'thought', 'action' (search/calculate/finish), and 'action_input' fields."
              },
              {
                "role": "user",
                "content": "Goal: \${workflow.input.goal}\\nObservations: \${observations}"
              }
            ],
            "response_format": { "type": "json_object" }
          }
        },
        {
          "name": "execute_action",
          "type": "SWITCH",
          "expression": "\${reason_step.output.result.action}",
          "decisionCases": {
            "search": [/* search task */],
            "calculate": [/* calculate task */]
          }
        },
        {
          "name": "update_observations",
          "type": "INLINE",
          "inputParameters": {
            "observations": "\${observations} + \${execute_action.output}"
          }
        }
      ]
    }
  ]
}`}</code></pre>

      <h2>Multi-Agent Systems</h2>

      <p>
        For complex tasks, multiple specialized agents can collaborate. 
        Conductor orchestrates the communication and ensures reliability.
      </p>

      <h3>Supervisor Pattern</h3>

      <p>
        A supervisor agent delegates tasks to specialized worker agents:
      </p>

      <pre><code>{`{
  "name": "multi_agent_supervisor",
  "tasks": [
    {
      "name": "supervisor_planning",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "You are a supervisor. Break down the task and assign to agents: researcher, writer, critic. Return a JSON plan."
          },
          {
            "role": "user",
            "content": "\${workflow.input.task}"
          }
        ]
      }
    },
    {
      "name": "execute_agents",
      "type": "FORK_JOIN_DYNAMIC",
      "inputParameters": {
        "dynamicTasks": "\${supervisor_planning.output.result.tasks}",
        "dynamicTasksInput": "\${supervisor_planning.output.result.inputs}"
      },
      "dynamicForkTasksParam": "dynamicTasks",
      "dynamicForkTasksInputParamName": "dynamicTasksInput"
    },
    {
      "name": "synthesize_results",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "Combine the agent outputs into a final response."
          },
          {
            "role": "user",
            "content": "Agent outputs: \${execute_agents.output}"
          }
        ]
      }
    }
  ]
}`}</code></pre>

      <h2>Human-in-the-Loop</h2>

      <p>
        For high-stakes decisions, pause workflows for human approval:
      </p>

      <pre><code>{`{
  "name": "agent_with_approval",
  "tasks": [
    {
      "name": "generate_action",
      "type": "LLM_TEXT_COMPLETE",
      "inputParameters": {
        "model": "gpt-4o",
        "messages": [/* ... */]
      }
    },
    {
      "name": "human_approval",
      "type": "HUMAN",
      "inputParameters": {
        "action": "\${generate_action.output.result}",
        "prompt": "Approve this action?"
      }
    },
    {
      "name": "check_approval",
      "type": "SWITCH",
      "expression": "\${human_approval.output.approved}",
      "decisionCases": {
        "true": [/* execute action */],
        "false": [/* handle rejection */]
      }
    }
  ]
}`}</code></pre>

      <h2>MCP (Model Context Protocol) Support</h2>

      <p>
        Conductor supports MCP for standardized tool integration:
      </p>

      <pre><code>{`{
  "name": "mcp_tool_call",
  "type": "LLM_TEXT_COMPLETE",
  "inputParameters": {
    "model": "claude-3-5-sonnet-20241022",
    "tools": [
      {
        "type": "mcp",
        "server": "filesystem",
        "capabilities": ["read", "write", "list"]
      }
    ],
    "messages": [/* ... */]
  }
}`}</code></pre>

      <h2>Best Practices</h2>

      <ul>
        <li>
          <strong>Set token limits</strong> - Prevent runaway costs with 
          <code>max_tokens</code> and workflow-level budgets
        </li>
        <li>
          <strong>Use structured outputs</strong> - Request JSON responses for 
          reliable parsing
        </li>
        <li>
          <strong>Implement circuit breakers</strong> - Fail gracefully when 
          LLM services are degraded
        </li>
        <li>
          <strong>Log prompts</strong> - Store full prompt/response pairs for 
          debugging and improvement
        </li>
        <li>
          <strong>Version your prompts</strong> - Track prompt changes alongside 
          workflow versions
        </li>
      </ul>
    </article>
  );
}
