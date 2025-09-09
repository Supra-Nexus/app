import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type ExportAgentInput = Token & {
  nodeAddress: string;
  agentId: string;
};

export type ExportAgentOutput = Blob;
