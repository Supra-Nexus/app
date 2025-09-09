import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type ToggleEnableToolResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type ToggleEnableToolOutput = ToggleEnableToolResponse;

export type ToggleEnableToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
  isToolEnabled: boolean;
};
