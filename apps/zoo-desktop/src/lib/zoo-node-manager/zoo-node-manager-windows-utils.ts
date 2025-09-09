import { invoke } from '@tauri-apps/api/core';

export const openZooNodeManagerWindow = async () => {
  return invoke('show_zoo_node_manager_window');
};

export const isLocalZooNode = (nodeAddress: string) => {
  const isLocalZooNode =
    nodeAddress.includes('localhost') || nodeAddress.includes('127.0.0.1');
  return isLocalZooNode;
};

export const isHostingZooNode = (nodeAddress: string) => {
  return nodeAddress?.includes('hosting.zoo.ngo');
};
