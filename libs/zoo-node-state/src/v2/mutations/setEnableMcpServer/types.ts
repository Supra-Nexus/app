import { Token } from '@zooai/zoo-message-ts/api/general/types';

export type SetEnableMcpServerOutput = {
  success: boolean;
};

export type SetEnableMcpServerInput = Token & {
  nodeAddress: string;
  mcpServerId: number;
  isEnabled: boolean;
}; 