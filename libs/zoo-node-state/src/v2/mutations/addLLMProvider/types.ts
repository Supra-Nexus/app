import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type AddLLMProviderResponse,
  type SerializedLLMProvider,
} from '@zooai/zoo-message-ts/api/jobs/types';

export type AddLLMProviderInput = Token & {
  nodeAddress: string;
  agent: SerializedLLMProvider;
  enableTest?: boolean;
};
export type AddLLMProviderOutput = AddLLMProviderResponse;
