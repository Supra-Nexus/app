import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type GetQuestsStatusResponse } from '@zooai/zoo-message-ts/api/quests/types';

export type GetQuestsStatusInput = Token & {
  nodeAddress: string;
};

export type GetQuestsStatusOutput = GetQuestsStatusResponse;
