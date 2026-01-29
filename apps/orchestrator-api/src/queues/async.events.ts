import { EventEmitter } from 'events';

/**
 * Simple event queue for async processing.
 * In production, replace with Redis/RabbitMQ/SQS.
 */
class AsyncEventQueue extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100);
    this.setupListeners();
  }

  /**
   * Setup default event listeners.
   */
  private setupListeners(): void {
    // Log all events for audit
    this.on('context_updated', (data: { callId: string; summary: string }) => {
      console.log(`[EVENT] Context updated for call ${data.callId}`);
    });

    this.on('handoff_completed', (data: { callId: string }) => {
      console.log(`[EVENT] Handoff completed for call ${data.callId}`);
    });

    this.on('call_ended', (data: { callId: string }) => {
      console.log(`[EVENT] Call ended: ${data.callId}`);
    });

    this.on('turn_added', (data: { callId: string; turnId: string }) => {
      console.log(`[EVENT] Turn added to call ${data.callId}: ${data.turnId}`);
    });

    this.on('event_logged', (data: { callId: string; type: string }) => {
      console.log(`[EVENT] Event logged for call ${data.callId}: ${data.type}`);
    });
  }

  /**
   * Emit an event with payload.
   */
  emit(event: string, payload: Record<string, unknown>): boolean {
    return super.emit(event, {
      ...payload,
      timestamp: new Date().toISOString(),
    });
  }
}

export const eventQueue = new AsyncEventQueue();
