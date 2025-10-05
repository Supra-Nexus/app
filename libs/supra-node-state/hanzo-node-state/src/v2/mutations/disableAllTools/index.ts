import { disableAllTools as disableAllToolsApi } from '@supra_network/hanzo-message-ts/api/tools/index';

import { type DisableAllToolsInput } from './types';

export const disableAllTools = async ({
  nodeAddress,
  token,
}: DisableAllToolsInput) => {
  return await disableAllToolsApi(nodeAddress, token);
};
