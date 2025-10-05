import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type MoveFsItemResponse } from '@supraai/supra-message-ts/api/vector-fs/types';

export type MoveFsItemOutput = MoveFsItemResponse;

export type MoveFsItemInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
