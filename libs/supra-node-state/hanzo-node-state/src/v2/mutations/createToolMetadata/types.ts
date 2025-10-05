import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type CreateToolMetadataResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type CreateToolMetadataInput = Token & {
  nodeAddress: string;
  jobId: string;
  tools: string[];
  xHanzoToolId?: string;
};

export type CreateToolMetadataOutput = CreateToolMetadataResponse;
