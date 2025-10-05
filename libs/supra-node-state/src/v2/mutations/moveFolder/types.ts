import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type MoveFolderResponse } from '@supraai/supra-message-ts/api/vector-fs/types';

export type MoveFolderOutput = MoveFolderResponse;

export type MoveVRFolderInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
