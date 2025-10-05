import { getSupraFileProtocol as getSupraFileProtocolApi } from '@supraai/supra-message-ts/api/tools/index';

import { generateFilePreview } from '../../utils/file-preview';
import  {
  type GetSupraFileProtocolInput,
  type GetSupraFilesProtocolInput,
} from './types';

export const getSupraFileProtocol = async ({
  nodeAddress,
  token,
  file,
}: GetSupraFileProtocolInput) => {
  const result = await getSupraFileProtocolApi(nodeAddress, token, {
    file,
  });
  return result;
};

export const getSupraFilesProtocol = async ({
  nodeAddress,
  token,
  files,
}: GetSupraFilesProtocolInput) => {
  const results = await Promise.all(
    files.map(async (file) => {
      const result = await getSupraFileProtocolApi(nodeAddress, token, {
        file,
      });
      return generateFilePreview(file, result);
    }),
  );

  return results;
};
