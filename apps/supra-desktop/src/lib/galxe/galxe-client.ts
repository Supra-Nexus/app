import {
  type QueryObserverOptions,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import { getName } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/core';
import axios, { type AxiosError } from 'axios';

// Queries
export const useGalxeGenerateProofQuery = (
  nodeSignature: string,
  payload: string,
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<[string, string], Error> => {
  const query = useQuery({
    ...options,
    queryKey: ['galxe_generate_proof'],
    queryFn: async (): Promise<[string, string]> => {
      return invoke('galxe_generate_proof', {
        nodeSignature,
        payload,
      });
    },
  });
  return { ...query } as UseQueryResult<[string, string], Error>;
};

// Mutations
export const useGalxeRegisterSupraDesktopInstallationMutation = (
  options?: UseMutationOptions<
    void,
    AxiosError<{ message: string; error: string }>,
    { address: string; signature: string; combined: string }
  >,
) => {
  return useMutation({
    mutationFn: async ({ address, signature, combined }): Promise<void> => {
      const appName = await getName();
      const baseUrl =
        appName === 'Supra Desktop'
          ? 'https://backend-hosting.supra.ngo'
          : 'https://dev-backend-hosting.supra.ngo';
      await axios.post(`${baseUrl}/galxe/supra-desktop-installation`, {
        address,
        signature,
        combined,
      });
    },
    ...options,
  });
};
