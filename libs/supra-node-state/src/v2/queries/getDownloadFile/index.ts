import { downloadFile as downloadFileApi } from '@supraai/supra-message-ts/api/jobs/index';

import { type GetDownloadFileInput } from './types';

export const downloadFile = async ({
  nodeAddress,
  token,
  path,
}: GetDownloadFileInput) => {
  return await downloadFileApi(nodeAddress, token, { path });
};
