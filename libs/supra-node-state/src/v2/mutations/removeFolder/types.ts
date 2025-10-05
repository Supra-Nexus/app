import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type RemoveFolderResponse } from '@supraai/supra-message-ts/api/vector-fs/types';

export type RemoveFolderOutput = RemoveFolderResponse;

export type RemoveFolderInput = Token & {
  nodeAddress: string;
  folderPath: string;
};
