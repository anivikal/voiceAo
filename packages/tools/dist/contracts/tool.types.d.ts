import { z } from 'zod';
export type ToolName = string;
export interface ToolMetadata {
    name: ToolName;
    description: string;
    isReadOnly: boolean;
    requiresConfirmation: boolean;
    isSafeForAutomation: boolean;
    handoffRecommendedOnFailure: boolean;
}
export interface ToolDefinition<TInput = any, TOutput = any> {
    metadata: ToolMetadata;
    schema: z.ZodType<TInput>;
    execute: (input: TInput) => Promise<TOutput>;
}
export interface ToolResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    toolName: ToolName;
    timestamp: string;
}
//# sourceMappingURL=tool.types.d.ts.map