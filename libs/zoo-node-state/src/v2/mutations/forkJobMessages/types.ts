import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type ForkJobMessagesResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type ForkJobMessagesInput = Token & {
  nodeAddress: string;
  jobId: string;
  messageId: string;
};

export type ForkJobMessagesOutput = ForkJobMessagesResponse;
