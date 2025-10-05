import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type SearchPromptsResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetPromptSearchInput = Token & {
  nodeAddress: string;
  search: string;
};

export type GetPromptSearchOutput = SearchPromptsResponse;
