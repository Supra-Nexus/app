import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type SetNgrokEnabledInput = Token & {
  nodeAddress: string;
  enabled: boolean;
};

export type SetNgrokEnabledOutput = {
  tunnel?: string;
};
