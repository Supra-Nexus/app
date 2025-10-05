import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type UpdatePromptOutput = {
  status: string;
};

export type UpdatePromptInput = Token & {
  nodeAddress: string;
  id: number;
  promptName: string;
  promptContent: string;
  isPromptFavorite: boolean;
  isPromptEnabled: boolean;
  isPromptSystem: boolean;
  promptVersion: string;
};
