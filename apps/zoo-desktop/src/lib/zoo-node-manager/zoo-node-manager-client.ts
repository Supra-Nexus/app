import { setPreferences } from '@zooai/zoo-message-ts/api/general/index';
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

import { type ZooNodeOptions } from './zoo-node-manager-client-types';

// Client

export const zooNodeQueryClient = new QueryClient();

// Queries
export const useZooNodeIsRunningQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<boolean, Error> => {
  const query = useQuery({
    queryKey: ['zoo_node_is_running'],
    queryFn: (): Promise<boolean> => invoke('zoo_node_is_running'),
    ...options,
  });
  return { ...query } as UseQueryResult<boolean, Error>;
};
export const useZooNodeGetOptionsQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<ZooNodeOptions, Error> => {
  const query = useQuery({
    queryKey: ['zoo_node_get_options'],
    queryFn: (): Promise<ZooNodeOptions> =>
      invoke('zoo_node_get_options'),
    ...options,
  });
  return { ...query } as UseQueryResult<ZooNodeOptions, Error>;
};
export const useZooNodeGetOllamaApiUrlQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<string, Error> => {
  const query = useQuery({
    queryKey: ['zoo_node_get_ollama_api_url'],
    queryFn: (): Promise<string> => invoke('zoo_node_get_ollama_api_url'),
    ...options,
  });
  return { ...query } as UseQueryResult<string, Error>;
};
export const useZooNodeGetDefaultModel = (
  options?: QueryObserverOptions,
): UseQueryResult<string, Error> => {
  const query = useQuery({
    queryKey: ['zoo_node_get_default_model'],
    queryFn: (): Promise<string> => invoke('zoo_node_get_default_model'),
    ...options,
  });
  return { ...query } as UseQueryResult<string, Error>;
};
export const useZooNodeGetOllamaVersionQuery = (
  options?: Omit<QueryObserverOptions, 'queryKey'>,
): UseQueryResult<string, Error> => {
  const query = useQuery({
    queryKey: ['zoo_node_get_ollama_version'],
    queryFn: (): Promise<string> => invoke('zoo_node_get_ollama_version'),
    ...options,
  });
  return { ...query } as UseQueryResult<string, Error>;
};

// Mutations
export const useZooNodeSpawnMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: () => {
      return invoke('zoo_node_spawn');
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['zoo_node_is_running'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useZooNodeKillMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async (): Promise<void> => {
      return invoke('zoo_node_kill');
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['zoo_node_is_running'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export type ZooNodeRemoveStorageOptions = {
  preserveKeys: boolean;
};
export const useZooNodeRemoveStorageMutation = (
  options?: UseMutationOptions<
    void,
    Error,
    Partial<ZooNodeRemoveStorageOptions>
  >,
) => {
  const response = useMutation({
    mutationFn: async (
      options: Partial<ZooNodeRemoveStorageOptions>,
    ): Promise<void> => {
      await invoke('zoo_node_set_default_options');
      return invoke('zoo_node_remove_storage', {
        preserveKeys: options?.preserveKeys,
      });
    },
    ...options,
  });
  return { ...response };
};

export const useZooNodeSetOptionsMutation = (
  options?: UseMutationOptions<
    Partial<ZooNodeOptions>,
    Error,
    ZooNodeOptions
  >,
) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (
      zooNodeOptions: Partial<ZooNodeOptions>,
    ): Promise<ZooNodeOptions> => {
      return invoke('zoo_node_set_options', {
        options: zooNodeOptions,
      });
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['zoo_node_get_options'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useZooNodeSetDefaultOptionsMutation = (
  options?: UseMutationOptions<ZooNodeOptions, Error, void>,
) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (): Promise<ZooNodeOptions> => {
      return invoke('zoo_node_set_default_options', {});
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['zoo_node_set_default_options'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useZooNodeRespawnMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async () => {
      await invoke('zoo_node_kill');
      await relaunch();
    },
    ...options,
    onSuccess: (...onSuccessParameters) => {
      void queryClient.invalidateQueries({
        queryKey: ['zoo_node_is_running'],
      });
      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParameters);
      }
    },
  });
  return { ...response };
};

export const useZooNodeSetDefaultLlmProviderMutation = (
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

export const zooNodeSetDefaultLlmProvider = async (
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
