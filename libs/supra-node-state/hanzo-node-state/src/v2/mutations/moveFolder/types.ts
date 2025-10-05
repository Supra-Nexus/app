import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type MoveFolderResponse } from '@supra_network/hanzo-message-ts/api/vector-fs/types';

export type MoveFolderOutput = MoveFolderResponse;

export type MoveVRFolderInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
