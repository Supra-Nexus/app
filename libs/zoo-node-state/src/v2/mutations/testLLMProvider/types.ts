import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type AddLLMProviderResponse,
  type SerializedLLMProvider,
} from '@zooai/zoo-message-ts/api/jobs/types';

export type TestLLMProviderInput = Token & {
  nodeAddress: string;
  agent: SerializedLLMProvider;
};
export type TestLLMProviderOutput = AddLLMProviderResponse;
