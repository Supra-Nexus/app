import { addMcpServer as addMcpServerApi } from '@supraai/supra-message-ts/api/mcp-servers/index';
import { type AddMcpServerRequest } from '@supraai/supra-message-ts/api/mcp-servers/types';

import { type AddMcpServerInput } from './types';

export const addMcpServer = async (input: AddMcpServerInput) => {
  const { nodeAddress, token, ...rest } = input;
  return addMcpServerApi(nodeAddress, token, rest as AddMcpServerRequest);
};
