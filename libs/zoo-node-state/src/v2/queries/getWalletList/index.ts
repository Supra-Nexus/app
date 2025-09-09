import { getWalletList as getWalletListApi } from '@zooai/zoo-message-ts/api/wallets';

import { type GetWalletListInput } from './types';

export const getWalletList = async ({
  nodeAddress,
  token,
}: GetWalletListInput) => {
  const response = await getWalletListApi(nodeAddress, token);
  return response;
};
