/**
 * Call lifecycle states
 */
export var CallStatus;
(function (CallStatus) {
    CallStatus["CREATED"] = "CREATED";
    CallStatus["ACTIVE"] = "ACTIVE";
    CallStatus["HANDED_OFF"] = "HANDED_OFF";
    CallStatus["ENDED"] = "ENDED";
})(CallStatus || (CallStatus = {}));
/**
 * Semantic event types
 */
export var EventType;
(function (EventType) {
    EventType["TOOL_CALL"] = "TOOL_CALL";
    EventType["TOOL_RESULT"] = "TOOL_RESULT";
    EventType["LANGUAGE_SWITCH"] = "LANGUAGE_SWITCH";
    EventType["INTENT_DETECTED"] = "INTENT_DETECTED";
    EventType["FRUSTRATION_DETECTED"] = "FRUSTRATION_DETECTED";
    EventType["HANDOFF_TRIGGERED"] = "HANDOFF_TRIGGERED";
    EventType["AGENT_JOINED"] = "AGENT_JOINED";
    EventType["AGENT_LEFT"] = "AGENT_LEFT";
    EventType["CONTEXT_UPDATED"] = "CONTEXT_UPDATED";
    EventType["ERROR"] = "ERROR";
})(EventType || (EventType = {}));
//# sourceMappingURL=index.js.map