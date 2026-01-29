/**
 * Computes mixing ratios and switching patterns in text.
 */
export class MixingAnalyzer {
    analyze(tokens) {
        if (tokens.length === 0) {
            return { hindiRatio: 0, englishRatio: 0, switchCount: 0 };
        }
        let hindiCount = 0;
        let englishCount = 0;
        let switchCount = 0;
        let lastType = null;
        for (const token of tokens) {
            if (token.type === 'hindi')
                hindiCount++;
            if (token.type === 'english')
                englishCount++;
            if (lastType && token.type !== 'other' && token.type !== lastType) {
                switchCount++;
            }
            if (token.type !== 'other') {
                lastType = token.type;
            }
        }
        const total = tokens.filter(t => t.type !== 'other').length || 1;
        return {
            hindiRatio: hindiCount / total,
            englishRatio: englishCount / total,
            switchCount,
        };
    }
}
export const mixingAnalyzer = new MixingAnalyzer();
//# sourceMappingURL=mixing.analyzer.js.map