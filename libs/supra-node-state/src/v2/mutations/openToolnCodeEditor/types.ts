import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type CodeLanguage,
  type OpenToolInCodeEditorResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type OpenToolInCodeEditorInput = Token & {
  nodeAddress: string;
  xSupraAppId: string;
  xSupraToolId: string;
  xSupraLLMProvider: string;
  language: CodeLanguage;
};

export type OpenToolInCodeEditorOutput = OpenToolInCodeEditorResponse;
