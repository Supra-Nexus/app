import { getAllToolAssets as getAllToolAssetsApi } from '@supraai/supra-message-ts/api/tools/index';

import  { type GetAllToolAssetsInput } from './types';

export const getAllToolAssets = async ({
  nodeAddress,
  token,
  xSupraAppId,
  xSupraToolId,
}: GetAllToolAssetsInput) => {
  const result = await getAllToolAssetsApi(
    nodeAddress,
    token,
    xSupraAppId,
    xSupraToolId,
  );
  return result;
};
