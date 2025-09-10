import './globals.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSyncOllamaModels } from '@zooai/zoo-node-state/v2/mutations/syncOllamaModels/useSyncOllamaModels';
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
} from '@zooai/zoo-ui';
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

import logo from '../../../src-tauri/icons/128x128@2x.png';
import { OllamaModels } from '../../components/zoo-node-manager/ollama-models';
import { ALLOWED_OLLAMA_MODELS } from '../../lib/zoo-node-manager/ollama-models';
import {
  zooNodeQueryClient,
  useZooNodeGetOptionsQuery,
  useZooNodeIsRunningQuery,
  useZooNodeKillMutation,
  useZooNodeRemoveStorageMutation,
  useZooNodeSetDefaultOptionsMutation,
  useZooNodeSetOptionsMutation,
  useZooNodeSpawnMutation,
} from '../../lib/zoo-node-manager/zoo-node-manager-client';
import { type ZooNodeOptions } from '../../lib/zoo-node-manager/zoo-node-manager-client-types';
import { useZooNodeEventsToast } from '../../lib/zoo-node-manager/zoo-node-manager-hooks';
import {
  errorOllamaModelsSyncToast,
  errorRemovingZooNodeStorageToast,
  zooNodeStartedToast,
  zooNodeStartErrorToast,
  zooNodeStopErrorToast,
  zooNodeStoppedToast,
  startingZooNodeToast,
  stoppingZooNodeToast,
  successOllamaModelsSyncToast,
  successRemovingZooNodeStorageToast,
  successZooNodeSetDefaultOptionsToast,
} from '../../lib/zoo-node-manager/zoo-node-manager-toasts-utils';
import { useAuth } from '../../store/auth';
import { useZooNodeManager } from '../../store/zoo-node-manager';
import { useSyncStorageSecondary } from '../../store/sync-utils';
import { Logs } from './components/logs';

const App = () => {
  useEffect(() => {
    void info('initializing zoo-node-manager');
  }, []);
  useSyncStorageSecondary();
  const auth = useAuth((auth) => auth.auth);
  const setLogout = useAuth((auth) => auth.setLogout);
  const { setZooNodeOptions } = useZooNodeManager();
  const [isConfirmResetDialogOpened, setIsConfirmResetDialogOpened] =
    useState<boolean>(false);
  const { data: zooNodeIsRunning } = useZooNodeIsRunningQuery({
    refetchInterval: 1000,
  });
  const { data: zooNodeOptions } = useZooNodeGetOptionsQuery({
    refetchInterval: 1000,
  });

  const {
    isPending: zooNodeSpawnIsPending,
    mutateAsync: zooNodeSpawn,
  } = useZooNodeSpawnMutation({
    onMutate: () => {
      startingZooNodeToast();
    },
    onSuccess: () => {
      zooNodeStartedToast();
    },
    onError: () => {
      zooNodeStartErrorToast();
    },
  });
  const { isPending: zooNodeKillIsPending, mutateAsync: zooNodeKill } =
    useZooNodeKillMutation({
      onMutate: () => {
        stoppingZooNodeToast();
      },
      onSuccess: () => {
        zooNodeStoppedToast();
      },
      onError: () => {
        zooNodeStopErrorToast();
      },
    });
  const {
    isPending: zooNodeRemoveStorageIsPending,
    mutateAsync: zooNodeRemoveStorage,
  } = useZooNodeRemoveStorageMutation({
    onSuccess: async () => {
      successRemovingZooNodeStorageToast();
      setZooNodeOptions(null);
      setLogout();
    },
    onError: () => {
      errorRemovingZooNodeStorageToast();
    },
  });
  const { mutateAsync: zooNodeSetOptions } =
    useZooNodeSetOptionsMutation({
      onSuccess: (options) => {
        setZooNodeOptions(options);
      },
    });
  const { mutateAsync: zooNodeSetDefaultOptions } =
    useZooNodeSetDefaultOptionsMutation({
      onSuccess: (options) => {
        zooNodeOptionsForm.reset(options);
        successZooNodeSetDefaultOptionsToast();
      },
    });
  const zooNodeOptionsForm = useForm<Partial<ZooNodeOptions>>({
    resolver: zodResolver(z.any()),
  });
  const zooNodeOptionsFormWatch = useWatch({
    control: zooNodeOptionsForm.control,
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

  useZooNodeEventsToast();

  useEffect(() => {
    const options = {
      ...zooNodeOptions,
      ...zooNodeOptionsFormWatch,
    };
    void zooNodeSetOptions(options as ZooNodeOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zooNodeOptionsFormWatch, zooNodeSetOptions]);

  const handleReset = (): void => {
    setIsConfirmResetDialogOpened(false);
    void zooNodeRemoveStorage({ preserveKeys: false });
  };

  const startSyncOllamaModels = async () => {
    await syncOllamaModels({
      nodeAddress: auth?.node_address ?? '',
      token: auth?.api_v2_key ?? '',
      allowedModels: ALLOWED_OLLAMA_MODELS,
    });
  };

  const [zooNodeOptionsForUI, setZooNodeOptionsForUI] =
    useState<Partial<ZooNodeOptions>>();

  useEffect(() => {
    const filteredZooNodeOptionsKeys: (keyof ZooNodeOptions)[] = [
      'secret_desktop_installation_proof_key',
    ];
    setZooNodeOptionsForUI(
      Object.fromEntries(
        Object.entries(zooNodeOptions ?? {}).filter(
          ([key]) =>
            !filteredZooNodeOptionsKeys.includes(
              key as keyof ZooNodeOptions,
            ),
        ),
      ) as Partial<ZooNodeOptions>,
    );
  }, [zooNodeOptions]);

  return (
    <div className="flex h-screen w-full flex-col space-y-2">
      <div
        className="absolute top-0 z-50 h-6 w-full"
        data-tauri-drag-region={true}
      />
      <div className="flex flex-row items-center p-4">
        <img alt="zoo logo" className="h-10 w-10" src={logo} />
        <div className="ml-4 flex flex-col">
          <span className="text-lg">Local Zoo Node</span>
          <span className="text-text-secondary text-sm">{`API URL: http://${zooNodeOptions?.node_api_ip}:${zooNodeOptions?.node_api_port}`}</span>
        </div>
        <div className="flex grow flex-row items-center justify-end space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={
                    zooNodeSpawnIsPending ||
                    zooNodeKillIsPending ||
                    zooNodeIsRunning
                  }
                  onClick={() => {
                    console.log('spawning');
                    void zooNodeSpawn();
                  }}
                  variant={'default'}
                >
                  {zooNodeSpawnIsPending || zooNodeKillIsPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <PlayCircle className="" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Start Zoo Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={
                    zooNodeSpawnIsPending ||
                    zooNodeKillIsPending ||
                    !zooNodeIsRunning
                  }
                  onClick={() => zooNodeKill()}
                  variant={'default'}
                >
                  {zooNodeKillIsPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <StopCircle className="" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Stop Zoo Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={zooNodeIsRunning}
                  onClick={() => setIsConfirmResetDialogOpened(true)}
                  variant={'default'}
                >
                  {zooNodeRemoveStorageIsPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash className="" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Reset Zoo Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled={!zooNodeIsRunning}
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
                disabled={zooNodeIsRunning}
                onClick={() => zooNodeSetDefaultOptions()}
                variant={'default'}
              >
                <ListRestart className="mr-2" />
                Restore default
              </Button>
            </div>
            <div className="mt-2 h-full [&>div>div]:!block">
              <Form {...zooNodeOptionsForm}>
                <form className="space-y-2 pr-4">
                  {zooNodeOptionsForUI &&
                    Object.entries(zooNodeOptionsForUI).map(
                      ([key, value]) => {
                        return (
                          <FormField
                            control={zooNodeOptionsForm.control}
                            defaultValue={value}
                            disabled={zooNodeIsRunning}
                            key={key}
                            name={key as keyof ZooNodeOptions}
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
            <AlertDialogTitle>Reset your Zoo Node</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col space-y-3 text-left text-white/70">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">
                    Are you sure you want to reset your Zoo Node? This will
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
  <QueryClientProvider client={zooNodeQueryClient}>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </QueryClientProvider>,
);
