import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetPlaygroundToolResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetPlaygroundToolInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
  xHanzoOriginalToolRouterKey?: string;
};

export type GetPlaygroundToolOutput = GetPlaygroundToolResponse;
