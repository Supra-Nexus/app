import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type CopyFolderResponse } from '@supra_network/hanzo-message-ts/api/vector-fs/types';

export type CopyFolderOutput = CopyFolderResponse;

export type CopyFolderInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
