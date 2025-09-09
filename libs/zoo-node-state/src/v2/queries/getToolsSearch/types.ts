import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetToolsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetSearchToolsInput = Token & {
  nodeAddress: string;
  search: string;
};

export type GetSearchToolsOutput = GetToolsResponse;
