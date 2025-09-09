import { type RemoveAgentResponse } from '@zooai/zoo-message-ts/api/agents/types';
import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type RemoveAgentInput = Token & {
  nodeAddress: string;
  agentId: string;
};
export type RemoveAgentOutput = RemoveAgentResponse;
