import { getWalletList as getWalletListApi } from '@supraai/supra-message-ts/api/wallets';

import { type GetWalletListInput } from './types';

export const getWalletList = async ({
  nodeAddress,
  token,
}: GetWalletListInput) => {
  const response = await getWalletListApi(nodeAddress, token);
  return response;
};
