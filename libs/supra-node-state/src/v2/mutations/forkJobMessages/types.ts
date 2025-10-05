import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type ForkJobMessagesResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type ForkJobMessagesInput = Token & {
  nodeAddress: string;
  jobId: string;
  messageId: string;
};

export type ForkJobMessagesOutput = ForkJobMessagesResponse;
