import { useQuery } from '@tanstack/react-query';

import { FunctionKeyV2 } from '../../constants';
import { type GetSupraFreeModelQuotaInput, type Options } from './types';
import { getSupraFreeModelQuota } from '.';

export const useGetSupraFreeModelQuota = (
  input: GetSupraFreeModelQuotaInput,
  options?: Omit<Options, 'queryKey' | 'queryFn'>,
) => {
  const response = useQuery({
    queryKey: [FunctionKeyV2.GET_SUPRA_FREE_MODEL_QUOTA, input] as const,
    queryFn: async () => await getSupraFreeModelQuota(input),
    ...options,
  });
  return response;
};
