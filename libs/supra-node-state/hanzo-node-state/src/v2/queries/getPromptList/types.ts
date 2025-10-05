import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetAllPromptsResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetPromptListInput = Token & {
  nodeAddress: string;
};

export type GetPromptListOutput = GetAllPromptsResponse;
