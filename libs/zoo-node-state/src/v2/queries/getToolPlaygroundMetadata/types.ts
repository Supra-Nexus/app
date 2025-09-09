import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetToolPlaygroundMetadataResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetToolPlaygroundMetadataInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
};

export type GetToolPlaygroundMetadataOutput = GetToolPlaygroundMetadataResponse;
