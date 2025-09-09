import { getZooFileProtocol as getZooFileProtocolApi } from '@zooai/zoo-message-ts/api/tools/index';

import { generateFilePreview } from '../../utils/file-preview';
import  {
  type GetZooFileProtocolInput,
  type GetZooFilesProtocolInput,
} from './types';

export const getZooFileProtocol = async ({
  nodeAddress,
  token,
  file,
}: GetZooFileProtocolInput) => {
  const result = await getZooFileProtocolApi(nodeAddress, token, {
    file,
  });
  return result;
};

export const getZooFilesProtocol = async ({
  nodeAddress,
  token,
  files,
}: GetZooFilesProtocolInput) => {
  const results = await Promise.all(
    files.map(async (file) => {
      const result = await getZooFileProtocolApi(nodeAddress, token, {
        file,
      });
      return generateFilePreview(file, result);
    }),
  );

  return results;
};
