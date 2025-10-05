import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetWalletListResponse } from '@supra_network/hanzo-message-ts/api/wallets';

export type GetWalletListInput = Token & {
  nodeAddress: string;
};

export type GetWalletListOutput = GetWalletListResponse;
