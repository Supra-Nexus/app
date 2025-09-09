import { Token } from '@zooai/zoo-message-ts/api/general/types';
import { McpServer } from '@zooai/zoo-message-ts/api/mcp-servers/types';

export type ImportMCPServerFromGithubURLInput = Token & {
  nodeAddress: string;
  githubUrl: string
};

export type ImportMCPServerFromGithubURLOutput = McpServer;