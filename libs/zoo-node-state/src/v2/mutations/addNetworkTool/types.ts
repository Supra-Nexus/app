import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type NetworkZooTool } from '@zooai/zoo-message-ts/api/tools/types';

export type AddNetworkToolInput = Token & {
  nodeAddress: string;
  networkTool: NetworkZooTool;
};
export type AddNetworkToolOutput = any;
