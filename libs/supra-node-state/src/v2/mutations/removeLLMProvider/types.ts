import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type UpdateLLMProviderResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type RemoveLLMProviderInput = Token & {
  nodeAddress: string;
  llmProviderId: string;
};
export type RemoveLLMProviderOutput = UpdateLLMProviderResponse;
