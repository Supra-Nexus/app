import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type NetworkIdentifier,
  type RestoreCoinbaseMPCWalletResponse,
  type WalletRole,
} from '@supra_network/hanzo-message-ts/api/wallets';

export type RestoreLocalWalletInput = Token & {
  nodeAddress: string;
  network: NetworkIdentifier;
  privateKey?: string;
  mnemonic?: string;
  role: WalletRole;
};
export type RestoreLocalWalletOutput = RestoreCoinbaseMPCWalletResponse;
