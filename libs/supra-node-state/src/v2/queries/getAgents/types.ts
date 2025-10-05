import { type GetAgentsResponse } from '@supraai/supra-message-ts/api/agents/types';
import { type Token } from '@supraai/supra-message-ts/api/general/types';

export type GetAgentsInput = Token & {
  nodeAddress: string;
  categoryFilter?: 'recently_used';
};

export type GetAgentsOutput = GetAgentsResponse;
