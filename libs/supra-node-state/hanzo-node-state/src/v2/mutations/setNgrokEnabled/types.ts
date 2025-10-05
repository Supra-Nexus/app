import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type SetNgrokEnabledInput = Token & {
  nodeAddress: string;
  enabled: boolean;
};

export type SetNgrokEnabledOutput = {
  tunnel?: string;
};
