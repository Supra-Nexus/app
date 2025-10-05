import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type UpdateLLMProviderResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type RemoveLLMProviderInput = Token & {
  nodeAddress: string;
  llmProviderId: string;
};
export type RemoveLLMProviderOutput = UpdateLLMProviderResponse;
