import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import { type UpdateToolCodeImplementationResponse } from '@zooai/zoo-message-ts/api/tools/types';

export type UpdateToolCodeImplementationInput = Token & {
  nodeAddress: string;
  jobId: string;
  code: string;
};

export type UpdateToolCodeImplementationOutput =
  UpdateToolCodeImplementationResponse;
