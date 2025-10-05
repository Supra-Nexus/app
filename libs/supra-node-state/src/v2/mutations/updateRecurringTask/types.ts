import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type JobConfig } from '@supraai/supra-message-ts/api/jobs/types';
import { type CreateRecurringTaskResponse } from '@supraai/supra-message-ts/api/recurring-tasks/types';

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
