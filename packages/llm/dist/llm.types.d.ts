import { LLMMessage } from '@voice-platform/types';
export interface LLMConfig {
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt?: string;
}
export interface LLMResult {
    text: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    model: string;
    provider: string;
}
export interface LLMProvider {
    generate(messages: LLMMessage[], config: LLMConfig): Promise<LLMResult>;
}
export interface LLMInput {
    messages: LLMMessage[];
    config?: Partial<LLMConfig>;
}
//# sourceMappingURL=llm.types.d.ts.map