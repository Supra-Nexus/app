import {
  type Agent,
  type CreateAgentResponse,
} from '@zooai/zoo-message-ts/api/agents/types';
import { type Token } from '@zooai/zoo-message-ts/api/general/types';

export type CreateAgentOutput = CreateAgentResponse;

export type CreateAgentInput = Token & {
  nodeAddress: string;
  agent: Agent;
  cronExpression?: string;
};
