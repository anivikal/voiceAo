# 📦 packages/memory — Conversational State & Context

## Purpose

The **memory package** manages **conversation context and summaries**.

It answers:

> _What does the system know so far about this call?_

It does **not**:

- call LLMs
- make decisions
- store data permanently
- know about audio

---

## Core Responsibilities

1. Maintain rolling conversation summary
2. Track important entities
3. Snapshot context for handoff
4. Compress long conversations
5. Provide read-only context views

---

## Folder Structure

```
packages/memory/
├── src/
│   ├── context/
│   │   ├── context.state.ts
│   │   └── context.updater.ts
│   │
│   ├── summary/
│   │   ├── summarizer.ts
│   │   └── summary.types.ts
│   │
│   ├── snapshot/
│   │   └── snapshot.builder.ts
│   │
│   ├── memory.types.ts
│   └── index.ts
└── README.md
```

---

## Design Principles

- Deterministic
- Append-only inputs
- No side effects
- Easy to serialize

---

## Key Files

### context.state.ts

Defines in-memory representation:

```typescript
ContextState {
  language
  intent_history
  entities
  sentiment
}
```

This object is updated incrementally.

---

### context.updater.ts

**Purpose**
Updates context with new NLP signals.

Pseudocode:

```typescript
updateContext(prev, nlpResult):
  merge entities
  append intent
  update sentiment
  return newContext
```

Never mutates input state.

---

### summarizer.ts

**Purpose**
Compresses conversation history.

Strategies:

- rule-based summarization initially
- LLM-based summarization later

Must be:

- deterministic
- reversible enough for debugging

---

### snapshot.builder.ts

**Purpose**
Creates handoff-safe context snapshot.

Snapshot contains:

- short summary
- key entities
- last known intent
- language

No raw transcripts.

---

### index.ts

Public API:

```typescript
updateMemory(context, nlpResult);
buildSnapshot(context);
```
