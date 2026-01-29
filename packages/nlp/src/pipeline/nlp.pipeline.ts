import { NLPResult, LanguageCode } from '@voice-platform/types';
import { languageDetector } from '../language/detect.language.js';
import { languageLock } from '../language/language.lock.js';
import { hinglishDetector } from '../hinglish/hinglish.detector.js';
import { intentDetector } from '../intent/intent.detector.js';
import { entityExtractor } from '../entities/entity.extractor.js';

/**
 * Coordinates NLP stages into a single pipeline.
 */
export class NLPPipeline {
  async process(callId: string, text: string): Promise<NLPResult> {
    // 1. Detect Language
    const langResult = await languageDetector.detectLanguage(text);
    
    // 2. Apply Language Lock
    const stableLanguage = languageLock.lockLanguage(callId, langResult);
    
    // 3. Check for Hinglish
    const hinglishResult = hinglishDetector.isHinglish(text);
    
    // 4. Detect Intent
    const intentResult = intentDetector.detectIntent(text);
    
    // 5. Extract Entities
    const entitiesResult = entityExtractor.extract(text);
    
    // Final language determination
    let finalLanguage: LanguageCode = stableLanguage;
    let finalLangConfidence = langResult.confidence;
    
    if (hinglishResult.isHinglish && hinglishResult.confidence > 0.7) {
      finalLanguage = 'hinglish';
      finalLangConfidence = hinglishResult.confidence;
    }

    return {
      language: finalLanguage,
      languageConfidence: finalLangConfidence,
      isHinglish: hinglishResult.isHinglish,
      intent: intentResult.intent,
      intentConfidence: intentResult.confidence,
      entities: entitiesResult.reduce((acc, e) => {
        if (!acc[e.type]) acc[e.type] = [];
        (acc[e.type] as string[]).push(e.value);
        return acc;
      }, {} as Record<string, unknown>),
    };
  }
}

export const nlpPipeline = new NLPPipeline();
