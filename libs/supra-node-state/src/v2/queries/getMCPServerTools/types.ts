import { Token, Tool } from '@supraai/supra-message-ts/api/general/types';

export type GetMcpServerToolsInput = Token & {
  nodeAddress: string;
  mcpServerId: number;
};

export type GetMcpServerToolsOutput = {
  tools: Tool[];
};
