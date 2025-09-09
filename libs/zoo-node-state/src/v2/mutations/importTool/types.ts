import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type ImportToolResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type ImportToolInput = Token & {
  nodeAddress: string;
  url: string;
};

export type ImportToolOutput = ImportToolResponse;
