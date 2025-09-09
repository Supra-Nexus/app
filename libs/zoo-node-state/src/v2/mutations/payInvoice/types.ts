import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type PayInvoiceRequest,
  type PayInvoiceResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type PayInvoiceOutput = PayInvoiceResponse;

export type PayInvoiceInput = Token & {
  nodeAddress: string;
  payload: PayInvoiceRequest;
};
