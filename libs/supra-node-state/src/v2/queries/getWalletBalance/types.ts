import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetWalletBalanceResponse } from '@supraai/supra-message-ts/api/wallets';

export type GetWalletBalanceInput = Token & {
  nodeAddress: string;
};

export type GetWalletBalanceOutput = GetWalletBalanceResponse;
