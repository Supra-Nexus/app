import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type NetworkSupraTool } from '@supraai/supra-message-ts/api/tools/types';

export type AddNetworkToolInput = Token & {
  nodeAddress: string;
  networkTool: NetworkSupraTool;
};
export type AddNetworkToolOutput = any;
