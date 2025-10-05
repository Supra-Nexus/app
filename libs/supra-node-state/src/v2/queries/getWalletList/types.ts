import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetWalletListResponse } from '@supraai/supra-message-ts/api/wallets';

export type GetWalletListInput = Token & {
  nodeAddress: string;
};

export type GetWalletListOutput = GetWalletListResponse;
