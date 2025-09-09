import { t } from '@zooai/zoo-i18n';
import { cn } from '@zooai/zoo-ui/utils';
import React from 'react';
import { type ExternalToast, toast } from 'sonner';

import { openZooNodeManagerWindow } from './zoo-node-manager-windows-utils';

export const modelNameMap: Record<string, string> = {
  'snowflake-arctic-embed:xs': "Snowflake's Arctic-embed-xs",
  'llama3.1:8b-instruct-q4_1': 'Llama 3.1 8B',
  'gemma2:2b-instruct-q4_1': 'Gemma 2 2B',
  'command-r7b:7b-12-2024-q4_K_M': 'Command R 7B',
  'mistral-small3.2:24b-instruct-2506-q4_K_M': 'Mistral Small 3.2',
};

const ZooNodeLogsLabel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('cursor-pointer text-white', className)}
      onClick={async () => {
        await openZooNodeManagerWindow();
      }}
      {...props}
    >
      logs
    </span>
  );
};

export const ZOO_NODE_MANAGER_TOAST_ID = 'zoo-node-manager-toast-id';
const defaultToastOptions: ExternalToast = {
  id: ZOO_NODE_MANAGER_TOAST_ID,
  position: 'top-right',
};

export const startingZooNodeToast = () => {
  return toast.loading(t('zooNode.notifications.startingNode'), {
    ...defaultToastOptions,
  });
};
export const zooNodeStartedToast = () => {
  return toast.success(t('zooNode.notifications.runningNode'), {
    ...defaultToastOptions,
  });
};
export const zooNodeStartErrorToast = () => {
  toast.error(
    <div>
      Error starting your local Zoo Node, see <ZooNodeLogsLabel /> for
      more information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};

export const startingOllamaToast = () => {
  return toast.loading(t('zooNode.notifications.startingOllama'), {
    ...defaultToastOptions,
  });
};
export const ollamaStartedToast = () => {
  return toast.success(t('zooNode.notifications.runningOllama'), {
    ...defaultToastOptions,
  });
};
export const ollamaStartErrorToast = () => {
  toast.error(
    <div>
      Error starting your local Ollama, see <ZooNodeLogsLabel /> for more
      information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};

export const stoppingZooNodeToast = () => {
  return toast.loading(t('zooNode.notifications.stopNode'), {
    ...defaultToastOptions,
  });
};
export const zooNodeStopErrorToast = () => {
  toast.error(
    <div>
      Error stopping your local Zoo Node, see <ZooNodeLogsLabel /> for
      more information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};
export const zooNodeStoppedToast = () => {
  return toast.success(t('zooNode.notifications.stoppedNode'), {
    ...defaultToastOptions,
  });
};

export const stoppingOllamaToast = () => {
  return toast.loading(t('zooNode.notifications.stopOllama'), {
    ...defaultToastOptions,
  });
};
export const ollamaStopErrorToast = () => {
  toast.error(
    <div>
      Error stopping your local Ollama, see <ZooNodeLogsLabel /> for more
      information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};
export const ollamaStoppedToast = () => {
  return toast.success(t('zooNode.notifications.stoppedOllama'), {
    ...defaultToastOptions,
  });
};

export const successRemovingZooNodeStorageToast = () => {
  return toast.success(t('zooNode.notifications.removedNote'), {
    ...defaultToastOptions,
  });
};

export const errorRemovingZooNodeStorageToast = () => {
  return toast.error(
    <div>
      Error removing your local Zoo Node storage, see{' '}
      <ZooNodeLogsLabel /> for more information
    </div>,
    { ...defaultToastOptions },
  );
};

export const successZooNodeSetDefaultOptionsToast = () => {
  return toast.success(t('zooNode.notifications.optionsRestored'), {
    ...defaultToastOptions,
  });
};

export const successOllamaModelsSyncToast = () => {
  return toast.success(t('zooNode.notifications.syncedOllama'), {
    ...defaultToastOptions,
  });
};

export const errorOllamaModelsSyncToast = () => {
  return toast.error(t('zooNode.notifications.errorSyncOllama'), {
    ...defaultToastOptions,
  });
};

export const pullingModelStartToast = (model: string) => {
  return toast.loading(
    t('zooNode.notifications.startingDownload', { modelName: model }),
    {
      ...defaultToastOptions,
    },
  );
};
export const pullingModelProgressToast = (model: string, progress: number) => {
  return toast.loading(
    t('zooNode.notifications.downloadingModel', {
      modelName: model,
      progress,
    }),
    {
      ...defaultToastOptions,
    },
  );
};
export const pullingModelDoneToast = (model: string) => {
  return toast.success(
    t('zooNode.notifications.downloadedModel', {
      modelName: modelNameMap[model],
    }),
    { duration: 3000 },
  );
};

export const pullingModelErrorToast = (model: string) => {
  return toast.error(
    <div>
      Error downloading AI model {model}, see <ZooNodeLogsLabel /> for more
      information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};
