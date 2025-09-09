import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type CopyFolderResponse } from '@zooai/zoo-message-ts/api/vector-fs/types';

export type CopyFolderOutput = CopyFolderResponse;

export type CopyFolderInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
