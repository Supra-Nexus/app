import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type QueryObserverOptions } from '@tanstack/react-query';

import { type FunctionKeyV2 } from '../../constants';

export type GetSupraFreeModelQuotaInput = Token & {
  nodeAddress: string;
};
export type UseGetSupraFreeModelQuota = [
  FunctionKeyV2.GET_SUPRA_FREE_MODEL_QUOTA,
  GetSupraFreeModelQuotaInput,
];
export type GetSupraFreeModelQuotaOutput = {
  hasQuota: boolean;
  remainingMessages: number;
  totalMessages: number;
  resetTime: number;
  usedTokens: number;
  tokensQuota: number;
};

export type Options = QueryObserverOptions<
  GetSupraFreeModelQuotaOutput,
  Error,
  GetSupraFreeModelQuotaOutput,
  GetSupraFreeModelQuotaOutput,
  UseGetSupraFreeModelQuota
>;
