import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type SearchPromptsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetPromptSearchInput = Token & {
  nodeAddress: string;
  search: string;
};

export type GetPromptSearchOutput = SearchPromptsResponse;
