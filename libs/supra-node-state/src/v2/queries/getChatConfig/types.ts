import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetChatConfigResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type GetChatConfigInput = Token & {
  nodeAddress: string;
  jobId: string;
};

export type GetChatConfigOutput = GetChatConfigResponse;
