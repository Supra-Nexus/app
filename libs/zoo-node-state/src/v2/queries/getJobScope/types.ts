import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type JobScope } from '@zooai/zoo-message-ts/api/jobs/types';

export type GetJobScopeInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetJobScopeOutput = JobScope;
