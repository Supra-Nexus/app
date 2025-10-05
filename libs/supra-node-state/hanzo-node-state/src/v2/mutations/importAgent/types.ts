import { type Agent } from '@supra_network/hanzo-message-ts/api/agents/types';
import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type ImportAgentInput = Token & {
  nodeAddress: string;
  file: File;
};

export type ImportAgentOutput = Agent;
