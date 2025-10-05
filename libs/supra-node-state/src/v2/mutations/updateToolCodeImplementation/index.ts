import { updateToolCodeImplementation as updateToolCodeImplementationApi } from '@supraai/supra-message-ts/api/tools/index';

import { type UpdateToolCodeImplementationInput } from './types';

export const updateToolCodeImplementation = async ({
  nodeAddress,
  token,
  jobId,
  code,
}: UpdateToolCodeImplementationInput) => {
  return await updateToolCodeImplementationApi(nodeAddress, token, {
    job_id: jobId,
    code,
  });
};
