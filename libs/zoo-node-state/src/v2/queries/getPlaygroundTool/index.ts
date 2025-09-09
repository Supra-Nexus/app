import { getPlaygroundTool as getPlaygroundToolApi } from '@zooai/zoo-message-ts/api/tools/index';

import { type GetPlaygroundToolInput } from './types';

export const getPlaygroundTool = async ({
  nodeAddress,
  token,
  toolRouterKey,
  xZooOriginalToolRouterKey,
}: GetPlaygroundToolInput) => {
  const response = await getPlaygroundToolApi(nodeAddress, token, {
    tool_key: toolRouterKey,
  }, xZooOriginalToolRouterKey);
  return response;
};
