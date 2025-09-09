import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type EnableAllToolsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type EnableAllToolsInput = Token & {
  nodeAddress: string;
};

export type EnableAllToolsOutput = EnableAllToolsResponse;
