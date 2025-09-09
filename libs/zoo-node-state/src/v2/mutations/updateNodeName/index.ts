import { updateNodeName as updateNodeNameApi } from '@zooai/zoo-message-ts/api/general/index';

import { type UpdateNodeNameInput, type UpdateNodeNameOutput } from './types';

export const updateNodeName = async ({
  nodeAddress,
  newNodeName,
  token,
}: UpdateNodeNameInput): Promise<UpdateNodeNameOutput> => {
  const response = await updateNodeNameApi(nodeAddress, token, newNodeName);
  return response;
};
