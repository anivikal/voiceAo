import { AnthropicProvider } from './providers/anthropic.js';
import { responseParser } from './response/response.parser.js';
const defaultProvider = new AnthropicProvider();
const DEFAULT_CONFIG = {
    model: 'claude-3-haiku-20240307',
    temperature: 0.7,
    maxTokens: 512,
};
/**
 * Generates a response using the default LLM provider.
 */
export async function generateResponse(input) {
    const config = { ...DEFAULT_CONFIG, ...input.config };
    const result = await defaultProvider.generate(input.messages, config);
    return {
        ...result,
        text: responseParser.parse(result.text),
    };
}
export * from './llm.types.js';
export * from './providers/anthropic.js';
export * from './prompt/prompt.builder.js';
export * from './response/response.parser.js';
//# sourceMappingURL=index.js.map