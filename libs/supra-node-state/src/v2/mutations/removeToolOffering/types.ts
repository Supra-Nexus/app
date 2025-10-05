import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type RemoveToolOutput = {
  status: string;
};

export type RemoveToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};
