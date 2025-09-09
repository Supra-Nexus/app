import { testLLMProvider as testLLMProviderApi } from '@zooai/zoo-message-ts/api/jobs/index';

import { type TestLLMProviderInput } from './types';

export const testLLMProvider = async ({
  nodeAddress,
  token,
  agent,
}: TestLLMProviderInput) => {
  const response = await testLLMProviderApi(nodeAddress, token, agent);
  return response;
};
