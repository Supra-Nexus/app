import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type SetNgrokEnabledInput = Token & {
  nodeAddress: string;
  enabled: boolean;
};

export type SetNgrokEnabledOutput = {
  tunnel?: string;
};
