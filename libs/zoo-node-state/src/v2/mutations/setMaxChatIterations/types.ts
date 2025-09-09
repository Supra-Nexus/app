import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type SetMaxChatIterationsInput = Token & {
  nodeAddress: string;
  maxIterations: number;
};

export type SetMaxChatIterationsOutput = string;
