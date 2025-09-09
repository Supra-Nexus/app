import { removeToolOffering as removeToolOfferingApi } from '@zooai/zoo-message-ts/api/tools/index';

import { type RemoveToolInput } from './types';

export const removeToolOffering = async ({
  nodeAddress,
  token,
  toolKey,
}: RemoveToolInput) => {
  return await removeToolOfferingApi(nodeAddress, token, {
    tool_key_name: toolKey,
  });
};
