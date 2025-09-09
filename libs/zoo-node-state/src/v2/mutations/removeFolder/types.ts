import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type RemoveFolderResponse } from '@zooai/zoo-message-ts/api/vector-fs/types';

export type RemoveFolderOutput = RemoveFolderResponse;

export type RemoveFolderInput = Token & {
  nodeAddress: string;
  folderPath: string;
};
