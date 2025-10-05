import { setPreferences } from '@supraai/supra-message-ts/api/general/index';
import {
  QueryClient,
  type QueryObserverOptions,
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { relaunch } from '@tauri-apps/plugin-process';

import { type SupraNodeOptions } from './supra-node-manager-client-types';

// Client

export const supraNodeQueryClient = new QueryClient();

// Queries
export const useSupraNodeIsRunningQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<boolean, Error> => {
  const query = useQuery({
    queryKey: ['supra_node_is_running'],
    queryFn: (): Promise<boolean> => invoke('supra_node_is_running'),
    ...options,
  });
  return { ...query } as UseQueryResult<boolean, Error>;
};
export const useSupraNodeGetOptionsQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<SupraNodeOptions, Error> => {
  const query = useQuery({
    queryKey: ['supra_node_get_options'],
    queryFn: (): Promise<SupraNodeOptions> =>
      invoke('supra_node_get_options'),
    ...options,
  });
  return { ...query } as UseQueryResult<SupraNodeOptions, Error>;
};
export const useSupraNodeGetOllamaApiUrlQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<string, Error> => {
  const query = useQuery({
    queryKey: ['supra_node_get_ollama_api_url'],
    queryFn: (): Promise<string> => invoke('supra_node_get_ollama_api_url'),
    ...options,
  });
  return { ...query } as UseQueryResult<string, Error>;
};
export const useSupraNodeGetDefaultModel = (
  options?: QueryObserverOptions,
): UseQueryResult<string, Error> => {
  const query = useQuery({
    queryKey: ['supra_node_get_default_model'],
    queryFn: (): Promise<string> => invoke('supra_node_get_default_model'),
    ...options,
  });
  return { ...query } as UseQueryResult<string, Error>;
};
export const useSupraNodeGetOllamaVersionQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<string, Error> => {
  const query = useQuery({
    queryKey: ['supra_node_get_ollama_version'],
    queryFn: (): Promise<string> => invoke('supra_node_get_ollama_version'),
    ...options,
  });
  return { ...query } as UseQueryResult<string, Error>;
};

// Mutations
export const useSupraNodeSpawnMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: () => {
      return invoke('supra_node_spawn');
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['supra_node_is_running'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useSupraNodeKillMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async (): Promise<void> => {
      return invoke('supra_node_kill');
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['supra_node_is_running'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export type SupraNodeRemoveStorageOptions = {
  preserveKeys: boolean;
};
export const useSupraNodeRemoveStorageMutation = (
  options?: UseMutationOptions<
    void,
    Error,
    Partial<SupraNodeRemoveStorageOptions>
  >,
) => {
  const response = useMutation({
    mutationFn: async (
      options: Partial<SupraNodeRemoveStorageOptions>,
    ): Promise<void> => {
      await invoke('supra_node_set_default_options');
      return invoke('supra_node_remove_storage', {
        preserveKeys: options?.preserveKeys,
      });
    },
    ...options,
  });
  return { ...response };
};

export const useSupraNodeSetOptionsMutation = (
  options?: UseMutationOptions<
    Partial<SupraNodeOptions>,
    Error,
    SupraNodeOptions
  >,
) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (
      supraNodeOptions: Partial<SupraNodeOptions>,
    ): Promise<SupraNodeOptions> => {
      return invoke('supra_node_set_options', {
        options: supraNodeOptions,
      });
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['supra_node_get_options'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useSupraNodeSetDefaultOptionsMutation = (
  options?: UseMutationOptions<SupraNodeOptions, Error, void>,
) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (): Promise<SupraNodeOptions> => {
      return invoke('supra_node_set_default_options', {});
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['supra_node_set_default_options'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useSupraNodeRespawnMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async () => {
      await invoke('supra_node_kill');
      await relaunch();
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['supra_node_is_running'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useSupraNodeSetDefaultLlmProviderMutation = (
  options?: UseMutationOptions<void, Error, string>,
) => {
  const response = useMutation({
    mutationFn: async (defaultLlmProvider: string): Promise<void> => {
      if (!defaultLlmProvider) {
        throw new Error('Default LLM provider is required');
      }
      return Promise.resolve();
    },
    ...options,
  });
  return { ...response };
};

export const supraNodeSetDefaultLlmProvider = async (
  defaultLlmProvider: string,
  nodeAddress: string,
  apiToken: string,
): Promise<void> => {
  if (!defaultLlmProvider || !nodeAddress || !apiToken) {
    throw new Error(
      'Default LLM provider, node address, and API token are required',
    );
  }

  await setPreferences(nodeAddress, apiToken, {
    default_llm_provider: defaultLlmProvider,
  });

  return Promise.resolve();
};
