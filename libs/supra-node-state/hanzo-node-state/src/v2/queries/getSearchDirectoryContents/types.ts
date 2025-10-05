import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetSearchDirectoryContentsResponse } from '@supra_network/hanzo-message-ts/api/vector-fs/types';

export type GetSearchDirectoryContentsInput = Token & {
  nodeAddress: string;
  name: string;
};
export type GetSearchDirectoryContentsOutput =
  GetSearchDirectoryContentsResponse;
