import { getNgrokStatus as getNgrokStatusApi } from '@zooai/zoo-message-ts/api/ngrok';
import { type GetNgrokStatusInput } from './types';

export const getNgrokStatus = async ({
  nodeAddress,
  token,
}: GetNgrokStatusInput) => {
  return await getNgrokStatusApi(nodeAddress, token);
};
