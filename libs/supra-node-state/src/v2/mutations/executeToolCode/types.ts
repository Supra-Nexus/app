import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type CodeLanguage,
  type ExecuteToolCodeResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type ExecuteToolCodeInput = Token & {
  nodeAddress: string;
  params: Record<string, any>;
  configs?: Record<string, any>;
  code: string;
  llmProviderId: string;
  tools: string[];
  language: CodeLanguage;
  xSupraAppId: string;
  xSupraToolId: string;
  mounts?: string[];
};

export type ExecuteToolCodeOutput = ExecuteToolCodeResponse;
