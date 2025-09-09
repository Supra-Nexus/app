import { updateQuestsStatus as updateQuestsStatusApi } from '@zooai/zoo-message-ts/api/quests/index';

import { type UpdateQuestsStatusInput } from './types';

export const updateQuestsStatus = async ({
  nodeAddress,
  token,
}: UpdateQuestsStatusInput) => {
  const response = await updateQuestsStatusApi(nodeAddress, token);
  return response;
};
