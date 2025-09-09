import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetWalletBalanceResponse } from '@zooai/zoo-message-ts/api/wallets';

export type GetWalletBalanceInput = Token & {
  nodeAddress: string;
};

export type GetWalletBalanceOutput = GetWalletBalanceResponse;
