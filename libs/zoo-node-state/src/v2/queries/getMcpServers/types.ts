import { Token } from '@zooai/zoo-message-ts/api/general/types';
import { GetMcpServersResponse } from '@zooai/zoo-message-ts/api/mcp-servers/types';

export type GetMcpServersInput = Token & {
  nodeAddress: string;
};

export type GetMcpServersOutput = GetMcpServersResponse;
