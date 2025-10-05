import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type RejectInvoiceRequest } from '@supra_network/hanzo-message-ts/api/tools/types';

export type RejectInvoiceOutput = any;

export type RejectInvoiceInput = Token & {
  nodeAddress: string;
  payload: RejectInvoiceRequest;
};
