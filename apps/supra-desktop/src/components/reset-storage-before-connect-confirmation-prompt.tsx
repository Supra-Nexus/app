import { type AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { useTranslation } from '@supraai/supra-i18n';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertTitle,
  Button,
} from '@supraai/supra-ui';

import {
  useSupraNodeKillMutation,
  useSupraNodeRemoveStorageMutation,
  useSupraNodeSpawnMutation,
} from '../lib/supra-node-manager/supra-node-manager-client';
import { useSupraNodeManager } from '../store/supra-node-manager';

export const ResetStorageBeforeConnectConfirmationPrompt = ({
  onCancel,
  onReset,
  ...props
}: {
  onCancel?: () => void;
  onRestore?: () => void;
  onReset?: () => void;
} & AlertDialogProps) => {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const { setSupraNodeOptions } = useSupraNodeManager();
  const { mutateAsync: supraNodeKill, isPending: isSupraNodeKillPending } =
    useSupraNodeKillMutation();
  const {
    mutateAsync: supraNodeSpawn,
    isPending: isSupraNodeSpawnPending,
  } = useSupraNodeSpawnMutation();
  const {
    mutateAsync: supraNodeRemoveStorage,
    isPending: isSupraNodeRemoveStoragePending,
  } = useSupraNodeRemoveStorageMutation();

  const cancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  // const restore = async () => {
  //   navigate('/restore');
  //   if (typeof onRestore === 'function') {
  //     onRestore();
  //   }
  // };

  const isResetLoading =
    isSupraNodeKillPending ||
    isSupraNodeRemoveStoragePending ||
    isSupraNodeSpawnPending;

  const reset = async (preserveKeys: boolean) => {
    await supraNodeKill();
    await supraNodeRemoveStorage({ preserveKeys });
    setSupraNodeOptions(null);
    await supraNodeSpawn();
    if (typeof onReset === 'function') {
      onReset();
    }
  };

  return (
    <AlertDialog {...props}>
      <AlertDialogContent className="w-[100%]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('supraNode.resetNodeWarning.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col space-y-3 text-left text-white/70">
              <div className="flex flex-col space-y-3">
                <span className="text-sm">
                  {t('supraNode.resetNodeWarning.description')}
                </span>
                <div className="flex flex-col space-y-1" />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex items-center justify-end gap-2.5">
          {/*<Button className="mt-0 flex-1 text-sm" onClick={() => restore()}>*/}
          {/*  <span aria-label="restore" className="emoji" role="img">*/}
          {/*    🔑 {t('common.restore')}*/}
          {/*  </span>*/}
          {/*</Button>*/}

          {/*<Button*/}
          {/*  className="mt-0 flex-1 text-sm"*/}
          {/*  onClick={() => reset(false)}*/}
          {/*>*/}
          {/*  <span aria-label="reset all" className="emoji" role="img">*/}
          {/*    💣 {t('common.resetAll')}*/}
          {/*  </span>*/}
          {/*</Button>*/}
          <Button
            className="min-w-32 text-sm"
            disabled={isResetLoading}
            onClick={() => cancel()}
            size="sm"
            variant={'outline'}
          >
            {t('common.cancel')}
          </Button>
          <Button
            className="min-w-32 text-sm"
            disabled={isResetLoading}
            isLoading={isResetLoading}
            onClick={() => reset(false)}
            size="sm"
            variant={'destructive'}
          >
            <span>{t('common.resetData')}</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
