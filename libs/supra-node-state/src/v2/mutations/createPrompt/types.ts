import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type CreatePromptResponse } from '@supraai/supra-message-ts/api/tools/types';

export type CreatePromptOutput = CreatePromptResponse;

export type CreatePromptInput = Token & {
  nodeAddress: string;
  promptName: string;
  promptContent: string;
};
