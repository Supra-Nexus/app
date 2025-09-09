import { getDockerStatus as getDockerStatusApi } from '@zooai/zoo-message-ts/api/general/index';

import { type GetDockerStatusInput } from './types';

export const getDockerStatus = async ({
  nodeAddress,
}: GetDockerStatusInput) => {
  const response = await getDockerStatusApi(nodeAddress);
  return response;
};
