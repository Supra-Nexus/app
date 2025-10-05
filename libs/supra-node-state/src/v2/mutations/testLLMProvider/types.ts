import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type AddLLMProviderResponse,
  type SerializedLLMProvider,
} from '@supraai/supra-message-ts/api/jobs/types';

export type TestLLMProviderInput = Token & {
  nodeAddress: string;
  agent: SerializedLLMProvider;
};
export type TestLLMProviderOutput = AddLLMProviderResponse;
