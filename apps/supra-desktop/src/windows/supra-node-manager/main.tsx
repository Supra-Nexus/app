import './globals.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSyncOllamaModels } from '@supraai/supra-node-state/v2/mutations/syncOllamaModels/useSyncOllamaModels';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  FormField,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextField,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@supraai/supra-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { info } from '@tauri-apps/plugin-log';
import {
  Bot,
  ListRestart,
  Loader2,
  PlayCircle,
  StopCircle,
  Trash,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { supraLogoDataUrl } from '@supraai/logo';
import { OllamaModels } from '../../components/supra-node-manager/ollama-models';
import { ALLOWED_OLLAMA_MODELS } from '../../lib/supra-node-manager/ollama-models';
import {
  supraNodeQueryClient,
  useSupraNodeGetOptionsQuery,
  useSupraNodeIsRunningQuery,
  useSupraNodeKillMutation,
  useSupraNodeRemoveStorageMutation,
  useSupraNodeSetDefaultOptionsMutation,
  useSupraNodeSetOptionsMutation,
  useSupraNodeSpawnMutation,
} from '../../lib/supra-node-manager/supra-node-manager-client';
import { type SupraNodeOptions } from '../../lib/supra-node-manager/supra-node-manager-client-types';
import { useSupraNodeEventsToast } from '../../lib/supra-node-manager/supra-node-manager-hooks';
import {
  errorOllamaModelsSyncToast,
  errorRemovingSupraNodeStorageToast,
  supraNodeStartedToast,
  supraNodeStartErrorToast,
  supraNodeStopErrorToast,
  supraNodeStoppedToast,
  startingSupraNodeToast,
  stoppingSupraNodeToast,
  successOllamaModelsSyncToast,
  successRemovingSupraNodeStorageToast,
  successSupraNodeSetDefaultOptionsToast,
} from '../../lib/supra-node-manager/supra-node-manager-toasts-utils';
import { useAuth } from '../../store/auth';
import { useSupraNodeManager } from '../../store/supra-node-manager';
import { useSyncStorageSecondary } from '../../store/sync-utils';
import { Logs } from './components/logs';

const App = () => {
  useEffect(() => {
    void info('initializing supra-node-manager');
  }, []);
  useSyncStorageSecondary();
  const auth = useAuth((auth) => auth.auth);
  const setLogout = useAuth((auth) => auth.setLogout);
  const { setSupraNodeOptions } = useSupraNodeManager();
  const [isConfirmResetDialogOpened, setIsConfirmResetDialogOpened] =
    useState<boolean>(false);
  const { data: supraNodeIsRunning } = useSupraNodeIsRunningQuery({
    refetchInterval: 1000,
  });
  const { data: supraNodeOptions } = useSupraNodeGetOptionsQuery({
    refetchInterval: 1000,
  });

  const {
    isPending: supraNodeSpawnIsPending,
    mutateAsync: supraNodeSpawn,
  } = useSupraNodeSpawnMutation({
    onMutate: () => {
      startingSupraNodeToast();
    },
    onSuccess: () => {
      supraNodeStartedToast();
    },
    onError: () => {
      supraNodeStartErrorToast();
    },
  });
  const { isPending: supraNodeKillIsPending, mutateAsync: supraNodeKill } =
    useSupraNodeKillMutation({
      onMutate: () => {
        stoppingSupraNodeToast();
      },
      onSuccess: () => {
        supraNodeStoppedToast();
      },
      onError: () => {
        supraNodeStopErrorToast();
      },
    });
  const {
    isPending: supraNodeRemoveStorageIsPending,
    mutateAsync: supraNodeRemoveStorage,
  } = useSupraNodeRemoveStorageMutation({
    onSuccess: async () => {
      successRemovingSupraNodeStorageToast();
      setSupraNodeOptions(null);
      setLogout();
    },
    onError: () => {
      errorRemovingSupraNodeStorageToast();
    },
  });
  const { mutateAsync: supraNodeSetOptions } =
    useSupraNodeSetOptionsMutation({
      onSuccess: (options) => {
        setSupraNodeOptions(options);
      },
    });
  const { mutateAsync: supraNodeSetDefaultOptions } =
    useSupraNodeSetDefaultOptionsMutation({
      onSuccess: (options) => {
        supraNodeOptionsForm.reset(options);
        successSupraNodeSetDefaultOptionsToast();
      },
    });
  const supraNodeOptionsForm = useForm<Partial<SupraNodeOptions>>({
    resolver: zodResolver(z.any()),
  });
  const supraNodeOptionsFormWatch = useWatch({
    control: supraNodeOptionsForm.control,
  });
  const {
    mutateAsync: syncOllamaModels,
    isPending: syncOllamaModelsIsPending,
  } = useSyncOllamaModels({
    onSuccess: () => {
      successOllamaModelsSyncToast();
    },
    onError: () => {
      errorOllamaModelsSyncToast();
    },
  });

  useSupraNodeEventsToast();

  useEffect(() => {
    const options = {
      ...supraNodeOptions,
      ...supraNodeOptionsFormWatch,
    };
    void supraNodeSetOptions(options as SupraNodeOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supraNodeOptionsFormWatch, supraNodeSetOptions]);

  const handleReset = (): void => {
    setIsConfirmResetDialogOpened(false);
    void supraNodeRemoveStorage({ preserveKeys: false });
  };

  const startSyncOllamaModels = async () => {
    await syncOllamaModels({
      nodeAddress: auth?.node_address ?? '',
      token: auth?.api_v2_key ?? '',
      allowedModels: ALLOWED_OLLAMA_MODELS,
    });
  };

  const [supraNodeOptionsForUI, setSupraNodeOptionsForUI] =
    useState<Partial<SupraNodeOptions>>();

  useEffect(() => {
    const filteredSupraNodeOptionsKeys: (keyof SupraNodeOptions)[] = [
      'secret_desktop_installation_proof_key',
    ];
    setSupraNodeOptionsForUI(
      Object.fromEntries(
        Object.entries(supraNodeOptions ?? {}).filter(
          ([key]) =>
            !filteredSupraNodeOptionsKeys.includes(
              key as keyof SupraNodeOptions,
            ),
        ),
      ) as Partial<SupraNodeOptions>,
    );
  }, [supraNodeOptions]);

  return (
    <div className="flex h-screen w-full flex-col space-y-2">
      <div
        className="absolute top-0 z-50 h-6 w-full"
        data-tauri-drag-region={true}
      />
      <div className="flex flex-row items-center p-4">
        <img alt="supra logo" className="h-10 w-10" src={supraLogoDataUrl} />
        <div className="ml-4 flex flex-col">
          <span className="text-lg">Local Supra Node</span>
          <span className="text-text-secondary text-sm">{`API URL: http://${supraNodeOptions?.node_api_ip}:${supraNodeOptions?.node_api_port}`}</span>
        </div>
        <div className="flex grow flex-row items-center justify-end space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={
                    supraNodeSpawnIsPending ||
                    supraNodeKillIsPending ||
                    supraNodeIsRunning
                  }
                  onClick={() => {
                    console.log('spawning');
                    void supraNodeSpawn();
                  }}
                  variant={'default'}
                >
                  {supraNodeSpawnIsPending || supraNodeKillIsPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <PlayCircle className="" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Start Supra Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={
                    supraNodeSpawnIsPending ||
                    supraNodeKillIsPending ||
                    !supraNodeIsRunning
                  }
                  onClick={() => supraNodeKill()}
                  variant={'default'}
                >
                  {supraNodeKillIsPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <StopCircle className="" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Stop Supra Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={supraNodeIsRunning}
                  onClick={() => setIsConfirmResetDialogOpened(true)}
                  variant={'default'}
                >
                  {supraNodeRemoveStorageIsPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash className="" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Reset Supra Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={!supraNodeIsRunning}
                  onClick={() => startSyncOllamaModels()}
                  variant={'default'}
                >
                  {syncOllamaModelsIsPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Bot className="" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Sync Ollama Models</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs
        className="mt-4 flex h-full w-full flex-col overflow-hidden p-4"
        defaultValue="app-logs"
      >
        <TabsList className="w-full">
          <TabsTrigger className="grow" value="app-logs">
            App Logs
          </TabsTrigger>
          <TabsTrigger className="grow" value="options">
            Options
          </TabsTrigger>
          <TabsTrigger className="grow" value="models">
            Models
          </TabsTrigger>
        </TabsList>
        <TabsContent className="h-full overflow-hidden" value="app-logs">
          <Logs />
        </TabsContent>
        <TabsContent className="h-full overflow-hidden" value="options">
          <ScrollArea className="flex h-full flex-1 flex-col overflow-auto [&>div>div]:!block">
            <div className="flex flex-row justify-end pr-4">
              <Button
                className=""
                disabled={supraNodeIsRunning}
                onClick={() => supraNodeSetDefaultOptions()}
                variant={'default'}
              >
                <ListRestart className="mr-2" />
                Restore default
              </Button>
            </div>
            <div className="mt-2 h-full [&>div>div]:!block">
              <Form {...supraNodeOptionsForm}>
                <form className="space-y-2 pr-4">
                  {supraNodeOptionsForUI &&
                    Object.entries(supraNodeOptionsForUI).map(
                      ([key, value]) => {
                        return (
                          <FormField
                            control={supraNodeOptionsForm.control}
                            defaultValue={value}
                            disabled={supraNodeIsRunning}
                            key={key}
                            name={key as keyof SupraNodeOptions}
                            render={({ field }) => (
                              <TextField
                                field={field}
                                label={<span className="uppercase">{key}</span>}
                              />
                            )}
                          />
                        );
                      },
                    )}
                </form>
              </Form>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent className="h-full overflow-hidden pb-2" value="models">
          <OllamaModels />
        </TabsContent>
      </Tabs>
      <AlertDialog
        onOpenChange={setIsConfirmResetDialogOpened}
        open={isConfirmResetDialogOpened}
      >
        <AlertDialogContent className="w-[75%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset your Supra Node</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col space-y-3 text-left text-white/70">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">
                    Are you sure you want to reset your Supra Node? This will
                    permanently delete all your data.
                  </span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 flex justify-end gap-1">
            <AlertDialogCancel
              className="mt-0 min-w-[120px]"
              onClick={() => {
                setIsConfirmResetDialogOpened(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="min-w-[120px]"
              onClick={() => handleReset()}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <QueryClientProvider client={supraNodeQueryClient}>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </QueryClientProvider>,
);
