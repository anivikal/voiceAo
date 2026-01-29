export declare enum Intent {
    HANDOFF_REQUEST = "HANDOFF_REQUEST",
    CANCEL_BOOKING = "CANCEL_BOOKING",
    CHECK_STATUS = "CHECK_STATUS",
    GREETING = "GREETING",
    UNKNOWN = "UNKNOWN"
}
export interface IntentMatch {
    intent: Intent;
    confidence: number;
    matchedRule?: string;
}
//# sourceMappingURL=intent.types.d.ts.map