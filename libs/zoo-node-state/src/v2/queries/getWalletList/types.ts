import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetWalletListResponse } from '@zooai/zoo-message-ts/api/wallets';

export type GetWalletListInput = Token & {
  nodeAddress: string;
};

export type GetWalletListOutput = GetWalletListResponse;
