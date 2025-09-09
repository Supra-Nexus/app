import { getPreferences as getPreferencesApi } from '@zooai/zoo-message-ts/api/general/index';

import { type GetPreferencesInput } from './types';

export const getPreferences = async ({
  nodeAddress,
  token,
}: GetPreferencesInput) => {
  const preferences = await getPreferencesApi(nodeAddress, token);
  return preferences;
};
