import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type RemoveToolOutput = {
  status: string;
};

export type RemoveToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};
