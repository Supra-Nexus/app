import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetRecurringTaskResponse } from '@supraai/supra-message-ts/api/recurring-tasks/types';

export type GetRecurringTaskLogsInput = Token & {
  nodeAddress: string;
  recurringTaskId: string;
};

export type GetRecurringTaskLogsOutput = GetRecurringTaskResponse;
