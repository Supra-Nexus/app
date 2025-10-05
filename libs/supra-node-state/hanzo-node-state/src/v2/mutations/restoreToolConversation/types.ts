import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type UndoToolImplementationResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type RestoreToolConversationInput = Token & {
  nodeAddress: string;
  jobId: string;
  messageId: string;
};

export type RestoreToolConversationOutput = UndoToolImplementationResponse;
