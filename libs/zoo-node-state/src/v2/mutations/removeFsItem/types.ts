import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type RemoveFsItemResponse } from '@zooai/zoo-message-ts/api/vector-fs/types';

export type RemoveFsItemOutput = RemoveFsItemResponse;
export type RemoveFsItemInput = Token & {
  nodeAddress: string;
  itemPath: string;
};
