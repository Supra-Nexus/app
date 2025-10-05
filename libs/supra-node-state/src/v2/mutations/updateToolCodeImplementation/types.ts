import { type Token } from '@supraai/supra-message-ts/api/general/types';
import { type UpdateToolCodeImplementationResponse } from '@supraai/supra-message-ts/api/tools/types';

export type UpdateToolCodeImplementationInput = Token & {
  nodeAddress: string;
  jobId: string;
  code: string;
};

export type UpdateToolCodeImplementationOutput =
  UpdateToolCodeImplementationResponse;
