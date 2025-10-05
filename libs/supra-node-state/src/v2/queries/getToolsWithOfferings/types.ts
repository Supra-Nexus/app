import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetToolsWithOfferingsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type GetToolsWithOfferingsInput = Token & {
  nodeAddress: string;
};

export type GetToolsWithOfferingsOutput = GetToolsWithOfferingsResponse;
