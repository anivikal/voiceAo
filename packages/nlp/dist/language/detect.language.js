/**
 * Wraps language detection logic.
 * In a real implementation, this would use fastText or a similar library.
 */
export class LanguageDetector {
    /**
     * Detects the dominant language of the text.
     */
    async detectLanguage(text) {
        const lowerText = text.toLowerCase();
        // Simple heuristic for demonstration
        // In production, use fastText or a dedicated ML model
        const hindiChars = /[\u0900-\u097F]/;
        if (hindiChars.test(text)) {
            return { language: 'hi', confidence: 0.95 };
        }
        const englishWords = ['the', 'is', 'at', 'which', 'on', 'booking', 'cancel', 'status'];
        const words = lowerText.split(/\s+/);
        const englishCount = words.filter(w => englishWords.includes(w)).length;
        if (englishCount > 0) {
            return { language: 'en', confidence: 0.85 };
        }
        return { language: 'unknown', confidence: 0.5 };
    }
}
export const languageDetector = new LanguageDetector();
//# sourceMappingURL=detect.language.js.map