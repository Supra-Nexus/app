import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type CopyFsItemResponse } from '@supraai/supra-message-ts/api/vector-fs/types';

export type CopyVRItemOutput = CopyFsItemResponse;

export type CopyVRItemInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
