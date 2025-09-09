import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetChatConfigResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type GetChatConfigInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetChatConfigOutput = GetChatConfigResponse;
