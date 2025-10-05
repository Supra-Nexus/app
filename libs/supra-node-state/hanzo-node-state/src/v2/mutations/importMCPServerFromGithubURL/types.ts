import { Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { McpServer } from '@supra_network/hanzo-message-ts/api/mcp-servers/types';

export type ImportMCPServerFromGithubURLInput = Token & {
  nodeAddress: string;
  githubUrl: string
};

export type ImportMCPServerFromGithubURLOutput = McpServer;