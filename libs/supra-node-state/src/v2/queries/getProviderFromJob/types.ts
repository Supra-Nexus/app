import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetProviderFromJobResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type GetProviderFromJobInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetProviderFromJobOutput = GetProviderFromJobResponse;
