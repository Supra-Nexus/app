import { getListDirectoryContents as getListDirectoryContentsApi } from '@zooai/zoo-message-ts/api/vector-fs/index';

import { type GetVRPathSimplifiedInput } from './types';

export const getListDirectoryContents = async ({
  nodeAddress,
  path,
  token,
  depth,
}: GetVRPathSimplifiedInput) => {
  const response = await getListDirectoryContentsApi(nodeAddress, token, {
    path: path,
    depth,
  });

  return response;
};
