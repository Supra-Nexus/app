import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type RemoveJobOutput = {
  status: string;
};

export type RemoveJobInput = Token & {
  nodeAddress: string;
  jobId: string;
};
