import { uploadPlaygroundToolFiles as uploadPlaygroundToolFilesApi } from '@supraai/supra-message-ts/api/tools/index';

import { type UploadPlaygroundToolFilesInput } from './types';

export const uploadPlaygroundToolFiles = async ({
  nodeAddress,
  token,
  files,
  xSupraAppId,
  xSupraToolId,
}: UploadPlaygroundToolFilesInput) => {
  const response = await uploadPlaygroundToolFilesApi(
    nodeAddress,
    token,
    xSupraAppId,
    xSupraToolId,
    files,
  );

  return response;
};
