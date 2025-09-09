import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetAllPromptsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetPromptListInput = Token & {
  nodeAddress: string;
};

export type GetPromptListOutput = GetAllPromptsResponse;
