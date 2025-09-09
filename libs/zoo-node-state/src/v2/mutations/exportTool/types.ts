import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type ExportToolResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type ExportToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type ExportToolOutput = ExportToolResponse;
