import { type GetAgentResponse } from '@zooai/zoo-message-ts/api/agents/types';
import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type GetAgentInput = Token & {
  nodeAddress: string;
  agentId: string;
};

export type GetAgentOutput = GetAgentResponse;
