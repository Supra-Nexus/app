import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type RemoveFsItemResponse } from '@supra_network/hanzo-message-ts/api/vector-fs/types';

export type RemoveFsItemOutput = RemoveFsItemResponse;
export type RemoveFsItemInput = Token & {
  nodeAddress: string;
  itemPath: string;
};
