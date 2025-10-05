import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetToolStoreDetailsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetToolStoreDetailsInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
};

export type GetToolStoreDetailsOutput = GetToolStoreDetailsResponse;
