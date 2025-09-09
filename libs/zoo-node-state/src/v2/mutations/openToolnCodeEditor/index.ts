import { openToolInCodeEditor as openToolInCodeEditorApi } from '@zooai/zoo-message-ts/api/tools/index';

import { type OpenToolInCodeEditorInput, type OpenToolInCodeEditorOutput } from './types';

export const openToolInCodeEditor = async ({
  nodeAddress,
  token,
  language,
  xZooAppId,
  xZooToolId,
  xZooLLMProvider,
}: OpenToolInCodeEditorInput): Promise<OpenToolInCodeEditorOutput> => {
  const response = await openToolInCodeEditorApi(
    nodeAddress,
    token,
    { language },
    xZooAppId,
    xZooToolId,
    xZooLLMProvider,
  );
  return response;
};
