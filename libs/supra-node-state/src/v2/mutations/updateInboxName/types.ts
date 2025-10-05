import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type UpdateInboxNameResponse } from '@supraai/supra-message-ts/api/jobs/types';

export type UpdateInboxNameInput = Token & {
  nodeAddress: string;
  inboxName: string;
  inboxId: string;
};

export type UpdateInboxNameOutput = UpdateInboxNameResponse;
