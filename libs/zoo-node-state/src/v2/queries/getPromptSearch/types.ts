import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type SearchPromptsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetPromptSearchInput = Token & {
  nodeAddress: string;
  search: string;
};

export type GetPromptSearchOutput = SearchPromptsResponse;
