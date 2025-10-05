import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type RemoveFsItemResponse } from '@supraai/supra-message-ts/api/vector-fs/types';

export type RemoveFsItemOutput = RemoveFsItemResponse;
export type RemoveFsItemInput = Token & {
  nodeAddress: string;
  itemPath: string;
};
