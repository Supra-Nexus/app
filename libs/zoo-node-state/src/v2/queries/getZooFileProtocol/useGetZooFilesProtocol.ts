import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import { FunctionKeyV2 } from '../../constants';
import {
  type GetZooFilesProtocolInput,
  type GetZooFilesProtocolOutput,
} from './types';
import { getZooFilesProtocol } from './index';

export type UseGetZooFilesProtocol = [
  FunctionKeyV2.GET_ZOO_FILE_PROTOCOLS,
  GetZooFilesProtocolInput,
];
type Options = QueryObserverOptions<
  GetZooFilesProtocolOutput,
  Error,
  GetZooFilesProtocolOutput,
  GetZooFilesProtocolOutput,
  UseGetZooFilesProtocol
>;

export const useGetZooFilesProtocol = (
  input: GetZooFilesProtocolInput,
  options?: Omit<Options, 'queryKey' | 'queryFn'>,
) => {
  const response = useQuery({
    queryKey: [FunctionKeyV2.GET_ZOO_FILE_PROTOCOLS, input],
    queryFn: () => getZooFilesProtocol(input),
    ...options,
  });
  return response;
};
