import { LanguageDetectionResult } from './language.types.js';
/**
 * Wraps language detection logic.
 * In a real implementation, this would use fastText or a similar library.
 */
export declare class LanguageDetector {
    /**
     * Detects the dominant language of the text.
     */
    detectLanguage(text: string): Promise<LanguageDetectionResult>;
}
export declare const languageDetector: LanguageDetector;
//# sourceMappingURL=detect.language.d.ts.map