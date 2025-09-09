import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetRecurringTaskResponse } from '@zooai/zoo-message-ts/api/recurring-tasks/types';

export type GetRecurringTaskInput = Token & {
  nodeAddress: string;
  recurringTaskId: string;
};

export type GetRecurringTaskOutput = GetRecurringTaskResponse;
