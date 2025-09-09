import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type CodeLanguage,
  type ExecuteToolCodeResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type ExecuteToolCodeInput = Token & {
  nodeAddress: string;
  params: Record<string, any>;
  configs?: Record<string, any>;
  code: string;
  llmProviderId: string;
  tools: string[];
  language: CodeLanguage;
  xZooAppId: string;
  xZooToolId: string;
  mounts?: string[];
};

export type ExecuteToolCodeOutput = ExecuteToolCodeResponse;
