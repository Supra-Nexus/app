import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type UpdateQuestsStatusResponse } from '@supraai/supra-message-ts/api/quests/types';

export type UpdateQuestsStatusInput = Token & {
  nodeAddress: string;
};

export type UpdateQuestsStatusOutput = UpdateQuestsStatusResponse;
