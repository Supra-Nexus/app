import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type MoveFsItemResponse } from '@supra_network/hanzo-message-ts/api/vector-fs/types';

export type MoveFsItemOutput = MoveFsItemResponse;

export type MoveFsItemInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
