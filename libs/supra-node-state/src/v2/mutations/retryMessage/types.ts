import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type JobMessageResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type RetryMessageInput = Token & {
  nodeAddress: string;
  inboxId: string;
  messageId: string;
};

export type RetryMessageOutput = JobMessageResponse;
