import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type EnableAllToolsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type EnableAllToolsInput = Token & {
  nodeAddress: string;
};

export type EnableAllToolsOutput = EnableAllToolsResponse;
