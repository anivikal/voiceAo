import { Intent } from './intent.types.js';
export interface IntentRule {
    intent: Intent;
    keywords: string[];
    regex?: RegExp;
}
export declare const INTENT_RULES: IntentRule[];
//# sourceMappingURL=intent.rules.d.ts.map