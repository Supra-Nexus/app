import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type JobConfig } from '@supra_network/hanzo-message-ts/api/jobs/types';
import { type CreateRecurringTaskResponse } from '@supra_network/hanzo-message-ts/api/recurring-tasks/types';

export type UpdateRecurringTaskOutput = CreateRecurringTaskResponse;

export type UpdateRecurringTaskInput = Token & {
  nodeAddress: string;
  name: string;
  active: boolean;
  description?: string;
  taskId: string;
  jobId: string;
  cronExpression: string;
  message: string;
  toolKey?: string;
  llmProvider: string;
  chatConfig: JobConfig;
};
