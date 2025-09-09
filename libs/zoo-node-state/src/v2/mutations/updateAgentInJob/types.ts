import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type UpdateLLMProviderInJobResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type UpdateAgentInJobInput = Token & {
  nodeAddress: string;
  jobId: string;
  newAgentId: string;
};

export type UpdateAgentInJobOutput = UpdateLLMProviderInJobResponse;
