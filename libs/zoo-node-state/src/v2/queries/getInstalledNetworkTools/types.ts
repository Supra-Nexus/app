import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetInstalledNetworkToolsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetInstalledNetworkToolsInput = Token & {
  nodeAddress: string;
};

export type GetInstalledNetworkToolsOutput = GetInstalledNetworkToolsResponse;
