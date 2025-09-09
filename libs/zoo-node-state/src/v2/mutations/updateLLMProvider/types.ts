import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type SerializedLLMProvider,
  type UpdateLLMProviderResponse,
} from '@zooai/zoo-message-ts/api/jobs/types';

export type UpdateLLMProviderInput = Token & {
  nodeAddress: string;
  agent: SerializedLLMProvider;
};
export type UpdateLLMProviderOutput = UpdateLLMProviderResponse;
