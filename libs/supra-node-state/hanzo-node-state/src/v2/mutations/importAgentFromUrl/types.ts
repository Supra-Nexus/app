import { type Agent } from '@supra_network/hanzo-message-ts/api/agents/types';
import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type ImportAgentFromUrlInput = Token & {
  nodeAddress: string;
  url: string;
};

export type ImportAgentFromUrlOutput = Agent;
