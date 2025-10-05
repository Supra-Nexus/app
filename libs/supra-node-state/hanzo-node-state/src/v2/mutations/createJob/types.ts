import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type JobConfig,
  type HanzoPath,
} from '@supra_network/hanzo-message-ts/api/jobs/types';

export type CreateJobInput = Token & {
  nodeAddress: string;
  llmProvider: string;
  sheetId?: string;
  content: string;
  isHidden: boolean;
  toolKey?: string;
  files?: File[];
  selectedVRFiles?: HanzoPath[];
  selectedVRFolders?: HanzoPath[];
  chatConfig?: JobConfig;
};

export type CreateJobOutput = {
  jobId: string;
};
