import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type PublishToolResponse } from '@supraai/supra-message-ts/api/tools/types';

export type PublishToolOutput = PublishToolResponse;

export type PublishToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};
