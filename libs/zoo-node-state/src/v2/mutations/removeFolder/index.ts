import { removeFolder as removeFolderApi } from '@zooai/zoo-message-ts/api/vector-fs/index';

import { type RemoveFolderInput } from './types';

export const removeFolder = async ({
  nodeAddress,
  token,
  folderPath,
}: RemoveFolderInput) => {
  return await removeFolderApi(nodeAddress, token, {
    path: folderPath,
  });
};
