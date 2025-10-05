import { getListDirectoryContents as getListDirectoryContentsApi } from '@supraai/supra-message-ts/api/vector-fs/index';

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
