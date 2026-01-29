import { z } from 'zod';
export class ToolExecutor {
    tools = new Map();
    constructor(tools) {
        tools.forEach((tool) => {
            this.tools.set(tool.metadata.name, tool);
        });
    }
    /**
     * List all available tools and their metadata
     */
    listTools() {
        return Array.from(this.tools.values()).map((t) => t.metadata);
    }
    /**
     * Get metadata for a specific tool
     */
    getToolMetadata(name) {
        return this.tools.get(name)?.metadata;
    }
    /**
     * Execute a tool by name with the provided input
     */
    async execute(name, input) {
        const tool = this.tools.get(name);
        if (!tool) {
            return {
                success: false,
                error: `Tool '${name}' not found`,
                toolName: name,
                timestamp: new Date().toISOString(),
            };
        }
        try {
            // 1. Validate input schema
            const validatedInput = tool.schema.parse(input);
            // 2. Execute tool via adapter
            const data = await tool.execute(validatedInput);
            return {
                success: true,
                data,
                toolName: name,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            let errorMessage = 'Unknown error occurred';
            if (error instanceof z.ZodError) {
                errorMessage = `Validation failed: ${error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`;
            }
            else if (error instanceof Error) {
                errorMessage = error.message;
            }
            return {
                success: false,
                error: errorMessage,
                toolName: name,
                timestamp: new Date().toISOString(),
            };
        }
    }
}
//# sourceMappingURL=tool.executor.js.map