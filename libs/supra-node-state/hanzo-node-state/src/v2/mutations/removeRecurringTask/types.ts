import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type RemoveRecurringTaskResponse } from '@supra_network/hanzo-message-ts/api/recurring-tasks/types';

export type RemoveRecurringTaskOutput = RemoveRecurringTaskResponse;

export type RemoveRecurringTaskInput = Token & {
  nodeAddress: string;
  recurringTaskId: string;
};
