import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type SupraTool,
  type SupraToolType,
  type UpdateToolResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type UpdateToolOutput = UpdateToolResponse;

export type UpdateToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
  toolType: SupraToolType;
  toolPayload: SupraTool;
  isToolEnabled: boolean;
};
