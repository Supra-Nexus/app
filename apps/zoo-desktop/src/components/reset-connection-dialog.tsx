import { useTranslation } from '@zooai/zoo-i18n';
import { useInitialRegistration } from '@zooai/zoo-node-state/v2/mutations/initialRegistration/useInitialRegistration';
import { useGetEncryptionKeys } from '@zooai/zoo-node-state/v2/queries/getEncryptionKeys/useGetEncryptionKeys';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from '@zooai/zoo-ui';
import { submitRegistrationNoCodeError } from '@zooai/zoo-ui/helpers';
import { XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  useZooNodeKillMutation,
  useZooNodeRemoveStorageMutation,
  useZooNodeSpawnMutation,
} from '../lib/zoo-node-manager/zoo-node-manager-client';
import { useAuth } from '../store/auth';
import { useZooNodeManager } from '../store/zoo-node-manager';

export const ResetConnectionDialog = ({
  isOpen,
  onOpenChange,
  allowClose = false,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  allowClose?: boolean;
}) => {
  const { t } = useTranslation();
  const { mutateAsync: zooNodeKill, isPending: isZooNodeKillPending } =
    useZooNodeKillMutation();
  const {
    mutateAsync: zooNodeSpawn,
    isPending: isZooNodeSpawnPending,
  } = useZooNodeSpawnMutation({
    onSuccess: async () => {
      if (!encryptionKeys) return;
      await submitRegistrationNoCode({
        nodeAddress: 'http://127.0.0.1:2000',
        profileEncryptionPk: encryptionKeys.profile_encryption_pk,
        profileIdentityPk: encryptionKeys.profile_identity_pk,
      });
    },
  });
  const {
    mutateAsync: zooNodeRemoveStorage,
    isPending: isZooNodeRemoveStoragePending,
  } = useZooNodeRemoveStorageMutation();
  const { setZooNodeOptions } = useZooNodeManager();
  const { encryptionKeys } = useGetEncryptionKeys();
  const setAuth = useAuth((state) => state.setAuth);
  const navigate = useNavigate();

  const isResetLoading =
    isZooNodeKillPending ||
    isZooNodeRemoveStoragePending ||
    isZooNodeSpawnPending;

  const { mutateAsync: submitRegistrationNoCode } = useInitialRegistration({
    onSuccess: (response, setupPayload) => {
      if (response.status !== 'success') {
        void zooNodeKill();
      }
      if (response.status === 'success' && encryptionKeys) {
        setAuth({
          api_v2_key: response.data?.api_v2_key ?? '',
          node_address: setupPayload.nodeAddress,
          profile: 'main',
          zoo_identity: response.data?.node_name ?? '',
          encryption_pk: response.data?.encryption_public_key ?? '',
          identity_pk: response.data?.identity_public_key ?? '',
        });

        void navigate('/ai-model-installation');
        onOpenChange(false);
      } else {
        submitRegistrationNoCodeError();
      }
    },
  });

  const handleReset = async () => {
    await zooNodeKill();
    useAuth.getState().setLogout(); // clean up local storage
    await zooNodeRemoveStorage({ preserveKeys: false });
    setZooNodeOptions(null);
    await zooNodeSpawn();
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={isOpen}>
      <AlertDialogContent className="w-[75%]">
        {allowClose && (
          <AlertDialogCancel
            className="absolute top-3 right-3 border-0"
            disabled={isResetLoading}
          >
            <XIcon className="h-4 w-4" />
          </AlertDialogCancel>
        )}
        <AlertDialogHeader>
          <AlertDialogTitle>{t('appReset.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col space-y-3 text-left text-white/70">
              <div className="text-sm">{t('appReset.description')}</div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex items-center justify-end gap-2.5">
          <Button
            className="min-w-32 text-sm"
            disabled={isResetLoading}
            isLoading={isResetLoading}
            onClick={handleReset}
            size="sm"
            variant={'destructive'}
          >
            {t('appReset.action')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
