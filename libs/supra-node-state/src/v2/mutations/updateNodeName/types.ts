import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type UpdateNodeNameInput = Token & {
  nodeAddress: string;
  newNodeName: string;
};

export type UpdateNodeNameOutput = {
  status: string;
};
