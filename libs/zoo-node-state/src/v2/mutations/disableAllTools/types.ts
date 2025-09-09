import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type DisableAllToolsResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type DisableAllToolsInput = Token & {
  nodeAddress: string;
};

export type DisableAllToolsOutput = DisableAllToolsResponse;
