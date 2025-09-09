import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetPlaygroundToolsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetPlaygroundToolsInput = Token & {
  nodeAddress: string;
};

export type GetPlaygroundToolsOutput = GetPlaygroundToolsResponse;
