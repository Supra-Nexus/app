import { getJobConfig as getJobConfigApi } from '@zooai/zoo-message-ts/api/jobs/index';

import { type GetChatConfigInput } from './types';

export const getChatConfig = async ({
  nodeAddress,
  token,
  jobId,
}: GetChatConfigInput) => {
  const response = await getJobConfigApi(nodeAddress, token, {
    job_id: jobId,
  });
  return response;
};
