import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type JobScope,
  type UpdateChatConfigResponse,
} from '@supra_network/hanzo-message-ts/api/jobs/types';

export type UpdateChatConfigOutput = UpdateChatConfigResponse;

export type UpdateChatConfigInput = Token & {
  nodeAddress: string;
  jobId: string;
  jobScope: JobScope;
};
