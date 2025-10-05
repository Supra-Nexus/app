import { copyToolAssets as copyToolAssetsApi } from '@supraai/supra-message-ts/api/tools/index';

import { type CopyToolAssetsInput } from './types';

export const copyToolAssets = async ({
  nodeAddress,
  token,
  xSupraAppId,
  currentToolKeyPath,
}: CopyToolAssetsInput) => {
  return await copyToolAssetsApi(nodeAddress, token, {
    is_first_playground: false,
    first_path: currentToolKeyPath,
    second_path: xSupraAppId,
    is_second_playground: true,
  });
};
