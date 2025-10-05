import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type RemoveRecurringTaskResponse } from '@supraai/supra-message-ts/api/recurring-tasks/types';

export type RemoveRecurringTaskOutput = RemoveRecurringTaskResponse;

export type RemoveRecurringTaskInput = Token & {
  nodeAddress: string;
  recurringTaskId: string;
};
