import { ClassifiedToken } from './token.classifier.js';
export interface MixingMetrics {
    hindiRatio: number;
    englishRatio: number;
    switchCount: number;
}
/**
 * Computes mixing ratios and switching patterns in text.
 */
export declare class MixingAnalyzer {
    analyze(tokens: ClassifiedToken[]): MixingMetrics;
}
export declare const mixingAnalyzer: MixingAnalyzer;
//# sourceMappingURL=mixing.analyzer.d.ts.map