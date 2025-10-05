import { removeToolAsset as removeToolAssetApi } from '@supraai/supra-message-ts/api/tools/index';

import { type RemoveAssetToToolInput } from './types';

export const removeToolAsset = async ({
  nodeAddress,
  token,
  filename,
  xSupraAppId,
  xSupraToolId,
}: RemoveAssetToToolInput) => {
  const response = await removeToolAssetApi(
    nodeAddress,
    token,
    { filename },
    xSupraAppId,
    xSupraToolId,
  );

  return response;
};
