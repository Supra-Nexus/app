import { getAllToolAssets as getAllToolAssetsApi } from '@zooai/zoo-message-ts/api/tools/index';

import  { type GetAllToolAssetsInput } from './types';

export const getAllToolAssets = async ({
  nodeAddress,
  token,
  xZooAppId,
  xZooToolId,
}: GetAllToolAssetsInput) => {
  const result = await getAllToolAssetsApi(
    nodeAddress,
    token,
    xZooAppId,
    xZooToolId,
  );
  return result;
};
