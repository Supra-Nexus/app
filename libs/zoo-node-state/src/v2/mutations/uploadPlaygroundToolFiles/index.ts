import { uploadPlaygroundToolFiles as uploadPlaygroundToolFilesApi } from '@zooai/zoo-message-ts/api/tools/index';

import { type UploadPlaygroundToolFilesInput } from './types';

export const uploadPlaygroundToolFiles = async ({
  nodeAddress,
  token,
  files,
  xZooAppId,
  xZooToolId,
}: UploadPlaygroundToolFilesInput) => {
  const response = await uploadPlaygroundToolFilesApi(
    nodeAddress,
    token,
    xZooAppId,
    xZooToolId,
    files,
  );

  return response;
};
