import {
  saveToolCode as saveToolCodeApi,
  toggleEnableTool,
} from '@supraai/supra-message-ts/api/tools/index';
import {} from '@supraai/supra-message-ts/api/tools/types';
import { merge } from 'ts-deepmerge';

import { type SaveToolCodeInput } from './types';

export const saveToolCode = async ({
  nodeAddress,
  token,
  jobId,
  name,
  description,
  version,
  metadata,
  code,
  language,
  assets,
  tools,
  xSupraAppId,
  xSupraToolId,
  xSupraOriginalToolRouterKey,
  author,
}: SaveToolCodeInput) => {
  const mergedToolMetadata = merge(metadata, {
    name,
    description,
    version,
    tools,
    author,
  });

  const response = await saveToolCodeApi(
    nodeAddress,
    token,
    {
      code: code ?? '',
      metadata: mergedToolMetadata,
      job_id: jobId,
      language,
      assets,
    },
    xSupraAppId,
    xSupraToolId,
    xSupraOriginalToolRouterKey,
  );

  if (
    response.metadata.tool_router_key &&
    Object.keys(metadata?.configurations?.properties ?? {}).length === 0
  ) {
    await toggleEnableTool(nodeAddress, token, {
      tool_router_key: response.metadata.tool_router_key,
      enabled: true,
    });
  }

  return response;
};
