import { uploadAssetsToTool as uploadAssetsToToolApi } from '@supraai/supra-message-ts/api/tools/index';

import { type UploadAssetsToToolInput } from './types';

export const uploadAssetsToTool = async ({
  nodeAddress,
  token,
  files,
  xSupraAppId,
  xSupraToolId,
}: UploadAssetsToToolInput) => {
  const response = await uploadAssetsToToolApi(
    nodeAddress,
    token,
    xSupraAppId,
    xSupraToolId,
    files,
  );

  return response;
};
