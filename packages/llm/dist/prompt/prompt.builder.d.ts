export interface PromptContext {
    summary: string;
    lastIntent: string;
    entities: Record<string, unknown>;
}
export declare class PromptBuilder {
    buildSystemPrompt(context: PromptContext): string;
}
export declare const promptBuilder: PromptBuilder;
//# sourceMappingURL=prompt.builder.d.ts.map