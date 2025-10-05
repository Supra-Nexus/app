import { Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { McpServer, McpServerType } from '@supra_network/hanzo-message-ts/api/mcp-servers/types';
import { UpdateMcpServerRequest } from '@supra_network/hanzo-message-ts/api/mcp-servers/types';

export type UpdateMcpServerInput = Token & {
  nodeAddress: string;
} & UpdateMcpServerRequest;

export type UpdateMcpServerResponse = McpServer;
