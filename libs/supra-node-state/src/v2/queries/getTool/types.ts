import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetToolResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type GetToolOutput = GetToolResponse;
