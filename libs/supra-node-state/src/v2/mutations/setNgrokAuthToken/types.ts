import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type SetNgrokAuthTokenInput = Token & {
  nodeAddress: string;
  authToken: string;
};

export type SetNgrokAuthTokenOutput = void;
