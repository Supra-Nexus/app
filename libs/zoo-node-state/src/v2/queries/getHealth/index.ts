import { checkHealth as checkHealthApi } from '@zooai/zoo-message-ts/api/general/index';

import { type GetHealthInput, type GetHealthOutput } from './types';

export const getHealth = async ({
  nodeAddress,
}: GetHealthInput): Promise<GetHealthOutput> => {
  const response = await checkHealthApi(nodeAddress);
  return response;
};
