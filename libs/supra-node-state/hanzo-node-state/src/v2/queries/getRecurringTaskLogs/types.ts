import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetRecurringTaskResponse } from '@supra_network/hanzo-message-ts/api/recurring-tasks/types';

export type GetRecurringTaskLogsInput = Token & {
  nodeAddress: string;
  recurringTaskId: string;
};

export type GetRecurringTaskLogsOutput = GetRecurringTaskResponse;
