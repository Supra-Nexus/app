import { getNodeStorageLocation as getNodeStorageLocationApi } from "@zooai/zoo-message-ts/api/general/index";

import { type GetNodeStorageLocationInput } from "./types";

export const getNodeStorageLocation = async ({
  nodeAddress,
  token,
}: GetNodeStorageLocationInput) => {
  const storageLocation = await getNodeStorageLocationApi(nodeAddress, token);
  return storageLocation.storage_location;
};
