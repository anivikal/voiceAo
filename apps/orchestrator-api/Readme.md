# 🧠 Orchestrator API — System Brain & Source of Truth

## Overview

The **Orchestrator API** is the central brain of the AI Voice Platform.
All stateful decisions, lifecycle management, and auditability live here.

If this service is down, calls may still stream audio — but **the system no longer knows what is happening**.

---

## Core Responsibilities

- Call lifecycle management
- Conversation context & memory
- Transcript and semantic event storage
- Tool authorization & execution
- Warm handoff coordination
- Context delivery to human agents
- Analytics & audit logs

---

## What This Service Never Does

- Audio streaming
- ASR / TTS
- LLM inference
- LiveKit control
- UI rendering

---

## Folder Structure

```
orchestrator-api/
├── src/
│   ├── api/
│   │   ├── call.controller.ts
│   │   ├── handoff.controller.ts
│   │   └── analytics.controller.ts
│   │
│   ├── services/
│   │   ├── call.service.ts
│   │   ├── context.service.ts
│   │   ├── handoff.service.ts
│   │   └── transcript.service.ts
│   │
│   ├── models/
│   │   ├── call.model.ts
│   │   ├── turn.model.ts
│   │   └── event.model.ts
│   │
│   ├── queues/
│   │   └── async.events.ts
│   │
│   └── index.ts
│
├── prisma/
├── Dockerfile
└── README.md
```

---

## Call Lifecycle Model

```
CREATED → ACTIVE → HANDED_OFF → ENDED
```

Rules:
- A call can only be ended once
- Handoff can only happen once
- ENDED calls are immutable

---

## API Shapes

### Create Call
POST /calls

```
Request:
{ "source": "driver_app" }

Response:
{ "call_id": "abc123", "room_name": "call_abc123" }
```

---

### Start Call
POST /calls/:id/start

---

### End Call
POST /calls/:id/end

---

### Append Transcript Turn
POST /calls/:id/turns

```
{
  "speaker": "driver",
  "text": "bhai booking cancel ho gayi",
  "confidence": 0.92,
  "language": "hinglish"
}
```

---

### Log Semantic Event
POST /calls/:id/events

---

### Request Handoff
POST /calls/:id/handoff/request

---

### Fetch Context
GET /calls/:id/context

---

## Service Responsibilities (Pseudocode)

### call.service.ts
```
createCall()
startCall()
endCall()
```

### context.service.ts
```
updateSummary()
extractEntities()
snapshotContext()
```

### transcript.service.ts
```
validateTurn()
persistTurn()
```

### handoff.service.ts
```
evaluateRules()
markHandedOff()
```

---

## Running Locally

Requirements:
- Node.js 18+
- PostgreSQL
- pnpm

Install:
```
pnpm install
```

Migrate DB:
```
pnpm prisma migrate dev
```

Run:
```
pnpm dev
```

API runs on http://localhost:3000

---

## Testing Strategy

### Unit Tests
- Service logic
- Rule evaluation

### Integration Tests
- API endpoints
- DB persistence

### Failure Tests
- Duplicate events
- Out-of-order lifecycle calls
- Partial data writes

---

## Invariants

- One lifecycle per call
- Handoff at most once
- Turns never exist without call
- ENDED calls are read-only

---

## Final Philosophy

The Orchestrator API must be:
- strict
- boring
- predictable
- auditable

If logic leaks elsewhere, the system will fail silently.
