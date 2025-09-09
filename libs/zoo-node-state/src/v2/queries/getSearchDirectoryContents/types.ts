import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetSearchDirectoryContentsResponse } from '@zooai/zoo-message-ts/api/vector-fs/types';

export type GetSearchDirectoryContentsInput = Token & {
  nodeAddress: string;
  name: string;
};
export type GetSearchDirectoryContentsOutput =
  GetSearchDirectoryContentsResponse;
