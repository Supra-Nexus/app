import { toolMetadataImplementation as createToolMetadataApi } from '@supraai/supra-message-ts/api/tools/index';
import { CodeLanguage } from '@supraai/supra-message-ts/api/tools/types';

import { type CreateToolMetadataInput, type CreateToolMetadataOutput } from './types';

export const createToolMetadata = async ({
  nodeAddress,
  token,
  jobId,
  tools,
  xSupraToolId,
}: CreateToolMetadataInput): Promise<CreateToolMetadataOutput> => {
  const response = await createToolMetadataApi(nodeAddress, token, {
    job_id: jobId,
    language: CodeLanguage.Typescript,
    tools,
    x_supra_tool_id: xSupraToolId,
  });
  return response;
};
