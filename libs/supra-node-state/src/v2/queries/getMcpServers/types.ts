import { Token } from '@supraai/supra-message-ts/api/general/types';
import { GetMcpServersResponse } from '@supraai/supra-message-ts/api/mcp-servers/types';

export type GetMcpServersInput = Token & {
  nodeAddress: string;
};

export type GetMcpServersOutput = GetMcpServersResponse;
