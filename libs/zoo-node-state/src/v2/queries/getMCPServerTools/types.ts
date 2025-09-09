import { Token, Tool } from '@zooai/zoo-message-ts/api/general/types';

export type GetMcpServerToolsInput = Token & {
  nodeAddress: string;
  mcpServerId: number;
};

export type GetMcpServerToolsOutput = {
  tools: Tool[];
};
