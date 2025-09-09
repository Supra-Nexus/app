import { toolMetadataImplementation as createToolMetadataApi } from '@zooai/zoo-message-ts/api/tools/index';
import { CodeLanguage } from '@zooai/zoo-message-ts/api/tools/types';

import { type CreateToolMetadataInput, type CreateToolMetadataOutput } from './types';

export const createToolMetadata = async ({
  nodeAddress,
  token,
  jobId,
  tools,
  xZooToolId,
}: CreateToolMetadataInput): Promise<CreateToolMetadataOutput> => {
  const response = await createToolMetadataApi(nodeAddress, token, {
    job_id: jobId,
    language: CodeLanguage.Typescript,
    tools,
    x_zoo_tool_id: xZooToolId,
  });
  return response;
};
