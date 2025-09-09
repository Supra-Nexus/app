import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type UpdateInboxNameResponse } from '@zooai/zoo-message-ts/api/jobs/types';

export type UpdateInboxNameInput = Token & {
  nodeAddress: string;
  inboxName: string;
  inboxId: string;
};

export type UpdateInboxNameOutput = UpdateInboxNameResponse;
