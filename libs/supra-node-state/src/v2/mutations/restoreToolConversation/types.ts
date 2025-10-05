import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type UndoToolImplementationResponse } from '@supraai/supra-message-ts/api/tools/types';

export type RestoreToolConversationInput = Token & {
  nodeAddress: string;
  jobId: string;
  messageId: string;
};

export type RestoreToolConversationOutput = UndoToolImplementationResponse;
