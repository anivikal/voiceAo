import { LLMMessage } from '@voice-platform/types';
import { LLMProvider, LLMConfig, LLMResult } from '../llm.types.js';
export declare class AnthropicProvider implements LLMProvider {
    private client;
    constructor(apiKey?: string);
    generate(messages: LLMMessage[], config: LLMConfig): Promise<LLMResult>;
}
//# sourceMappingURL=anthropic.d.ts.map