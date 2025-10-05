import { t } from '@supraai/supra-i18n';
import { cn } from '@supraai/supra-ui/utils';
import React from 'react';
import { type ExternalToast, toast } from 'sonner';

import { openSupraNodeManagerWindow } from './supra-node-manager-windows-utils';

export const modelNameMap: Record<string, string> = {
  'snowflake-arctic-embed:xs': "Snowflake's Arctic-embed-xs",
  'llama3.1:8b-instruct-q4_1': 'Llama 3.1 8B',
  'gemma2:2b-instruct-q4_1': 'Gemma 2 2B',
  'command-r7b:7b-12-2024-q4_K_M': 'Command R 7B',
  'mistral-small3.2:24b-instruct-2506-q4_K_M': 'Mistral Small 3.2',
};

const SupraNodeLogsLabel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('cursor-pointer text-white', className)}
      onClick={async () => {
        await openSupraNodeManagerWindow();
      }}
      {...props}
    >
      logs
    </span>
  );
};

export const SUPRA_NODE_MANAGER_TOAST_ID = 'supra-node-manager-toast-id';
const defaultToastOptions: ExternalToast = {
  id: SUPRA_NODE_MANAGER_TOAST_ID,
  position: 'top-right',
};

export const startingSupraNodeToast = () => {
  return toast.loading(t('supraNode.notifications.startingNode'), {
    ...defaultToastOptions,
  });
};
export const supraNodeStartedToast = () => {
  return toast.success(t('supraNode.notifications.runningNode'), {
    ...defaultToastOptions,
  });
};
export const supraNodeStartErrorToast = () => {
  toast.error(
    <div>
      Error starting your local Supra Node, see <SupraNodeLogsLabel /> for
      more information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};

export const startingOllamaToast = () => {
  return toast.loading(t('supraNode.notifications.startingOllama'), {
    ...defaultToastOptions,
  });
};
export const ollamaStartedToast = () => {
  return toast.success(t('supraNode.notifications.runningOllama'), {
    ...defaultToastOptions,
  });
};
export const ollamaStartErrorToast = () => {
  toast.error(
    <div>
      Error starting your local Ollama, see <SupraNodeLogsLabel /> for more
      information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};

export const stoppingSupraNodeToast = () => {
  return toast.loading(t('supraNode.notifications.stopNode'), {
    ...defaultToastOptions,
  });
};
export const supraNodeStopErrorToast = () => {
  toast.error(
    <div>
      Error stopping your local Supra Node, see <SupraNodeLogsLabel /> for
      more information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};
export const supraNodeStoppedToast = () => {
  return toast.success(t('supraNode.notifications.stoppedNode'), {
    ...defaultToastOptions,
  });
};

export const stoppingOllamaToast = () => {
  return toast.loading(t('supraNode.notifications.stopOllama'), {
    ...defaultToastOptions,
  });
};
export const ollamaStopErrorToast = () => {
  toast.error(
    <div>
      Error stopping your local Ollama, see <SupraNodeLogsLabel /> for more
      information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};
export const ollamaStoppedToast = () => {
  return toast.success(t('supraNode.notifications.stoppedOllama'), {
    ...defaultToastOptions,
  });
};

export const successRemovingSupraNodeStorageToast = () => {
  return toast.success(t('supraNode.notifications.removedNote'), {
    ...defaultToastOptions,
  });
};

export const errorRemovingSupraNodeStorageToast = () => {
  return toast.error(
    <div>
      Error removing your local Supra Node storage, see{' '}
      <SupraNodeLogsLabel /> for more information
    </div>,
    { ...defaultToastOptions },
  );
};

export const successSupraNodeSetDefaultOptionsToast = () => {
  return toast.success(t('supraNode.notifications.optionsRestored'), {
    ...defaultToastOptions,
  });
};

export const successOllamaModelsSyncToast = () => {
  return toast.success(t('supraNode.notifications.syncedOllama'), {
    ...defaultToastOptions,
  });
};

export const errorOllamaModelsSyncToast = () => {
  return toast.error(t('supraNode.notifications.errorSyncOllama'), {
    ...defaultToastOptions,
  });
};

export const pullingModelStartToast = (model: string) => {
  return toast.loading(
    t('supraNode.notifications.startingDownload', { modelName: model }),
    {
      ...defaultToastOptions,
    },
  );
};
export const pullingModelProgressToast = (model: string, progress: number) => {
  return toast.loading(
    t('supraNode.notifications.downloadingModel', {
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
    t('supraNode.notifications.downloadedModel', {
      modelName: modelNameMap[model],
    }),
    { duration: 3000 },
  );
};

export const pullingModelErrorToast = (model: string) => {
  return toast.error(
    <div>
      Error downloading AI model {model}, see <SupraNodeLogsLabel /> for more
      information
    </div>,
    {
      ...defaultToastOptions,
    },
  );
};
