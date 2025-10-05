import { type Agent } from '@supraai/supra-message-ts/api/agents/types';
import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type ImportAgentInput = Token & {
  nodeAddress: string;
  file: File;
};

export type ImportAgentOutput = Agent;
