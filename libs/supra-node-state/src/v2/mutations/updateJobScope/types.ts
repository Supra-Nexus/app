import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type JobScope,
  type UpdateChatConfigResponse,
} from '@supraai/supra-message-ts/api/jobs/types';

export type UpdateChatConfigOutput = UpdateChatConfigResponse;

export type UpdateChatConfigInput = Token & {
  nodeAddress: string;
  jobId: string;
  jobScope: JobScope;
};
