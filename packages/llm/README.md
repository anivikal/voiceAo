# 📦 packages/llm — Language Model Abstraction

## Purpose

The **LLM package** provides a clean, swappable abstraction over language models.

It answers one question only:

> _Given structured input, what text should be generated?_

It does **not**:

- store memory
- track conversation state
- decide business logic
- talk to tools directly
- know about calls or users

---

## Core Responsibilities

1. Abstract LLM providers (OpenAI, Anthropic, local, etc.)
2. Manage prompts and system instructions
3. Normalize model responses
4. Enforce safety and formatting constraints
5. Provide deterministic configuration (temperature, tokens)

---

## Folder Structure

```
packages/llm/
├── src/
│   ├── providers/
│   │   ├── openai.ts
│   │   └── anthropic.ts
│   │
│   ├── prompt/
│   │   ├── prompt.template.ts
│   │   └── prompt.builder.ts
│   │
│   ├── response/
│   │   └── response.parser.ts
│   │
│   ├── llm.types.ts
│   └── index.ts
└── README.md
```

---

## Design Principles

- Stateless
- Provider-agnostic
- Deterministic by default
- Structured in, structured out

---

## Key Files

### providers/\*

Each provider file:

- wraps a single LLM vendor
- exposes a common interface

Pseudo-interface:

```typescript
generate(prompt, config) → raw_text
```

No provider-specific logic should leak upward.

---

### prompt.builder.ts

**Purpose**
Builds prompts from structured inputs.

**Inputs**

- conversation summary
- last user intent
- entities
- system rules

**Pseudocode**

```typescript
buildPrompt(context):
  inject system instructions
  inject conversation summary
  inject user turn
  return prompt
```

Prompts should be **versioned and explicit**.

---

### response.parser.ts

**Purpose**
Normalizes raw LLM output.

Responsibilities:

- trim hallucinations
- enforce output schema
- detect malformed responses

LLM output should **never** be trusted blindly.

---

### llm.types.ts

Defines:

- request config
- response shape
- provider interface

---

### index.ts

Public API:

```typescript
generateResponse(llmInput) → LLMResult
```
