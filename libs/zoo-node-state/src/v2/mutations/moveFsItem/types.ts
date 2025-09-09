import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type MoveFsItemResponse } from '@zooai/zoo-message-ts/api/vector-fs/types';

export type MoveFsItemOutput = MoveFsItemResponse;

export type MoveFsItemInput = Token & {
  nodeAddress: string;
  originPath: string;
  destinationPath: string;
};
