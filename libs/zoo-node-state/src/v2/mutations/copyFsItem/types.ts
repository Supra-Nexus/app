import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type CopyFsItemResponse } from '@zooai/zoo-message-ts/api/vector-fs/types';

export type CopyVRItemOutput = CopyFsItemResponse;

export type CopyVRItemInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
