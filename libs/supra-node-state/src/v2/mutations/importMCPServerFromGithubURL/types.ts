import { Token } from '@supraai/supra-message-ts/api/general/types';
import { McpServer } from '@supraai/supra-message-ts/api/mcp-servers/types';

export type ImportMCPServerFromGithubURLInput = Token & {
  nodeAddress: string;
  githubUrl: string
};

export type ImportMCPServerFromGithubURLOutput = McpServer;