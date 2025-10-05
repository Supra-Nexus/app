import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type PayInvoiceRequest,
  type PayInvoiceResponse,
} from '@supra_network/hanzo-message-ts/api/tools/types';

export type PayInvoiceOutput = PayInvoiceResponse;

export type PayInvoiceInput = Token & {
  nodeAddress: string;
  payload: PayInvoiceRequest;
};
