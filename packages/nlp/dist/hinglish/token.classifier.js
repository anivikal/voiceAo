/**
 * Classifies individual tokens as Hindi or English.
 */
export class TokenClassifier {
    HINDI_MARKERS = [
        'karke', 'kardiya', 'hogaya', 'hai', 'nahi', 'kya', 'bhai', 'yaar', 'bolo', 'kar', 'raha'
    ];
    classify(token) {
        const lowerToken = token.toLowerCase();
        // Check for Devanagari script
        if (/[\u0900-\u097F]/.test(token)) {
            return { text: token, type: 'hindi', confidence: 1.0 };
        }
        // Check for common Hinglish markers (Hindi words in Latin script)
        if (this.HINDI_MARKERS.includes(lowerToken)) {
            return { text: token, type: 'hindi', confidence: 0.9 };
        }
        // Default to English for Latin script if not a Hindi marker
        if (/^[a-z]+$/i.test(token)) {
            return { text: token, type: 'english', confidence: 0.7 };
        }
        return { text: token, type: 'other', confidence: 1.0 };
    }
}
export const tokenClassifier = new TokenClassifier();
//# sourceMappingURL=token.classifier.js.map