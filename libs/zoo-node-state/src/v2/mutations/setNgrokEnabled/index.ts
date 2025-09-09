import { setNgrokEnabled as setNgrokEnabledApi } from '@zooai/zoo-message-ts/api/ngrok';
import { type SetNgrokEnabledInput } from './types';

export const setNgrokEnabled = async ({
  nodeAddress,
  token,
  enabled,
}: SetNgrokEnabledInput) => {
  return await setNgrokEnabledApi(nodeAddress, token, enabled);
};
