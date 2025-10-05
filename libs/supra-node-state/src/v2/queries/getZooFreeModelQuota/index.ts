import { getSupraFreeModelQuota as getSupraFreeModelQuotaApi } from '@supraai/supra-message-ts/api/general/index';
import { type GetSupraFreeModelQuotaResponse } from '@supraai/supra-message-ts/api/general/types';

import {
  type GetSupraFreeModelQuotaInput,
  type GetSupraFreeModelQuotaOutput,
} from './types';

const TOKENS_PER_MESSAGE = 2000;

const parseQuotaToMessages = (quota: GetSupraFreeModelQuotaResponse) => {
  const totalMessages = Math.floor(quota.tokens_quota / TOKENS_PER_MESSAGE);
  const usedMessages = Math.floor(quota.used_tokens / TOKENS_PER_MESSAGE);
  const remainingMessages = totalMessages - usedMessages;

  return {
    remainingMessages,
    totalMessages,
    resetTime: quota.reset_time,
    hasQuota: quota.has_quota,
    usedTokens: quota.used_tokens,
    tokensQuota: quota.tokens_quota,
  };
};

export const getSupraFreeModelQuota = async ({
  nodeAddress,
  token,
}: GetSupraFreeModelQuotaInput): Promise<GetSupraFreeModelQuotaOutput> => {
  const response = await getSupraFreeModelQuotaApi(nodeAddress, token);
  const parsedResponse = parseQuotaToMessages(response);
  return parsedResponse;
};
