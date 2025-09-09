import { Token } from '@zooai/zoo-message-ts/api/general/types';
import { McpServer, McpServerType } from '@zooai/zoo-message-ts/api/mcp-servers/types';
import { UpdateMcpServerRequest } from '@zooai/zoo-message-ts/api/mcp-servers/types';

export type UpdateMcpServerInput = Token & {
  nodeAddress: string;
} & UpdateMcpServerRequest;

export type UpdateMcpServerResponse = McpServer;
