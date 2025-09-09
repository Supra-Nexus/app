import { removeToolAsset as removeToolAssetApi } from '@zooai/zoo-message-ts/api/tools/index';

import { type RemoveAssetToToolInput } from './types';

export const removeToolAsset = async ({
  nodeAddress,
  token,
  filename,
  xZooAppId,
  xZooToolId,
}: RemoveAssetToToolInput) => {
  const response = await removeToolAssetApi(
    nodeAddress,
    token,
    { filename },
    xZooAppId,
    xZooToolId,
  );

  return response;
};
