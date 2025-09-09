import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetRecurringTasksResponse } from '@zooai/zoo-message-ts/api/recurring-tasks/types';

export type GetRecurringTasksInput = Token & {
  nodeAddress: string;
};

export type GetRecurringTasksOutput = GetRecurringTasksResponse;
