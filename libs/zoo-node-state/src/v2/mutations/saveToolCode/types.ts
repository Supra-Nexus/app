import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type CodeLanguage,
  type SaveToolCodeResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type SaveToolCodeInput = Token & {
  nodeAddress: string;
  jobId: string;
  metadata: Record<string, any>;
  code?: string;
  assets: string[];
  language: CodeLanguage;
  xZooAppId: string;
  xZooToolId: string;
  xZooOriginalToolRouterKey?: string;
  shouldPrefetchPlaygroundTool?: boolean;
} & {
  name: string;
  description: string;
  version: string;
  tools: string[];
  author: string;
};

export type SaveToolCodeOutput = SaveToolCodeResponse;
