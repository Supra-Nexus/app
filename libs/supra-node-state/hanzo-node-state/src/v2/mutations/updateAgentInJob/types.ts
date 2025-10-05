import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type UpdateLLMProviderInJobResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type UpdateAgentInJobInput = Token & {
  nodeAddress: string;
  jobId: string;
  newAgentId: string;
};

export type UpdateAgentInJobOutput = UpdateLLMProviderInJobResponse;
