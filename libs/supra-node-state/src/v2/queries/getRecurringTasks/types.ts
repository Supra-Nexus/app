import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetRecurringTasksResponse } from '@supraai/supra-message-ts/api/recurring-tasks/types';

export type GetRecurringTasksInput = Token & {
  nodeAddress: string;
};

export type GetRecurringTasksOutput = GetRecurringTasksResponse;
