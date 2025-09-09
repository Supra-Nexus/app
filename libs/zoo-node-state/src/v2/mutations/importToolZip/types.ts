import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type ImportToolZipResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type ImportToolFromZipInput = Token & {
  nodeAddress: string;
  file: File;
};

export type ImportToolFromZipOutput = ImportToolZipResponse;
