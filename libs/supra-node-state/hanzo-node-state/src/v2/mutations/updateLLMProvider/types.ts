import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type SerializedLLMProvider,
  type UpdateLLMProviderResponse,
} from '@supra_network/hanzo-message-ts/api/jobs/types';

export type UpdateLLMProviderInput = Token & {
  nodeAddress: string;
  agent: SerializedLLMProvider;
};
export type UpdateLLMProviderOutput = UpdateLLMProviderResponse;
