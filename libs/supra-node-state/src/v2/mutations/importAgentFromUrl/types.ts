import { type Agent } from '@supraai/supra-message-ts/api/agents/types';
import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type ImportAgentFromUrlInput = Token & {
  nodeAddress: string;
  url: string;
};

export type ImportAgentFromUrlOutput = Agent;
