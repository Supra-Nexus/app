import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type DisableAllToolsResponse } from '@supraai/supra-message-ts/api/tools/types';

export type DisableAllToolsInput = Token & {
  nodeAddress: string;
};

export type DisableAllToolsOutput = DisableAllToolsResponse;
