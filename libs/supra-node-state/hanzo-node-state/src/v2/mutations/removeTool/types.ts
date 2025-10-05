import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type RemoveToolOutput = {
  status: string;
};

export type RemoveToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};
