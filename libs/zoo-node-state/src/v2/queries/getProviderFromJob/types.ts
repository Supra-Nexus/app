import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetProviderFromJobResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type GetProviderFromJobInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetProviderFromJobOutput = GetProviderFromJobResponse;
