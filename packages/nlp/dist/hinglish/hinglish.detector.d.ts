/**
 * Determines if text is Hinglish based on mixing ratios and rules.
 */
export declare class HinglishDetector {
    private readonly MIXING_THRESHOLD;
    isHinglish(text: string): {
        isHinglish: boolean;
        confidence: number;
    };
}
export declare const hinglishDetector: HinglishDetector;
//# sourceMappingURL=hinglish.detector.d.ts.map