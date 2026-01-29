import { SYSTEM_PROMPT_TEMPLATE } from './prompt.template.js';

export interface PromptContext {
  summary: string;
  lastIntent: string;
  entities: Record<string, unknown>;
}

export class PromptBuilder {
  buildSystemPrompt(context: PromptContext): string {
    let prompt = SYSTEM_PROMPT_TEMPLATE;
    prompt = prompt.replace('{{summary}}', context.summary || 'No summary yet.');
    prompt = prompt.replace('{{lastIntent}}', context.lastIntent || 'None');
    prompt = prompt.replace('{{entities}}', JSON.stringify(context.entities || {}));
    return prompt;
  }
}

export const promptBuilder = new PromptBuilder();
