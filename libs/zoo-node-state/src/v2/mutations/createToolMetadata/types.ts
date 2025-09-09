import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type CreateToolMetadataResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type CreateToolMetadataInput = Token & {
  nodeAddress: string;
  jobId: string;
  tools: string[];
  xZooToolId?: string;
};

export type CreateToolMetadataOutput = CreateToolMetadataResponse;
