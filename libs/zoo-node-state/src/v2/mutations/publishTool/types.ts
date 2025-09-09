import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type PublishToolResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type PublishToolOutput = PublishToolResponse;

export type PublishToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};
