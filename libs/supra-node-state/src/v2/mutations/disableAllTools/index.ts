import { disableAllTools as disableAllToolsApi } from '@supraai/supra-message-ts/api/tools/index';

import { type DisableAllToolsInput } from './types';

export const disableAllTools = async ({
  nodeAddress,
  token,
}: DisableAllToolsInput) => {
  return await disableAllToolsApi(nodeAddress, token);
};
