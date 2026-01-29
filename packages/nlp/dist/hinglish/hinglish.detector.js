import { tokenClassifier } from './token.classifier.js';
import { mixingAnalyzer } from './mixing.analyzer.js';
/**
 * Determines if text is Hinglish based on mixing ratios and rules.
 */
export class HinglishDetector {
    MIXING_THRESHOLD = 0.2; // At least 20% of other language
    isHinglish(text) {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        if (words.length < 2) {
            return { isHinglish: false, confidence: 1.0 };
        }
        const classifiedTokens = words.map(w => tokenClassifier.classify(w));
        const metrics = mixingAnalyzer.analyze(classifiedTokens);
        const isMixed = metrics.hindiRatio > this.MIXING_THRESHOLD &&
            metrics.englishRatio > this.MIXING_THRESHOLD;
        const hasSwitches = metrics.switchCount > 0;
        if (isMixed || (hasSwitches && words.length > 3)) {
            const confidence = Math.min(0.95, (metrics.hindiRatio + metrics.englishRatio) / 2 + 0.2);
            return { isHinglish: true, confidence };
        }
        return { isHinglish: false, confidence: 0.8 };
    }
}
export const hinglishDetector = new HinglishDetector();
//# sourceMappingURL=hinglish.detector.js.map