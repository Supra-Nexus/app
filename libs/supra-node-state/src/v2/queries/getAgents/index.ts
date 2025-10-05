import { getAgents as getAgentsApi } from '@supraai/supra-message-ts/api/agents/index';

import  { type GetAgentsInput } from './types';

export const getAgents = async ({
  nodeAddress,
  token,
  categoryFilter,
}: GetAgentsInput) => {
  const result = await getAgentsApi(nodeAddress, token, categoryFilter);
  return result;
};

export { useGetAgents } from './useGetAgents';
export type { GetAgentsInput, GetAgentsOutput } from './types';
