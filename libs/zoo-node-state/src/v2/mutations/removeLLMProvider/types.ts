import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type UpdateLLMProviderResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type RemoveLLMProviderInput = Token & {
  nodeAddress: string;
  llmProviderId: string;
};
export type RemoveLLMProviderOutput = UpdateLLMProviderResponse;
