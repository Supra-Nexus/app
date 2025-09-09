import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type ZooToolHeader, type ZooToolType } from '@zooai/zoo-message-ts/api/tools/types';

export type GetToolsFromToolsetInput = Token & {
  nodeAddress: string;
  tool_set_key: string;
};

export type GetToolsFromToolsetOutput = {
  type: ZooToolType;
  content: [ZooToolHeader, boolean];
}[];
