import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import { type UpdateToolCodeImplementationResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type UpdateToolCodeImplementationInput = Token & {
  nodeAddress: string;
  jobId: string;
  code: string;
};

export type UpdateToolCodeImplementationOutput =
  UpdateToolCodeImplementationResponse;
