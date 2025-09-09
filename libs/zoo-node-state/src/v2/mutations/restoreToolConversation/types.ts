import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type UndoToolImplementationResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type RestoreToolConversationInput = Token & {
  nodeAddress: string;
  jobId: string;
  messageId: string;
};

export type RestoreToolConversationOutput = UndoToolImplementationResponse;
