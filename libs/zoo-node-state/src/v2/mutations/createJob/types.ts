import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type JobConfig,
  type ZooPath,
} from '@zooai/zoo-message-ts/api/jobs/types';

export type CreateJobInput = Token & {
  nodeAddress: string;
  llmProvider: string;
  sheetId?: string;
  content: string;
  isHidden: boolean;
  toolKey?: string;
  files?: File[];
  selectedVRFiles?: ZooPath[];
  selectedVRFolders?: ZooPath[];
  chatConfig?: JobConfig;
};

export type CreateJobOutput = {
  jobId: string;
};
