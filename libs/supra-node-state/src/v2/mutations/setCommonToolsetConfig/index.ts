import { setCommonToolsetConfig as setCommonToolsetConfigApi } from '@supraai/supra-message-ts/api/tools/index';

import { type SetCommonToolsetConfigInput } from './types';

export const setCommonToolsetConfig = async ({
  nodeAddress,
  token,
  tool_set_key,
  value,
}: SetCommonToolsetConfigInput) => {
  const data = await setCommonToolsetConfigApi(nodeAddress, token, {
    tool_set_key: tool_set_key,
    value: value,
  });
  return data;
};
