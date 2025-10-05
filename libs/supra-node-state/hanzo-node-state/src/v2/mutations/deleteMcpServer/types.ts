import { Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { McpServer } from '@supra_network/hanzo-message-ts/api/mcp-servers/types';

export type DeleteMcpServerInput = Token & {
  nodeAddress: string;
  id: number;
};

export type DeleteMcpServerResponse = McpServer; 