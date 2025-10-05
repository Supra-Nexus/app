import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type GetQuestsStatusResponse } from '@supraai/supra-message-ts/api/quests/types';

export type GetQuestsStatusInput = Token & {
  nodeAddress: string;
};

export type GetQuestsStatusOutput = GetQuestsStatusResponse;
