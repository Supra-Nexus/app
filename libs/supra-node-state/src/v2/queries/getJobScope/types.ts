import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type JobScope } from '@supraai/supra-message-ts/api/jobs/types';

export type GetJobScopeInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetJobScopeOutput = JobScope;
