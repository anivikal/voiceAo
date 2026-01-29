import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import {
  Call,
  CallStatus,
  CreateCallRequest,
  CreateCallResponse,
  isValidTransition,
  InvalidTransitionError,
  CallNotFoundError,
} from '../models/call.model.js';

const prisma = new PrismaClient();

/**
 * CallService handles all call lifecycle operations.
 * 
 * Invariants:
 * - A call can only be ended once
 * - Handoff can only happen once
 * - ENDED calls are immutable
 */
export class CallService {
  /**
   * Creates a new call record and generates a unique room name.
   */
  async createCall(data: CreateCallRequest): Promise<CreateCallResponse> {
    const callId = nanoid(12);
    const roomName = `call_${callId}`;

    const call = await prisma.call.create({
      data: {
        id: callId,
        roomName,
        source: data.source,
        status: CallStatus.CREATED,
      },
    });

    return {
      call_id: call.id,
      room_name: call.roomName,
    };
  }

  /**
   * Transitions a call from CREATED to ACTIVE.
   */
  async startCall(callId: string): Promise<Call> {
    const call = await this.getCall(callId);

    if (!isValidTransition(call.status as CallStatus, CallStatus.ACTIVE)) {
      throw new InvalidTransitionError(call.status as CallStatus, CallStatus.ACTIVE);
    }

    const updated = await prisma.call.update({
      where: { id: callId },
      data: {
        status: CallStatus.ACTIVE,
        startedAt: new Date(),
      },
    });

    return this.mapToCall(updated);
  }

  /**
   * Transitions a call to ENDED state.
   * This is a terminal state - no further transitions are allowed.
   */
  async endCall(callId: string): Promise<Call> {
    const call = await this.getCall(callId);

    if (!isValidTransition(call.status as CallStatus, CallStatus.ENDED)) {
      throw new InvalidTransitionError(call.status as CallStatus, CallStatus.ENDED);
    }

    const updated = await prisma.call.update({
      where: { id: callId },
      data: {
        status: CallStatus.ENDED,
        endedAt: new Date(),
      },
    });

    return this.mapToCall(updated);
  }

  /**
   * Retrieves a call by ID.
   */
  async getCall(callId: string): Promise<Call> {
    const call = await prisma.call.findUnique({
      where: { id: callId },
    });

    if (!call) {
      throw new CallNotFoundError(callId);
    }

    return this.mapToCall(call);
  }

  /**
   * Updates call summary and entities.
   */
  async updateContext(
    callId: string,
    summary: string,
    entities: Record<string, unknown>
  ): Promise<Call> {
    const call = await this.getCall(callId);

    if (call.status === CallStatus.ENDED) {
      throw new Error('Cannot update context of ended call');
    }

    const updated = await prisma.call.update({
      where: { id: callId },
      data: {
        summary,
        entities: entities as object,
      },
    });

    return this.mapToCall(updated);
  }

  /**
   * Maps Prisma call to Call interface.
   */
  private mapToCall(prismaCall: {
    id: string;
    roomName: string;
    source: string;
    status: string;
    summary: string | null;
    entities: unknown;
    createdAt: Date;
    startedAt: Date | null;
    handedOffAt: Date | null;
    endedAt: Date | null;
    updatedAt: Date;
  }): Call {
    return {
      id: prismaCall.id,
      roomName: prismaCall.roomName,
      source: prismaCall.source,
      status: prismaCall.status as CallStatus,
      summary: prismaCall.summary,
      entities: prismaCall.entities as Record<string, unknown> | null,
      createdAt: prismaCall.createdAt,
      startedAt: prismaCall.startedAt,
      handedOffAt: prismaCall.handedOffAt,
      endedAt: prismaCall.endedAt,
      updatedAt: prismaCall.updatedAt,
    };
  }
}

export const callService = new CallService();
