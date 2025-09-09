import { debug } from '@tauri-apps/plugin-log';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { type ZooNodeOptions } from '../lib/zoo-node-manager/zoo-node-manager-client-types';

type ZooNodeManagerStore = {
  isInUse: boolean | null;
  setIsInUse: (value: boolean) => void;
  zooNodeOptions: Partial<ZooNodeOptions> | null;
  setZooNodeOptions: (
    zooNodeOptions: Partial<ZooNodeOptions> | null,
  ) => void;
};

export const useZooNodeManager = create<ZooNodeManagerStore>()(
  devtools(
    persist(
      (set) => ({
        isInUse: false,
        zooNodeOptions: null,
        setZooNodeOptions: (zooNodeOptions) => {
          void debug('setting zoo-node options');
          set({ zooNodeOptions });
        },
        setIsInUse: (value: boolean) => {
          void debug('setting is in use');
          set({ isInUse: value });
        },
      }),
      {
        name: 'zoo-node-options',
      },
    ),
  ),
);
