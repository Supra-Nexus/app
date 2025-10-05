import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type RemoveFolderResponse } from '@supra_network/hanzo-message-ts/api/vector-fs/types';

export type RemoveFolderOutput = RemoveFolderResponse;

export type RemoveFolderInput = Token & {
  nodeAddress: string;
  folderPath: string;
};
