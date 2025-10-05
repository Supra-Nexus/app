import { type GetAgentResponse } from '@supra_network/hanzo-message-ts/api/agents/types';
import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type GetAgentInput = Token & {
  nodeAddress: string;
  agentId: string;
};

export type GetAgentOutput = GetAgentResponse;
