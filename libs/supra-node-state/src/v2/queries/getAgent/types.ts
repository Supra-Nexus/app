import { type GetAgentResponse } from '@supraai/supra-message-ts/api/agents/types';
import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type GetAgentInput = Token & {
  nodeAddress: string;
  agentId: string;
};

export type GetAgentOutput = GetAgentResponse;
