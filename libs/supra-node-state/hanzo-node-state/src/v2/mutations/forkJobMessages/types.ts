import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type ForkJobMessagesResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type ForkJobMessagesInput = Token & {
  nodeAddress: string;
  jobId: string;
  messageId: string;
};

export type ForkJobMessagesOutput = ForkJobMessagesResponse;
