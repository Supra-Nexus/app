import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetWalletBalanceResponse } from '@supra_network/hanzo-message-ts/api/wallets';

export type GetWalletBalanceInput = Token & {
  nodeAddress: string;
};

export type GetWalletBalanceOutput = GetWalletBalanceResponse;
