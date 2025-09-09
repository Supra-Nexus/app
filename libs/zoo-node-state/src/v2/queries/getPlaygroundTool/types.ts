import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetPlaygroundToolResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetPlaygroundToolInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
  xZooOriginalToolRouterKey?: string;
};

export type GetPlaygroundToolOutput = GetPlaygroundToolResponse;
