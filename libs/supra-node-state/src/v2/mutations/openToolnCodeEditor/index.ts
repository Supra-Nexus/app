import { openToolInCodeEditor as openToolInCodeEditorApi } from '@supraai/supra-message-ts/api/tools/index';

import { type OpenToolInCodeEditorInput, type OpenToolInCodeEditorOutput } from './types';

export const openToolInCodeEditor = async ({
  nodeAddress,
  token,
  language,
  xSupraAppId,
  xSupraToolId,
  xSupraLLMProvider,
}: OpenToolInCodeEditorInput): Promise<OpenToolInCodeEditorOutput> => {
  const response = await openToolInCodeEditorApi(
    nodeAddress,
    token,
    { language },
    xSupraAppId,
    xSupraToolId,
    xSupraLLMProvider,
  );
  return response;
};
