import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetPlaygroundToolsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetPlaygroundToolsInput = Token & {
  nodeAddress: string;
};

export type GetPlaygroundToolsOutput = GetPlaygroundToolsResponse;
