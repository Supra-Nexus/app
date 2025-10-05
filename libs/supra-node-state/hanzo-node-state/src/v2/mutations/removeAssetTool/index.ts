import { removeToolAsset as removeToolAssetApi } from '@supra_network/hanzo-message-ts/api/tools/index';

import { type RemoveAssetToToolInput } from './types';

export const removeToolAsset = async ({
  nodeAddress,
  token,
  filename,
  xHanzoAppId,
  xHanzoToolId,
}: RemoveAssetToToolInput) => {
  const response = await removeToolAssetApi(
    nodeAddress,
    token,
    { filename },
    xHanzoAppId,
    xHanzoToolId,
  );

  return response;
};
