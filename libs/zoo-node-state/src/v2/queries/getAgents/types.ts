import { type GetAgentsResponse } from '@zooai/zoo-message-ts/api/agents/types';
import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type GetAgentsInput = Token & {
  nodeAddress: string;
  categoryFilter?: 'recently_used';
};

export type GetAgentsOutput = GetAgentsResponse;
