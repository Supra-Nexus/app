import { exportAgent as exportAgentApi } from '@zooai/zoo-message-ts/api/agents/index';

import { type ExportAgentInput } from './types';

export const exportAgent = async ({
  nodeAddress,
  token,
  agentId,
}: ExportAgentInput) => {
  return await exportAgentApi(nodeAddress, token, agentId);
};
