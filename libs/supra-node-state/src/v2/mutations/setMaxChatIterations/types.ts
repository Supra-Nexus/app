import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type SetMaxChatIterationsInput = Token & {
  nodeAddress: string;
  maxIterations: number;
};

export type SetMaxChatIterationsOutput = string;
