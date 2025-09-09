import { useQuery } from '@tanstack/react-query';

import { FunctionKeyV2 } from '../../constants';
import { type GetZooFreeModelQuotaInput, type Options } from './types';
import { getZooFreeModelQuota } from '.';

export const useGetZooFreeModelQuota = (
  input: GetZooFreeModelQuotaInput,
  options?: Omit<Options, 'queryKey' | 'queryFn'>,
) => {
  const response = useQuery({
    queryKey: [FunctionKeyV2.GET_ZOO_FREE_MODEL_QUOTA, input] as const,
    queryFn: async () => await getZooFreeModelQuota(input),
    ...options,
  });
  return response;
};
