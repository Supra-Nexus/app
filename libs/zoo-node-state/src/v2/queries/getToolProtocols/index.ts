import { getToolProtocols as getToolProtocolsApi } from '@zooai/zoo-message-ts/api/tools/index';

export const getToolProtocols = async () => {
  const response = await getToolProtocolsApi();
  return response;
};
