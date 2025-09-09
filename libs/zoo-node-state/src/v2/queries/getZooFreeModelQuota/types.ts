import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type QueryObserverOptions } from '@tanstack/react-query';

import { type FunctionKeyV2 } from '../../constants';

export type GetZooFreeModelQuotaInput = Token & {
  nodeAddress: string;
};
export type UseGetZooFreeModelQuota = [
  FunctionKeyV2.GET_ZOO_FREE_MODEL_QUOTA,
  GetZooFreeModelQuotaInput,
];
export type GetZooFreeModelQuotaOutput = {
  hasQuota: boolean;
  remainingMessages: number;
  totalMessages: number;
  resetTime: number;
  usedTokens: number;
  tokensQuota: number;
};

export type Options = QueryObserverOptions<
  GetZooFreeModelQuotaOutput,
  Error,
  GetZooFreeModelQuotaOutput,
  GetZooFreeModelQuotaOutput,
  UseGetZooFreeModelQuota
>;
