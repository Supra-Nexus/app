import { getTool as getToolApi } from '@supraai/supra-message-ts/api/tools/index';

import { type GetToolInput } from './types';

export const getTool = async ({
  nodeAddress,
  token,
  toolKey,
}: GetToolInput) => {
  const response = await getToolApi(nodeAddress, token, toolKey);
  return response;
};
