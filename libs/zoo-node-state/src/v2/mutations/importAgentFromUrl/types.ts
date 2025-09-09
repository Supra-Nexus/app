import { type Agent } from '@zooai/zoo-message-ts/api/agents/types';
import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type ImportAgentFromUrlInput = Token & {
  nodeAddress: string;
  url: string;
};

export type ImportAgentFromUrlOutput = Agent;
