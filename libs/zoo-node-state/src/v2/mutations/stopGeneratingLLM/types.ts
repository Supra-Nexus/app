import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type StopGeneratingLLMResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type StopGeneratingLLMOutput = StopGeneratingLLMResponse;

export type StopGeneratingLLMInput = Token & {
  nodeAddress: string;
  jobId: string;
};
