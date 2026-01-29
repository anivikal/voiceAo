import { LLMInput, LLMResult } from './llm.types.js';
/**
 * Generates a response using the default LLM provider.
 */
export declare function generateResponse(input: LLMInput): Promise<LLMResult>;
export * from './llm.types.js';
export * from './providers/anthropic.js';
export * from './prompt/prompt.builder.js';
export * from './response/response.parser.js';
//# sourceMappingURL=index.d.ts.map