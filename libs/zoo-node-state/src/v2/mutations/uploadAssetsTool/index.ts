import { uploadAssetsToTool as uploadAssetsToToolApi } from '@zooai/zoo-message-ts/api/tools/index';

import { type UploadAssetsToToolInput } from './types';

export const uploadAssetsToTool = async ({
  nodeAddress,
  token,
  files,
  xZooAppId,
  xZooToolId,
}: UploadAssetsToToolInput) => {
  const response = await uploadAssetsToToolApi(
    nodeAddress,
    token,
    xZooAppId,
    xZooToolId,
    files,
  );

  return response;
};
