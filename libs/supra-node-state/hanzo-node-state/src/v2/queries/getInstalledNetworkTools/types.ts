import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetInstalledNetworkToolsResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetInstalledNetworkToolsInput = Token & {
  nodeAddress: string;
};

export type GetInstalledNetworkToolsOutput = GetInstalledNetworkToolsResponse;
