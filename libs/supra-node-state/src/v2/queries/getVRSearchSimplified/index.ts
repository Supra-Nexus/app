import { searchVectorFs } from '@supraai/supra-message-ts/api/vector-fs/index';

import {
  type GetVRSearchSimplifiedInput,
  type GetVRSearchSimplifiedOutput,
} from './types';

export const getVRSearchSimplified = async ({
  nodeAddress,
  token,
  path,
  search,
}: GetVRSearchSimplifiedInput): Promise<GetVRSearchSimplifiedOutput> => {
  const response = await searchVectorFs(nodeAddress, token, {
    path,
    search,
  });

  return response.data;
};
