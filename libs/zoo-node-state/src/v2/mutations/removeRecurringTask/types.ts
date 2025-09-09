import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type RemoveRecurringTaskResponse } from '@zooai/zoo-message-ts/api/recurring-tasks/types';

export type RemoveRecurringTaskOutput = RemoveRecurringTaskResponse;

export type RemoveRecurringTaskInput = Token & {
  nodeAddress: string;
  recurringTaskId: string;
};
