import { updateAgent as updateAgentApi } from '@supraai/supra-message-ts/api/agents/index';

import { type UpdateAgentInput } from './types';

export const updateAgent = async ({
  nodeAddress,
  token,
  agent,
}: UpdateAgentInput) => {
  const response = await updateAgentApi(nodeAddress, token, {
    ...agent,
  });
  return response;
};
