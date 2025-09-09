import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type CodeLanguage,
  type CreateToolCodeResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type CreateToolCodeInput = Token & {
  nodeAddress: string;
  message: string;
  llmProviderId: string;
  jobId?: string;
  tools: string[];
  language: CodeLanguage;
};

export type CreateToolCodeOutput = CreateToolCodeResponse;
