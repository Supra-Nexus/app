import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetRecurringTasksResponse } from '@supra_network/hanzo-message-ts/api/recurring-tasks/types';

export type GetRecurringTasksInput = Token & {
  nodeAddress: string;
};

export type GetRecurringTasksOutput = GetRecurringTasksResponse;
