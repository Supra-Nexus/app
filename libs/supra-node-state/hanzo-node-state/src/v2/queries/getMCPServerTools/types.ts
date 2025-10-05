import { Token, Tool } from '@supra_network/hanzo-message-ts/api/general/types';

export type GetMcpServerToolsInput = Token & {
  nodeAddress: string;
  mcpServerId: number;
};

export type GetMcpServerToolsOutput = {
  tools: Tool[];
};
