import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type RemoveJobOutput = {
  status: string;
};

export type RemoveJobInput = Token & {
  nodeAddress: string;
  jobId: string;
};
