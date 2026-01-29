# 🏷️ Types Package — Shared TypeScript Contracts

## Overview

The **types package** defines the "language" that all services and packages in the AI Voice Platform speak. It contains the canonical interfaces, enums, and types for the entire domain.

By centralizing types, we ensure that:

- The `ai-agent` and `orchestrator-api` agree on what a `Call` looks like.
- The `nlp` package and `llm` package agree on the structure of an `NLPResult`.
- Handoff context is consistent across the human agent console and the backend.

---

## Core Responsibilities

1. **Domain Models**: `Call`, `Turn`, `Event`.
2. **State Enums**: `CallStatus`, `EventType`.
3. **Cross-Package Contracts**: `NLPResult`, `LLMMessage`, `HandoffContext`.
4. **Primitive Types**: `Speaker`, `LanguageCode`.

---

## Folder Structure

```
packages/types/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Usage

```typescript
import { Call, CallStatus, NLPResult } from "@voice-platform/types";

const myCall: Call = {
  id: "...",
  status: CallStatus.ACTIVE,
  // ...
};
```

---

## Design Principles

- **Zero Dependencies**: This package should ideally have no dependencies to keep it lightweight and easy to import.
- **Purely Declarative**: Contains only types, interfaces, and enums. No executable logic.
- **Canonical**: If a type is used by more than one package/app, it belongs here.
