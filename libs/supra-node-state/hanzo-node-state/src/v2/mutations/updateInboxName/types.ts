import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type UpdateInboxNameResponse } from '@supra_network/hanzo-message-ts/api/jobs/types';

export type UpdateInboxNameInput = Token & {
  nodeAddress: string;
  inboxName: string;
  inboxId: string;
};

export type UpdateInboxNameOutput = UpdateInboxNameResponse;
