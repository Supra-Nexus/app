import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetToolsWithOfferingsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type GetToolsWithOfferingsInput = Token & {
  nodeAddress: string;
};

export type GetToolsWithOfferingsOutput = GetToolsWithOfferingsResponse;
