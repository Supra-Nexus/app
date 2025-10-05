import { type RemoveAgentResponse } from '@supraai/supra-message-ts/api/agents/types';
import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type RemoveAgentInput = Token & {
  nodeAddress: string;
  agentId: string;
};
export type RemoveAgentOutput = RemoveAgentResponse;
