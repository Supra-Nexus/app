import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type UpdateNodeNameInput = Token & {
  nodeAddress: string;
  newNodeName: string;
};

export type UpdateNodeNameOutput = {
  status: string;
};
