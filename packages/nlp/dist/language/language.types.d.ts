import { LanguageCode } from '@voice-platform/types';
export interface LanguageDetectionResult {
    language: LanguageCode;
    confidence: number;
}
export interface LanguageLockState {
    currentLanguage: LanguageCode;
    confidence: number;
    isLocked: boolean;
    lastUpdate: Date;
}
//# sourceMappingURL=language.types.d.ts.map