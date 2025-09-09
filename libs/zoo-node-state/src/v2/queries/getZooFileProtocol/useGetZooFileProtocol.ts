import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import { FunctionKeyV2 } from '../../constants';
import {
  type GetZooFileProtocolInput,
  type GetZooFileProtocolOutput,
} from './types';
import { getZooFileProtocol } from './index';

export type UseGetZooFileProtocol = [
  FunctionKeyV2.GET_ZOO_FILE_PROTOCOL,
  GetZooFileProtocolInput,
];
type Options = QueryObserverOptions<
  GetZooFileProtocolOutput,
  Error,
  GetZooFileProtocolOutput,
  GetZooFileProtocolOutput,
  UseGetZooFileProtocol
>;

export const useGetZooFileProtocol = (
  input: GetZooFileProtocolInput,
  options?: Omit<Options, 'queryKey' | 'queryFn'>,
) => {
  const response = useQuery({
    queryKey: [FunctionKeyV2.GET_ZOO_FILE_PROTOCOL, input],
    queryFn: () => getZooFileProtocol(input),
    ...options,
  });
  return response;
};
