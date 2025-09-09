import { importAgent as importAgentApi } from '@zooai/zoo-message-ts/api/agents/index';

import { type ImportAgentInput } from './types';

export const importAgent = async ({
  nodeAddress,
  token,
  file,
}: ImportAgentInput) => {
  return await importAgentApi(nodeAddress, token, file);
};
