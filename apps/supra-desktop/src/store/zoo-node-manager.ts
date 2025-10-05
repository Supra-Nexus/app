import { debug } from '@tauri-apps/plugin-log';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { type SupraNodeOptions } from '../lib/supra-node-manager/supra-node-manager-client-types';

type SupraNodeManagerStore = {
  isInUse: boolean | null;
  setIsInUse: (value: boolean) => void;
  supraNodeOptions: Partial<SupraNodeOptions> | null;
  setSupraNodeOptions: (
    supraNodeOptions: Partial<SupraNodeOptions> | null,
  ) => void;
};

export const useSupraNodeManager = create<SupraNodeManagerStore>()(
  devtools(
    persist(
      (set) => ({
        isInUse: false,
        supraNodeOptions: null,
        setSupraNodeOptions: (supraNodeOptions) => {
          void debug('setting supra-node options');
          set({ supraNodeOptions });
        },
        setIsInUse: (value: boolean) => {
          void debug('setting is in use');
          set({ isInUse: value });
        },
      }),
      {
        name: 'supra-node-options',
      },
    ),
  ),
);
