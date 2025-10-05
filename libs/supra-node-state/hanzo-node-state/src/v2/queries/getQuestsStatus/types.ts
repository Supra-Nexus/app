import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetQuestsStatusResponse } from '@supra_network/hanzo-message-ts/api/quests/types';

export type GetQuestsStatusInput = Token & {
  nodeAddress: string;
};

export type GetQuestsStatusOutput = GetQuestsStatusResponse;
