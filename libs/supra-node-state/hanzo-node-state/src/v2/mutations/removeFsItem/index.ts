import { removeFsItem as removeFsItemApi } from '@supra_network/hanzo-message-ts/api/vector-fs/index';

import { type RemoveFsItemInput } from './types';

export const removeFsItem = async ({
  nodeAddress,
  token,
  itemPath,
}: RemoveFsItemInput) => {
  return await removeFsItemApi(nodeAddress, token, {
    path: itemPath,
  });
};
