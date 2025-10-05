import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type SupraToolHeader, type SupraToolType } from '@supraai/supra-message-ts/api/tools/types';

export type GetToolsFromToolsetInput = Token & {
  nodeAddress: string;
  tool_set_key: string;
};

export type GetToolsFromToolsetOutput = {
  type: SupraToolType;
  content: [SupraToolHeader, boolean];
}[];
