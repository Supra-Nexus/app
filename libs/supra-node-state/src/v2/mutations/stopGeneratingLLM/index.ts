import { stopGeneratingLLM as stopGeneratingLLMApi } from '@supraai/supra-message-ts/api/jobs/index';

import { type StopGeneratingLLMInput } from './types';

export const stopGeneratingLLM = async ({
  nodeAddress,
  token,
  jobId,
}: StopGeneratingLLMInput) => {
  const response = await stopGeneratingLLMApi(nodeAddress, token, jobId);
  return response;
};
