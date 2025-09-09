import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type NetworkIdentifier,
  type RestoreCoinbaseMPCWalletResponse,
  type WalletRole,
} from '@zooai/zoo-message-ts/api/wallets';

export type RestoreLocalWalletInput = Token & {
  nodeAddress: string;
  network: NetworkIdentifier;
  privateKey?: string;
  mnemonic?: string;
  role: WalletRole;
};
export type RestoreLocalWalletOutput = RestoreCoinbaseMPCWalletResponse;
