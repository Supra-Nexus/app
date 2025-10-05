import { Token } from '@supraai/supra-message-ts/api/general/types';
import { McpServer } from '@supraai/supra-message-ts/api/mcp-servers/types';

export type DeleteMcpServerInput = Token & {
  nodeAddress: string;
  id: number;
};

export type DeleteMcpServerResponse = McpServer; 