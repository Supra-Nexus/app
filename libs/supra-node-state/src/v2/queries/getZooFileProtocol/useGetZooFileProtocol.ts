import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import { FunctionKeyV2 } from '../../constants';
import {
  type GetSupraFileProtocolInput,
  type GetSupraFileProtocolOutput,
} from './types';
import { getSupraFileProtocol } from './index';

export type UseGetSupraFileProtocol = [
  FunctionKeyV2.GET_SUPRA_FILE_PROTOCOL,
  GetSupraFileProtocolInput,
];
type Options = QueryObserverOptions<
  GetSupraFileProtocolOutput,
  Error,
  GetSupraFileProtocolOutput,
  GetSupraFileProtocolOutput,
  UseGetSupraFileProtocol
>;

export const useGetSupraFileProtocol = (
  input: GetSupraFileProtocolInput,
  options?: Omit<Options, 'queryKey' | 'queryFn'>,
) => {
  const response = useQuery({
    queryKey: [FunctionKeyV2.GET_SUPRA_FILE_PROTOCOL, input],
    queryFn: () => getSupraFileProtocol(input),
    ...options,
  });
  return response;
};
