import { type GetAgentsResponse } from '@supra_network/hanzo-message-ts/api/agents/types';
import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';

export type GetAgentsInput = Token & {
  nodeAddress: string;
  categoryFilter?: 'recently_used';
};

export type GetAgentsOutput = GetAgentsResponse;
