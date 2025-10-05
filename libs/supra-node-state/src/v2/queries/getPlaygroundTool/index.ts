import { getPlaygroundTool as getPlaygroundToolApi } from '@supraai/supra-message-ts/api/tools/index';

import { type GetPlaygroundToolInput } from './types';

export const getPlaygroundTool = async ({
  nodeAddress,
  token,
  toolRouterKey,
  xSupraOriginalToolRouterKey,
}: GetPlaygroundToolInput) => {
  const response = await getPlaygroundToolApi(nodeAddress, token, {
    tool_key: toolRouterKey,
  }, xSupraOriginalToolRouterKey);
  return response;
};
