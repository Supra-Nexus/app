import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type JobMessageResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type SendMessageToJobInput = Token & {
  nodeAddress: string;
  jobId: string;
  message: string;
  files?: File[];
  parent: string | null;
  toolKey?: string;
};

export type SendMessageToJobOutput = JobMessageResponse;
