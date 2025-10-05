import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type RemovePromptOutput = {
  status: string;
};

export type RemovePromptInput = Token & {
  nodeAddress: string;
  promptName: string;
};
