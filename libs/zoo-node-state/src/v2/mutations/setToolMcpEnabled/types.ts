import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type SetToolMcpEnabledOutput = {
  success: boolean;
};

export type SetToolMcpEnabledInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
  mcpEnabled: boolean;
};
