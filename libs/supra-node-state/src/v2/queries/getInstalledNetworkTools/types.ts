import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetInstalledNetworkToolsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetInstalledNetworkToolsInput = Token & {
  nodeAddress: string;
};

export type GetInstalledNetworkToolsOutput = GetInstalledNetworkToolsResponse;
