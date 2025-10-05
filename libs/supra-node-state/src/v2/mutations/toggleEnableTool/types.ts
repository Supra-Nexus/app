import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type ToggleEnableToolResponse } from '@supraai/supra-message-ts/api/tools/types';

export type ToggleEnableToolOutput = ToggleEnableToolResponse;

export type ToggleEnableToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
  isToolEnabled: boolean;
};
