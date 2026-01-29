export type TokenType = 'hindi' | 'english' | 'other';
export interface ClassifiedToken {
    text: string;
    type: TokenType;
    confidence: number;
}
/**
 * Classifies individual tokens as Hindi or English.
 */
export declare class TokenClassifier {
    private readonly HINDI_MARKERS;
    classify(token: string): ClassifiedToken;
}
export declare const tokenClassifier: TokenClassifier;
//# sourceMappingURL=token.classifier.d.ts.map