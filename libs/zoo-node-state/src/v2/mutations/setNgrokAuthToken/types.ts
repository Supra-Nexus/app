import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type SetNgrokAuthTokenInput = Token & {
  nodeAddress: string;
  authToken: string;
};

export type SetNgrokAuthTokenOutput = void;
