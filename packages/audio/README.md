# 🎧 Audio Package — Realtime Audio Primitives & Processing

## Overview

The **audio package** provides low-level, realtime-safe audio primitives used across the AI Voice Platform.

It operates strictly in the **audio domain**:

- samples
- frames
- timing
- silence

It deliberately contains **no AI, no language logic, no infrastructure bindings**.

If audio handling is wrong:

- ASR accuracy drops
- latency increases
- turn-taking feels unnatural

---

## Core Responsibilities

For every incoming audio stream, this package is responsible for:

1. Canonical audio representation
2. Frame slicing & buffering
3. Timestamp preservation
4. Silence detection
5. Latency & jitter tracking
6. Preparing audio for downstream consumers

---

## Out of Scope

This package must never:

- Call ASR
- Perform NLP
- Know about LiveKit
- Persist audio
- Block realtime threads

---

## Folder Structure

```
packages/audio/
├── src/
│   ├── frames/
│   │   ├── audio.frame.ts
│   │   ├── frame.buffer.ts
│   │   └── frame.utils.ts
│   │
│   ├── silence/
│   │   ├── silence.detector.ts
│   │   └── silence.config.ts
│   │
│   ├── timing/
│   │   ├── timestamp.ts
│   │   └── latency.tracker.ts
│   │
│   ├── resampling/
│   │   └── resampler.ts
│   │
│   └── index.ts
└── README.md
```

---

## Canonical Audio Format

- PCM
- 16-bit signed
- mono
- 16kHz
- fixed frame duration (e.g. 20ms)

All audio must be converted to this format before processing.

---

## frames/

### audio.frame.ts

Defines the canonical AudioFrame type.

### frame.buffer.ts

Buffers uneven chunks into fixed frames.

Pseudo:

```
push(chunk):
  buffer += chunk
  while buffer >= frame_size:
    emit frame
```

### frame.utils.ts

Pure helpers for frame operations.

---

## silence/

### silence.config.ts

Configurable silence thresholds.

### silence.detector.ts

Energy/RMS based silence detection.

---

## timing/

### timestamp.ts

Standardizes timestamp creation and conversion.

### latency.tracker.ts

Tracks delay, jitter, drift.

---

## resampling/

### resampler.ts

Handles sample-rate and channel conversion.

---

## index.ts

Public API surface.

---

## Extensibility

Noise suppression (e.g. DeepFilter) can be inserted later as a filter stage without refactoring.

---

## Testing

- uneven chunks
- silence → speech
- jitter
- long sessions

---

## Final Note

This package should be boring, deterministic, and reusable.
