import { ToolDefinition, ToolName, ToolResult } from '../contracts/tool.types.js';
export declare class ToolExecutor {
    private tools;
    constructor(tools: ToolDefinition[]);
    /**
     * List all available tools and their metadata
     */
    listTools(): import("../contracts/tool.types.js").ToolMetadata[];
    /**
     * Get metadata for a specific tool
     */
    getToolMetadata(name: ToolName): import("../contracts/tool.types.js").ToolMetadata | undefined;
    /**
     * Execute a tool by name with the provided input
     */
    execute(name: ToolName, input: any): Promise<ToolResult>;
}
//# sourceMappingURL=tool.executor.d.ts.map