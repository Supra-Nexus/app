import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type RemovePromptOutput = {
  status: string;
};

export type RemovePromptInput = Token & {
  nodeAddress: string;
  promptName: string;
};
