import Anthropic from '@anthropic-ai/sdk';
export class AnthropicProvider {
    client;
    constructor(apiKey) {
        this.client = new Anthropic({
            apiKey: apiKey || process.env.ANTHROPIC_API_KEY || '',
        });
    }
    async generate(messages, config) {
        const system = config.systemPrompt;
        const anthropicMessages = messages.map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
        }));
        const response = await this.client.messages.create({
            model: config.model || 'claude-3-opus-20240229',
            max_tokens: config.maxTokens || 1024,
            temperature: config.temperature ?? 0.7,
            system,
            messages: anthropicMessages,
        });
        const text = response.content[0].type === 'text' ? response.content[0].text : '';
        return {
            text,
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens,
            },
            model: response.model,
            provider: 'anthropic',
        };
    }
}
//# sourceMappingURL=anthropic.js.map