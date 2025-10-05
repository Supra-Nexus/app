import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type CreateToolMetadataResponse } from '@supraai/supra-message-ts/api/tools/types';

export type CreateToolMetadataInput = Token & {
  nodeAddress: string;
  jobId: string;
  tools: string[];
  xSupraToolId?: string;
};

export type CreateToolMetadataOutput = CreateToolMetadataResponse;
