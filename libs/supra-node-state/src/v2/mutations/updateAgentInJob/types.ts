import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type UpdateLLMProviderInJobResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type UpdateAgentInJobInput = Token & {
  nodeAddress: string;
  jobId: string;
  newAgentId: string;
};

export type UpdateAgentInJobOutput = UpdateLLMProviderInJobResponse;
