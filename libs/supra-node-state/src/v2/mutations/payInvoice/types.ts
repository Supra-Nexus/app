import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type PayInvoiceRequest,
  type PayInvoiceResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type PayInvoiceOutput = PayInvoiceResponse;

export type PayInvoiceInput = Token & {
  nodeAddress: string;
  payload: PayInvoiceRequest;
};
