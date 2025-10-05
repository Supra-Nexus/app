import { importMcpServerFromGithubUrl } from '@supraai/supra-message-ts/api/mcp-servers/index';

import type { ImportMCPServerFromGithubURLOutput } from './types';

export const importMCPServerFromGithubURL = async (
  nodeAddress: string,
  token: string,
  githubUrl: string,
): Promise<ImportMCPServerFromGithubURLOutput> => {
  return importMcpServerFromGithubUrl(nodeAddress, token, { url: githubUrl });
};
