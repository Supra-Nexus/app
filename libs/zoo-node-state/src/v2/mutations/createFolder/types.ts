import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type CreateFolderResponse } from '@zooai/zoo-message-ts/api/vector-fs/types';

export type CreateFolderInput = Token & {
  nodeAddress: string;
  path: string;
  folderName: string;
};

export type CreateFolderOutput = CreateFolderResponse;
