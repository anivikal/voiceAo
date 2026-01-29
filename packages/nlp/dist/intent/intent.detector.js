import { Intent } from './intent.types.js';
import { INTENT_RULES } from './intent.rules.js';
/**
 * Matches rules to text to determine user intent.
 */
export class IntentDetector {
    detectIntent(text) {
        const lowerText = text.toLowerCase();
        for (const rule of INTENT_RULES) {
            // Check regex first
            if (rule.regex && rule.regex.test(text)) {
                return { intent: rule.intent, confidence: 0.9, matchedRule: 'regex' };
            }
            // Check keywords
            const matchedKeywords = rule.keywords.filter(k => lowerText.includes(k));
            if (matchedKeywords.length > 0) {
                const confidence = Math.min(0.8, 0.4 + (matchedKeywords.length * 0.1));
                return { intent: rule.intent, confidence, matchedRule: 'keyword' };
            }
        }
        return { intent: Intent.UNKNOWN, confidence: 1.0 };
    }
}
export const intentDetector = new IntentDetector();
//# sourceMappingURL=intent.detector.js.map