import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type HanzoToolHeader, type HanzoToolType } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetToolsFromToolsetInput = Token & {
  nodeAddress: string;
  tool_set_key: string;
};

export type GetToolsFromToolsetOutput = {
  type: HanzoToolType;
  content: [HanzoToolHeader, boolean];
}[];
