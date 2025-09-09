import { Token } from '@zooai/zoo-message-ts/api/general/types';
import { McpServer } from '@zooai/zoo-message-ts/api/mcp-servers/types';

export type DeleteMcpServerInput = Token & {
  nodeAddress: string;
  id: number;
};

export type DeleteMcpServerResponse = McpServer; 