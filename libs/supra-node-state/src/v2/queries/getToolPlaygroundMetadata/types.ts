import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetToolPlaygroundMetadataResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetToolPlaygroundMetadataInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
};

export type GetToolPlaygroundMetadataOutput = GetToolPlaygroundMetadataResponse;
