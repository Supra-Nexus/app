import { removeJob as removeJobApi } from '@zooai/zoo-message-ts/api/jobs/index';

import { type RemoveJobInput } from './types';

export const removeJob = async ({
  nodeAddress,
  token,
  jobId,
}: RemoveJobInput) => {
  return await removeJobApi(nodeAddress, token, {
    job_id: jobId,
  });
};
