import { getZooFreeModelQuota as getZooFreeModelQuotaApi } from '@zooai/zoo-message-ts/api/general/index';
import { type GetZooFreeModelQuotaResponse } from '@zooai/zoo-message-ts/api/general/types';

import {
  type GetZooFreeModelQuotaInput,
  type GetZooFreeModelQuotaOutput,
} from './types';

const TOKENS_PER_MESSAGE = 2000;

const parseQuotaToMessages = (quota: GetZooFreeModelQuotaResponse) => {
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

export const getZooFreeModelQuota = async ({
  nodeAddress,
  token,
}: GetZooFreeModelQuotaInput): Promise<GetZooFreeModelQuotaOutput> => {
  const response = await getZooFreeModelQuotaApi(nodeAddress, token);
  const parsedResponse = parseQuotaToMessages(response);
  return parsedResponse;
};
