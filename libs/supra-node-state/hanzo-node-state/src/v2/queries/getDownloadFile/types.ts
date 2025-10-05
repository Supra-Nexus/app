import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type DownloadFileOutput = string;

export type GetDownloadFileInput = Token & {
  nodeAddress: string;
  path: string;
};
