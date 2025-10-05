import { getToolProtocols as getToolProtocolsApi } from '@supraai/supra-message-ts/api/tools/index';

export const getToolProtocols = async () => {
  const response = await getToolProtocolsApi();
  return response;
};
