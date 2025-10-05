import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type ImportToolZipResponse } from '@supraai/supra-message-ts/api/tools/types';

export type ImportToolFromZipInput = Token & {
  nodeAddress: string;
  file: File;
};

export type ImportToolFromZipOutput = ImportToolZipResponse;
