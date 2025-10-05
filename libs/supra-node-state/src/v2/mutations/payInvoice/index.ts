import { payInvoice as payInvoiceApi } from '@supraai/supra-message-ts/api/tools/index';

import { type PayInvoiceInput } from './types';

export const payInvoice = async ({
  nodeAddress,
  token,
  payload,
}: PayInvoiceInput) => {
  const response = await payInvoiceApi(nodeAddress, token, payload);
  return response;
};
