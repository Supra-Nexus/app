import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type ExportToolResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type ExportToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type ExportToolOutput = ExportToolResponse;
