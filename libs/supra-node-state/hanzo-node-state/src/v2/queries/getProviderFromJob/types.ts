import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetProviderFromJobResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type GetProviderFromJobInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetProviderFromJobOutput = GetProviderFromJobResponse;
