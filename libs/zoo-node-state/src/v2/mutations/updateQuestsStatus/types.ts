import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type UpdateQuestsStatusResponse } from '@zooai/zoo-message-ts/api/quests/types';

export type UpdateQuestsStatusInput = Token & {
  nodeAddress: string;
};

export type UpdateQuestsStatusOutput = UpdateQuestsStatusResponse;
