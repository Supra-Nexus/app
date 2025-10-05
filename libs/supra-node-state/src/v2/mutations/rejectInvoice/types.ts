import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type RejectInvoiceRequest } from '@supraai/supra-message-ts/api/tools/types';

export type RejectInvoiceOutput = any;

export type RejectInvoiceInput = Token & {
  nodeAddress: string;
  payload: RejectInvoiceRequest;
};
