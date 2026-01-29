# 🧠 NLP Package — Language, Hinglish & Intent Intelligence

## Overview

The **NLP package** is the linguistic foundation of the AI Voice Platform.

Everything downstream — AI responses, tool calls, warm handoff, analytics — depends on the correctness of this package.

If NLP is noisy:

- the AI sounds incorrect,
- handoff triggers wrongly,
- analytics lose meaning.

This package produces **signals**, not actions.

---

## Core Responsibilities

For every user utterance, this package determines:

1. Dominant language
2. Whether the speech is Hinglish (code-mixed)
3. User intent
4. Relevant entities
5. Confidence levels

---

## Design Principles

- Streaming-friendly
- Deterministic & explainable
- Heuristics before heavy models
- Language stability over jitter

---

## Folder Structure

```
packages/nlp/
├── src/
│   ├── language/
│   │   ├── detect.language.ts
│   │   ├── language.lock.ts
│   │   └── language.types.ts
│   │
│   ├── hinglish/
│   │   ├── token.classifier.ts
│   │   ├── mixing.analyzer.ts
│   │   └── hinglish.detector.ts
│   │
│   ├── intent/
│   │   ├── intent.rules.ts
│   │   ├── intent.detector.ts
│   │   └── intent.types.ts
│   │
│   ├── entities/
│   │   ├── entity.extractor.ts
│   │   └── entity.types.ts
│   │
│   ├── pipeline/
│   │   └── nlp.pipeline.ts
│   │
│   └── index.ts
└── README.md
```

---

## language/

### detect.language.ts

Wraps fastText language detection.

Pseudo:

```
detectLanguage(text):
  return { language, confidence }
```

---

### language.lock.ts

Prevents language flipping.

Pseudo:

```
lockLanguage(newDetection):
  if stable → keep
  else → update
```

---

## hinglish/

### token.classifier.ts

Classifies tokens as Hindi/English.

---

### mixing.analyzer.ts

Computes mixing ratios.

---

### hinglish.detector.ts

Determines Hinglish using rules.

---

## intent/

### intent.rules.ts

Keyword and regex rules.

---

### intent.detector.ts

Matches rules to text.

---

## entities/

### entity.extractor.ts

Extracts booking IDs, locations, etc.

---

## pipeline/

### nlp.pipeline.ts

Coordinates NLP stages.

---

## Example Output

```
{
  language: "hinglish",
  intent: "HANDOFF_REQUEST",
  entities: { booking_id: "BK991" }
}
```

---

## Testing

- Noisy ASR text
- Partial sentences
- Code-mixing
- Slang

---

## Final Note

This package must stay boring and predictable.
