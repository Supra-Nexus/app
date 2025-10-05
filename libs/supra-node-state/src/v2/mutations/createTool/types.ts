import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type SupraTool,
  type SupraToolType,
  type UpdateToolResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type CreateToolOutput = UpdateToolResponse;

export type CreateToolInput = Token & {
  nodeAddress: string;
  toolType: SupraToolType;
  toolPayload: SupraTool;
  isToolEnabled: boolean;
};
