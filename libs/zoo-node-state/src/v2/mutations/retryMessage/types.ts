import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type JobMessageResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type RetryMessageInput = Token & {
  nodeAddress: string;
  inboxId: string;
  messageId: string;
};

export type RetryMessageOutput = JobMessageResponse;
