import { getMcpServerTools as getMcpServerToolsApi } from '@zooai/zoo-message-ts/api/mcp-servers/index';

import type { GetMcpServerToolsInput } from './types';

export const getMcpServerTools = async (input: GetMcpServerToolsInput) => {
  return getMcpServerToolsApi(input.nodeAddress, input.token, {
    id: input.mcpServerId,
  });
};