import { invoke } from '@tauri-apps/api/core';

export const openSupraNodeManagerWindow = async () => {
  return invoke('show_supra_node_manager_window');
};

export const isLocalSupraNode = (nodeAddress: string) => {
  const isLocalSupraNode =
    nodeAddress.includes('localhost') || nodeAddress.includes('127.0.0.1');
  return isLocalSupraNode;
};

export const isHostingSupraNode = (nodeAddress: string) => {
  return nodeAddress?.includes('hosting.supra.ngo');
};
