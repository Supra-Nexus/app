import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type JobConfig,
  type SupraPath,
} from '@supraai/supra-message-ts/api/jobs/types';

export type CreateJobInput = Token & {
  nodeAddress: string;
  llmProvider: string;
  sheetId?: string;
  content: string;
  isHidden: boolean;
  toolKey?: string;
  files?: File[];
  selectedVRFiles?: SupraPath[];
  selectedVRFolders?: SupraPath[];
  chatConfig?: JobConfig;
};

export type CreateJobOutput = {
  jobId: string;
};
