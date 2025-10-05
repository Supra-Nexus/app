import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetToolResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type GetToolOutput = GetToolResponse;
