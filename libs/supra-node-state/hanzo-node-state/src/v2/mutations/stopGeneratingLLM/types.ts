import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type StopGeneratingLLMResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type StopGeneratingLLMOutput = StopGeneratingLLMResponse;

export type StopGeneratingLLMInput = Token & {
  nodeAddress: string;
  jobId: string;
};
