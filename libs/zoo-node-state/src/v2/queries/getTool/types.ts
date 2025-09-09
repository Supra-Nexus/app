import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetToolResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type GetToolOutput = GetToolResponse;
