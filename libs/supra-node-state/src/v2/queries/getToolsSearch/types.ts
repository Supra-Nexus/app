import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetToolsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetSearchToolsInput = Token & {
  nodeAddress: string;
  search: string;
};

export type GetSearchToolsOutput = GetToolsResponse;
