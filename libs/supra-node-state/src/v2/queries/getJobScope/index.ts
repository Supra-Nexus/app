import { getJobScope as getJobScopeApi } from '@supraai/supra-message-ts/api/jobs/index';

import  { type GetJobScopeInput } from './types';

export const getJobScope = async ({
  nodeAddress,
  token,
  jobId,
}: GetJobScopeInput) => {
  const result = await getJobScopeApi(nodeAddress, token, {
    jobId,
  });
  return result;
};
