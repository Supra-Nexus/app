import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type JobScope } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type GetJobScopeInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetJobScopeOutput = JobScope;
