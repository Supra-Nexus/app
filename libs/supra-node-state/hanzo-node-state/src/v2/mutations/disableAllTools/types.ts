import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type DisableAllToolsResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type DisableAllToolsInput = Token & {
  nodeAddress: string;
};

export type DisableAllToolsOutput = DisableAllToolsResponse;
