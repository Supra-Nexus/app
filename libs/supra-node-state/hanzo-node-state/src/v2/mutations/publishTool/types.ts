import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type PublishToolResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type PublishToolOutput = PublishToolResponse;

export type PublishToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};
