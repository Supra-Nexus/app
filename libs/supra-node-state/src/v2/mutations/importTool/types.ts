import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type ImportToolResponse } from '@supraai/supra-message-ts/api/tools/types';

export type ImportToolInput = Token & {
  nodeAddress: string;
  url: string;
};

export type ImportToolOutput = ImportToolResponse;
