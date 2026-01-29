# ⚙️ Config Package — Shared Configuration & Validation

## Overview

The **config package** is the single source of truth for all environment variables and system settings across the AI Voice Platform.

It ensures that the system **fails fast** if critical configuration is missing or malformed.

---

## Core Responsibilities

1. **Centralization**: One place to manage all environment variables.
2. **Validation**: Uses **Zod** to enforce types and constraints at runtime.
3. **Defaults**: Provides sensible defaults for local development.
4. **Type Safety**: Exports a fully typed `Config` object.

---

## Folder Structure

```
packages/config/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Usage

### In Application Code

```typescript
import config from "@voice-platform/config";

console.log(config.PORT);
console.log(config.ORCHESTRATOR_API_URL);
```

### Adding New Config

1. Open `src/index.ts`.
2. Update the `ConfigSchema` Zod object.
3. The changes will be immediately available and typed across the workspace.

---

## Design Principles

- **Immutable**: The config object is parsed once and cannot be changed at runtime.
- **Strict**: If a required variable is missing, the process will exit with a clear error.
- **Environment Aware**: Automatically loads `.env` files using `dotenv`.
