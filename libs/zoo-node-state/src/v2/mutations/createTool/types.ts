import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type ZooTool,
  type ZooToolType,
  type UpdateToolResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type CreateToolOutput = UpdateToolResponse;

export type CreateToolInput = Token & {
  nodeAddress: string;
  toolType: ZooToolType;
  toolPayload: ZooTool;
  isToolEnabled: boolean;
};
