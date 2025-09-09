import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type RejectInvoiceRequest } from '@zooai/zoo-message-ts/api/tools/types';

export type RejectInvoiceOutput = any;

export type RejectInvoiceInput = Token & {
  nodeAddress: string;
  payload: RejectInvoiceRequest;
};
