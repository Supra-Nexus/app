import { getPreferences as getPreferencesApi } from '@supraai/supra-message-ts/api/general/index';

import { type GetPreferencesInput } from './types';

export const getPreferences = async ({
  nodeAddress,
  token,
}: GetPreferencesInput) => {
  const preferences = await getPreferencesApi(nodeAddress, token);
  return preferences;
};
