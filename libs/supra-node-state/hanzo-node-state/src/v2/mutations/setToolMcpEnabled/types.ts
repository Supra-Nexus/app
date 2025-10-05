import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type SetToolMcpEnabledOutput = {
  success: boolean;
};

export type SetToolMcpEnabledInput = Token & {
  nodeAddress: string;
  toolRouterKey: string;
  mcpEnabled: boolean;
};
