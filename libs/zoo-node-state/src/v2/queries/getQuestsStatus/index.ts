import { getQuestsStatus as getQuestsStatusApi } from '@zooai/zoo-message-ts/api/quests/index';

import { type GetQuestsStatusInput } from './types';

export const getQuestsStatus = async ({
  nodeAddress,
  token,
}: GetQuestsStatusInput) => {
  const response = await getQuestsStatusApi(nodeAddress, token);
  return response;
};
