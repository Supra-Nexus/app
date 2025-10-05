import { Token } from '@supraai/supra-message-ts/api/general/types';
import { McpServer, McpServerType } from '@supraai/supra-message-ts/api/mcp-servers/types';
import { UpdateMcpServerRequest } from '@supraai/supra-message-ts/api/mcp-servers/types';

export type UpdateMcpServerInput = Token & {
  nodeAddress: string;
} & UpdateMcpServerRequest;

export type UpdateMcpServerResponse = McpServer;
