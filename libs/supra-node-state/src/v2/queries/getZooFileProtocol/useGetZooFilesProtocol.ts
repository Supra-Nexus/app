import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import { FunctionKeyV2 } from '../../constants';
import {
  type GetSupraFilesProtocolInput,
  type GetSupraFilesProtocolOutput,
} from './types';
import { getSupraFilesProtocol } from './index';

export type UseGetSupraFilesProtocol = [
  FunctionKeyV2.GET_SUPRA_FILE_PROTOCOLS,
  GetSupraFilesProtocolInput,
];
type Options = QueryObserverOptions<
  GetSupraFilesProtocolOutput,
  Error,
  GetSupraFilesProtocolOutput,
  GetSupraFilesProtocolOutput,
  UseGetSupraFilesProtocol
>;

export const useGetSupraFilesProtocol = (
  input: GetSupraFilesProtocolInput,
  options?: Omit<Options, 'queryKey' | 'queryFn'>,
) => {
  const response = useQuery({
    queryKey: [FunctionKeyV2.GET_SUPRA_FILE_PROTOCOLS, input],
    queryFn: () => getSupraFilesProtocol(input),
    ...options,
  });
  return response;
};
