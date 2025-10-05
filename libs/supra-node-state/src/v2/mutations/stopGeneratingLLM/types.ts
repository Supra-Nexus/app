import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type StopGeneratingLLMResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type StopGeneratingLLMOutput = StopGeneratingLLMResponse;

export type StopGeneratingLLMInput = Token & {
  nodeAddress: string;
  jobId: string;
};
