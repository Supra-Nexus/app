import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type ImportToolZipResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type ImportToolFromZipInput = Token & {
  nodeAddress: string;
  file: File;
};

export type ImportToolFromZipOutput = ImportToolZipResponse;
