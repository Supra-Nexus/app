import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetPlaygroundToolResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetPlaygroundToolInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
  xSupraOriginalToolRouterKey?: string;
};

export type GetPlaygroundToolOutput = GetPlaygroundToolResponse;
