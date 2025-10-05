import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type SetNgrokAuthTokenInput = Token & {
  nodeAddress: string;
  authToken: string;
};

export type SetNgrokAuthTokenOutput = void;
