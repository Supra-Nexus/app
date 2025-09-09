import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetToolStoreDetailsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetToolStoreDetailsInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
};

export type GetToolStoreDetailsOutput = GetToolStoreDetailsResponse;
