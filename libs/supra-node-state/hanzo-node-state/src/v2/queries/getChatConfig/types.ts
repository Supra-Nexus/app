import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetChatConfigResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type GetChatConfigInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetChatConfigOutput = GetChatConfigResponse;
