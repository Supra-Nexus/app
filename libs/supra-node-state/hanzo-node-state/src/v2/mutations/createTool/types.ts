import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type HanzoTool,
  type HanzoToolType,
  type UpdateToolResponse,
} from '@supra_network/hanzo-message-ts/api/tools/types';

export type CreateToolOutput = UpdateToolResponse;

export type CreateToolInput = Token & {
  nodeAddress: string;
  toolType: HanzoToolType;
  toolPayload: HanzoTool;
  isToolEnabled: boolean;
};
