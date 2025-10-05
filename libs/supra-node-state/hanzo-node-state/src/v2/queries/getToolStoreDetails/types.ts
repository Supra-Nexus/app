import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetToolStoreDetailsResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetToolStoreDetailsInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
};

export type GetToolStoreDetailsOutput = GetToolStoreDetailsResponse;
