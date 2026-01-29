# 🧰 Tools Package — Action & Capability Layer (Tier‑1 Driver Support)

## Overview

The **tools package** defines *what the AI system is allowed to do* in the real world.

This platform’s primary goal is:

> **Resolve Tier‑1 driver queries via a voice chatbot, with a warm handoff to humans when needed.**

Talking alone does not resolve Tier‑1 issues — **actions do**.

The `packages/tools` module is the **only place** where those actions are formally defined.

---

## One‑Line Definition

> `packages/tools` defines **safe, auditable, and constrained actions** that the AI system can request and the platform can execute.

If:
- `audio` = hearing  
- `nlp` = understanding  
- `memory` = remembering  
- `llm` = suggesting  

Then:

👉 **`tools` = acting**

---

## Why This Package Is Critical

Without a strict tools layer:

- LLMs hallucinate actions
- Backend calls become unsafe
- Debugging becomes impossible
- Human handoff lacks context

With a proper tools layer:

- Automation is safe
- Failures are explainable
- Handoff is meaningful
- Tier‑1 resolution becomes reliable

---

## Core Responsibilities

This package is responsible for:

1. Defining **what tools exist**
2. Defining **what inputs each tool accepts**
3. Defining **what outputs each tool guarantees**
4. Declaring **tool safety & constraints**
5. Providing **adapters** to real systems
6. Enabling **mockable, testable execution**

---

## Explicitly Out of Scope

This package must **never**:

- Decide *when* a tool should be used
- Call LLMs
- Store conversation memory
- Perform NLP or audio processing
- Make handoff decisions
- Persist database state directly

Tools are **capabilities**, not decision‑makers.

---

## Folder Structure

```
packages/tools/
├── contracts/
│   ├── tool.types.ts
│   ├── tool.schema.ts
│   └── tool.metadata.ts
│
├── definitions/
│   ├── booking.tools.ts
│   ├── payment.tools.ts
│   └── support.tools.ts
│
├── adapters/
│   ├── booking.adapter.ts
│   ├── payment.adapter.ts
│   └── support.adapter.ts
│
├── executor/
│   └── tool.executor.ts
│
└── index.ts
```

---

## contracts/

### tool.types.ts

Defines core tool interfaces.

Example concepts:
- ToolName
- ToolInput
- ToolOutput
- ToolError

Every tool must conform to these types.

---

### tool.schema.ts

Defines **input/output schemas** for validation.

Why this matters:
- Prevents malformed requests
- Protects backend systems
- Enables strict runtime validation

Tools must **fail fast** on invalid input.

---

### tool.metadata.ts

Declares **safety and policy information** for each tool.

Examples:
- read‑only vs write
- auto‑executable vs confirmation required
- safe for Tier‑1 or not
- failure → handoff recommended?

This metadata is critical for orchestration decisions.

---

## definitions/

This folder defines **what tools exist**, grouped by domain.

### booking.tools.ts

Examples:
- get_booking_status
- get_cancellation_reason
- get_trip_details

All tools here must be:
- read‑only
- safe for automation
- idempotent

---

### payment.tools.ts

Examples:
- check_payment_status
- get_refund_eta

Payments are sensitive — tools here must be **strictly scoped**.

---

### support.tools.ts

Examples:
- raise_support_ticket
- handoff_to_human

These tools often **end automation** and escalate the issue.

---

## adapters/

Adapters are **thin wrappers** around real systems.

They:
- translate tool input → API request
- translate API response → tool output
- normalize errors

Important rule:

> **Adapters do not decide behavior — they only execute.**

Adapters must be:
- deterministic
- side‑effect aware
- mockable

---

## executor/

### tool.executor.ts

**Purpose**  
Executes tools in a controlled, observable way.

**Responsibilities**
- Validate input schema
- Check tool metadata constraints
- Call appropriate adapter
- Normalize result or error
- Emit execution events

**Pseudocode**
```
execute(toolName, input):
  validate schema
  check permissions
  call adapter
  return result
```

Execution never happens directly from LLM or agent code.

---

## index.ts

Exposes a clean public API.

Example:
```
listTools()
executeTool(name, input)
getToolMetadata(name)
```

Downstream services should not import internal files directly.

---

## How Tools Fit in the System

```
User Speech
   ↓
NLP (intent + entities)
   ↓
AI Agent decides "I need a tool"
   ↓
Tool request (structured)
   ↓
Orchestrator authorizes + executes
   ↓
Tool result
   ↓
LLM explains result
```

Key rule:
> **LLMs never execute tools directly.**

---

## Tier‑1 Driver Queries → Tools

| Driver Query | Tool |
|-------------|------|
| Booking cancel kyun hui? | get_cancellation_reason |
| Payment kab milega? | check_payment_status |
| Complaint raise karo | raise_support_ticket |
| Agent se baat karni hai | handoff_to_human |

This mapping is what makes the chatbot useful.

---

## Testing Strategy

This package must be testable **in isolation**.

### Unit Tests
- Schema validation
- Metadata enforcement

### Adapter Tests
- Success cases
- Backend failures
- Timeouts

### Executor Tests
- Invalid input rejection
- Permission denial
- Idempotency

No test should require:
- LLMs
- audio
- LiveKit
- real databases

---

## Common Mistakes to Avoid

❌ Letting LLMs invent tool parameters  
❌ Hiding logic in adapters  
❌ Combining tools and orchestration  
❌ Silent failures  
❌ Unbounded write actions  

---

## Final Philosophy

> **Tools are the boundary between language and reality.**

If tools are:
- explicit → system is safe  
- typed → system is debuggable  
- constrained → system is controllable  

For Tier‑1 automation, **clarity beats cleverness every time**.
