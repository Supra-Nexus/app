import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type JobMessageResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type RetryMessageInput = Token & {
  nodeAddress: string;
  inboxId: string;
  messageId: string;
};

export type RetryMessageOutput = JobMessageResponse;
