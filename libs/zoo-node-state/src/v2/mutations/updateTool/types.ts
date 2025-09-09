import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type ZooTool,
  type ZooToolType,
  type UpdateToolResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type UpdateToolOutput = UpdateToolResponse;

export type UpdateToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
  toolType: ZooToolType;
  toolPayload: ZooTool;
  isToolEnabled: boolean;
};
