import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type CreatePromptResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type CreatePromptOutput = CreatePromptResponse;

export type CreatePromptInput = Token & {
  nodeAddress: string;
  promptName: string;
  promptContent: string;
};
