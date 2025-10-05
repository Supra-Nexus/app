import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetSearchDirectoryContentsResponse } from '@supraai/supra-message-ts/api/vector-fs/types';

export type GetSearchDirectoryContentsInput = Token & {
  nodeAddress: string;
  name: string;
};
export type GetSearchDirectoryContentsOutput =
  GetSearchDirectoryContentsResponse;
