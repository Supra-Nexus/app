import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type ExportToolResponse } from '@supraai/supra-message-ts/api/tools/types';

export type ExportToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type ExportToolOutput = ExportToolResponse;
