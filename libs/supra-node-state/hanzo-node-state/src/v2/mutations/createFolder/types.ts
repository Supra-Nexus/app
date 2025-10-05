import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type CreateFolderResponse } from '@supra_network/hanzo-message-ts/api/vector-fs/types';

export type CreateFolderInput = Token & {
  nodeAddress: string;
  path: string;
  folderName: string;
};

export type CreateFolderOutput = CreateFolderResponse;
