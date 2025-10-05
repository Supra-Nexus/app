import { deleteMcpServer as deleteMcpServerApi } from '@supraai/supra-message-ts/api/mcp-servers/index';

import { type DeleteMcpServerInput } from './types';

export const deleteMcpServer = async (input: DeleteMcpServerInput) => {
  const { nodeAddress, token, id } = input;
  return deleteMcpServerApi(nodeAddress, token, { id });
}; 