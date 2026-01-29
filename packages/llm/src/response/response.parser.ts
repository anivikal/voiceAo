export class ResponseParser {
  /**
   * Trims hallucinations or unwanted prefixes/suffixes from LLM output.
   */
  parse(text: string): string {
    let cleaned = text.trim();
    
    // Remove common LLM prefixes
    cleaned = cleaned.replace(/^(Assistant|AI|Response):/i, '').trim();
    
    // Remove quotes if the whole response is quoted
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.substring(1, cleaned.length - 1).trim();
    }

    return cleaned;
  }
}

export const responseParser = new ResponseParser();
