import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type SerializedLLMProvider,
  type UpdateLLMProviderResponse,
} from '@supraai/supra-message-ts/api/jobs/types';

export type UpdateLLMProviderInput = Token & {
  nodeAddress: string;
  agent: SerializedLLMProvider;
};
export type UpdateLLMProviderOutput = UpdateLLMProviderResponse;
